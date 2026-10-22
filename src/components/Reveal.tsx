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
  const hidden =
    variant === "unveil" ? { clipPath: "inset(100% 0% 0% 0%)" } : { opacity: 0, y: 32 };
  const shown =
    variant === "unveil" ? { clipPath: "inset(0% 0% 0% 0%)" } : { opacity: 1, y: 0 };

  return (
    <motion.div
      className={className}
      initial={hidden}
      whileInView={shown}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: variant === "unveil" ? 1.2 : 0.9, ease, delay }}
    >
      {children}
    </motion.div>
  );
}
