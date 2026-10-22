import type { MetadataRoute } from "next";
import { getSiteContent } from "@/lib/content";

/** Nome e ícone quando o site é salvo na tela inicial do celular. */
export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const { hero, seo } = await getSiteContent();
  return {
    name: hero.name,
    short_name: hero.name,
    description: seo.description,
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    lang: "pt-BR",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
