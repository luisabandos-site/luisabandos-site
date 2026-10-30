import { preconnect } from "react-dom";
import { Analytics } from "@vercel/analytics/next";
import { getSiteContent } from "@/lib/content";
import { isSanityImage } from "@/lib/sanity/image";
import { heroSizes, portraitSizes } from "@/lib/sizes";
import { SmoothScroll } from "@/components/SmoothScroll";
import { LightboxProvider } from "@/components/lightbox/LightboxProvider";
import { IntroProvider } from "@/components/intro/IntroProvider";
import { PageTransition } from "@/components/transition/PageTransition";
import "../globals.css";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const { brand, hero, about } = await getSiteContent();
  // Fotos do painel vêm do CDN do Sanity: abre a conexão antes de tudo.
  if (hero.images.some((photo) => isSanityImage(photo.src))) preconnect("https://cdn.sanity.io");
  // O que a intro baixa antes de abrir: todas as fotos do topo e o retrato.
  const critical = [
    ...hero.images.map((photo) => ({ photo, sizes: heroSizes(photo) })),
    { photo: about.portrait, sizes: portraitSizes },
  ];

  return (
    <>
      <SmoothScroll>
        <PageTransition brand={brand}>
          <IntroProvider brand={brand} critical={critical}>
            <LightboxProvider>{children}</LightboxProvider>
          </IntroProvider>
        </PageTransition>
      </SmoothScroll>
      {/* Visitas do site na aba Analytics da Vercel (o painel /studio fica de fora). */}
      <Analytics />
    </>
  );
}
