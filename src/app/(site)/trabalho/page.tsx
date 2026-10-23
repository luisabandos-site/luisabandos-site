import type { Metadata } from "next";
import { getSiteContent } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { WORK_PATH } from "@/lib/routes";
import { ProjectsPage } from "@/components/projects-page/ProjectsPage";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  const { title, description } = content.projectsPage;
  return pageMetadata(content, { title, description, path: WORK_PATH });
}

export default async function Trabalho() {
  const content = await getSiteContent();
  return <ProjectsPage content={content} />;
}
