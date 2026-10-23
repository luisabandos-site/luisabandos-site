import type { MetadataRoute } from "next";
import { getSiteContent } from "@/lib/content";
import { imageUrls, SITE_URL } from "@/lib/seo";
import { categoryHref, WORK_PATH, workHref } from "@/lib/routes";

/**
 * Lista de páginas para o Google (luisabandos.com/sitemap.xml), com as fotos
 * de cada uma para aparecerem no Google Imagens. Uma categoria, projeto ou
 * filme novo no painel entra sozinho; categoria vazia fica de fora.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getSiteContent();
  const { categories, photos, works } = content.projectsPage;
  const page = (path: string, images: string[] = []) => ({ url: `${SITE_URL}${path}`, images });

  return [
    page("/", imageUrls([...content.hero.images, ...content.projects.photos])),
    page(WORK_PATH, imageUrls(photos)),
    ...categories.flatMap((category) => {
      const own = photos.filter((photo) => photo.category?.slug === category.slug);
      const cards = works.filter((work) => work.category.slug === category.slug);
      const covers = cards.flatMap((work) => (work.cover ? [work.cover] : []));
      return own.length || cards.length
        ? [page(categoryHref(category.slug), imageUrls(category.layout === "cards" ? covers : own))]
        : [];
    }),
    ...works.map((work) => page(workHref(work.category.slug, work.slug), imageUrls(work.photos))),
    page("/sobre", imageUrls([content.aboutPage.intro.portrait])),
  ];
}
