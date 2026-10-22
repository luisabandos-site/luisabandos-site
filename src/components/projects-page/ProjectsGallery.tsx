"use client";

import { useRef, useState } from "react";
import type { Photo } from "@/content/types";
import { balancedCount, columns } from "@/lib/masonry";
import { ZoomablePhoto } from "../lightbox/ZoomablePhoto";
import { Reveal } from "../Reveal";
import styles from "./ProjectsGallery.module.css";

type Props = {
  photos: Photo[];
  loadMore: string;
  /** Quantas fotos aparecem de início e a cada "Carregar mais". */
  pageSize?: number;
};

const sizes = "(max-width: 767px) 50vw, 32vw";
const GAP = 20 / 600;
const pad = (n: number) => String(n).padStart(2, "0");

/** "São Carlos, SP" + "2025-11" → "São Carlos  ·  2025" (legenda do hover). */
const hoverCaption = (photo: Photo) => `${photo.location.split(",")[0]}  ·  ${photo.date.slice(0, 4)}`;

/**
 * Galeria da página Projetos: 3 colunas no computador e 2 no celular, cada
 * foto na sua proporção. Começa com umas 15 fotos e o botão traz mais umas 15
 * por vez (o número exato é o que deixa as colunas alinhadas embaixo).
 * No hover, um degradê com lugar e ano.
 */
export function ProjectsGallery({ photos, loadMore, pageSize = 15 }: Props) {
  const [pages, setPages] = useState(1);
  const rootRef = useRef<HTMLDivElement>(null);
  const count = balancedCount(photos, pages * pageSize, 3, GAP);
  const visible = photos.slice(0, count);
  const rest = photos.length - visible.length;

  const showMore = () => {
    // Quando o botão some, o foco vai para a galeria em vez de se perder.
    if (balancedCount(photos, (pages + 1) * pageSize, 3, GAP) >= photos.length) {
      rootRef.current?.focus({ preventScroll: true });
    }
    setPages((current) => current + 1);
  };

  const item = (photo: Photo) => (
    <Reveal key={photo.id} variant="unveil">
      <ZoomablePhoto
        photo={photo}
        group={photos}
        sizes={sizes}
        // A primeira linha aparece logo de cara.
        preload={photos.indexOf(photo) < 3}
        className={styles.photo}
      >
        <span className={styles.shade} aria-hidden="true" />
        <span className={styles.caption} aria-hidden="true">
          {hoverCaption(photo)}
        </span>
      </ZoomablePhoto>
    </Reveal>
  );

  return (
    <div ref={rootRef} className={styles.root} tabIndex={-1} aria-label="Galeria">
      <div className={styles.desktop}>
        {columns(visible, 3, GAP).map((column, i) => (
          <div key={i} className={styles.column}>
            {column.map(item)}
          </div>
        ))}
      </div>
      <div className={styles.mobile}>
        {columns(visible, 2, 8 / 175).map((column, i) => (
          <div key={i} className={styles.column}>
            {column.map(item)}
          </div>
        ))}
      </div>

      {rest > 0 && (
        <div className={styles.more}>
          <button type="button" className={styles.button} onClick={showMore}>
            <span className={styles.buttonLabel}>{loadMore}</span>
            <span className={styles.buttonCount}>({pad(rest)})</span>
          </button>
        </div>
      )}
      <p className="sr-only" aria-live="polite">
        {pages > 1 ? `${visible.length} de ${photos.length} fotos` : ""}
      </p>
    </div>
  );
}
