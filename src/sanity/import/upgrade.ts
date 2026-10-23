import type { SanityDocument } from "./build";

/**
 * Ajustes no conteúdo que já está no painel quando o site muda de formato.
 * Cada ajuste só mexe no que ainda está do jeito antigo: rodar de novo não
 * troca nada que foi editado depois.
 */

export type Patch = { id: string; set?: Record<string, unknown>; setIfMissing?: Record<string, unknown>; unset?: string[] };

/** Categorias que passaram a mostrar cards (2026-10), pelo endereço antigo. */
const cardCategories: Record<string, { title?: [from: string, to: string]; slug?: string }> = {
  "projetos-autorais": { title: ["Projetos autorais", "Projetos"], slug: "projetos" },
  audiovisual: {},
};

/** Textos que mudaram com a página Trabalho, quando ainda estão no padrão antigo. */
const renamed: { id: string; field: string; from: string; to: string }[] = [
  { id: "settings", field: "nav.projects", from: "Projetos", to: "Trabalho" },
  { id: "projectsPage", field: "title", from: "Projetos", to: "Trabalho" },
];

const fieldOf = (doc: SanityDocument, path: string) =>
  path.split(".").reduce<unknown>((value, key) => (value as Record<string, unknown> | undefined)?.[key], doc);

/**
 * @param documents o que o "Importar" criaria do zero
 * @param live o que já está no painel, rascunhos incluídos
 * @returns documentos novos que substituem os de `documents` e as mudanças nos que já existem
 */
export function upgrade(documents: SanityDocument[], live: SanityDocument[]) {
  const byId = new Map(live.map((doc) => [doc._id, doc]));
  // A versão publicada e o rascunho mudam juntos, para publicar não desfazer nada.
  const versions = (id: string) => [byId.get(id), byId.get(`drafts.${id}`)].filter((doc) => doc !== undefined);
  const replacements: SanityDocument[] = [];
  const patches: Patch[] = [];

  for (const category of live) {
    if (category._type !== "category" || category._id.startsWith("drafts.") || category.layout) continue;
    const slug = (category.slug as { current?: string } | undefined)?.current ?? "";
    const change = cardCategories[slug];
    const photos = (category.photos as unknown[] | undefined) ?? [];

    if (!change) {
      for (const doc of versions(category._id)) patches.push({ id: doc._id, setIfMissing: { layout: "photos" } });
      continue;
    }

    // As fotos da categoria vão para o primeiro projeto dela, com as legendas e a ordem do painel.
    const project = documents.find(
      (doc) =>
        doc._type === "project" &&
        !byId.has(doc._id) &&
        (doc.category as { _ref?: string } | undefined)?._ref === category._id,
    );
    if (photos.length && !project) continue;
    if (project && photos.length) replacements.push({ ...project, photos });

    for (const doc of versions(category._id)) {
      const set: Record<string, unknown> = { layout: "cards" };
      if (change.title && doc.title === change.title[0]) set.title = change.title[1];
      if (change.slug && (doc.slug as { current?: string } | undefined)?.current === slug)
        set.slug = { _type: "slug", current: change.slug };
      patches.push({ id: doc._id, set, unset: ["photos"] });
    }
  }

  for (const { id, field, from, to } of renamed)
    for (const doc of versions(id)) if (fieldOf(doc, field) === from) patches.push({ id: doc._id, set: { [field]: to } });

  return { replacements, patches };
}
