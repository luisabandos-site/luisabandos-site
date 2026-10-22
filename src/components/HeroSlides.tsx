"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import type { Photo } from "@/content/types";
import { heroSizes } from "@/lib/sizes";
import { PhotoImage } from "./PhotoImage";
import styles from "./HeroSlides.module.css";

/** Tempo de cada foto, igual ao protótipo do Figma (troca seca, sem transição). */
const INTERVAL_MS = 1500;
/** A primeira troca espera a cortina da intro sair, para a foto inicial aparecer inteira. */
const FIRST_DELAY_MS = 1000;

type Props = {
  images: Photo[];
  /** Só começa a trocar depois que a intro termina. */
  ready: boolean;
};

/**
 * Fotos do topo trocando sozinhas em loop. A primeira carrega com prioridade
 * máxima e as outras logo atrás (a intro espera todas). A troca só avança para
 * uma foto que já chegou, para nunca aparecer uma tela vazia ou borrada.
 */
export function HeroSlides({ images, ready }: Props) {
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const loadedRef = useRef<boolean[]>([]);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!ready || reduceMotion || images.length < 2) return;
    let timer = 0;
    const tick = () => {
      // Parada quando a aba está escondida ou o topo já foi coberto pela página.
      if (document.hidden || window.scrollY > window.innerHeight) return;
      const next = (activeRef.current + 1) % images.length;
      if (!loadedRef.current[next]) return;
      activeRef.current = next;
      setActive(next);
    };
    const start = window.setTimeout(() => {
      timer = window.setInterval(tick, INTERVAL_MS);
    }, FIRST_DELAY_MS);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(timer);
    };
  }, [ready, reduceMotion, images.length]);

  return (
    <>
      {images.map((photo, i) => {
        const isActive = i === active;
        return (
          <span key={photo.id} className={styles.slide} data-active={isActive || undefined} aria-hidden={!isActive}>
            <PhotoImage
              photo={photo}
              sizes={heroSizes(photo)}
              preload={i === 0}
              eager
              fetchPriority={i === 0 ? "high" : "low"}
              onLoad={() => {
                loadedRef.current[i] = true;
              }}
            />
          </span>
        );
      })}
    </>
  );
}
