import { cache } from "react";
import { site } from "@/content/site";
import type { SiteContent } from "@/content/types";
import { projectId } from "@/sanity/env";
import { client } from "./sanity/client";
import { toSiteContent } from "./sanity/map";
import { siteQuery, type SiteQueryResult } from "./sanity/query";

/** De quanto em quanto tempo (segundos) o site confere se algo mudou no painel. */
export const REVALIDATE = 60;

/**
 * Ponto único de leitura do conteúdo.
 *
 * Lê o painel (Sanity, em /studio). Enquanto uma página ainda não foi
 * importada para lá, ela usa os arquivos locais em `src/content`. Uma mudança
 * publicada no painel aparece no site em até um minuto.
 *
 * Se o painel estiver fora do ar, a leitura falha de propósito: o site segue
 * mostrando a última versão boa em vez de voltar ao conteúdo antigo.
 */
export const getSiteContent = cache(async (): Promise<SiteContent> => {
  if (!projectId) return site;
  const data = await client.fetch<SiteQueryResult>(siteQuery, {}, { next: { revalidate: REVALIDATE, tags: ["sanity"] } });
  return toSiteContent(data, site);
});
