import type { Metadata } from "next";
import { getSiteContent } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { ProjectsPage } from "@/components/projects-page/ProjectsPage";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  const { title, description } = content.projectsPage;
  return pageMetadata(content, { title, description, path: "/projetos" });
}

export default async function Projetos() {
  const content = await getSiteContent();
  return <ProjectsPage content={content} />;
}
