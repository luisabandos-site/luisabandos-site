import type { MetadataRoute } from "next";
import { getSiteContent } from "@/lib/content";
import { imageUrls, SITE_URL } from "@/lib/seo";

/**
 * Lista de páginas para o Google (luisabandos.com/sitemap.xml), com as fotos
 * de cada uma para aparecerem no Google Imagens. Uma categoria nova no painel
 * entra sozinha; categoria sem foto fica de fora.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getSiteContent();
  const { categories, photos } = content.projectsPage;
  const page = (path: string, images: string[] = []) => ({ url: `${SITE_URL}${path}`, images });

  return [
    page("/", imageUrls([...content.hero.images, ...content.projects.photos])),
    page("/projetos", imageUrls(photos)),
    ...categories.flatMap((category) => {
      const own = photos.filter((photo) => photo.category?.slug === category.slug);
      return own.length ? [page(`/projetos/${category.slug}`, imageUrls(own))] : [];
    }),
    page("/sobre", imageUrls([content.aboutPage.intro.portrait])),
  ];
}
