"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis } from "lenis/react";

const query = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

/**
 * Ao trocar de página (Home, Projetos, Sobre mim), começa do topo, mesmo se a
 * rolagem suave ainda estava em movimento. Trocar de filtro dentro de Projetos
 * mantém a posição, e o botão "voltar" do navegador também.
 */
function TopOnNavigate() {
  const lenis = useLenis();
  const section = usePathname().split("/")[1];
  const first = useRef(true);
  const fromHistory = useRef(false);

  useEffect(() => {
    const onPop = () => {
      fromHistory.current = true;
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    if (first.current || fromHistory.current) {
      first.current = false;
      fromHistory.current = false;
      return;
    }
    lenis?.scrollTo(0, { immediate: true, force: true });
    // `lenis` fica de fora de propósito: só a troca de página reposiciona.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section]);

  return null;
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
      <TopOnNavigate />
      {children}
    </ReactLenis>
  );
}
