import type { Metadata } from "next";
import { getSiteContent } from "@/lib/content";
import { aboutJsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { AboutPage } from "@/components/about-page/AboutPage";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  const { title, intro } = content.aboutPage;
  return pageMetadata(content, { title, description: intro.statement.replaceAll("*", ""), path: "/sobre" });
}

export default async function Sobre() {
  const content = await getSiteContent();
  return (
    <>
      <JsonLd data={aboutJsonLd(content)} />
      <AboutPage content={content} />
    </>
  );
}
