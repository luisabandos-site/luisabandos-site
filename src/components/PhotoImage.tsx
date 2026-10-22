"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { Photo } from "@/content/types";
import { PHOTO_QUALITY } from "@/lib/quality";
import { loaderFor } from "@/lib/sanity/image";
import styles from "./PhotoImage.module.css";

type Props = {
  photo: Photo;
  sizes: string;
  /** Carrega antes de tudo (use só no que aparece logo de cara). */
  preload?: boolean;
  /** Carrega na hora, sem esperar chegar perto da tela. */
  eager?: boolean;
  /** Prioridade do download em relação às outras fotos. */
  fetchPriority?: "high" | "low" | "auto";
  /** Qualidade da versão baixada (ver src/lib/quality.ts). */
  quality?: number;
  alt?: string;
  onLoad?: () => void;
};

/**
 * Foto com prévia borrada por baixo. A foto aparece direto, sem esperar o
 * JavaScript: se já está guardada no navegador, surge na hora. Só a foto
 * prioritária que ainda está chegando quando a página fica pronta entra com
 * um fade curto. Ocupa todo o container (que precisa ter `position: relative`).
 */
export function PhotoImage({ photo, sizes, preload, eager, fetchPriority, quality = PHOTO_QUALITY, alt, onLoad }: Props) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Fade só para foto prioritária que ainda está chegando. As de mais abaixo
  // (lazy) já vêm do pré-carregamento e aparecem na hora quando a tela chega lá.
  useEffect(() => {
    const img = imageRef.current;
    if (img && !img.complete && img.loading !== "lazy") img.dataset.pending = "";
  }, []);

  return (
    <span
      ref={rootRef}
      className={styles.root}
      style={
        {
          backgroundColor: photo.color,
          "--blur": photo.blur ? `url("${photo.blur}")` : undefined,
          "--focus": photo.focus,
        } as React.CSSProperties
      }
    >
      <Image
        ref={imageRef}
        src={photo.src}
        loader={loaderFor(photo)}
        alt={alt ?? photo.alt}
        fill
        sizes={sizes}
        quality={quality}
        preload={preload}
        loading={eager ? "eager" : undefined}
        fetchPriority={fetchPriority ?? (eager ? "high" : undefined)}
        draggable={false}
        className={styles.image}
        onLoad={(event) => {
          delete event.currentTarget.dataset.pending;
          if (rootRef.current) rootRef.current.dataset.loaded = "";
          onLoad?.();
        }}
      />
    </span>
  );
}
