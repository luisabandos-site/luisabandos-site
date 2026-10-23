"use client";

import NextLink from "next/link";
import type { Work } from "@/content/types";
import { workHref } from "@/lib/routes";
import { PhotoImage } from "../PhotoImage";
import { Reveal } from "../Reveal";
import { usePageTransition } from "../transition/PageTransition";
import styles from "./WorkCards.module.css";

const sizes = "(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 32vw";

/**
 * Cards de uma categoria de projetos ou filmes: capa na proporção dela e o
 * nome embaixo. Cada card abre a página do projeto.
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
              <Reveal variant="unveil">
                <span
                  className={styles.media}
                  style={{ aspectRatio: cover ? `${cover.width} / ${cover.height}` : undefined }}
                >
                  {cover && <PhotoImage photo={cover} sizes={sizes} preload={i < 3} />}
                </span>
              </Reveal>
              <span className={styles.title}>{work.title}</span>
            </NextLink>
          </li>
        );
      })}
    </ul>
  );
}
