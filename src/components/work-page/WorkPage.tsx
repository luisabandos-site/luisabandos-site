import type { SiteContent, Work } from "@/content/types";
import { Header } from "../Header";
import { PageTitle } from "../PageTitle";
import { Contact } from "../Contact";
import { Cursor } from "../Cursor";
import { Reveal } from "../Reveal";
import { withEmphasis } from "../emphasis";
import { ProjectsGallery } from "../projects-page/ProjectsGallery";
import { WorkFilters } from "../projects-page/WorkFilters";
import { VideoEmbed } from "./VideoEmbed";
import styles from "./WorkPage.module.css";

type Props = { content: SiteContent; work: Work };

const isExternal = (href: string) => /^https?:\/\//.test(href);

/** Texto curto fica numa coluna só; a partir disso, em duas, como a bio do Sobre mim. */
const TWO_COLUMNS_FROM = 400;

/**
 * Página de um projeto ou filme, com a estrutura da página Trabalho: título
 * gigante (com a função embaixo e a ficha à direita, como o Sobre mim), filtros (com a categoria do projeto marcada), texto (opcional),
 * vídeo (opcional) e a galeria.
 */
export function WorkPage({ content, work }: Props) {
  const { link, text } = work;
  const twoColumns = text.join(" ").length >= TWO_COLUMNS_FROM;

  return (
    <>
      <Header brand={content.brand} nav={content.nav} />
      <main>
        <article className={styles.root} data-theme="dark">
          <PageTitle title={work.title} subtitle={work.role} count={work.photos.length} align="right" wrap>
            {work.credits.length > 0 && work.credits.map((line) => <p key={line}>{line}</p>)}
          </PageTitle>

          <WorkFilters page={content.projectsPage} active={work.category} current="location" />

          {(text.length > 0 || link) && (
            <div className={styles.intro}>
              {text.length > 0 && (
                <Reveal className={twoColumns ? `${styles.text} ${styles.twoColumns}` : styles.text}>
                  {text.map((paragraph, i) => (
                    <p key={i}>{withEmphasis(paragraph)}</p>
                  ))}
                </Reveal>
              )}
              {link && (
                <Reveal className={styles.linkRow} delay={0.1}>
                  <a
                    href={link.href}
                    className={styles.link}
                    {...(isExternal(link.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {link.label || link.href}
                    <span aria-hidden="true">→</span>
                  </a>
                </Reveal>
              )}
            </div>
          )}

          {work.video && <VideoEmbed url={work.video} title={work.title} />}

          {work.photos.length > 0 && <ProjectsGallery photos={work.photos} loadMore={content.projectsPage.loadMore} />}
        </article>
        <Contact contact={content.contact} footer={content.footer} name={content.hero.name} />
      </main>
      <Cursor />
    </>
  );
}
