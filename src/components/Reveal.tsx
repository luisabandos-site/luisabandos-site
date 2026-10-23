"use client";

import { motion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

/** Entrada suave quando o elemento aparece na tela. */
export function Reveal({
  children,
  className,
  delay = 0,
  variant = "rise",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: "rise" | "unveil";
}) {
  // Teste: as fotos ("unveil") aparecem direto, sem subir ao entrar na tela.
  if (variant === "unveil") return <div className={className}>{children}</div>;

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
