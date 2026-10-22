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

/**
 * Colunas de mesma largura (página Projetos). `gap` é o espaço entre as fotos
 * em proporção à largura da coluna. Como cada foto entra na coluna mais curta
 * na ordem da lista, carregar mais fotos não mexe nas que já estão na tela.
 */
export function columns(photos: Photo[], count: number, gap: number) {
  return distribute(photos, Array(count).fill(1), Array(count).fill(0), gap);
}

/**
 * Quantas fotos mostrar perto de `target` para as colunas terminarem o mais
 * alinhadas possível (sem um buraco grande em cima do "Carregar mais").
 */
export function balancedCount(photos: Photo[], target: number, count: number, gap: number) {
  if (target >= photos.length) return photos.length;
  let best = target;
  let bestSpread = Infinity;
  for (let n = Math.max(1, target - 3); n <= Math.min(photos.length, target + 3); n++) {
    const heights = columns(photos.slice(0, n), count, gap).map((column) =>
      column.reduce((sum, photo) => sum + ratio(photo) + gap, 0),
    );
    const spread = Math.max(...heights) - Math.min(...heights);
    if (spread < bestSpread - 0.01 || (Math.abs(spread - bestSpread) <= 0.01 && Math.abs(n - target) < Math.abs(best - target))) {
      best = n;
      bestSpread = spread;
    }
  }
  return best;
}
