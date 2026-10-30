import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { getSiteContent } from "@/lib/content";
import { INTRO_SEEN_KEY } from "@/components/intro/constants";
import { pageMetadata, SITE_URL } from "@/lib/seo";
import { archivo, archivoItalic, geist } from "./fonts";

/**
 * Padrão de todas as páginas. Cada página completa com o próprio título,
 * descrição e endereço oficial (ver `pageMetadata`). O favicon e os ícones
 * são os arquivos `favicon.ico`, `icon.svg` e `apple-icon.png` desta pasta.
 */
export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  return {
    ...pageMetadata(content, {}),
    metadataBase: new URL(SITE_URL),
    // As outras páginas viram "Projetos — Luísa Bandos".
    title: { default: content.seo.title, template: `%s — ${content.hero.name}` },
    applicationName: content.hero.name,
    verification: content.seo.googleVerification ? { google: content.seo.googleVerification } : undefined,
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

/**
 * Base de todas as páginas: o site (pasta `(site)`) e o painel de edição
 * (`/studio`). O que é só do site, como a intro, a rolagem suave e o estilo
 * global, fica em `(site)/layout.tsx`, para não interferir no painel.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${archivo.variable} ${archivoItalic.variable} ${geist.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <noscript dangerouslySetInnerHTML={{ __html: noScriptStyle }} />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
