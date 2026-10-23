"use client";

import NextLink from "next/link";
import { usePageTransition } from "../transition/PageTransition";
import styles from "./WorkPage.module.css";

/** "← Projetos": volta para os cards da categoria. */
export function BackLink({ href, label }: { href: string; label: string }) {
  const transition = usePageTransition();
  return (
    <NextLink href={href} className={styles.back} onClick={(event) => transition(event, href, label)}>
      <span aria-hidden="true">←</span> {label}
    </NextLink>
  );
}
