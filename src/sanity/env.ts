/**
 * Projeto do Sanity (o painel de edição). O ID não é segredo: ele aparece
 * em sanity.io/manage e no endereço de todas as fotos.
 */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "l0zuihns";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = "2025-10-01";
