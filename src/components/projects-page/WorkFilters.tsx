import { Fragment } from "react";
import Link from "next/link";
import type { Category, SiteContent } from "@/content/types";
import { categoryHref, WORK_PATH } from "@/lib/routes";
import styles from "./ProjectsPage.module.css";

type Props = {
  page: SiteContent["projectsPage"];
  /** Categoria marcada; sem ela, "Todos". */
  active?: Category;
  /** Na página de um projeto, a categoria fica marcada como o lugar onde ele está. */
  current?: "page" | "location";
};

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Filtros da página Trabalho. Cada filtro é um link com endereço próprio
 * (/trabalho/eventos), então dá para mandar uma categoria direto para alguém.
 */
export function WorkFilters({ page, active, current = "page" }: Props) {
  const countOf = (item: Category) =>
    item.layout === "cards"
      ? page.works.filter((work) => work.category.slug === item.slug).length
      : page.photos.filter((photo) => photo.category?.slug === item.slug).length;

  // Categoria vazia não aparece nos filtros (a não ser que seja a aberta).
  const filters = [
    { label: page.allLabel, href: WORK_PATH, count: page.photos.length, active: !active },
    ...page.categories.map((item) => ({
      label: item.title,
      href: categoryHref(item.slug),
      count: countOf(item),
      active: item.slug === active?.slug,
    })),
  ].filter((filter) => filter.count > 0 || filter.active);

  return (
    <nav className={styles.filters} aria-label="Categorias">
      {filters.map((filter, i) => (
        <Fragment key={filter.href}>
          {i > 0 && (
            <span className={styles.separator} aria-hidden="true">
              /
            </span>
          )}
          <Link
            href={filter.href}
            scroll={false}
            className={styles.filter}
            aria-current={filter.active ? current : undefined}
          >
            {filter.label}
            <span className={styles.filterCount}>{pad(filter.count)}</span>
          </Link>
        </Fragment>
      ))}
    </nav>
  );
}
