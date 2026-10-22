import type { SiteContent } from "@/content/types";
import { ZoomablePhoto } from "./lightbox/ZoomablePhoto";
import { Manifesto } from "./Manifesto";
import { Reveal } from "./Reveal";
import styles from "./About.module.css";

export function About({ about }: { about: SiteContent["about"] }) {
  return (
    <section id="sobre" className={styles.root} data-theme="light" aria-labelledby="sobre-titulo">
      <h2 id="sobre-titulo" className="label">
        {about.label}
      </h2>
      <Manifesto text={about.manifesto} className={styles.manifesto} />

      <div className={styles.details}>
        <Reveal className={styles.bio}>
          <p>{about.bio}</p>
          <p className={styles.location}>{about.location}</p>
        </Reveal>
        <Reveal className={styles.portrait} variant="unveil" delay={0.1}>
          <ZoomablePhoto photo={about.portrait} sizes="(max-width: 767px) 50vw, 22vw" />
        </Reveal>
      </div>
    </section>
  );
}
