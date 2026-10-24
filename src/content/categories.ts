import type { Category } from "./types";

/**
 * Categorias de trabalho. Cada foto diz a sua em `photos.ts`, e cada uma vira
 * um filtro com endereço próprio na página Trabalho (ex.: /trabalho/eventos).
 * Uma categoria sem nenhuma foto some dos filtros sozinha. As categorias em
 * cards (`layout: "cards"`) mostram projetos ou filmes (ver `works.ts`).
 *
 * As descrições aparecem no topo da página quando o filtro está ativo.
 * Só a de Eventos veio do Figma; as outras são PROVISÓRIAS.
 */
export const categories = {
  retratos: {
    slug: "retratos",
    title: "Retratos",
    description: "Pessoas e o lugar onde elas estão. Retratos pessoais, editoriais e de artistas, com luz natural ou de flash.",
  },
  eventos: {
    slug: "eventos",
    title: "Eventos",
    description: "Festas, shows e celebrações. A energia da pista, do palco e de quem está ali, registrada de perto.",
  },
  stillEMakingOf: {
    slug: "still-e-making-of",
    title: "Still e making of",
    description: "Bastidores e cenas de sets de filmagem, clipes e editoriais. O que acontece em volta da câmera.",
  },
  projetos: {
    slug: "projetos",
    title: "Projetos",
    description: "Séries pessoais e experimentais. A cidade grita: muros, pichações e o que a rua tem a dizer.",
    layout: "cards",
    cardRatio: "16 / 9",
  },
  audiovisual: {
    slug: "audiovisual",
    title: "Audiovisual",
    description: "Direção de fotografia, operação e assistência de câmera em clipes, curtas e documentários.",
    layout: "cards",
    cardRatio: "16 / 9",
  },
} satisfies Record<string, Category>;
