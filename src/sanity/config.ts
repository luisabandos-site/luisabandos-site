"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { ptBRLocale } from "@sanity/locale-pt-br";
import { UploadIcon } from "@sanity/icons/Upload";
import { dataset, projectId } from "./env";
import { ImportTool } from "./import/ImportTool";
import { schemaTypes, singletons } from "./schemas";
import { structure } from "./structure";

/** Painel de edição do site, em /studio. */
export default defineConfig({
  name: "default",
  title: "Luísa Bandos",
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [structureTool({ structure, title: "Conteúdo" }), ptBRLocale()],
  // Agendamentos e tarefas ficam escondidos: o painel é só publicar.
  releases: { enabled: false },
  scheduledDrafts: { enabled: false },
  tasks: { enabled: false },
  tools: (tools) => [...tools, { name: "importar", title: "Importar", icon: UploadIcon, component: ImportTool }],
  schema: {
    types: schemaTypes,
    // Páginas únicas não aparecem no botão de criar.
    templates: (templates) => templates.filter(({ schemaType }) => !singletons.has(schemaType)),
  },
  document: {
    // Páginas únicas só podem ser publicadas ou ter as mudanças descartadas.
    actions: (actions, { schemaType }) =>
      singletons.has(schemaType)
        ? actions.filter(({ action }) => action && ["publish", "discardChanges", "restore"].includes(action))
        : actions,
  },
});
