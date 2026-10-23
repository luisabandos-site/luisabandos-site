"use client";

import NextLink from "next/link";
import type { Work } from "@/content/types";
import { workHref } from "@/lib/routes";
import { PhotoImage } from "../PhotoImage";
import { usePageTransition } from "../transition/PageTransition";
import styles from "./WorkCards.module.css";

const sizes = "(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 32vw";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Cards de uma categoria de projetos ou filmes: capa na proporção dela e o
 * nome embaixo, com o número de fotos como nos filtros. Cada card abre a
 * página do projeto.
 */
export function WorkCards({ works }: { works: Work[] }) {
  const transition = usePageTransition();

  return (
    <ul className={styles.root}>
      {works.map((work, i) => {
        const href = workHref(work.category.slug, work.slug);
        const cover = work.cover;
        return (
          <li key={work.slug}>
            <NextLink
              href={href}
              className={styles.card}
              onClick={(event) => transition(event, href, work.title)}
              data-cursor="Ver"
            >
              <span
                className={styles.media}
                style={{ aspectRatio: cover ? `${cover.width} / ${cover.height}` : undefined }}
              >
                {cover && <PhotoImage photo={cover} sizes={sizes} preload={i < 3} />}
              </span>
              <span className={styles.title}>
                {work.title}
                {work.photos.length > 0 && <span className={styles.count}>{pad(work.photos.length)}</span>}
              </span>
            </NextLink>
          </li>
        );
      })}
    </ul>
  );
}
