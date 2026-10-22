import type { Metadata } from "next";
import { getSiteContent } from "@/lib/content";
import { homeJsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Services } from "@/components/Services";
import { Contact } from "@/components/Contact";
import { Cursor } from "@/components/Cursor";
import styles from "./page.module.css";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(await getSiteContent(), { path: "/" });
}

export default async function Home() {
  const content = await getSiteContent();

  return (
    <>
      <JsonLd data={homeJsonLd(content)} />
      <Header brand={content.brand} nav={content.nav} />
      <main>
        {/* O hero fica preso no topo e o resto da página rola por cima dele. */}
        <div className={styles.heroTrack}>
          <Hero hero={content.hero} />
        </div>
        <div className={styles.over}>
          <About about={content.about} />
          <Projects projects={content.projects} />
          <Services services={content.services} />
          <Contact contact={content.contact} footer={content.footer} name={content.hero.name} />
        </div>
      </main>
      <Cursor />
    </>
  );
}
