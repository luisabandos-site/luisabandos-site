"use client";

import { useLenis } from "lenis/react";

export function BackToTop({ label }: { label: string }) {
  const lenis = useLenis();

  return (
    <button
      type="button"
      onClick={() => (lenis ? lenis.scrollTo(0, { duration: 2 }) : window.scrollTo({ top: 0, behavior: "smooth" }))}
      style={{ fontFamily: "var(--font-label)", fontWeight: 500, whiteSpace: "pre" }}
    >
      {label}  ↑
    </button>
  );
}
