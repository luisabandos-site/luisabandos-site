import type { SiteContent } from "@/content/types";
import { Header } from "../Header";
import { PageTitle } from "../PageTitle";
import { Contact } from "../Contact";
import { Cursor } from "../Cursor";
import { Reveal } from "../Reveal";
import { ZoomablePhoto } from "../lightbox/ZoomablePhoto";
import { withEmphasis } from "../emphasis";
import styles from "./AboutPage.module.css";

const portraitSizes = "(max-width: 767px) 100vw, 30vw";

/** Página Sobre mim: quem sou, o que eu faço e trajetória. */
export function AboutPage({ content }: { content: SiteContent }) {
  const { title, location, intro, skills, timeline } = content.aboutPage;

  return (
    <>
      <Header brand={content.brand} nav={content.nav} />
      <main>
        <section className={styles.root} data-theme="light">
          <PageTitle title={title} align="right">
            {location.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </PageTitle>

          <div className={styles.intro}>
            <h2 className={styles.label}>{intro.label}</h2>
            <div className={styles.introGrid}>
              <Reveal className={styles.portrait} variant="unveil">
                <ZoomablePhoto photo={intro.portrait} sizes={portraitSizes} preload />
              </Reveal>
              <Reveal className={styles.statement}>
                <p>{withEmphasis(intro.statement)}</p>
              </Reveal>
              {intro.bio.map((paragraph, i) => (
                <Reveal key={i} className={`${styles.bio} ${i ? styles.bioRight : styles.bioLeft}`} delay={0.1 + i * 0.08}>
                  <p>{paragraph}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <div className={styles.skills}>
            <h2 className={`${styles.label} ${styles.ruled}`}>{skills.label}</h2>
            <div className={styles.skillsGrid}>
              {skills.items.map((skill, i) => (
                <Reveal key={skill.title} delay={i * 0.06}>
                  <h3 className={styles.skillTitle}>{skill.title}</h3>
                  <ul className={styles.skillList}>
                    {skill.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>

          <div className={styles.timeline}>
            <h2 className={styles.label}>{timeline.label}</h2>
            <ol className={styles.years}>
              {timeline.years.map((year) => (
                <li key={year.year} className={styles.year}>
                  <h3 className={styles.yearTitle}>{year.year}</h3>
                  <ul className={styles.items}>
                    {year.items.map((item, i) => (
                      <li key={i} className={styles.item}>
                        <span className={styles.itemName}>{item.name}</span>
                        <span className={styles.itemType}>{item.type}</span>
                        <span className={styles.itemRole}>{item.role}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </section>
        <Contact contact={content.contact} footer={content.footer} name={content.hero.name} />
      </main>
      <Cursor />
    </>
  );
}
