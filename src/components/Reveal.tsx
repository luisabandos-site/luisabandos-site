"use client";

import { motion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Entrada suave dos textos quando aparecem na tela. As fotos não usam: com
 * muitas na tela, o movimento cansava (pedido do felipe em 2026-10-23).
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </motion.div>
  );
}
