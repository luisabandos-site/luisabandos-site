"use client";

import { useEffect, useState } from "react";
import type { Link } from "@/content/types";
import styles from "./Header.module.css";

/**
 * Menu fixo. Fica branco sobre seções escuras e preto sobre a seção branca
 * (cada seção diz seu tema com `data-theme`).
 */
export function Header({ brand, nav }: { brand: string; nav: Link[] }) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let frame = 0;
    let lastY = window.scrollY;
    const update = () => {
      frame = 0;
      // Some ao rolar para baixo e volta ao rolar para cima.
      const y = window.scrollY;
      if (Math.abs(y - lastY) > 4) {
        setHidden(y > lastY && y > window.innerHeight * 0.6);
        lastY = y;
      }
      const probe = 30;
      const sections = document.querySelectorAll<HTMLElement>("[data-theme]");
      let current: "dark" | "light" = "dark";
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= probe && rect.bottom > probe) {
          current = section.dataset.theme === "light" ? "light" : "dark";
        }
      });
      setTheme(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header className={styles.root} data-on={theme} data-hidden={hidden || undefined}>
      <a href="#top" className={styles.brand}>
        {brand}
      </a>
      <nav aria-label="Principal">
        <ul className={styles.nav}>
          {nav.map((item, i) => (
            <li key={item.href}>
              <a
                href={item.href === "/" ? "#top" : item.href}
                className={styles.link}
                aria-current={i === 0 ? "page" : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
