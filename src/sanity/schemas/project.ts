import { defineArrayMember, defineField, defineType } from "sanity";
import { ProjectsIcon } from "@sanity/icons/Projects";

/**
 * Projeto ou filme: um card numa categoria em cards (ex.: Projetos,
 * Audiovisual) que abre a própria página com texto e galeria.
 */
export const project = defineType({
  name: "project",
  title: "Projeto ou filme",
  type: "document",
  icon: ProjectsIcon,
  fields: [
    defineField({
      name: "title",
      title: "Nome",
      description: "Aparece no card e no topo da página, dentro da elipse.",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Categoria",
      description: "Só aparecem as categorias marcadas como “Cards de projetos ou filmes”.",
      type: "reference",
      to: [{ type: "category" }],
      options: { filter: 'layout == "cards"', disableNew: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "cover",
      title: "Capa",
      description: "Foto do card. Vazio = a primeira foto da galeria.",
      type: "picture",
    }),
    defineField({
      name: "text",
      title: "Texto",
      description:
        "Aparece centralizado no topo da página. Deixe uma linha em branco entre os parágrafos; o trecho entre *asteriscos* fica em itálico. Opcional.",
      type: "text",
      rows: 10,
    }),
    defineField({
      name: "link",
      title: "Link embaixo do texto",
      description: "Opcional, ex.: “Acesse o acervo completo”. Só aparece com o endereço preenchido.",
      type: "link",
    }),
    defineField({
      name: "video",
      title: "Vídeo",
      description: "Link do YouTube ou do Vimeo. Opcional; aparece antes das fotos.",
      type: "url",
      validation: (rule) =>
        rule.custom((value) =>
          !value || /youtube\.com|youtu\.be|vimeo\.com/.test(value) ? true : "Use um link do YouTube ou do Vimeo.",
        ),
    }),
    defineField({
      name: "photos",
      title: "Fotos",
      description:
        "Galeria da página. Arraste várias fotos de uma vez; arraste para mudar a ordem e clique numa foto para a legenda ou para marcar para a home.",
      type: "array",
      of: [defineArrayMember({ type: "photo" })],
      options: { layout: "grid" },
    }),
    defineField({
      name: "order",
      title: "Posição",
      description: "Ordem dos cards dentro da categoria: 1 vem primeiro. Vazio = depois dos numerados, o mais novo antes.",
      type: "number",
      validation: (rule) => rule.integer().min(1),
    }),
    defineField({
      name: "slug",
      title: "Endereço",
      description: "Final do link da página: luisabandos.com/trabalho/<categoria>/…",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [{ title: "Posição", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", category: "category.title", cover: "cover", photos: "photos" },
    prepare: ({ title, category, cover, photos }) => {
      const list = Array.isArray(photos) ? photos : [];
      const count = list.length === 1 ? "1 foto" : `${list.length} fotos`;
      return { title, media: cover?.asset ? cover : list[0], subtitle: [category, count].filter(Boolean).join(" · ") };
    },
  },
});
