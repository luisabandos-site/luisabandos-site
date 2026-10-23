/**
 * Endereços da seção Trabalho. Mudou de /projetos para /trabalho em
 * 2026-10; os endereços antigos redirecionam (next.config.ts).
 */
export const WORK_PATH = "/trabalho";

/** /trabalho/eventos */
export const categoryHref = (category: string) => `${WORK_PATH}/${category}`;

/** /trabalho/projetos/a-cidade-grita */
export const workHref = (category: string, work: string) => `${WORK_PATH}/${category}/${work}`;
