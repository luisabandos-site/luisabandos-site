import type { Metadata } from "next";
import { getSiteContent } from "@/lib/content";
import { AboutPage } from "@/components/about-page/AboutPage";

export async function generateMetadata(): Promise<Metadata> {
  const { aboutPage } = await getSiteContent();
  return { title: aboutPage.title, description: aboutPage.intro.statement.replaceAll("*", "") };
}

export default async function Sobre() {
  const content = await getSiteContent();
  return <AboutPage content={content} />;
}
