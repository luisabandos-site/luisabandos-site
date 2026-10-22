import type { Metadata } from "next";
import { getSiteContent } from "@/lib/content";
import { ProjectsPage } from "@/components/projects-page/ProjectsPage";

export async function generateMetadata(): Promise<Metadata> {
  const { projectsPage } = await getSiteContent();
  return { title: projectsPage.title, description: projectsPage.description };
}

export default async function Projetos() {
  const content = await getSiteContent();
  return <ProjectsPage content={content} />;
}
