/**
 * Modelo de conteúdo do site.
 *
 * Tudo o que aparece no site (textos e fotos) segue estes tipos. Hoje o
 * conteúdo vem de arquivos locais (`photos.ts` e `site.ts`); quando um CMS
 * (ex.: Sanity) for plugado, ele só precisa devolver objetos neste mesmo
 * formato em `src/lib/content.ts` e nenhum componente precisa mudar.
 */

export type Category = {
  /** Pedaço do endereço: /projetos/<slug>. */
  slug: string;
  title: string;
  /** Texto do topo da página Projetos com este filtro. */
  description: string;
};

export type Photo = {
  id: string;
  /** Endereço da foto: arquivo importado de `src/content/images` ou URL do CMS. */
  src: string;
  width: number;
  height: number;
  /** Texto alternativo para acessibilidade e SEO. */
  alt: string;
  /** Nome da foto, mostrado na tela cheia. */
  title: string;
  /** Lugar onde a foto foi feita. */
  location: string;
  /** Data no formato AAAA-MM ou AAAA-MM-DD. */
  date: string;
  /** Cor média da foto, usada como fundo enquanto ela carrega. */
  color?: string;
  /** Miniatura borrada (data URL) mostrada enquanto a foto carrega. */
  blur?: string;
  /**
   * Ponto da foto que fica sempre à vista quando ela é cortada para caber na
   * tela (CSS object-position, ex.: "50% 80%"). No Sanity, vem do hotspot.
   */
  focus?: string;
  /** Categoria do trabalho (filtro da página Projetos). */
  category?: Category;
};

export type Link = {
  label: string;
  href: string;
};

export type Service = {
  slug: string;
  title: string;
  tags: string[];
  href: string;
  /** Duas fotos que aparecem inclinadas no hover. */
  preview: [Photo, Photo];
};

export type SiteContent = {
  seo: {
    title: string;
    description: string;
    url: string;
  };
  brand: string;
  nav: Link[];
  hero: {
    name: string;
    /** Fotos do topo, que trocam sozinhas em loop (a primeira abre o site). */
    images: Photo[];
    roles: string[];
    socials: Link[];
  };
  about: {
    label: string;
    manifesto: string;
    bio: string;
    location: string;
    portrait: Photo;
  };
  projects: {
    label: string;
    /**
     * Fotos da galeria em ordem. A primeira foto horizontal vira o destaque
     * largo no topo; as demais se encaixam sozinhas nas colunas.
     */
    photos: Photo[];
  };
  services: {
    label: string;
    cta: string;
    items: Service[];
  };
  contact: {
    label: string;
    headline: string;
    cta: Link;
    channels: { label: string; items: Link[] }[];
  };
  footer: {
    copyright: string;
    tagline: string;
    backToTop: string;
  };
  /** Página Projetos (/projetos e /projetos/<categoria>). */
  projectsPage: {
    title: string;
    /** Texto do topo quando nenhum filtro está ativo. */
    description: string;
    allLabel: string;
    loadMore: string;
    /** Mensagem de uma categoria que ainda não tem fotos. */
    empty: string;
    /** Ordem dos filtros. */
    categories: Category[];
    /** Todas as fotos, na ordem da galeria. Cada filtro mostra as da sua categoria. */
    photos: Photo[];
  };
  /** Página Sobre mim (/sobre). */
  aboutPage: {
    title: string;
    /** Linhas à direita do título. */
    location: string[];
    intro: {
      label: string;
      /** Texto grande. O trecho entre *asteriscos* fica em itálico. */
      statement: string;
      /** Um parágrafo por coluna. */
      bio: string[];
      portrait: Photo;
    };
    skills: {
      label: string;
      items: { title: string; items: string[] }[];
    };
    timeline: {
      label: string;
      years: {
        year: string;
        items: { name: string; type: string; role: string }[];
      }[];
    };
  };
};
