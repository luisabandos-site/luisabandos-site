import { Fragment } from "react";
import Link from "next/link";
import type { Category, SiteContent } from "@/content/types";
import { Header } from "../Header";
import { PageTitle } from "../PageTitle";
import { Contact } from "../Contact";
import { Cursor } from "../Cursor";
import { categoryHref, WORK_PATH } from "@/lib/routes";
import { ProjectsGallery } from "./ProjectsGallery";
import { WorkCards } from "./WorkCards";
import styles from "./ProjectsPage.module.css";

type Props = {
  content: SiteContent;
  /** Filtro ativo; sem ele, mostra todas as fotos. */
  category?: Category;
};

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Página Trabalho. Cada filtro é um link com endereço próprio
 * (/trabalho/eventos), então dá para mandar uma categoria direto para alguém.
 * Uma categoria em cards (Projetos, Audiovisual) mostra os cards em vez das fotos.
 */
export function ProjectsPage({ content, category }: Props) {
  const page = content.projectsPage;
  const inCategory = (slug: string) => page.photos.filter((photo) => photo.category?.slug === slug);
  const worksIn = (slug: string) => page.works.filter((work) => work.category.slug === slug);
  const countOf = (item: Category) => (item.layout === "cards" ? worksIn(item.slug) : inCategory(item.slug)).length;
  const photos = category ? inCategory(category.slug) : page.photos;
  const cards = category?.layout === "cards" ? worksIn(category.slug) : undefined;

  // Categoria vazia não aparece nos filtros (a não ser que seja a aberta).
  const filters = [
    { label: page.allLabel, href: WORK_PATH, count: page.photos.length, active: !category },
    ...page.categories.map((item) => ({
      label: item.title,
      href: categoryHref(item.slug),
      count: countOf(item),
      active: item.slug === category?.slug,
    })),
  ].filter((filter) => filter.count > 0 || filter.active);

  return (
    <>
      <Header brand={content.brand} nav={content.nav} />
      <main>
        <section className={styles.root} data-theme="dark">
          <PageTitle title={category?.title ?? page.title} count={cards ? cards.length : photos.length}>
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

          {cards ? (
            cards.length > 0 ? (
              <WorkCards works={cards} />
            ) : (
              <p className={styles.empty}>{page.empty}</p>
            )
          ) : photos.length > 0 ? (
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
