import { defineField, defineType } from "sanity";

/**
 * Uma foto do portfólio, com a legenda da tela cheia. Vive dentro de uma
 * categoria; a ordem na categoria é a ordem no site.
 */
export const photo = defineType({
  name: "photo",
  title: "Foto",
  type: "image",
  options: {
    hotspot: true,
    // exif: a data da foto, quando o campo Data fica em branco.
    // lqip e palette: a prévia borrada e a cor de fundo enquanto a foto carrega.
    metadata: ["exif", "lqip", "palette"],
  },
  fields: [
    defineField({
      name: "showOnHome",
      title: "Mostrar na home",
      description: "A home mistura as fotos marcadas de todas as categorias.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "title",
      title: "Nome",
      description: "Aparece na legenda da tela cheia (opcional).",
      type: "string",
    }),
    defineField({
      name: "location",
      title: "Lugar",
      description: "Ex.: São Carlos, SP",
      type: "string",
    }),
    defineField({
      name: "date",
      title: "Data",
      description: "O site mostra só mês e ano. Em branco, usa a data gravada na própria foto.",
      type: "date",
      options: { dateFormat: "DD/MM/YYYY" },
    }),
    defineField({
      name: "alt",
      title: "Descrição para acessibilidade",
      description: "O que aparece na foto, para quem usa leitor de tela e para o Google (opcional).",
      type: "string",
    }),
  ],
  preview: {
    select: { media: "asset", title: "title", location: "location", home: "showOnHome" },
    prepare: ({ media, title, location, home }) => ({
      media,
      title: title || location || "Sem nome",
      subtitle: [home ? "★ Na home" : "", title ? location : ""].filter(Boolean).join("  ·  "),
    }),
  },
});
