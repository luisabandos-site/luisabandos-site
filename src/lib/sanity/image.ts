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

const OG = { width: 1200, height: 630 };

/**
 * Imagem de compartilhamento (WhatsApp, redes, Google): 1200 × 630 em JPEG,
 * recortada em volta do ponto de foco escolhido no painel.
 */
export function ogImage(photo: Photo) {
  if (!isSanityImage(photo.src)) return { url: photo.src, width: photo.width, height: photo.height, alt: photo.alt };

  const url = new URL(photo.src);
  // Recorte já feito no painel (ou a foto inteira) e o foco dentro dele.
  const [left, top, width, height] = url.searchParams.get("rect")?.split(",").map(Number) ?? [0, 0, photo.width, photo.height];
  const [fx, fy] = (photo.focus ?? "").split(" ").map((value) => parseFloat(value) / 100);
  const focusX = left + (Number.isFinite(fx) ? fx : 0.5) * width;
  const focusY = top + (Number.isFinite(fy) ? fy : 0.5) * height;

  // Maior retângulo 1200 × 630 que cabe no recorte, centrado no foco.
  const ratio = OG.width / OG.height;
  const w = Math.min(width, Math.round(height * ratio));
  const h = Math.min(height, Math.round(width / ratio));
  const x = Math.round(Math.min(Math.max(focusX - w / 2, left), left + width - w));
  const y = Math.round(Math.min(Math.max(focusY - h / 2, top), top + height - h));

  url.searchParams.set("rect", `${x},${y},${w},${h}`);
  url.searchParams.set("w", String(OG.width));
  url.searchParams.set("h", String(OG.height));
  url.searchParams.set("fit", "crop");
  url.searchParams.set("fm", "jpg");
  url.searchParams.set("q", "85");
  return { url: url.href, ...OG, alt: photo.alt };
}
