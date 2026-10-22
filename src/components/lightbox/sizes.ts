import type { Photo } from "@/content/types";

/**
 * Largura exata (em px) que a foto ocupa na tela cheia, igual à conta do CSS
 * em `.frame`. Com ela o navegador baixa a versão do tamanho certo: nítida
 * em telas retina, sem desperdiçar banda.
 */
export function lightboxSizes(photo: Photo) {
  const mobile = window.innerWidth < 768;
  const margin = mobile ? 16 : 40;
  const maxW = window.innerWidth - 2 * margin;
  const maxH = window.innerHeight - (mobile ? 300 : 230);
  const width = Math.min(maxW, (maxH * photo.width) / photo.height);
  return `${Math.ceil(Math.max(width, 320))}px`;
}
