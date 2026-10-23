import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSiteContent } from "@/lib/content";
import { excerpt, pageMetadata } from "@/lib/seo";
import { workHref } from "@/lib/routes";
import { WorkPage } from "@/components/work-page/WorkPage";

type Props = { params: Promise<{ categoria: string; item: string }> };

// Uma página pronta para cada projeto ou filme. Um novo no painel ganha a
// sua na primeira visita; endereços que não existem dão 404.
export const dynamicParams = true;

export async function generateStaticParams() {
  const { projectsPage } = await getSiteContent();
  return projectsPage.works.map((work) => ({ categoria: work.category.slug, item: work.slug }));
}

async function findWork(params: Props["params"]) {
  const { categoria, item } = await params;
  const content = await getSiteContent();
  const work = content.projectsPage.works.find((entry) => entry.category.slug === categoria && entry.slug === item);
  if (!work) notFound();
  return { content, work };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { content, work } = await findWork(params);
  return pageMetadata(content, {
    title: `${work.title} · ${work.category.title}`,
    description: excerpt(work.text.join(" ")) || work.category.description,
    path: workHref(work.category.slug, work.slug),
    image: work.cover,
  });
}

export default async function TrabalhoItem({ params }: Props) {
  const { content, work } = await findWork(params);
  return <WorkPage content={content} work={work} />;
}
