"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { INTRO_SEEN_KEY } from "./constants";
import styles from "./Intro.module.css";

/** Tempo mínimo da intro, para o contador não piscar em conexões rápidas. */
const MIN_MS = 800;
/** Tempo máximo: mesmo se a foto do topo não chegou, o site abre. */
const MAX_MS = 3000;

type IntroContextValue = {
  /** true quando a cortina começa a subir; o Hero anima a partir daí. */
  ready: boolean;
  /** O Hero avisa quando a foto dele terminou de carregar. */
  markHeroLoaded: () => void;
};

const IntroContext = createContext<IntroContextValue>({ ready: true, markHeroLoaded: () => {} });

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

/**
 * Intro curtinha: uma cortina preta com um contador 000 → 100 enquanto as
 * fontes e a foto do topo carregam. Quando tudo está pronto, ela sobe e o
 * Hero se revela já com a foto nítida.
 */
export function IntroProvider({ brand, children }: { brand: string; children: React.ReactNode }) {
  const skipped = useSkipped();
  const [finished, setFinished] = useState(false);
  const ready = skipped || finished;
  const heroLoaded = useRef(false);
  const countRef = useRef<HTMLSpanElement>(null);
  const lenis = useLenis();

  const markHeroLoaded = useCallback(() => {
    heroLoaded.current = true;
  }, []);

  useEffect(() => {
    if (skipped) return;

    let fontsReady = false;
    document.fonts.ready.then(() => (fontsReady = true));

    const start = performance.now();
    let last = start;
    let value = 0;
    let frame = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const step = now - last;
      last = now;
      const done = (fontsReady && heroLoaded.current && elapsed >= MIN_MS) || elapsed >= MAX_MS;
      // Enquanto carrega, o contador se aproxima de 90; quando termina, corre até 100.
      const target = done ? 100 : 90 * (1 - Math.exp(-elapsed / 700));
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
    <IntroContext.Provider value={{ ready, markHeroLoaded }}>
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
