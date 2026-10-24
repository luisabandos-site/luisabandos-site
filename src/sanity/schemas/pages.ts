import { defineArrayMember, defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons/Cog";
import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { HomeIcon } from "@sanity/icons/Home";
import { UserIcon } from "@sanity/icons/User";

const label = (title = "Rótulo da seção") =>
  defineField({ name: "label", title, description: "Ex.: (01)  Sobre mim", type: "string" });

const strings = (name: string, title: string, description?: string, group?: string) =>
  defineField({ name, title, description, group, type: "array", of: [defineArrayMember({ type: "string" })] });

/** Textos e fotos fixas da home. As fotos da galeria vêm das categorias. */
export const home = defineType({
  name: "home",
  title: "Home",
  type: "document",
  icon: HomeIcon,
  groups: [
    { name: "hero", title: "Topo", default: true },
    { name: "about", title: "Sobre mim" },
    { name: "sections", title: "Projetos e O que eu faço" },
  ],
  fields: [
    defineField({ name: "name", title: "Nome grande", type: "string", group: "hero" }),
    defineField({
      name: "heroImages",
      title: "Fotos do topo",
      description: "Trocam sozinhas a cada 1,5 segundo, nesta ordem. Use o ponto de foco para escolher o que nunca pode ser cortado.",
      type: "array",
      of: [defineArrayMember({ type: "picture" })],
      options: { layout: "grid" },
      validation: (rule) => rule.min(1),
      group: "hero",
    }),
    strings("roles", "Funções", "Uma por linha, embaixo do nome.", "hero"),
    defineField({
      name: "socials",
      title: "Redes sociais",
      type: "array",
      of: [defineArrayMember({ type: "link" })],
      group: "hero",
    }),
    defineField({
      name: "about",
      title: "Sobre mim",
      type: "object",
      group: "about",
      fields: [
        label(),
        defineField({ name: "manifesto", title: "Texto grande", type: "text", rows: 3 }),
        defineField({ name: "bio", title: "Texto menor", type: "text", rows: 4 }),
        defineField({ name: "location", title: "Cidade", type: "string" }),
        defineField({ name: "portrait", title: "Retrato", type: "picture" }),
      ],
    }),
    defineField({
      name: "projects",
      title: "Projetos",
      description: "As fotos desta seção são as marcadas com “Mostrar na home” dentro das categorias.",
      type: "object",
      group: "sections",
      fields: [label()],
    }),
    defineField({
      name: "services",
      title: "O que eu faço",
      description: "Uma linha por categoria. No hover aparecem as 2 primeiras fotos de cada uma.",
      type: "object",
      group: "sections",
      fields: [label(), defineField({ name: "cta", title: "Texto do botão", type: "string" })],
    }),
  ],
  preview: { prepare: () => ({ title: "Home" }) },
});

/** Textos da página Trabalho. As fotos, os cards e os filtros vêm das categorias. */
export const projectsPage = defineType({
  name: "projectsPage",
  title: "Página Trabalho",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({ name: "title", title: "Título", type: "string" }),
    defineField({
      name: "description",
      title: "Descrição",
      description: "Texto do topo quando nenhum filtro está ativo.",
      type: "text",
      rows: 3,
    }),
    defineField({ name: "allLabel", title: "Nome do filtro com todas as fotos", type: "string" }),
    defineField({ name: "loadMore", title: "Texto do botão de carregar mais", type: "string" }),
    defineField({ name: "empty", title: "Mensagem de categoria vazia", type: "string" }),
  ],
  preview: { prepare: () => ({ title: "Página Trabalho" }) },
});

/** Página Sobre mim. */
export const aboutPage = defineType({
  name: "aboutPage",
  title: "Página Sobre mim",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({ name: "title", title: "Título", type: "string" }),
    strings("location", "Linhas ao lado do título"),
    defineField({
      name: "intro",
      title: "Quem sou",
      type: "object",
      fields: [
        label(),
        defineField({
          name: "statement",
          title: "Texto grande",
          description: "O trecho entre *asteriscos* fica em itálico.",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "bio",
          title: "Texto menor",
          description: "Um parágrafo por coluna.",
          type: "array",
          of: [defineArrayMember({ type: "text", rows: 4 })],
        }),
        defineField({ name: "portrait", title: "Retrato", type: "picture" }),
      ],
    }),
    defineField({
      name: "skills",
      title: "O que eu faço",
      type: "object",
      fields: [
        label(),
        defineField({
          name: "items",
          title: "Colunas",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "skill",
              fields: [
                defineField({ name: "title", title: "Título", type: "string" }),
                strings("items", "Itens"),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "timeline",
      title: "Trajetória",
      type: "object",
      fields: [
        label(),
        defineField({
          name: "years",
          title: "Anos",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "year",
              fields: [
                defineField({ name: "year", title: "Ano", type: "string" }),
                defineField({
                  name: "items",
                  title: "Trabalhos",
                  type: "array",
                  of: [
                    defineArrayMember({
                      type: "object",
                      name: "work",
                      fields: [
                        defineField({ name: "name", title: "Projeto e artista/cliente", type: "string" }),
                        defineField({ name: "type", title: "Tipo", description: "Ex.: Clipe, Show", type: "string" }),
                        defineField({ name: "role", title: "Função", description: "Ex.: Direção de fotografia", type: "string" }),
                      ],
                      preview: { select: { title: "name", subtitle: "role" } },
                    }),
                  ],
                }),
              ],
              preview: { select: { title: "year" } },
            }),
          ],
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Página Sobre mim" }) },
});

/** Contato, rodapé, menu e o que aparece no Google. */
export const settings = defineType({
  name: "settings",
  title: "Contato e informações gerais",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "contact", title: "Contato", default: true },
    { name: "general", title: "Menu e rodapé" },
    { name: "seo", title: "Google e compartilhamento" },
  ],
  fields: [
    defineField({
      name: "contact",
      title: "Contato",
      type: "object",
      group: "contact",
      fields: [
        label(),
        defineField({ name: "headline", title: "Chamada", type: "text", rows: 2 }),
        defineField({ name: "cta", title: "Botão", type: "link" }),
        defineField({
          name: "channels",
          title: "Colunas",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "channel",
              fields: [
                defineField({ name: "label", title: "Título", type: "string" }),
                defineField({
                  name: "items",
                  title: "Linhas",
                  description:
                    "WhatsApp: o número não aparece no site. Coloque o link (https://wa.me/55 + DDD + número) em Link e o texto, ex.: “Enviar mensagem”, em Texto.",
                  type: "array",
                  of: [defineArrayMember({ type: "link" })],
                }),
              ],
              preview: { select: { title: "label" } },
            }),
          ],
        }),
      ],
    }),
    defineField({ name: "brand", title: "Nome no canto do menu", type: "string", group: "general" }),
    defineField({
      name: "nav",
      title: "Nomes no menu",
      type: "object",
      group: "general",
      fields: [
        defineField({ name: "home", title: "Home", type: "string" }),
        defineField({ name: "projects", title: "Trabalho", type: "string" }),
        defineField({ name: "about", title: "Sobre mim", type: "string" }),
      ],
    }),
    defineField({
      name: "footer",
      title: "Rodapé",
      type: "object",
      group: "general",
      fields: [
        defineField({ name: "copyright", title: "Direitos", type: "string" }),
        defineField({ name: "tagline", title: "Frase", type: "string" }),
        defineField({ name: "backToTop", title: "Voltar ao topo", type: "string" }),
      ],
    }),
    defineField({
      name: "seo",
      title: "Google e compartilhamento",
      type: "object",
      group: "seo",
      fields: [
        defineField({
          name: "title",
          title: "Título",
          description: "Aparece no Google e na aba do navegador. Comece pelo nome, ex.: Luísa Bandos — Fotografia e direção de fotografia.",
          type: "string",
          validation: (rule) => rule.max(70).warning("O Google corta títulos com mais de uns 60 caracteres."),
        }),
        defineField({
          name: "description",
          title: "Descrição",
          description: "Texto que aparece embaixo do título no Google e nas prévias de link.",
          type: "text",
          rows: 3,
          validation: (rule) => rule.max(160).warning("O Google corta descrições com mais de uns 155 caracteres."),
        }),
        defineField({
          name: "image",
          title: "Imagem de compartilhamento",
          description:
            "Aparece quando alguém manda o link do site no WhatsApp ou nas redes. Use uma foto na horizontal; o ponto de foco define o recorte. Vazio = a primeira foto do topo da home.",
          type: "picture",
        }),
        defineField({
          name: "googleVerification",
          title: "Código de verificação do Google",
          description: "Do Google Search Console, método “Tag HTML”. Pode colar a tag inteira.",
          type: "string",
        }),
        // O endereço oficial agora fica no código (src/lib/seo.ts).
        defineField({ name: "url", title: "Endereço do site", type: "url", hidden: true }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Contato e informações gerais" }) },
});
