import type { Metadata, Viewport } from "next";
import { getSiteContent } from "@/lib/content";
import { heroSizes, portraitSizes } from "@/lib/sizes";
import { SmoothScroll } from "@/components/SmoothScroll";
import { LightboxProvider } from "@/components/lightbox/LightboxProvider";
import { IntroProvider } from "@/components/intro/IntroProvider";
import { PageTransition } from "@/components/transition/PageTransition";
import { INTRO_SEEN_KEY } from "@/components/intro/constants";
import { archivo, archivoItalic, geist } from "./fonts";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const { seo, hero } = await getSiteContent();
  return {
    metadataBase: new URL(seo.url),
    // As outras páginas viram "Projetos — Luísa Bandos".
    title: { default: seo.title, template: `%s — ${hero.name}` },
    description: seo.description,
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: "website",
      locale: "pt_BR",
      images: hero.images.slice(0, 1).map((image) => ({ url: image.src, width: image.width, height: image.height })),
    },
    twitter: { card: "summary_large_image" },
  };
}

export const viewport: Viewport = {
  themeColor: "#000000",
};

// Roda antes da página aparecer. A intro só abre o site pela home: se ela já
// foi vista nesta sessão, ou se a pessoa entrou direto por outra página (ex.:
// um link de /projetos), ela não aparece (nem por um instante).
const introScript = `try{var s=sessionStorage;if(s.getItem("${INTRO_SEEN_KEY}")||location.pathname!=="/"){s.setItem("${INTRO_SEEN_KEY}","1");document.documentElement.dataset.intro="skip"}}catch(e){}`;

// Sem JavaScript: esconde a intro.
const noScriptStyle = `<style>[data-intro-root]{display:none!important}</style>`;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { brand, hero, about } = await getSiteContent();
  // O que a intro baixa antes de abrir: todas as fotos do topo e o retrato.
  const critical = [
    ...hero.images.map((photo) => ({ photo, sizes: heroSizes(photo) })),
    { photo: about.portrait, sizes: portraitSizes },
  ];

  return (
    <html lang="pt-BR" className={`${archivo.variable} ${archivoItalic.variable} ${geist.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <noscript dangerouslySetInnerHTML={{ __html: noScriptStyle }} />
      </head>
      <body>
        <SmoothScroll>
          <PageTransition brand={brand}>
            <IntroProvider brand={brand} critical={critical}>
              <LightboxProvider>{children}</LightboxProvider>
            </IntroProvider>
          </PageTransition>
        </SmoothScroll>
      </body>
    </html>
  );
}
