import type { SiteContent, Work } from "@/content/types";
import { categoryHref } from "@/lib/routes";
import { Header } from "../Header";
import { Contact } from "../Contact";
import { Cursor } from "../Cursor";
import { Reveal } from "../Reveal";
import { withEmphasis } from "../emphasis";
import { ProjectsGallery } from "../projects-page/ProjectsGallery";
import { BackLink } from "./BackLink";
import { VideoEmbed } from "./VideoEmbed";
import styles from "./WorkPage.module.css";

type Props = { content: SiteContent; work: Work };

const isExternal = (href: string) => /^https?:\/\//.test(href);

/**
 * Página de um projeto ou filme: nome dentro de uma elipse, texto
 * centralizado (opcional), link, vídeo e a galeria de fotos.
 */
export function WorkPage({ content, work }: Props) {
  const { link } = work;

  return (
    <>
      <Header brand={content.brand} nav={content.nav} />
      <main>
        <article className={styles.root} data-theme="dark">
          <BackLink href={categoryHref(work.category.slug)} label={work.category.title} />

          <header className={styles.intro}>
            <Reveal>
              <h1 className={styles.title}>
                <span className={styles.oval}>{work.title}</span>
              </h1>
            </Reveal>

            {work.text.length > 0 && (
              <Reveal className={styles.text} delay={0.1}>
                {work.text.map((paragraph, i) => (
                  <p key={i}>{withEmphasis(paragraph)}</p>
                ))}
              </Reveal>
            )}

            {link && (
              <Reveal delay={0.15}>
                <a
                  href={link.href}
                  className={styles.link}
                  {...(isExternal(link.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {link.label || link.href}
                </a>
              </Reveal>
            )}
          </header>

          {work.video && <VideoEmbed url={work.video} title={work.title} />}

          {work.photos.length > 0 && <ProjectsGallery photos={work.photos} loadMore={content.projectsPage.loadMore} />}
        </article>
        <Contact contact={content.contact} footer={content.footer} name={content.hero.name} />
      </main>
      <Cursor />
    </>
  );
}
