import type { Metadata, Viewport } from "next";
import { getSiteContent } from "@/lib/content";
import { SmoothScroll } from "@/components/SmoothScroll";
import { LightboxProvider } from "@/components/lightbox/LightboxProvider";
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${archivo.variable} ${geist.variable}`}>
      <body>
        <SmoothScroll>
          <LightboxProvider>{children}</LightboxProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
