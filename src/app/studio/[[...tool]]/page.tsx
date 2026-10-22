import type { Metadata } from "next";
import { NextStudio } from "next-sanity/studio";
import { metadata as studioMetadata } from "next-sanity/studio";
import config from "@/sanity/config";

export const dynamic = "force-static";

export const metadata: Metadata = { ...studioMetadata, title: "Painel" };
export { viewport } from "next-sanity/studio";

/** Painel de edição: textos, fotos e categorias do site. */
export default function StudioPage() {
  return <NextStudio config={config} />;
}
