import { photos } from "./photos";
import type { SiteContent } from "./types";

/**
 * Textos da home. Para editar um texto, troque o que está entre aspas.
 * Itens marcados com "PROVISÓRIO" ainda precisam do dado real.
 */
export const site: SiteContent = {
  seo: {
    title: "Luísa Bandos — Fotografia e direção de fotografia",
    description:
      "Fotógrafa e diretora de fotografia em São Carlos, SP. Retratos, eventos, shows, still, making of e audiovisual.",
    // PROVISÓRIO: trocar pelo domínio final quando existir.
    url: "https://luisabandos.vercel.app",
  },
  brand: "Luisa Bandos",
  nav: [
    { label: "Home", href: "/" },
    { label: "Projetos", href: "#projetos" },
    { label: "Sobre mim", href: "#sobre" },
  ],
  hero: {
    name: "Luísa Bandos",
    images: [photos.heroShow, photos.showVentilador, photos.retratoAvenida, photos.editorialAmarelo],
    roles: [
      "Fotógrafa,",
      "Diretora de fotografia,",
      "Operadora de câmera,",
      "Assistente de câmera",
    ],
    socials: [
      { label: "Instagram", href: "https://www.instagram.com/luisabandos/" },
      // PROVISÓRIO: colocar os links reais.
      { label: "Behance", href: "https://www.behance.net/" },
      { label: "Linkedin", href: "https://www.linkedin.com/" },
    ],
  },
  about: {
    label: "(01)  Sobre mim",
    manifesto:
      "Fotografo pessoas, palcos e a noite. Do retrato editorial ao bastidor de set, procuro a luz que conta a história e o instante que não se repete.",
    bio: "Sou fotógrafa e diretora de fotografia. Trabalho com retratos, eventos, shows e audiovisual, e também atuo como operadora e assistente de câmera em sets de filmes, clipes e documentários.",
    location: "São Carlos - SP",
    portrait: photos.luisaRetrato,
  },
  projects: {
    label: "(02)  Projetos selecionados",
    photos: [
      photos.retratoTorre,
      photos.pistaCheia,
      photos.stillRelogio,
      photos.djFisheye,
      photos.stillBandeira,
      photos.retratoVermelho,
      photos.djVerde,
      photos.djVermelho,
    ],
  },
  services: {
    label: "(03)  O que eu faço",
    cta: "Ver mais",
    items: [
      {
        slug: "retratos",
        title: "Retratos",
        tags: ["pessoal", "editorial", "corporativo"],
        href: "#projetos",
        preview: [photos.retratoCoroa, photos.retratoFumaca],
      },
      {
        slug: "eventos",
        title: "Eventos",
        tags: ["festas", "shows", "celebrações"],
        href: "#projetos",
        preview: [photos.festaSereia, photos.showDanca],
      },
      {
        slug: "still-e-making-of",
        title: "Still e making of",
        tags: ["bastidores", "cena", "produção"],
        href: "#projetos",
        preview: [photos.makingOfBastidor, photos.stillEscritorio],
      },
      {
        slug: "projetos-autorais",
        title: "Projetos autorais",
        tags: ["séries", "experimentais"],
        href: "#projetos",
        preview: [photos.cidadeGritaFoster, photos.cidadeGritaCartaz],
      },
      {
        slug: "audiovisual",
        title: "Audiovisual",
        tags: [],
        href: "#projetos",
        preview: [photos.setCamera, photos.setLuzVerde],
      },
    ],
  },
  contact: {
    label: "(04)  Contato",
    headline: "Tem um projeto, show ou ensaio em mente? Vamos conversar.",
    // PROVISÓRIO: e-mail e WhatsApp abaixo são de exemplo.
    cta: { label: "Enviar mensagem", href: "mailto:contato@luisabandos.com" },
    channels: [
      {
        label: "E-mail",
        items: [{ label: "contato@luisabandos.com", href: "mailto:contato@luisabandos.com" }],
      },
      {
        label: "WhatsApp",
        items: [{ label: "+55 16 90000-0000", href: "https://wa.me/5516900000000" }],
      },
      {
        label: "Redes",
        items: [
          { label: "Instagram", href: "https://www.instagram.com/luisabandos/" },
          { label: "Behance", href: "https://www.behance.net/" },
          { label: "LinkedIn", href: "https://www.linkedin.com/" },
        ],
      },
      {
        label: "Base",
        items: [
          { label: "São Carlos, SP", href: "" },
          { label: "Atendo em todo o Brasil", href: "" },
        ],
      },
    ],
  },
  footer: {
    copyright: "© 2026 Luísa Bandos",
    tagline: "Fotografia, direção de fotografia e câmera",
    backToTop: "Voltar ao topo",
  },
};
