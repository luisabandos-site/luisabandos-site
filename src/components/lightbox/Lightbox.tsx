"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, type PanInfo } from "motion/react";
import { useLenis } from "lenis/react";
import type { Photo } from "@/content/types";
import { formatPhotoDate } from "@/lib/format";
import styles from "./Lightbox.module.css";

type Props = {
  photos: Photo[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

const ease = [0.22, 1, 0.36, 1] as const;
const pad = (n: number) => String(n).padStart(2, "0");

export function Lightbox({ photos, index, onClose, onNavigate }: Props) {
  const lenis = useLenis();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [direction, setDirection] = useState(0);
  const photo = photos[index];
  const many = photos.length > 1;

  const go = (step: number) => {
    if (!many) return;
    setDirection(step);
    onNavigate((index + step + photos.length) % photos.length);
  };

  // Trava a rolagem da página e devolve o foco ao fechar.
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    lenis?.stop();
    const overflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = overflow;
      previous?.focus({ preventScroll: true });
    };
  }, [lenis]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      else if (event.key === "ArrowRight") go(1);
      else if (event.key === "ArrowLeft") go(-1);
      else if (event.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>("button");
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60 || info.velocity.x < -400) go(1);
    else if (info.offset.x > 60 || info.velocity.x > 400) go(-1);
  };

  return (
    <motion.div
      ref={dialogRef}
      className={styles.root}
      role="dialog"
      aria-modal="true"
      aria-label={`${photo.title} — ${photo.location}, ${formatPhotoDate(photo.date)}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4, ease, delay: 0.1 } }}
      transition={{ duration: 0.5, ease }}
    >
      <div className={styles.top}>
        <span className="label" aria-hidden={!many}>
          {many ? `${pad(index + 1)} / ${pad(photos.length)}` : ""}
        </span>
        <button ref={closeRef} type="button" className={styles.close} onClick={onClose}>
          <span className={styles.closeLabel}>Fechar</span>
          <span className={styles.closeIcon} aria-hidden="true" />
        </button>
      </div>

      <div className={styles.stage} onClick={(event) => event.target === event.currentTarget && onClose()}>
        <AnimatePresence initial={true} mode="popLayout" custom={direction}>
          <motion.div
            key={photo.id}
            className={styles.frame}
            style={
              {
                "--ratio": `${photo.width} / ${photo.height}`,
                "--w": photo.width,
                "--h": photo.height,
                backgroundColor: photo.color,
              } as React.CSSProperties
            }
            custom={direction}
            variants={{
              enter: (dir: number) =>
                dir === 0
                  ? { clipPath: "inset(12% 12% 12% 12%)", opacity: 0, x: 0 }
                  : { clipPath: "inset(0% 0% 0% 0%)", opacity: 0, x: dir * 80 },
              center: { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, x: 0 },
              exit: (dir: number) => ({ opacity: 0, x: dir * -80 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.8, ease }}
            drag={many ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragEnd={onDragEnd}
          >
            <motion.div
              className={styles.zoom}
              initial={{ scale: direction === 0 ? 1.15 : 1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.1, ease }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 767px) 100vw, 80vw"
                priority
                draggable={false}
                className={styles.image}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={styles.bottom}>
        <dl className={styles.caption} key={photo.id}>
          {[
            ["Nome", photo.title],
            ["Lugar", photo.location],
            ["Data", formatPhotoDate(photo.date)],
          ].map(([term, value], i) => (
            <div key={term} className={styles.field}>
              <dt className="label">{term}</dt>
              <dd className={styles.mask}>
                <motion.span
                  className={styles.value}
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.8, ease, delay: 0.25 + i * 0.06 }}
                >
                  {value}
                </motion.span>
              </dd>
            </div>
          ))}
        </dl>

        {many && (
          <div className={styles.arrows}>
            <button type="button" className={styles.arrow} onClick={() => go(-1)} aria-label="Foto anterior">
              ←
            </button>
            <button type="button" className={styles.arrow} onClick={() => go(1)} aria-label="Próxima foto">
              →
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
