import type { Photo, SiteContent } from "@/content/types";
import { desktopGallery, mobileGallery } from "@/lib/masonry";
import { ZoomablePhoto } from "./lightbox/ZoomablePhoto";
import { Reveal } from "./Reveal";
import styles from "./Projects.module.css";

export function Projects({ projects }: { projects: SiteContent["projects"] }) {
  const { photos } = projects;
  const desktop = desktopGallery(photos);
  const mobile = mobileGallery(photos);

  const item = (photo: Photo, sizes: string) => (
    <Reveal key={photo.id} variant="unveil">
      <ZoomablePhoto photo={photo} group={photos} sizes={sizes} />
    </Reveal>
  );

  return (
    <section id="projetos" className={styles.root} data-theme="dark" aria-labelledby="projetos-titulo">
      <h2 id="projetos-titulo" className="label">
        {projects.label}
      </h2>

      <div className={styles.desktop}>
        <div className={styles.column}>{desktop.left.map((p) => item(p, "34vw"))}</div>
        <div className={styles.right}>
          {desktop.wide && item(desktop.wide, "62vw")}
          <div className={styles.subcolumns}>
            <div className={styles.column}>{desktop.middle.map((p) => item(p, "33vw"))}</div>
            <div className={styles.column}>{desktop.right.map((p) => item(p, "28vw"))}</div>
          </div>
        </div>
      </div>

      <div className={styles.mobile}>
        {mobile.first && item(mobile.first, "100vw")}
        <div className={styles.mobileColumns}>
          {mobile.columns.map((column, i) => (
            <div key={i} className={styles.column}>
              {column.map((p) => item(p, "50vw"))}
            </div>
          ))}
        </div>
        {mobile.last.map((p) => item(p, "100vw"))}
      </div>
    </section>
  );
}
