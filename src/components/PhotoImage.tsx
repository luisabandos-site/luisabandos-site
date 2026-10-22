"use client";

import { useState } from "react";
import Image from "next/image";
import type { Photo } from "@/content/types";
import styles from "./PhotoImage.module.css";

type Props = {
  photo: Photo;
  sizes: string;
  /** Carrega antes de tudo (use só no que aparece logo de cara). */
  preload?: boolean;
  /** Carrega na hora, com prioridade, sem esperar chegar perto da tela. */
  eager?: boolean;
  alt?: string;
  onLoad?: () => void;
};

/**
 * Foto com prévia borrada: enquanto a versão final carrega, aparece uma
 * miniatura desfocada da própria foto; quando ela chega, entra com um fade.
 * Ocupa todo o container (que precisa ter `position: relative`).
 */
export function PhotoImage({ photo, sizes, preload, eager, alt, onLoad }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <span
      className={styles.root}
      data-loaded={loaded || undefined}
      style={
        {
          backgroundColor: photo.color,
          "--blur": photo.blur ? `url("${photo.blur}")` : undefined,
          "--focus": photo.focus,
        } as React.CSSProperties
      }
    >
      <Image
        src={photo.src}
        alt={alt ?? photo.alt}
        fill
        sizes={sizes}
        quality={85}
        preload={preload}
        loading={eager ? "eager" : undefined}
        fetchPriority={eager ? "high" : undefined}
        draggable={false}
        className={`${styles.image} fade-img`}
        onLoad={() => {
          setLoaded(true);
          onLoad?.();
        }}
      />
    </span>
  );
}
