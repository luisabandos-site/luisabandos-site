import type { Category, SiteContent } from "@/content/types";
import { Header } from "../Header";
import { PageTitle } from "../PageTitle";
import { Contact } from "../Contact";
import { Cursor } from "../Cursor";
import { ProjectsGallery } from "./ProjectsGallery";
import { WorkCards } from "./WorkCards";
import { WorkFilters } from "./WorkFilters";
import styles from "./ProjectsPage.module.css";

type Props = {
  content: SiteContent;
  /** Filtro ativo; sem ele, mostra todas as fotos. */
  category?: Category;
};

/**
 * Página Trabalho, com todas as fotos ou uma categoria filtrada. Uma categoria
 * em cards (Projetos, Audiovisual) mostra os cards em vez das fotos.
 */
export function ProjectsPage({ content, category }: Props) {
  const page = content.projectsPage;
  const photos = category ? page.photos.filter((photo) => photo.category?.slug === category.slug) : page.photos;
  const cards = category?.layout === "cards" ? page.works.filter((work) => work.category.slug === category.slug) : undefined;

  return (
    <>
      <Header brand={content.brand} nav={content.nav} />
      <main>
        <section className={styles.root} data-theme="dark">
          <PageTitle title={category?.title ?? page.title} count={cards ? cards.length : photos.length}>
            <p>{category?.description ?? page.description}</p>
          </PageTitle>

          <WorkFilters page={page} active={category} />

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
