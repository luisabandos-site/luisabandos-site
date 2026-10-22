"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useSpring } from "motion/react";
import type { SiteContent } from "@/content/types";
import { preloadPhoto } from "@/lib/preload";
import { PhotoImage } from "./PhotoImage";
import styles from "./Services.module.css";

const ease = [0.22, 1, 0.36, 1] as const;
const previewSizes = "240px";
type Edge = "top" | "bottom";

/**
 * Lista "O que eu faço". No desktop, ao passar o mouse, a linha se pinta de
 * branco a partir do lado por onde o mouse entrou e duas fotos inclinadas
 * aparecem seguindo o cursor, com o botão azul "Ver mais". No celular (sem
 * hover), a linha mais perto do centro da tela fica ativa ao rolar.
 */
export function Services({ services }: { services: SiteContent["services"] }) {
  const [active, setActive] = useState<number | null>(null);
  const [edge, setEdge] = useState<Edge>("bottom");
  const [touch, setTouch] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const followX = useSpring(0, { stiffness: 140, damping: 22, mass: 0.6 });
  const activeRef = useRef(active);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const media = window.matchMedia("(hover: none)");
    const update = () => setTouch(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  // Baixa as fotos do hover quando a lista se aproxima da tela, para elas já
  // estarem prontas quando o mouse passar.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        services.items.forEach((item) => item.preview.forEach((photo) => preloadPhoto(photo, previewSizes)));
        observer.disconnect();
      },
      { rootMargin: "100% 0px" },
    );
    observer.observe(list);
    return () => observer.disconnect();
  }, [services.items]);

  // Celular: ativa a linha mais próxima do centro da tela.
  useEffect(() => {
    if (!touch) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rows = listRef.current?.querySelectorAll<HTMLElement>("[data-row]");
      if (!rows?.length) return;
      const center = window.innerHeight * 0.5;
      let best: number | null = null;
      let distance = Infinity;
      rows.forEach((row, i) => {
        const rect = row.getBoundingClientRect();
        const d = Math.abs(rect.top + rect.height / 2 - center);
        if (d < distance && d < window.innerHeight * 0.35) {
          distance = d;
          best = i;
        }
      });
      const current = activeRef.current;
      if (best !== null && current !== null && best !== current) setEdge(best > current ? "bottom" : "top");
      setActive(best);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [touch]);

  const edgeOf = (event: React.MouseEvent<HTMLElement>): Edge => {
    const rect = event.currentTarget.getBoundingClientRect();
    return event.clientY < rect.top + rect.height / 2 ? "top" : "bottom";
  };

  const follow = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const offset = event.clientX - (rect.left + rect.width / 2);
    followX.set(Math.max(-1, Math.min(1, offset / (rect.width / 2))) * rect.width * 0.18);
  };

  return (
    <section className={styles.root} data-theme="dark" aria-labelledby="servicos-titulo">
      <h2 id="servicos-titulo" className={`label ${styles.heading}`}>
        {services.label}
      </h2>

      <ul ref={listRef} className={styles.list} onMouseLeave={() => !touch && setActive(null)}>
        {services.items.map((service, i) => {
          const isActive = active === i;
          return (
            <li key={service.slug} data-row className={styles.item} data-active={isActive || undefined}>
              <a
                href={service.href}
                className={styles.row}
                onMouseEnter={(event) => {
                  if (touch) return;
                  setEdge(edgeOf(event));
                  setActive(i);
                }}
                onMouseLeave={(event) => {
                  if (touch) return;
                  setEdge(edgeOf(event));
                  setActive((current) => (current === i ? null : current));
                }}
                onMouseMove={(event) => !touch && follow(event)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive((current) => (current === i ? null : current))}
              >
                <motion.span
                  className={styles.fill}
                  aria-hidden="true"
                  initial={false}
                  animate={{ scaleY: isActive ? 1 : 0 }}
                  style={{ originY: edge === "top" ? 0 : 1 }}
                  transition={{ duration: 0.6, ease }}
                />
                <span className={styles.title}>{service.title}</span>
                {service.tags.length > 0 && (
                  <span className={styles.tags}>{service.tags.join("  ·  ")}</span>
                )}
                <span className={styles.arrow} aria-hidden="true">
                  ↗
                </span>

                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      className={styles.preview}
                      style={{ x: touch ? 0 : followX }}
                      aria-hidden="true"
                    >
                      {service.preview.map((photo, p) => (
                        <motion.span
                          key={photo.id}
                          className={`${styles.shot} ${p === 0 ? styles.shotA : styles.shotB}`}
                          initial={{ opacity: 0, scale: 0.6, rotate: 0, y: 40 }}
                          animate={{ opacity: 1, scale: 1, rotate: p === 0 ? -8 : 10, y: 0 }}
                          exit={{ opacity: 0, scale: 0.8, rotate: 0, y: 20, transition: { duration: 0.3 } }}
                          transition={{ duration: 0.7, ease, delay: p * 0.07 }}
                        >
                          <PhotoImage photo={photo} alt="" sizes={previewSizes} />
                        </motion.span>
                      ))}
                      <motion.span
                        className={styles.cta}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0, transition: { duration: 0.25 } }}
                        transition={{ duration: 0.6, ease, delay: 0.15 }}
                      >
                        {services.cta}
                      </motion.span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
