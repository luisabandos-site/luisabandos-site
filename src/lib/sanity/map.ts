import type { Category, Link, Photo, SiteContent, Work } from "@/content/types";
import { categoryHref, workHref } from "@/lib/routes";
import type { SanityPhoto, SanityPicture, SiteQueryResult } from "./query";

/**
 * Converte o que vem do painel para o formato que os componentes usam
 * (`SiteContent`). Uma página que ainda não existe no painel usa o conteúdo
 * local (`fallback`), para o site nunca ficar vazio.
 */

const pct = (value: number) => `${Math.round(Math.min(1, Math.max(0, value)) * 1000) / 10}%`;

/** "2025:11:03 21:14:00" ou "2025-11-03T…" → "2025-11". */
const monthOf = (value?: string) => {
  const match = value?.match(/^(\d{4})[:-](\d{2})/);
  return match ? `${match[1]}-${match[2]}` : "";
};

const text = (value?: string) => value ?? "";

/** Proporção das capas quando todos os cards de uma categoria têm o mesmo tamanho. */
const CARD_RATIO = "16 / 9";

/** Texto com uma linha em branco entre os parágrafos → lista de parágrafos. */
const paragraphs = (value?: string) =>
  (value ?? "")
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
const link = (value?: { label?: string; href?: string }): Link => ({ label: text(value?.label), href: text(value?.href) });

/** Foto do painel → Photo. Aplica o recorte e o ponto de foco escolhidos no painel. */
function toPhoto(image: SanityPicture | undefined, id: string, extra: Partial<Photo> = {}): Photo | null {
  const asset = image?.asset;
  const size = asset?.metadata?.dimensions;
  if (!image || !asset?.url || !size) return null;

  const crop = image.crop ?? { top: 0, bottom: 0, left: 0, right: 0 };
  const cropW = 1 - crop.left - crop.right;
  const cropH = 1 - crop.top - crop.bottom;
  const width = Math.round(size.width * cropW);
  const height = Math.round(size.height * cropH);
  const cropped = width !== size.width || height !== size.height;
  const rect = `${Math.round(size.width * crop.left)},${Math.round(size.height * crop.top)},${width},${height}`;

  return {
    id,
    src: cropped ? `${asset.url}?rect=${rect}` : asset.url,
    width,
    height,
    alt: text(image.alt),
    title: "",
    location: "",
    date: monthOf(asset.metadata?.taken),
    color: asset.metadata?.color,
    blur: asset.metadata?.lqip,
    focus: image.hotspot
      ? `${pct((image.hotspot.x - crop.left) / cropW)} ${pct((image.hotspot.y - crop.top) / cropH)}`
      : undefined,
    ...extra,
  };
}

/** Aceita só o código ou a tag inteira do Search Console (<meta … content="código" />). */
const verificationCode = (value?: string) => value?.match(/content=["']([^"']+)["']/)?.[1] ?? (value?.trim() || undefined);

/** Ficha de um filme: "Direção (ano)" e "formato • gênero • duração", pulando o que estiver vazio. */
function credits(work: SiteQueryResult["works"][number]) {
  const direction = text(work.direction).trim();
  const year = work.year ? String(work.year) : "";
  return [
    direction && year ? `${direction} (${year})` : direction || year,
    [work.format, work.genre, work.duration]
      .map((value) => text(value).trim())
      .filter(Boolean)
      .join(" • "),
  ].filter(Boolean);
}

/** Foto de uma categoria ou, com `work`, de um projeto ou filme dela. */
function toPortfolioPhoto(
  image: SanityPhoto,
  category: Category,
  name: string,
  work?: { slug: string; title: string; href: string },
): Photo | null {
  const id = [category.slug, work?.slug, image._key].filter(Boolean).join("-");
  const photo = toPhoto(image, id, { category, ...(work ? { work: { title: work.title, href: work.href } } : {}) });
  if (!photo) return null;
  photo.title = text(image.title);
  photo.location = text(image.location);
  photo.date = monthOf(image.date) || photo.date;
  photo.alt ||= [image.title, image.location].filter(Boolean).join(", ") || `Foto de ${name}`;
  return photo;
}

/**
 * Mistura as fotos de várias categorias espalhando cada uma por igual
 * (uma categoria grande não fica toda no fim). Dentro de cada categoria, a
 * ordem do painel é mantida.
 */
export function mix(groups: Photo[][]): Photo[] {
  return groups
    .flatMap((photos, group) => photos.map((photo, i) => ({ photo, group, key: (i + 0.5) / photos.length })))
    .sort((a, b) => a.key - b.key || a.group - b.group)
    .map(({ photo }) => photo);
}

export function toSiteContent(data: SiteQueryResult | null, fallback: SiteContent): SiteContent {
  if (!data) return fallback;
  const { settings, home, projectsPage, aboutPage } = data;
  const name = home?.name || fallback.hero.name;

  type Entry = { image: SanityPhoto; photo: Photo };
  const portfolio = (
    images: SanityPhoto[] | null | undefined,
    category: Category,
    work?: { slug: string; title: string; href: string },
  ) =>
    (images ?? [])
      .map((image) => ({ image, photo: toPortfolioPhoto(image, category, name, work) }))
      .filter((entry): entry is Entry => entry.photo !== null);

  const categories = data.categories.map((item) => {
    const category: Category = {
      slug: item.slug,
      title: text(item.title),
      description: text(item.description),
      layout: item.layout === "cards" ? "cards" : "photos",
    };
    // Cards do mesmo tamanho, como pediu o felipe (capas em 16:9, a do "Epitáfio").
    if (category.layout === "cards" && item.cardShape !== "free") category.cardRatio = CARD_RATIO;
    // Categoria em cards: as fotos são as dos projetos ou filmes dela.
    const works = (data.works ?? [])
      .filter((work) => category.layout === "cards" && work.category === item.slug)
      .map((work) => {
        const href = workHref(category.slug, work.slug);
        const title = text(work.title);
        const photos = portfolio(work.photos, category, { slug: work.slug, title, href });
        const value: Work = {
          slug: work.slug,
          title,
          category,
          role: text(work.role).trim() || undefined,
          credits: credits(work),
          cover: toPhoto(work.cover ?? undefined, `${category.slug}-${work.slug}-capa`, { alt: work.cover?.alt || title }) ??
            photos[0]?.photo,
          text: paragraphs(work.text),
          link: work.link?.href ? link(work.link) : undefined,
          video: work.video || undefined,
          photos: photos.map(({ photo }) => photo),
        };
        return { work: value, photos };
      });
    const photos = category.layout === "cards" ? works.flatMap((entry) => entry.photos) : portfolio(item.photos, category);
    return { category, tags: item.tags ?? [], photos, works: works.map((entry) => entry.work) };
  });
  const allPhotos = mix(categories.map(({ photos }) => photos.map(({ photo }) => photo)));
  const homePhotos = mix(
    categories.map(({ photos }) => photos.filter(({ image }) => image.showOnHome).map(({ photo }) => photo)),
  );

  const content: SiteContent = { ...fallback };

  if (settings) {
    content.brand = settings.brand || fallback.brand;
    content.nav = [
      { label: settings.nav?.home || "Home", href: "/" },
      { label: settings.nav?.projects || "Trabalho", href: "/trabalho" },
      { label: settings.nav?.about || "Sobre mim", href: "/sobre" },
    ];
    content.seo = {
      title: settings.seo?.title || fallback.seo.title,
      description: settings.seo?.description || fallback.seo.description,
      image: toPhoto(settings.seo?.image, "compartilhar") ?? undefined,
      googleVerification: verificationCode(settings.seo?.googleVerification),
    };
    content.contact = {
      label: text(settings.contact?.label),
      headline: text(settings.contact?.headline),
      cta: link(settings.contact?.cta),
      channels: (settings.contact?.channels ?? []).map((channel) => ({
        label: text(channel.label),
        items: (channel.items ?? []).map(link),
      })),
    };
    content.footer = {
      copyright: text(settings.footer?.copyright),
      tagline: text(settings.footer?.tagline),
      backToTop: settings.footer?.backToTop || fallback.footer.backToTop,
    };
  }

  if (home) {
    const heroImages = (home.heroImages ?? [])
      .map((image, i) => toPhoto(image, `topo-${image._key ?? i}`))
      .filter((photo): photo is Photo => photo !== null)
      .map((photo) => ({ ...photo, alt: photo.alt || name }));
    content.hero = {
      name,
      // Sem foto no painel, o topo continua com as de antes.
      images: heroImages.length ? heroImages : fallback.hero.images,
      roles: home.roles ?? [],
      socials: (home.socials ?? []).map(link),
    };
    content.about = {
      label: text(home.about?.label),
      manifesto: text(home.about?.manifesto),
      bio: text(home.about?.bio),
      location: text(home.about?.location),
      portrait: toPhoto(home.about?.portrait, "retrato", { alt: home.about?.portrait?.alt || name }) ?? fallback.about.portrait,
    };
    content.projects = { label: text(home.projects?.label), photos: homePhotos };
    content.services = {
      label: text(home.services?.label),
      cta: text(home.services?.cta),
      items: categories.map(({ category, tags, photos, works }) => ({
        slug: category.slug,
        title: category.title,
        tags,
        href: categoryHref(category.slug),
        // Categoria em cards: as capas dos projetos ou filmes e, se faltar, fotos deles.
        preview:
          category.layout === "cards"
            ? [
                ...new Map(
                  [...works.flatMap((work) => (work.cover ? [work.cover] : [])), ...works.flatMap((work) => work.photos)].map(
                    (photo) => [photo.src, photo],
                  ),
                ).values(),
              ].slice(0, 2)
            : photos.slice(0, 2).map(({ photo }) => photo),
      })),
    };
  }

  if (projectsPage) {
    content.projectsPage = {
      title: projectsPage.title || fallback.projectsPage.title,
      description: text(projectsPage.description),
      allLabel: projectsPage.allLabel || fallback.projectsPage.allLabel,
      loadMore: projectsPage.loadMore || fallback.projectsPage.loadMore,
      empty: text(projectsPage.empty),
      categories: categories.map(({ category }) => category),
      photos: allPhotos,
      works: categories.flatMap(({ works }) => works),
    };
  }

  if (aboutPage) {
    const intro = aboutPage.intro;
    content.aboutPage = {
      title: aboutPage.title || fallback.aboutPage.title,
      location: aboutPage.location ?? [],
      intro: {
        label: text(intro?.label),
        statement: text(intro?.statement),
        bio: intro?.bio ?? [],
        portrait: toPhoto(intro?.portrait, "retrato", { alt: intro?.portrait?.alt || name }) ?? fallback.aboutPage.intro.portrait,
      },
      skills: {
        label: text(aboutPage.skills?.label),
        items: (aboutPage.skills?.items ?? []).map((item) => ({ title: text(item.title), items: item.items ?? [] })),
      },
      timeline: {
        label: text(aboutPage.timeline?.label),
        years: (aboutPage.timeline?.years ?? []).map((year) => ({
          year: text(year.year),
          items: (year.items ?? []).map((item) => ({ name: text(item.name), type: text(item.type), role: text(item.role) })),
        })),
      },
    };
  }

  return content;
}
