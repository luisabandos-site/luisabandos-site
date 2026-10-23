import { defineArrayMember, defineField, defineType } from "sanity";
import { ImagesIcon } from "@sanity/icons/Images";

/**
 * Categoria de trabalho: um filtro da página Trabalho e uma linha de "O que eu
 * faço". Mostra uma galeria de fotos ou cards de projetos e filmes.
 */
export const category = defineType({
  name: "category",
  title: "Categoria",
  type: "document",
  icon: ImagesIcon,
  fields: [
    defineField({
      name: "title",
      title: "Nome",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "layout",
      title: "Como aparece",
      type: "string",
      options: {
        list: [
          { title: "Galeria de fotos", value: "photos" },
          { title: "Cards de projetos ou filmes", value: "cards" },
        ],
        layout: "radio",
      },
      initialValue: "photos",
    }),
    defineField({
      name: "photos",
      title: "Fotos",
      description:
        "Arraste várias fotos de uma vez para cá. Arraste uma foto para mudar a ordem; clique nela para editar a legenda ou marcar para a home.",
      type: "array",
      of: [defineArrayMember({ type: "photo" })],
      options: { layout: "grid" },
      hidden: ({ document }) => document?.layout === "cards",
    }),
    defineField({
      name: "description",
      title: "Descrição",
      description: "Texto do topo da página Trabalho quando esta categoria está filtrada.",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "tags",
      title: "Palavras em “O que eu faço”",
      description: "Aparecem ao lado do nome da categoria na home. Ex.: festas, shows, celebrações.",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({
      name: "order",
      title: "Posição",
      description: "Ordem da categoria nos filtros e na home: 1 vem primeiro.",
      type: "number",
      validation: (rule) => rule.integer().min(1),
    }),
    defineField({
      name: "slug",
      title: "Endereço",
      description: "Final do link da categoria: luisabandos.com/trabalho/…",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [{ title: "Posição", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", photos: "photos", layout: "layout" },
    prepare: ({ title, photos, layout }) => {
      if (layout === "cards") return { title, subtitle: "Cards: projetos ou filmes" };
      const list = Array.isArray(photos) ? photos : [];
      return { title, media: list[0], subtitle: list.length === 1 ? "1 foto" : `${list.length} fotos` };
    },
  },
});
