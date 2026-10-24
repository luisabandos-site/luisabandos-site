"use client";

import { useMemo, useSyncExternalStore } from "react";
import type { Photo, SiteContent } from "@/content/types";
import { desktopGallery, mobileGallery } from "@/lib/masonry";
import { shuffle } from "@/lib/shuffle";
import { ZoomablePhoto } from "./lightbox/ZoomablePhoto";
import styles from "./Projects.module.css";

/**
 * Sorteada uma vez a cada vez que o site é aberto (refresh ou nova visita).
 * Enquanto a pessoa navega pelo site ela não muda, então a galeria volta na
 * mesma ordem para a home (pedido do felipe em 2026-10-24).
 */
let visitSeed: number | undefined;
const getVisitSeed = () => (visitSeed ??= Math.floor(Math.random() * 2 ** 32));
const noop = () => () => {};

export function Projects({ projects }: { projects: SiteContent["projects"] }) {
  // No servidor (e na hidratação) a ordem do painel; no navegador, embaralhada.
  const seed = useSyncExternalStore(noop, getVisitSeed, () => null);
  const photos = useMemo(
    () => (seed === null ? projects.photos : shuffle(projects.photos, seed)),
    [projects.photos, seed],
  );
  const desktop = desktopGallery(photos);
  const mobile = mobileGallery(photos);

  const item = (photo: Photo, sizes: string) => (
    <div key={photo.id}>
      <ZoomablePhoto photo={photo} group={photos} sizes={sizes} showCategory />
    </div>
  );

  return (
    <section id="projetos" className={styles.root} data-theme="dark" aria-labelledby="projetos-titulo">
      <h2 id="projetos-titulo" className="label">
        {projects.label}
      </h2>

      <div className={styles.desktop}>
        <div className={styles.column}>{desktop.left.map((p) => item(p, "34vw"))}</div>
        <div className={styles.right}>
          {desktop.wide && item(desktop.wide, "62vw")}
          <div className={styles.subcolumns}>
            <div className={styles.column}>{desktop.middle.map((p) => item(p, "33vw"))}</div>
            <div className={styles.column}>{desktop.right.map((p) => item(p, "28vw"))}</div>
          </div>
        </div>
      </div>

      <div className={styles.mobile}>
        {mobile.first && item(mobile.first, "100vw")}
        <div className={styles.mobileColumns}>
          {mobile.columns.map((column, i) => (
            <div key={i} className={styles.column}>
              {column.map((p) => item(p, "50vw"))}
            </div>
          ))}
        </div>
        {mobile.last.map((p) => item(p, "100vw"))}
      </div>
    </section>
  );
}
