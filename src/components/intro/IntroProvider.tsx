"use client";

import { createContext, useContext, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import type { Photo } from "@/content/types";
import { preloadPhoto } from "@/lib/preload";
import { INTRO_SEEN_KEY } from "./constants";
import styles from "./Intro.module.css";

/** Tempo mínimo da intro, para o contador não piscar em conexões rápidas. */
const MIN_MS = 800;
/** Tempo máximo: numa conexão muito lenta, o site abre mesmo assim. */
const MAX_MS = 4000;

type IntroContextValue = {
  /** true quando a cortina começa a subir; o Hero anima a partir daí. */
  ready: boolean;
};

const IntroContext = createContext<IntroContextValue>({ ready: true });

export function useIntro() {
  return useContext(IntroContext);
}

const noop = () => () => {};

/** Lê a marca que o script do <head> deixa quando a intro já foi vista. */
function useSkipped() {
  return useSyncExternalStore(
    noop,
    () => document.documentElement.dataset.intro === "skip",
    () => false,
  );
}

type Props = {
  brand: string;
  /** Fotos que a intro baixa antes de abrir o site, com o `sizes` de cada uma. */
  critical: { photo: Photo; sizes: string }[];
  children: React.ReactNode;
};

/**
 * Intro curtinha que pré-carrega de verdade: uma cortina preta com um
 * contador 000 → 100 que mostra o progresso real das fontes e das fotos
 * críticas (o topo inteiro e o retrato). Quando tudo chegou, ela sobe e o
 * Hero se revela já nítido. O resto da página baixa em segundo plano depois.
 */
export function IntroProvider({ brand, critical, children }: Props) {
  const skipped = useSkipped();
  const [finished, setFinished] = useState(false);
  const ready = skipped || finished;
  const criticalRef = useRef(critical);
  const countRef = useRef<HTMLSpanElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (skipped) return;

    const items = criticalRef.current;
    const total = items.length + 1;
    let loaded = 0;
    const count = () => {
      loaded++;
    };
    document.fonts.ready.then(count);
    items.forEach(({ photo, sizes }) => preloadPhoto(photo, sizes).then(count));

    const start = performance.now();
    let last = start;
    let value = 0;
    let frame = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const step = now - last;
      last = now;
      const done = (loaded >= total && elapsed >= MIN_MS) || elapsed >= MAX_MS;
      // O contador segue o progresso real (suavizado) e só chega a 100 no fim.
      const target = done ? 100 : Math.min(99, (loaded / total) * 100);
      value += (target - value) * (1 - Math.exp(-step / (done ? 70 : 120)));
      if (done && value > 99.5) value = 100;
      if (countRef.current) countRef.current.textContent = String(Math.floor(value)).padStart(3, "0");

      if (value >= 100) {
        try {
          sessionStorage.setItem(INTRO_SEEN_KEY, "1");
        } catch {}
        setFinished(true);
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [skipped]);

  // Sem rolagem enquanto a cortina está na tela.
  useEffect(() => {
    if (!lenis) return;
    if (ready) lenis.start();
    else lenis.stop();
  }, [lenis, ready]);

  return (
    <IntroContext.Provider value={{ ready }}>
      {children}
      <AnimatePresence>
        {!ready && (
          <motion.div
            key="intro"
            className={styles.root}
            data-intro-root
            aria-hidden="true"
            exit={{ y: "-100%" }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          >
            <span className={`label ${styles.brand}`}>{brand}</span>
            <motion.div
              className={styles.bottom}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            >
              <span ref={countRef} className={styles.count}>
                000
              </span>
              <span className={`label ${styles.status}`}>Carregando</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </IntroContext.Provider>
  );
}
