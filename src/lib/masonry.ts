import type { Photo } from "@/content/types";

const ratio = (p: Photo) => p.height / p.width;
const isLandscape = (p: Photo) => p.width > p.height;

/** Coloca cada foto na coluna mais curta (empate vai para a da esquerda). */
function distribute(photos: Photo[], widths: number[], offsets: number[], gap: number) {
  const heights = [...offsets];
  const columns: Photo[][] = widths.map(() => []);
  for (const photo of photos) {
    const target = heights.indexOf(Math.min(...heights));
    columns[target].push(photo);
    heights[target] += widths[target] * ratio(photo) + gap;
  }
  return columns;
}

/**
 * Layout do desktop (Figma): 3 colunas com larguras 644/630/533. A primeira
 * foto horizontal ocupa as duas colunas da direita no topo.
 */
export function desktopGallery(photos: Photo[]) {
  const wide = photos.find(isLandscape);
  const rest = photos.filter((p) => p !== wide);
  const widths = [644, 630, 533];
  const gap = 16;
  const top = wide ? (widths[1] + widths[2] + gap) * ratio(wide) + gap : 0;
  const [left, middle, right] = distribute(rest, widths, [0, top, top], gap);
  return { wide, left, middle, right };
}

/**
 * Layout do celular: horizontais em largura total (a primeira no topo, as
 * outras no fim) e verticais em 2 colunas, a da direita um pouco mais baixa.
 */
export function mobileGallery(photos: Photo[]) {
  const landscapes = photos.filter(isLandscape);
  const portraits = photos.filter((p) => !isLandscape(p));
  const [a, b] = distribute(portraits, [1, 1], [0, 0.27], 0.05);
  return { first: landscapes[0], columns: [a, b], last: landscapes.slice(1) };
}
