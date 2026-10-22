"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { useLenis } from "lenis/react";
import styles from "./PageTransition.module.css";

type Go = (href: string, label: string) => void;
type State = { phase: "idle" | "cover" | "wait" | "reveal"; href: string; label: string };

const TransitionContext = createContext<Go | null>(null);
const ease = [0.76, 0, 0.24, 1] as const;
const idle: State = { phase: "idle", href: "", label: "" };

/**
 * Para usar no `onClick` de um link para outra página: troca a navegação
 * normal pela cortina. Clique com Ctrl/Cmd (nova aba) continua normal.
 */
export function usePageTransition() {
  const go = useContext(TransitionContext);
  return useCallback(
    (event: React.MouseEvent, href: string, label: string) => {
      if (!go || event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      go(href, label);
    },
    [go],
  );
}

/**
 * Transição entre páginas, no mesmo estilo da intro: uma cortina preta sobe
 * com o nome da página de destino, a página troca por baixo dela (já no topo)
 * e a cortina continua subindo para revelar a página nova.
 */
export function PageTransition({ brand, children }: { brand: string; children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const lenis = useLenis();
  const reduced = useReducedMotion();
  const [state, setState] = useState<State>(idle);

  const go = useCallback<Go>(
    (href, label) => {
      const target = new URL(href, window.location.href).pathname;
      if (reduced || target === window.location.pathname) {
        router.push(href);
        return;
      }
      setState((current) => (current.phase === "idle" ? { phase: "cover", href, label } : current));
    },
    [reduced, router],
  );

  // Sem rolar enquanto a cortina está na tela.
  useEffect(() => {
    if (state.phase === "idle") return;
    lenis?.stop();
    return () => lenis?.start();
  }, [lenis, state.phase]);

  // A página nova chegou (já no topo): revela no quadro seguinte. Se a
  // navegação demorar demais, revela assim mesmo.
  useEffect(() => {
    if (state.phase !== "wait") return;
    const arrived = pathname === new URL(state.href, window.location.href).pathname;
    const reveal = () => setState((current) => (current.phase === "wait" ? { ...current, phase: "reveal" } : current));
    if (arrived) {
      if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
      else window.scrollTo(0, 0);
      const frame = requestAnimationFrame(() => requestAnimationFrame(reveal));
      return () => cancelAnimationFrame(frame);
    }
    const timeout = window.setTimeout(reveal, 5000);
    return () => window.clearTimeout(timeout);
  }, [lenis, pathname, state]);

  const onAnimationComplete = () => {
    if (state.phase === "cover") {
      setState((current) => ({ ...current, phase: "wait" }));
      router.push(state.href);
    } else if (state.phase === "reveal") {
      setState(idle);
    }
  };

  return (
    <TransitionContext.Provider value={go}>
      {children}
      {state.phase !== "idle" && (
        <motion.div
          className={styles.root}
          aria-hidden="true"
          initial={{ y: "100%" }}
          animate={{ y: state.phase === "reveal" ? "-100%" : "0%" }}
          transition={{ duration: state.phase === "reveal" ? 0.8 : 0.6, ease }}
          onAnimationComplete={onAnimationComplete}
        >
          <span className={`label ${styles.brand}`}>{brand}</span>
          <span className={styles.mask}>
            <motion.span
              className={styles.title}
              initial={{ y: "100%" }}
              animate={{ y: state.phase === "reveal" ? "-30%" : "0%" }}
              transition={{ duration: state.phase === "reveal" ? 0.8 : 0.7, ease, delay: state.phase === "reveal" ? 0 : 0.15 }}
            >
              {state.label}
            </motion.span>
          </span>
        </motion.div>
      )}
    </TransitionContext.Provider>
  );
}
