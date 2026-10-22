"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "motion/react";
import styles from "./Cursor.module.css";

/**
 * Cursor com rótulo ("Ver") que aparece sobre elementos com `data-cursor`.
 * Só existe em computador com mouse.
 */
export function Cursor() {
  const [label, setLabel] = useState<string | null>(null);
  const [enabled, setEnabled] = useState(false);
  const x = useSpring(0, { stiffness: 500, damping: 40, mass: 0.4 });
  const y = useSpring(0, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      const target = (event.target as Element | null)?.closest<HTMLElement>("[data-cursor]");
      setLabel(target?.dataset.cursor ?? null);
    };
    const onLeave = () => setLabel(null);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div className={styles.root} style={{ x, y }} aria-hidden="true">
      <motion.span
        className={styles.dot}
        initial={false}
        animate={{ scale: label ? 1 : 0, opacity: label ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {label}
      </motion.span>
    </motion.div>
  );
}
