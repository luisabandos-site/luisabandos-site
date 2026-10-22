import type { Link, Photo, SiteContent } from "@/content/types";

/**
 * Monta os documentos do painel a partir do conteúdo que hoje está nos
 * arquivos do site (`src/content`). Usado uma vez, pelo botão "Importar
 * conteúdo atual" do painel.
 */

/** Foto que precisa subir para o painel. `file` é o endereço do arquivo no site. */
export type Upload = { id: string; file: string };

type Ref = { _type: "reference"; _ref: string };
type ImageValue = {
  _type: string;
  _key?: string;
  asset: Ref;
  hotspot?: { _type: "sanity.imageHotspot"; x: number; y: number; width: number; height: number };
  [field: string]: unknown;
};
export type SanityDocument = { _id: string; _type: string; [field: string]: unknown };

/** No site, a home usava um recorte desta foto; no painel ela vale a original. */
const homeAliases: Record<string, string> = { "retrato-torre": "retrato-entardecer" };

/** Todas as fotos usadas em algum lugar, uma vez cada. */
export function uploadsFor(site: SiteContent): Upload[] {
  const all = [
    ...site.projectsPage.photos,
    ...site.hero.images,
    site.about.portrait,
    site.aboutPage.intro.portrait,
  ];
  const seen = new Map<string, Upload>();
  for (const photo of all) if (!seen.has(photo.src)) seen.set(photo.src, { id: photo.id, file: photo.src });
  return [...seen.values()];
}

/** "46% 85%" → ponto de foco do Sanity. */
function hotspot(focus?: string): ImageValue["hotspot"] {
  const match = focus?.match(/^([\d.]+)%\s+([\d.]+)%$/);
  if (!match) return undefined;
  return { _type: "sanity.imageHotspot", x: Number(match[1]) / 100, y: Number(match[2]) / 100, width: 0.3, height: 0.3 };
}

const keyed = <T extends object>(items: T[], type?: string) =>
  items.map((item, i) => ({ _key: `k${i}`, ...(type ? { _type: type } : {}), ...item }));

const links = (items: Link[]) => keyed(items, "link");

/**
 * @param assets endereço do arquivo no site → id da foto já enviada ao painel
 */
export function buildDocuments(site: SiteContent, assets: Map<string, string>): SanityDocument[] {
  const asset = (photo: Photo): Ref => {
    const id = assets.get(photo.src);
    if (!id) throw new Error(`Foto não enviada: ${photo.id}`);
    return { _type: "reference", _ref: id };
  };
  const picture = (photo: Photo, key?: string): ImageValue => ({
    _type: "picture",
    ...(key ? { _key: key } : {}),
    asset: asset(photo),
    hotspot: hotspot(photo.focus),
    alt: photo.alt,
  });

  const onHome = new Set(site.projects.photos.map((photo) => homeAliases[photo.id] ?? photo.id));
  const tags = new Map(site.services.items.map((service) => [service.slug, service.tags]));

  const categories = site.projectsPage.categories.map((category, i) => ({
    _id: `category-${category.slug}`,
    _type: "category",
    title: category.title,
    slug: { _type: "slug", current: category.slug },
    order: i + 1,
    description: category.description,
    tags: tags.get(category.slug) ?? [],
    photos: site.projectsPage.photos
      .filter((photo) => photo.category?.slug === category.slug)
      .map(
        (photo): ImageValue => ({
          _type: "photo",
          _key: photo.id,
          asset: asset(photo),
          hotspot: hotspot(photo.focus),
          showOnHome: onHome.has(photo.id),
          title: photo.title,
          location: photo.location,
          // O painel guarda dia, mês e ano; o site mostra mês e ano.
          date: photo.date.length === 7 ? `${photo.date}-01` : photo.date,
          alt: photo.alt,
        }),
      ),
  }));

  const navLabel = (href: string) => site.nav.find((item) => item.href === href)?.label;

  return [
    ...categories,
    {
      _id: "home",
      _type: "home",
      name: site.hero.name,
      heroImages: site.hero.images.map((photo, i) => picture(photo, `k${i}`)),
      roles: site.hero.roles,
      socials: links(site.hero.socials),
      about: {
        label: site.about.label,
        manifesto: site.about.manifesto,
        bio: site.about.bio,
        location: site.about.location,
        portrait: picture(site.about.portrait),
      },
      projects: { label: site.projects.label },
      services: { label: site.services.label, cta: site.services.cta },
    },
    {
      _id: "projectsPage",
      _type: "projectsPage",
      title: site.projectsPage.title,
      description: site.projectsPage.description,
      allLabel: site.projectsPage.allLabel,
      loadMore: site.projectsPage.loadMore,
      empty: site.projectsPage.empty,
    },
    {
      _id: "aboutPage",
      _type: "aboutPage",
      title: site.aboutPage.title,
      location: site.aboutPage.location,
      intro: {
        label: site.aboutPage.intro.label,
        statement: site.aboutPage.intro.statement,
        bio: site.aboutPage.intro.bio,
        portrait: picture(site.aboutPage.intro.portrait),
      },
      skills: { label: site.aboutPage.skills.label, items: keyed(site.aboutPage.skills.items, "skill") },
      timeline: {
        label: site.aboutPage.timeline.label,
        years: keyed(
          site.aboutPage.timeline.years.map((year) => ({ year: year.year, items: keyed(year.items, "work") })),
          "year",
        ),
      },
    },
    {
      _id: "settings",
      _type: "settings",
      brand: site.brand,
      nav: { home: navLabel("/"), projects: navLabel("/projetos"), about: navLabel("/sobre") },
      contact: {
        label: site.contact.label,
        headline: site.contact.headline,
        cta: { _type: "link", ...site.contact.cta },
        channels: keyed(
          site.contact.channels.map((channel) => ({ label: channel.label, items: links(channel.items) })),
          "channel",
        ),
      },
      footer: site.footer,
      seo: site.seo,
    },
  ];
}
