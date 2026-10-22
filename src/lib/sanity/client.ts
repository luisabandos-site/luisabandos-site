import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

// Só para testes no computador: aponta a leitura para um servidor local.
const testHost = process.env.SANITY_TEST_API_HOST;

/** Leitura do conteúdo publicado, pelo CDN do Sanity. */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
  ...(testHost ? { apiHost: testHost, useProjectHostname: false, useCdn: false } : {}),
});
