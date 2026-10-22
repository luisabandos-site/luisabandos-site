import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSiteContent } from "@/lib/content";
import { ProjectsPage } from "@/components/projects-page/ProjectsPage";

type Props = { params: Promise<{ categoria: string }> };

// Uma página pronta para cada categoria. Uma categoria criada depois no
// painel ganha a sua na primeira visita; endereços que não existem dão 404.
export const dynamicParams = true;

export async function generateStaticParams() {
  const { projectsPage } = await getSiteContent();
  return projectsPage.categories.map((category) => ({ categoria: category.slug }));
}

async function findCategory(params: Props["params"]) {
  const { categoria } = await params;
  const content = await getSiteContent();
  const category = content.projectsPage.categories.find((item) => item.slug === categoria);
  if (!category) notFound();
  return { content, category };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { content, category } = await findCategory(params);
  return { title: `${category.title} · ${content.projectsPage.title}`, description: category.description };
}

export default async function ProjetosCategoria({ params }: Props) {
  const { content, category } = await findCategory(params);
  return <ProjectsPage content={content} category={category} />;
}
