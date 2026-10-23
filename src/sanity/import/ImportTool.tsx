"use client";

import { useState } from "react";
import { useClient } from "sanity";
import { Box, Button, Card, Container, Flex, Heading, Stack, Text } from "@sanity/ui";
import { site } from "@/content/site";
import { apiVersion } from "../env";
import { buildDocuments, type SanityDocument, uploadsFor } from "./build";
import { upgrade } from "./upgrade";

type State =
  | { step: "idle" }
  | { step: "running"; done: number; total: number; message: string }
  | { step: "done"; created: number; updated: number; kept: number }
  | { step: "error"; message: string };

const PARALLEL = 3;

/**
 * Leva os textos e as fotos que hoje estão no código do site para o painel e
 * adapta o que já está lá quando o site muda de formato (`upgrade`). Pode
 * rodar mais de uma vez: fotos já enviadas não sobem de novo e nada que foi
 * editado se perde.
 */
export function ImportTool() {
  const client = useClient({ apiVersion });
  const [state, setState] = useState<State>({ step: "idle" });

  const run = async () => {
    // Se um envio falhar, os outros param e o erro fica na tela.
    let failed = false;
    try {
      const uploads = uploadsFor(site);
      const total = uploads.length + 1;
      let done = 0;
      const progress = (message: string) => {
        if (!failed) setState({ step: "running", done, total, message });
      };
      progress("Procurando fotos já enviadas…");

      const filename = (id: string) => `${id}.jpg`;
      const existing: { _id: string; originalFilename: string }[] = await client.fetch(
        `*[_type == "sanity.imageAsset" && originalFilename in $names]{_id, originalFilename}`,
        { names: uploads.map((upload) => filename(upload.id)) },
      );
      const byName = new Map(existing.map((asset) => [asset.originalFilename, asset._id]));
      const assets = new Map<string, string>();

      const queue = [...uploads];
      const worker = async () => {
        for (let upload = queue.shift(); upload && !failed; upload = queue.shift()) {
          const name = filename(upload.id);
          let id = byName.get(name);
          if (!id) {
            progress(`Enviando ${name}`);
            const response = await fetch(upload.file);
            if (!response.ok) throw new Error(`Não consegui baixar ${name} do site (${response.status}).`);
            const asset = await client.assets.upload("image", await response.blob(), {
              filename: name,
              extract: ["exif", "lqip", "palette"],
            });
            id = asset._id;
          }
          assets.set(upload.file, id);
          done++;
          progress(`Fotos: ${done} de ${uploads.length}`);
        }
      };
      await Promise.all(Array.from({ length: PARALLEL }, worker));

      progress("Criando e atualizando categorias e páginas…");
      const documents = buildDocuments(site, assets);
      const ids = documents.map((doc) => doc._id);
      // "raw" traz também os rascunhos, que precisam mudar junto.
      const live: SanityDocument[] = await client.fetch(
        `*[_type == "category" || _id in $ids || _id in $drafts]`,
        { ids, drafts: ids.map((id) => `drafts.${id}`) },
        { perspective: "raw" },
      );
      const present = new Set(live.map((doc) => doc._id));
      const { replacements, patches } = upgrade(documents, live);
      const replaced = new Map(replacements.map((doc) => [doc._id, doc]));
      const missing = documents
        .filter((doc) => !present.has(doc._id))
        .map((doc) => replaced.get(doc._id) ?? doc);
      if (missing.length || patches.length) {
        const transaction = client.transaction();
        for (const doc of missing) transaction.createIfNotExists(doc);
        for (const { id, ...operations } of patches) transaction.patch(id, operations);
        await transaction.commit();
      }

      const updated = new Set(patches.map((patch) => patch.id.replace(/^drafts\./, ""))).size;
      setState({ step: "done", created: missing.length, updated, kept: documents.length - missing.length });
    } catch (error) {
      failed = true;
      setState({ step: "error", message: error instanceof Error ? error.message : String(error) });
    }
  };

  return (
    <Container width={1} padding={4} paddingTop={6}>
      <Stack gap={5}>
        <Heading as="h1" size={3}>
          Importar e atualizar
        </Heading>
        <Text size={2} muted>
          Traz para o painel os textos e as {uploadsFor(site).length} fotos que já estão no site e adapta o conteúdo
          daqui quando o site ganha um formato novo (como os cards de projetos e filmes). Pode rodar quantas vezes
          quiser: nada que já foi editado aqui se perde.
        </Text>

        {state.step === "idle" && (
          <Box>
            <Button text="Importar e atualizar" tone="primary" fontSize={2} padding={4} onClick={run} />
          </Box>
        )}

        {state.step === "running" && (
          <Card padding={4} radius={3} tone="primary" border>
            <Stack gap={4}>
              <Text weight="medium">Trabalhando, não feche esta aba…</Text>
              <Box style={{ height: 6, borderRadius: 3, background: "var(--card-border-color)" }}>
                <Box
                  style={{
                    height: 6,
                    borderRadius: 3,
                    width: `${Math.round((state.done / state.total) * 100)}%`,
                    background: "var(--card-focus-ring-color)",
                    transition: "width 0.3s",
                  }}
                />
              </Box>
              <Text size={1} muted>
                {state.message}
              </Text>
            </Stack>
          </Card>
        )}

        {state.step === "done" && (
          <Card padding={4} radius={3} tone="positive" border>
            <Stack gap={4}>
              <Text weight="medium">Pronto! Tudo em dia.</Text>
              <Text size={1}>
                {[
                  `${state.created} ${state.created === 1 ? "documento criado" : "documentos criados"}`,
                  state.updated > 0 && `${state.updated} ${state.updated === 1 ? "atualizado" : "atualizados"} para o formato novo`,
                  state.kept - state.updated > 0 && `${state.kept - state.updated} mantidos como estavam`,
                ]
                  .filter(Boolean)
                  .join(", ")}
                . Abra “Fotos por categoria” ou “Projetos e filmes” para ver as fotos. O site se atualiza em até 1
                minuto.
              </Text>
              <Flex>
                <Button as="a" href="/studio/structure" text="Ir para o conteúdo" tone="positive" />
              </Flex>
            </Stack>
          </Card>
        )}

        {state.step === "error" && (
          <Card padding={4} radius={3} tone="critical" border>
            <Stack gap={4}>
              <Text weight="medium">Algo deu errado</Text>
              <Text size={1}>{state.message}</Text>
              <Text size={1} muted>
                Pode tentar de novo: o que já foi enviado não sobe outra vez.
              </Text>
              <Flex>
                <Button text="Tentar de novo" tone="critical" onClick={run} />
              </Flex>
            </Stack>
          </Card>
        )}
      </Stack>
    </Container>
  );
}
