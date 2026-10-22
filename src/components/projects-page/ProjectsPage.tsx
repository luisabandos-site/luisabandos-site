import { Fragment } from "react";
import Link from "next/link";
import type { Category, SiteContent } from "@/content/types";
import { Header } from "../Header";
import { PageTitle } from "../PageTitle";
import { Contact } from "../Contact";
import { Cursor } from "../Cursor";
import { ProjectsGallery } from "./ProjectsGallery";
import styles from "./ProjectsPage.module.css";

type Props = {
  content: SiteContent;
  /** Filtro ativo; sem ele, mostra todas as fotos. */
  category?: Category;
};

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Página Projetos. Cada filtro é um link com endereço próprio
 * (/projetos/eventos), então dá para mandar uma categoria direto para alguém.
 */
export function ProjectsPage({ content, category }: Props) {
  const page = content.projectsPage;
  const inCategory = (slug: string) => page.photos.filter((photo) => photo.category?.slug === slug);
  const photos = category ? inCategory(category.slug) : page.photos;

  // Categoria sem fotos não aparece nos filtros (a não ser que seja a aberta).
  const filters = [
    { label: page.allLabel, href: "/projetos", count: page.photos.length, active: !category },
    ...page.categories.map((item) => ({
      label: item.title,
      href: `/projetos/${item.slug}`,
      count: inCategory(item.slug).length,
      active: item.slug === category?.slug,
    })),
  ].filter((filter) => filter.count > 0 || filter.active);

  return (
    <>
      <Header brand={content.brand} nav={content.nav} />
      <main>
        <section className={styles.root} data-theme="dark">
          <PageTitle title={category?.title ?? page.title} count={photos.length}>
            <p>{category?.description ?? page.description}</p>
          </PageTitle>

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
                  aria-current={filter.active ? "page" : undefined}
                >
                  {filter.label}
                  <span className={styles.filterCount}>{pad(filter.count)}</span>
                </Link>
              </Fragment>
            ))}
          </nav>

          {photos.length > 0 ? (
            <ProjectsGallery key={category?.slug ?? "todos"} photos={photos} loadMore={page.loadMore} />
          ) : (
            <p className={styles.empty}>{page.empty}</p>
          )}
        </section>
        <Contact contact={content.contact} footer={content.footer} name={content.hero.name} />
      </main>
      <Cursor />
    </>
  );
}
