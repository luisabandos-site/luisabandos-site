"use client";

import { useEffect, useRef } from "react";
import type { Photo } from "@/content/types";
import { preloadPhoto, queuePhoto } from "@/lib/preload";
import { PhotoImage } from "../PhotoImage";
import { useLightbox } from "./LightboxProvider";
import { lightboxSizes } from "./sizes";
import styles from "./ZoomablePhoto.module.css";

type Props = {
  photo: Photo;
  /** Fotos que dá para navegar na tela cheia (setas/arraste). */
  group?: Photo[];
  sizes: string;
  preload?: boolean;
  /** Na tela cheia, mostra a categoria no lugar do nome (home). */
  showCategory?: boolean;
  className?: string;
  /** Algo por cima da foto (ex.: legenda do hover). */
  children?: React.ReactNode;
};

/** Foto clicável que abre em tela cheia com nome (ou categoria), lugar e data. */
export function ZoomablePhoto({ photo, group, sizes, preload, showCategory, className, children }: Props) {
  const { open } = useLightbox();
  const ref = useRef<HTMLButtonElement>(null);
  const photos = group ?? [photo];
  const index = Math.max(0, photos.findIndex((p) => p.id === photo.id));

  // Baixa em segundo plano, logo depois do topo do site, para a foto já estar
  // pronta quando a pessoa rolar até ela.
  useEffect(() => {
    if (ref.current) queuePhoto(ref.current, photo, sizes);
  }, [photo, sizes]);

  return (
    <button
      ref={ref}
      type="button"
      className={`${styles.root} ${className ?? ""}`}
      style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
      onClick={() => open(photos, index, { showCategory })}
      // Ao passar o mouse (ou tocar), já começa a baixar a versão da tela cheia.
      onPointerEnter={() => preloadPhoto(photo, lightboxSizes(photo))}
      onPointerDown={() => preloadPhoto(photo, lightboxSizes(photo))}
      data-cursor="Ver"
      aria-label={`Abrir foto em tela cheia: ${photo.title}`}
    >
      <span className={styles.media}>
        <PhotoImage photo={photo} sizes={sizes} preload={preload} />
      </span>
      {children}
    </button>
  );
}
