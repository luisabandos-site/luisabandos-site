"use client";

import { useLayoutEffect, useRef } from "react";

/**
 * Ajusta o tamanho da fonte para o texto ocupar exatamente a largura do
 * container, como o nome gigante do Figma. O valor de `fallback` (em vw) é
 * usado antes do JavaScript carregar, para não haver salto.
 */
export function FitText({
  children,
  className,
  fallback,
}: {
  children: React.ReactNode;
  className?: string;
  fallback: string;
}) {
  const boxRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const box = boxRef.current;
    const text = textRef.current;
    if (!box || !text) return;

    const fit = () => {
      text.style.fontSize = "100px";
      const natural = text.getBoundingClientRect().width;
      if (natural > 0) text.style.fontSize = `${(100 * box.clientWidth) / natural}px`;
    };

    fit();
    document.fonts?.ready.then(fit);
    const observer = new ResizeObserver(fit);
    observer.observe(box);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={boxRef} style={{ display: "block", width: "100%" }}>
      <span ref={textRef} className={className} style={{ display: "inline-block", fontSize: fallback }}>
        {children}
      </span>
    </span>
  );
}
