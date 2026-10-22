import type { ImageLoader } from "next/image";
import type { Photo } from "@/content/types";

/**
 * Fotos do painel ficam no CDN do Sanity, que gera sozinho cada tamanho. As
 * fotos locais continuam passando pelo Next.js.
 */
export const isSanityImage = (src: string) => src.startsWith("https://cdn.sanity.io/");

/**
 * Pede ao CDN do Sanity a largura que o <Image> escolheu para a tela, na
 * qualidade pedida. Sempre em WebP: o AVIF comprimia demais as fotos escuras.
 */
export const sanityLoader: ImageLoader = ({ src, width, quality }) => {
  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 90));
  url.searchParams.set("fit", "max");
  url.searchParams.set("fm", "webp");
  return url.href;
};

/** O loader certo para cada foto (undefined = o do Next.js). */
export const loaderFor = (photo: Photo) => (isSanityImage(photo.src) ? sanityLoader : undefined);

/** Imagem de compartilhamento (WhatsApp, redes): 1200 px de largura em JPEG. */
export function ogImage(photo: Photo) {
  if (!isSanityImage(photo.src)) return { url: photo.src, width: photo.width, height: photo.height };
  const url = new URL(photo.src);
  url.searchParams.set("w", "1200");
  url.searchParams.set("fm", "jpg");
  url.searchParams.set("q", "85");
  const width = Math.min(1200, photo.width);
  return { url: url.href, width, height: Math.round((photo.height * width) / photo.width) };
}
