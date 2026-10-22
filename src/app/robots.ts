import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/** Regras para buscadores: o site todo pode aparecer, o painel não. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/studio" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
