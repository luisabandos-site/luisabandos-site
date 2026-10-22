import { site } from "@/content/site";
import type { SiteContent } from "@/content/types";

/**
 * Ponto único de leitura do conteúdo.
 *
 * Hoje lê os arquivos locais em `src/content`. Para usar um CMS, troque o
 * corpo desta função por uma consulta (ex.: `sanityClient.fetch(...)`) que
 * devolva um `SiteContent`. Por ser assíncrona, os componentes já estão
 * prontos para isso.
 */
export async function getSiteContent(): Promise<SiteContent> {
  return site;
}
