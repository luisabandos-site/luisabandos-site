"use client";

import { useSyncExternalStore } from "react";
import { ReactLenis } from "lenis/react";

const query = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

/** Rolagem suave (Lenis). Desligada para quem prefere menos movimento. */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );

  if (reduced) return <>{children}</>;

  return (
    <ReactLenis root options={{ lerp: 0.1, anchors: true }}>
      {children}
    </ReactLenis>
  );
}
