/** Dados de cada foto: endereço, tamanho, prévia borrada, cor e data da câmera. */
const asset = `asset->{
  url,
  metadata {
    dimensions { width, height },
    lqip,
    "color": palette.dominant.background,
    "taken": exif.DateTimeOriginal
  }
}`;

const picture = `alt, crop, hotspot, ${asset}`;

const photo = `_key, title, location, date, showOnHome, ${picture}`;

/** Todo o conteúdo do site numa consulta só (só o que está publicado). */
export const siteQuery = `{
  "settings": *[_id == "settings"][0]{
    ...,
    seo { ..., image { ${picture} } }
  },
  "home": *[_id == "home"][0]{
    ...,
    heroImages[defined(asset)]{ _key, ${picture} },
    about { ..., portrait { ${picture} } }
  },
  "projectsPage": *[_id == "projectsPage"][0],
  "aboutPage": *[_id == "aboutPage"][0]{
    ...,
    intro { ..., portrait { ${picture} } }
  },
  "categories": *[_type == "category" && defined(slug.current)] | order(coalesce(order, 999) asc, _createdAt asc) {
    title,
    "slug": slug.current,
    description,
    layout,
    cardShape,
    tags,
    "photos": photos[defined(asset)]{ ${photo} }
  },
  "works": *[_type == "project" && defined(slug.current) && defined(category->slug.current)] | order(coalesce(order, 999) asc, _createdAt desc) {
    title,
    "slug": slug.current,
    "category": category->slug.current,
    role,
    direction,
    year,
    format,
    genre,
    duration,
    cover { ${picture} },
    text,
    link,
    video,
    "photos": photos[defined(asset)]{ ${photo} }
  }
}`;

type Crop = { top: number; bottom: number; left: number; right: number };

export type SanityPicture = {
  _key?: string;
  alt?: string;
  crop?: Crop;
  hotspot?: { x: number; y: number };
  asset?: {
    url: string;
    metadata?: {
      dimensions?: { width: number; height: number };
      lqip?: string;
      color?: string;
      taken?: string;
    };
  };
};

export type SanityPhoto = SanityPicture & {
  _key: string;
  title?: string;
  location?: string;
  date?: string;
  showOnHome?: boolean;
};

type LinkValue = { label?: string; href?: string };

/** O que a consulta devolve. Campos não preenchidos no painel vêm vazios. */
export type SiteQueryResult = {
  settings: {
    brand?: string;
    nav?: { home?: string; projects?: string; about?: string };
    contact?: {
      label?: string;
      headline?: string;
      cta?: LinkValue;
      channels?: { label?: string; items?: LinkValue[] }[];
    };
    footer?: { copyright?: string; tagline?: string; backToTop?: string };
    seo?: { title?: string; description?: string; image?: SanityPicture; googleVerification?: string };
  } | null;
  home: {
    name?: string;
    heroImages?: SanityPicture[];
    roles?: string[];
    socials?: LinkValue[];
    about?: { label?: string; manifesto?: string; bio?: string; location?: string; portrait?: SanityPicture };
    projects?: { label?: string };
    services?: { label?: string; cta?: string };
  } | null;
  projectsPage: {
    title?: string;
    description?: string;
    allLabel?: string;
    loadMore?: string;
    empty?: string;
  } | null;
  aboutPage: {
    title?: string;
    location?: string[];
    intro?: { label?: string; statement?: string; bio?: string[]; portrait?: SanityPicture };
    skills?: { label?: string; items?: { title?: string; items?: string[] }[] };
    timeline?: {
      label?: string;
      years?: { year?: string; items?: { name?: string; type?: string; role?: string }[] }[];
    };
  } | null;
  categories: {
    title?: string;
    slug: string;
    description?: string;
    layout?: "photos" | "cards";
    cardShape?: "film" | "free";
    tags?: string[];
    photos?: SanityPhoto[] | null;
  }[];
  works: {
    title?: string;
    slug: string;
    category: string;
    role?: string;
    direction?: string;
    year?: number;
    format?: string;
    genre?: string;
    duration?: string;
    cover?: SanityPicture | null;
    text?: string;
    link?: LinkValue;
    video?: string;
    photos?: SanityPhoto[] | null;
  }[];
};
