"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import type { SiteContent } from "@/content/types";
import { FitText } from "./FitText";
import { useIntro } from "./intro/IntroProvider";
import { PhotoImage } from "./PhotoImage";
import styles from "./Hero.module.css";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Hero fixo (sticky): a seção branca "Sobre mim" sobe por cima dele. Enquanto
 * é coberto, a foto dá um leve zoom e escurece. As animações de entrada
 * esperam a intro terminar.
 */
export function Hero({ hero }: { hero: SiteContent["hero"] }) {
  const [viewport, setViewport] = useState(900);
  const { scrollY } = useScroll();
  const { ready, markHeroLoaded } = useIntro();

  useEffect(() => {
    const update = () => setViewport(window.innerHeight);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const scale = useTransform(scrollY, [0, viewport], [1, 1.12], { clamp: true });
  const shade = useTransform(scrollY, [0, viewport], [0, 0.75], { clamp: true });
  const lift = useTransform(scrollY, [0, viewport], ["0%", "-18%"], { clamp: true });

  const letters = Array.from(hero.name);

  return (
    <section className={styles.root} data-theme="dark" id="top" aria-label="Início">
      <motion.div
        className={styles.media}
        style={{ scale, backgroundColor: hero.image.color }}
        initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
        animate={{ clipPath: ready ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" }}
        transition={{ duration: 1.3, ease, delay: 0.1 }}
      >
        <motion.div
          className={styles.zoom}
          initial={{ scale: 1.2 }}
          animate={{ scale: ready ? 1 : 1.2 }}
          transition={{ duration: 2, ease, delay: 0.1 }}
        >
          <PhotoImage photo={hero.image} sizes="100vw" preload eager onLoad={markHeroLoaded} />
        </motion.div>
      </motion.div>
      <div className={styles.gradient} aria-hidden="true" />
      <motion.div className={styles.shade} style={{ opacity: shade }} aria-hidden="true" />

      <motion.div className={styles.content} style={{ y: lift }}>
        <h1 className={styles.name}>
          <span className="sr-only">{hero.name}</span>
          <FitText className={styles.fit} fallback="12.4vw">
            <span className={styles.mask} aria-hidden="true">
              {letters.map((char, i) => (
                <motion.span
                  key={i}
                  className={styles.char}
                  initial={{ y: "110%" }}
                  animate={{ y: ready ? "0%" : "110%" }}
                  transition={{ duration: 1.1, ease, delay: 0.35 + i * 0.035 }}
                >
                  {char === " " ? " " : char}
                </motion.span>
              ))}
            </span>
          </FitText>
        </h1>

        <motion.div
          className={styles.meta}
          initial={{ opacity: 0, y: 12 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.9, ease, delay: 0.9 }}
        >
          <ul className={styles.socials}>
            {hero.socials.map((item, i) => (
              <li key={item.label}>
                {i > 0 && (
                  <span className={styles.slash} aria-hidden="true">
                    /
                  </span>
                )}
                <a href={item.href} target="_blank" rel="noreferrer" className={styles.social}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <p className={styles.roles}>
            {hero.roles.map((role) => (
              <span key={role}>{role}</span>
            ))}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
