import type { Metadata, Viewport } from "next";
import { getSiteContent } from "@/lib/content";
import { SmoothScroll } from "@/components/SmoothScroll";
import { LightboxProvider } from "@/components/lightbox/LightboxProvider";
import { IntroProvider } from "@/components/intro/IntroProvider";
import { INTRO_SEEN_KEY } from "@/components/intro/constants";
import { archivo, geist } from "./fonts";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const { seo, hero } = await getSiteContent();
  return {
    metadataBase: new URL(seo.url),
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: "website",
      locale: "pt_BR",
      images: [{ url: hero.image.src, width: hero.image.width, height: hero.image.height }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export const viewport: Viewport = {
  themeColor: "#000000",
};

// Roda antes da página aparecer: se a intro já foi vista nesta sessão, ela
// não volta a aparecer (nem por um instante).
const introScript = `try{if(sessionStorage.getItem("${INTRO_SEEN_KEY}"))document.documentElement.dataset.intro="skip"}catch(e){}`;

// Sem JavaScript: mostra as fotos direto e esconde a intro.
const noScriptStyle = `<style>.fade-img{opacity:1!important;transform:none!important}[data-intro-root]{display:none!important}</style>`;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { brand } = await getSiteContent();

  return (
    <html lang="pt-BR" className={`${archivo.variable} ${geist.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <noscript dangerouslySetInnerHTML={{ __html: noScriptStyle }} />
      </head>
      <body>
        <SmoothScroll>
          <IntroProvider brand={brand}>
            <LightboxProvider>{children}</LightboxProvider>
          </IntroProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
