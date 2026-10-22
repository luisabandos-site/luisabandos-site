"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import type { Photo } from "@/content/types";
import { PhotoImage } from "./PhotoImage";
import styles from "./HeroSlides.module.css";

/** Tempo de cada foto, igual ao protótipo do Figma (troca seca, sem transição). */
const INTERVAL_MS = 1500;
/** A primeira troca espera a cortina da intro sair, para a foto inicial aparecer inteira. */
const FIRST_DELAY_MS = 1000;

/**
 * Largura que a foto ocupa cobrindo a tela inteira. Em telas mais "em pé" que
 * a foto (celular), ela fica mais larga que a tela, e o navegador precisa de
 * uma versão maior para continuar nítida.
 */
function heroSizes(photo: Photo) {
  const ratio = photo.width / photo.height;
  return `(max-aspect-ratio: ${photo.width}/${photo.height}) ${Math.ceil(ratio * 100)}vh, 100vw`;
}

type Props = {
  images: Photo[];
  /** Só começa a trocar depois que a intro termina. */
  ready: boolean;
  /** Avisa quando a primeira foto carregou (a intro espera por ela). */
  onFirstLoad: () => void;
};

/**
 * Fotos do topo trocando sozinhas em loop. A primeira carrega antes de tudo;
 * as outras começam a baixar logo depois dela, e a troca só avança para uma
 * foto que já chegou, para nunca aparecer uma tela vazia ou borrada.
 */
export function HeroSlides({ images, ready, onFirstLoad }: Props) {
  const [active, setActive] = useState(0);
  const [firstLoaded, setFirstLoaded] = useState(false);
  const activeRef = useRef(0);
  const loadedRef = useRef<boolean[]>([]);
  const reduceMotion = useReducedMotion();

  const markLoaded = useCallback(
    (index: number) => {
      loadedRef.current[index] = true;
      if (index === 0) {
        setFirstLoaded(true);
        onFirstLoad();
      }
    },
    [onFirstLoad],
  );

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
        // As demais fotos só entram depois da primeira, para não disputar banda com ela.
        if (i > 0 && !firstLoaded) return null;
        const isActive = i === active;
        return (
          <span key={photo.id} className={styles.slide} data-active={isActive || undefined} aria-hidden={!isActive}>
            <PhotoImage
              photo={photo}
              sizes={heroSizes(photo)}
              preload={i === 0}
              eager
              onLoad={() => markLoaded(i)}
            />
          </span>
        );
      })}
    </>
  );
}
