import type { Photo } from "@/content/types";

/**
 * `sizes` das fotos: quanto da tela cada uma ocupa. O navegador usa isso para
 * baixar a versão do tamanho certo. Ficam aqui porque a intro também precisa
 * deles para pré-carregar exatamente as mesmas versões.
 */

/**
 * Foto do topo cobrindo a tela inteira. Em telas mais "em pé" que a foto
 * (celular), ela fica mais larga que a tela, e precisa de uma versão maior
 * para continuar nítida.
 */
export function heroSizes(photo: Photo) {
  const ratio = photo.width / photo.height;
  return `(max-aspect-ratio: ${photo.width}/${photo.height}) ${Math.ceil(ratio * 100)}vh, 100vw`;
}

/** Retrato do "Sobre mim". */
export const portraitSizes = "(max-width: 767px) 50vw, 22vw";
