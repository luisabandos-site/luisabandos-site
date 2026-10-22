import { defineField, defineType } from "sanity";

/** Texto com link (menu, redes, contato). */
export const link = defineType({
  name: "link",
  title: "Link",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Texto", type: "string" }),
    defineField({
      name: "href",
      title: "Link",
      description: "Endereço completo (https://…), mailto:email@… ou em branco para só texto.",
      type: "string",
    }),
  ],
  preview: { select: { title: "label", subtitle: "href" } },
});

/** Foto avulsa (topo da home, retrato), sem legenda de portfólio. */
export const picture = defineType({
  name: "picture",
  title: "Foto",
  type: "image",
  options: { hotspot: true, metadata: ["lqip", "palette"] },
  fields: [
    defineField({
      name: "alt",
      title: "Descrição para acessibilidade",
      description: "O que aparece na foto, para quem usa leitor de tela e para o Google.",
      type: "string",
    }),
  ],
});
