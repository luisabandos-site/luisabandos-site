import type { Category } from "./types";

/**
 * Categorias de trabalho. Cada foto diz a sua em `photos.ts`, e cada uma vira
 * um filtro com endereço próprio na página Projetos (ex.: /projetos/eventos).
 * Uma categoria sem nenhuma foto some dos filtros sozinha.
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
  projetosAutorais: {
    slug: "projetos-autorais",
    title: "Projetos autorais",
    description: "Séries pessoais e experimentais. A cidade grita: muros, pichações e o que a rua tem a dizer.",
  },
  audiovisual: {
    slug: "audiovisual",
    title: "Audiovisual",
    description: "Direção de fotografia, operação e assistência de câmera em clipes, curtas e documentários.",
  },
} satisfies Record<string, Category>;
