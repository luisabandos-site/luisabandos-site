import type { Metadata } from "next";
import type { Photo, SiteContent } from "@/content/types";
import { ogImage } from "@/lib/sanity/image";

/**
 * Endereço oficial do site. O Google e as prévias de link sempre apontam para
 * ele, mesmo quando a página é aberta por outro endereço (ex.: o da Vercel).
 */
export const SITE_URL = "https://luisabandos.com";

/** Endereço completo de uma foto (as locais vêm sem o domínio). */
const absolute = (src: string) => new URL(src, SITE_URL).href;

/** "Luísa Bandos" → "Luisa Bandos", para quem busca sem acento. */
const withoutAccents = (value: string) => value.normalize("NFD").replace(/\p{Diacritic}/gu, "");

/** Foto da prévia de compartilhamento: a escolhida no painel ou a primeira do topo. */
export const shareImage = (content: SiteContent): Photo | undefined => content.seo.image ?? content.hero.images[0];

type Page = {
  /** Sem título = home (usa o título completo do painel). */
  title?: string;
  description?: string;
  /** Endereço oficial da página (canonical). Só o padrão do layout fica sem. */
  path?: string;
  image?: Photo;
};

/** Título, descrição, endereço oficial e prévia de compartilhamento de uma página. */
export function pageMetadata(content: SiteContent, { title, description, path, image }: Page): Metadata {
  const fullTitle = title ? `${title} — ${content.hero.name}` : content.seo.title;
  const text = description || content.seo.description;
  const photo = image ?? shareImage(content);
  const images = photo ? [ogImage(photo)] : [];
  return {
    title: title ?? { absolute: content.seo.title },
    description: text,
    ...(path ? { alternates: { canonical: path } } : {}),
    openGraph: {
      type: "website",
      locale: "pt_BR",
      siteName: content.hero.name,
      url: path,
      title: fullTitle,
      description: text,
      images,
    },
    twitter: { card: "summary_large_image", title: fullTitle, description: text, images },
  };
}

/** Links que são perfis da Luísa (Instagram, Behance…), não e-mail, WhatsApp ou link vazio. */
function profiles(content: SiteContent) {
  const links = [...content.hero.socials, ...content.contact.channels.flatMap((channel) => channel.items)];
  const urls = links.flatMap(({ href }) => {
    try {
      const url = new URL(href);
      const isProfile = url.protocol === "https:" && url.pathname.replace(/\/+$/, "") !== "" && url.hostname !== "wa.me";
      return isProfile ? [url.href] : [];
    } catch {
      return [];
    }
  });
  return [...new Set(urls)];
}

/** Ficha da Luísa para o Google (dados estruturados schema.org). */
function person(content: SiteContent) {
  const name = content.hero.name;
  const plain = withoutAccents(name);
  return {
    "@type": "Person",
    "@id": `${SITE_URL}/#pessoa`,
    name,
    ...(plain !== name ? { alternateName: plain } : {}),
    url: `${SITE_URL}/`,
    image: absolute(content.about.portrait.src),
    jobTitle: content.hero.roles.map((role) => role.replace(/[,.;]+$/, "").trim()).filter(Boolean),
    description: content.seo.description,
    ...(content.about.location ? { homeLocation: { "@type": "Place", name: content.about.location } } : {}),
    sameAs: profiles(content),
  };
}

/** Home: o site e a pessoa (o Google usa o nome do site nos resultados). */
export function homeJsonLd(content: SiteContent) {
  const name = content.hero.name;
  const plain = withoutAccents(name);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#site`,
        url: `${SITE_URL}/`,
        name,
        ...(plain !== name ? { alternateName: plain } : {}),
        inLanguage: "pt-BR",
        about: { "@id": `${SITE_URL}/#pessoa` },
      },
      person(content),
    ],
  };
}

/** Sobre mim: página de perfil da pessoa. */
export function aboutJsonLd(content: SiteContent) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: `${SITE_URL}/sobre`,
    inLanguage: "pt-BR",
    mainEntity: person(content),
  };
}

/** Endereços das fotos de uma página, para o Google Imagens. */
export const imageUrls = (photos: Photo[]) => photos.map((photo) => absolute(photo.src));
