"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { AnimatePresence } from "motion/react";
import type { Photo } from "@/content/types";
import { Lightbox } from "./Lightbox";

type LightboxState = { photos: Photo[]; index: number } | null;

type LightboxContextValue = {
  open: (photos: Photo[], index: number) => void;
};

const LightboxContext = createContext<LightboxContextValue | null>(null);

export function useLightbox() {
  const value = useContext(LightboxContext);
  if (!value) throw new Error("useLightbox precisa estar dentro de <LightboxProvider>");
  return value;
}

export function LightboxProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<LightboxState>(null);

  const open = useCallback((photos: Photo[], index: number) => {
    setState({ photos, index });
  }, []);
  const close = useCallback(() => setState(null), []);
  const go = useCallback((index: number) => {
    setState((current) => (current ? { ...current, index } : current));
  }, []);

  const value = useMemo(() => ({ open }), [open]);

  return (
    <LightboxContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {state && (
          <Lightbox
            key="lightbox"
            photos={state.photos}
            index={state.index}
            onClose={close}
            onNavigate={go}
          />
        )}
      </AnimatePresence>
    </LightboxContext.Provider>
  );
}
