import { categories } from "./categories";
import { photos } from "./photos";
import type { SiteContent } from "./types";

/**
 * Textos do site. Para editar um texto, troque o que está entre aspas.
 * Itens marcados com "PROVISÓRIO" ainda precisam do dado real.
 */
export const site: SiteContent = {
  seo: {
    title: "Luísa Bandos — Fotografia e direção de fotografia",
    description:
      "Fotógrafa e diretora de fotografia em São Carlos, SP. Retratos, eventos, shows, still, making of e audiovisual.",
  },
  brand: "Luisa Bandos",
  nav: [
    { label: "Home", href: "/" },
    { label: "Projetos", href: "/projetos" },
    { label: "Sobre mim", href: "/sobre" },
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
        href: "/projetos/retratos",
        preview: [photos.retratoCoroa, photos.retratoFumaca],
      },
      {
        slug: "eventos",
        title: "Eventos",
        tags: ["festas", "shows", "celebrações"],
        href: "/projetos/eventos",
        preview: [photos.festaSereia, photos.showDanca],
      },
      {
        slug: "still-e-making-of",
        title: "Still e making of",
        tags: ["bastidores", "cena", "produção"],
        href: "/projetos/still-e-making-of",
        preview: [photos.makingOfBastidor, photos.stillEscritorio],
      },
      {
        slug: "projetos-autorais",
        title: "Projetos autorais",
        tags: ["séries", "experimentais"],
        href: "/projetos/projetos-autorais",
        preview: [photos.cidadeGritaFoster, photos.cidadeGritaCartaz],
      },
      {
        slug: "audiovisual",
        title: "Audiovisual",
        tags: [],
        href: "/projetos/audiovisual",
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
  projectsPage: {
    title: "Projetos",
    description: "Retratos, eventos, bastidores e audiovisual. Uma seleção de trabalhos entre palcos, sets e a noite.",
    allLabel: "Todos",
    loadMore: "Carregar mais",
    empty: "Em breve, os trabalhos desta categoria aparecem aqui.",
    categories: [
      categories.retratos,
      categories.eventos,
      categories.stillEMakingOf,
      categories.projetosAutorais,
      categories.audiovisual,
    ],
    // As 15 primeiras seguem o Figma; o "Carregar mais" traz de 15 em 15.
    photos: [
      photos.festaBrinde,
      photos.showVentilador,
      photos.makingOfCamarim,
      photos.showLeque,
      photos.heroShow,
      photos.setLuzVerde,
      photos.showFogo,
      photos.escadaTijolo,
      photos.retratoEntardecer,
      photos.showFeixes,
      photos.setRebatedor,
      photos.retratoAvenida,
      photos.festaOculosEscuros,
      photos.stillRelogio,
      photos.pistaCheia,

      photos.showConfete,
      photos.retratoGrama,
      photos.editorialCoracao,
      photos.cidadeGritaDitadura,
      photos.djFisheye,
      photos.retratoVermelho,
      photos.showMaoErguida,
      photos.retratoCoroaMaos,
      photos.stillBandeira,
      photos.festaOculosRosa,
      photos.cidadeGritaTempo,
      photos.setCorredor,
      photos.showDourado,
      photos.retratoNoiteVerde,
      photos.palcoTusca,

      photos.festaSereia,
      photos.editorialAmarelo,
      photos.cidadeGritaSemDo,
      photos.retratoTorreDia,
      photos.showBracosAbertos,
      photos.setBoom,
      photos.djVermelho,
      photos.retratoRuina,
      photos.stillRevolver,
      photos.mascaraLed,
      photos.cidadeGritaMarighella,
      photos.makingOfBastidor,
      photos.showTusca,
      photos.retratoCoroaOlhar,
      photos.setMonitor,

      photos.showTelao,
      photos.cidadeGritaLagrima,
      photos.festaChifres,
      photos.stillAbajur,
      photos.retratoFumaca,
      photos.showPalcoEscuro,
      photos.setSofa,
      photos.cidadeGritaFoster,
      photos.djVerde,
      photos.retratoConcreto,
      photos.editorialEstudio,
      photos.showBoina,
      photos.cidadeGritaMuro,
      photos.stillBandeiras,
      photos.festaVermelha,

      photos.showDanca,
      photos.setAssistente,
      photos.retratoCoroa,
      photos.cidadeGritaCartaz,
      photos.showContraluz,
      photos.stillEscritorio,
      photos.cidadeGritaViaduto,
      photos.setCamera,
      photos.cidadeGritaGrades,
      photos.cidadeGritaBanca,
    ],
  },
  aboutPage: {
    title: "Sobre mim",
    location: ["São Carlos, SP", "Atendo em todo o Brasil"],
    intro: {
      label: "(01)  Quem sou",
      statement:
        "Sou Luísa Bandos, fotógrafa e diretora de fotografia. Trabalho onde tem *gente, luz e movimento*: palcos, pistas, sets e retratos.",
      // PROVISÓRIO: texto do Figma, revisar com a Luísa.
      bio: [
        "Comecei fotografando shows e festas da cena independente e, aos poucos, levei esse olhar para retratos, editoriais e sets de filmagem. Gosto de luz difícil, de cor saturada e do momento que ninguém ensaiou.",
        "Hoje divido meu tempo entre a fotografia e o audiovisual: assino a direção de fotografia de clipes e curtas e atuo como operadora e assistente de câmera em filmes, clipes e documentários.",
      ],
      portrait: photos.luisaRetrato,
    },
    skills: {
      label: "(02)  O que eu faço",
      items: [
        {
          title: "Fotografia",
          items: ["Retratos e editoriais", "Shows, festas e eventos", "Still e making of", "Projetos autorais"],
        },
        {
          title: "Direção de fotografia",
          items: ["Clipes", "Curtas e documentários", "Conteúdo para marcas", "Desenho de luz"],
        },
        {
          title: "Operação de câmera",
          items: ["Filmes", "Clipes", "Documentários", "Eventos e ao vivo"],
        },
        {
          title: "Assistência de câmera",
          items: ["1ª e 2ª assistência", "Foco", "Montagem e checagem", "Logagem de material"],
        },
      ],
    },
    // PROVISÓRIO: trabalhos de exemplo do Figma. Trocar pelos reais.
    timeline: {
      label: "(03)  Trajetória",
      years: [
        {
          year: "2026",
          items: [
            { name: "Nome do projeto  ·  Artista ou cliente", type: "Clipe", role: "Direção de fotografia" },
            { name: "Nome do projeto  ·  Artista ou cliente", type: "Show", role: "Fotografia" },
            { name: "Nome do projeto  ·  Artista ou cliente", type: "Documentário", role: "Operação de câmera" },
          ],
        },
        {
          year: "2025",
          items: [
            { name: "Nome do projeto  ·  Artista ou cliente", type: "Editorial", role: "Fotografia" },
            { name: "Nome do projeto  ·  Artista ou cliente", type: "Curta-metragem", role: "Assistência de câmera" },
            { name: "Nome do projeto  ·  Artista ou cliente", type: "Clipe", role: "Direção de fotografia" },
            { name: "Nome do projeto  ·  Artista ou cliente", type: "Show", role: "Fotografia" },
          ],
        },
        {
          year: "2024",
          items: [
            { name: "Nome do projeto  ·  Artista ou cliente", type: "Documentário", role: "Operação de câmera" },
            { name: "Nome do projeto  ·  Artista ou cliente", type: "Editorial", role: "Fotografia" },
            { name: "Nome do projeto  ·  Artista ou cliente", type: "Curta-metragem", role: "Assistência de câmera" },
          ],
        },
        {
          year: "2023",
          items: [
            { name: "Nome do projeto  ·  Artista ou cliente", type: "Clipe", role: "Direção de fotografia" },
            { name: "Nome do projeto  ·  Artista ou cliente", type: "Show", role: "Fotografia" },
          ],
        },
      ],
    },
  },
};
