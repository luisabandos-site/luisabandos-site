import type { StructureResolver } from "sanity/structure";
import { CogIcon } from "@sanity/icons/Cog";
import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { HomeIcon } from "@sanity/icons/Home";
import { ImagesIcon } from "@sanity/icons/Images";
import { ProjectsIcon } from "@sanity/icons/Projects";
import { UserIcon } from "@sanity/icons/User";

/** Menu da esquerda do painel. */
export const structure: StructureResolver = (S) => {
  const single = (id: string, title: string, icon: React.ComponentType) =>
    S.listItem().id(id).title(title).icon(icon).child(S.document().schemaType(id).documentId(id).title(title));

  return S.list()
    .title("Conteúdo")
    .items([
      S.listItem()
        .id("categorias")
        .title("Fotos por categoria")
        .icon(ImagesIcon)
        .child(
          S.documentTypeList("category")
            .title("Categorias")
            .defaultOrdering([{ field: "order", direction: "asc" }]),
        ),
      S.listItem()
        .id("projetos-e-filmes")
        .title("Projetos e filmes")
        .icon(ProjectsIcon)
        .child(
          S.documentTypeList("project")
            .title("Projetos e filmes")
            .defaultOrdering([
              { field: "category.title", direction: "asc" },
              { field: "order", direction: "asc" },
            ]),
        ),
      S.divider(),
      single("home", "Home", HomeIcon),
      single("projectsPage", "Página Trabalho", DocumentTextIcon),
      single("aboutPage", "Página Sobre mim", UserIcon),
      single("settings", "Contato e informações gerais", CogIcon),
    ]);
};
