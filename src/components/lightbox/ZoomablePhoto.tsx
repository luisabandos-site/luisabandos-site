"use client";

import Image from "next/image";
import type { Photo } from "@/content/types";
import { useLightbox } from "./LightboxProvider";
import styles from "./ZoomablePhoto.module.css";

type Props = {
  photo: Photo;
  /** Fotos que dá para navegar na tela cheia (setas/arraste). */
  group?: Photo[];
  sizes: string;
  priority?: boolean;
  className?: string;
};

/** Foto clicável que abre em tela cheia com nome, lugar e data. */
export function ZoomablePhoto({ photo, group, sizes, priority, className }: Props) {
  const { open } = useLightbox();
  const photos = group ?? [photo];
  const index = Math.max(0, photos.findIndex((p) => p.id === photo.id));

  return (
    <button
      type="button"
      className={`${styles.root} ${className ?? ""}`}
      style={{ aspectRatio: `${photo.width} / ${photo.height}`, backgroundColor: photo.color }}
      onClick={() => open(photos, index)}
      data-cursor="Ver"
      aria-label={`Abrir foto em tela cheia: ${photo.title}`}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={styles.image}
      />
    </button>
  );
}
