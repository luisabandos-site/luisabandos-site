"use client";

import { useEffect, useState } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import type { Link } from "@/content/types";
import { usePageTransition } from "./transition/PageTransition";
import styles from "./Header.module.css";

/** "/projetos/eventos" está dentro de "Projetos"; a home só em "/". */
const isActive = (href: string, pathname: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

/**
 * Menu fixo. Fica branco sobre seções escuras e preto sobre a seção branca
 * (cada seção diz seu tema com `data-theme`).
 */
export function Header({ brand, nav }: { brand: string; nav: Link[] }) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();
  const lenis = useLenis();

  const transition = usePageTransition();

  // Outra página: abre com a cortina. A página em que já está: volta
  // suavemente para o topo.
  const onNavigate = (href: string, label: string) => (event: React.MouseEvent) => {
    if (href !== pathname) {
      transition(event, href, label);
      return;
    }
    event.preventDefault();
    if (lenis) lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
      <NextLink href="/" className={styles.brand} onClick={onNavigate("/", nav[0]?.label ?? brand)}>
        {brand}
      </NextLink>
      <nav aria-label="Principal">
        <ul className={styles.nav}>
          {nav.map((item) => (
            <li key={item.href}>
              <NextLink
                href={item.href}
                className={styles.link}
                aria-current={isActive(item.href, pathname) ? "page" : undefined}
                onClick={onNavigate(item.href, item.label)}
              >
                {item.label}
              </NextLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
