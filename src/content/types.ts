/**
 * Modelo de conteúdo do site.
 *
 * Tudo o que aparece no site (textos e fotos) segue estes tipos. Hoje o
 * conteúdo vem de arquivos locais (`photos.ts` e `site.ts`); quando um CMS
 * (ex.: Sanity) for plugado, ele só precisa devolver objetos neste mesmo
 * formato em `src/lib/content.ts` e nenhum componente precisa mudar.
 */

export type Category = {
  /** Pedaço do endereço: /trabalho/<slug>. */
  slug: string;
  title: string;
  /** Texto do topo da página Trabalho com este filtro. */
  description: string;
  /**
   * Como a categoria aparece: galeria de fotos (padrão) ou cards de projetos
   * ou filmes, cada um com a sua página.
   */
  layout?: "photos" | "cards";
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
  /** Categoria do trabalho (filtro da página Trabalho). */
  category?: Category;
  /** Projeto ou filme de onde a foto vem, quando ela está dentro de um. */
  work?: { title: string; href: string };
};

export type Link = {
  label: string;
  href: string;
};

/** Projeto ou filme de uma categoria em cards (ex.: Projetos, Audiovisual). */
export type Work = {
  /** Pedaço do endereço: /trabalho/<categoria>/<slug>. */
  slug: string;
  title: string;
  category: Category;
  /** Foto do card (a capa escolhida ou a primeira da galeria). */
  cover?: Photo;
  /** Parágrafos do texto do topo (o trecho entre *asteriscos* fica em itálico). Pode ser vazio. */
  text: string[];
  /** Link opcional embaixo do texto (ex.: "Acesse o acervo completo"). */
  link?: Link;
  /** Vídeo do YouTube ou do Vimeo, opcional. */
  video?: string;
  photos: Photo[];
};

export type Service = {
  slug: string;
  title: string;
  tags: string[];
  href: string;
  /** Até duas fotos que aparecem inclinadas no hover. */
  preview: Photo[];
};

export type SiteContent = {
  seo: {
    title: string;
    description: string;
    /** Foto da prévia quando o link é compartilhado. Sem ela, usa a primeira do topo. */
    image?: Photo;
    /** Código do Google Search Console (método "Tag HTML"). */
    googleVerification?: string;
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
  /** Página Trabalho (/trabalho e /trabalho/<categoria>). */
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
    /** Projetos e filmes das categorias em cards, na ordem do painel. */
    works: Work[];
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
