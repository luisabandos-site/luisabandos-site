import { getImageProps } from "next/image";
import type { Photo } from "@/content/types";
import { PHOTO_QUALITY } from "./quality";
import { loaderFor } from "./sanity/image";

const requested = new Map<string, Promise<void>>();

/**
 * Começa a baixar uma foto antes de ela aparecer na tela, na mesma versão
 * (tamanho e formato) que o <Image> vai pedir. Assim, quando ela entra, já
 * está pronta no cache do navegador.
 */
export function preloadPhoto(
  photo: Photo,
  sizes: string,
  priority: "high" | "low" | "auto" = "auto",
  quality = PHOTO_QUALITY,
) {
  if (typeof window === "undefined") return Promise.resolve();
  const key = `${photo.src}|${sizes}|${quality}`;
  const pending = requested.get(key);
  if (pending) return pending;

  const { props } = getImageProps({
    src: photo.src,
    loader: loaderFor(photo),
    alt: "",
    fill: true,
    sizes,
    quality,
  });
  const promise = new Promise<void>((resolve) => {
    const img = new window.Image();
    img.decoding = "async";
    img.fetchPriority = priority;
    img.onload = img.onerror = () => resolve();
    if (props.sizes) img.sizes = props.sizes;
    if (props.srcSet) img.srcset = props.srcSet;
    img.src = props.src;
  });
  requested.set(key, promise);
  return promise;
}

type Queued = { element: Element; photo: Photo; sizes: string };

const queue: Queued[] = [];
const PARALLEL = 2;
let running = 0;
let started = false;

function pump() {
  while (started && running < PARALLEL && queue.length) {
    const item = queue.shift()!;
    // Pula fotos fora da página ou escondidas (ex.: galeria do celular no computador).
    if (!item.element.isConnected || item.element.getClientRects().length === 0) continue;
    running++;
    preloadPhoto(item.photo, item.sizes, "low").then(() => {
      running--;
      pump();
    });
  }
}

function start() {
  started = true;
  pump();
}

if (typeof window !== "undefined") {
  // Só depois que o topo do site (Hero, fontes) terminou de carregar, e com o
  // navegador livre, para não disputar banda com o que aparece primeiro.
  const idle = () =>
    "requestIdleCallback" in window ? requestIdleCallback(start, { timeout: 1500 }) : setTimeout(start, 300);
  if (document.readyState === "complete") idle();
  else window.addEventListener("load", idle, { once: true });
}

/**
 * Coloca a foto na fila de download em segundo plano, na ordem da página.
 * Quando a pessoa rolar até ela, a foto já está pronta e aparece na hora.
 */
export function queuePhoto(element: Element, photo: Photo, sizes: string) {
  queue.push({ element, photo, sizes });
  pump();
}
