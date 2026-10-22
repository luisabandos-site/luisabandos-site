import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";

/**
 * Archivo (variável, eixos de peso e largura) é usada no texto e, por
 * enquanto, também no nome gigante. O Figma usa PP Object Sans Heavy, que é
 * uma fonte paga (Pangram Pangram): ao comprar a licença, coloque o .woff2
 * em `src/app/fonts/` e aponte `display` para ele.
 */
export const archivo = localFont({
  src: [
    { path: "./fonts/archivo-latin.woff2", weight: "100 900", style: "normal" },
    { path: "./fonts/archivo-latin-ext.woff2", weight: "100 900", style: "normal" },
  ],
  variable: "--font-archivo",
  display: "swap",
});

/**
 * Itálico da Archivo, usado só em trechos destacados (ex.: "gente, luz e
 * movimento" no Sobre mim). Sem preload: só baixa na página que usa.
 */
export const archivoItalic = localFont({
  src: [
    { path: "./fonts/archivo-italic-latin.woff2", weight: "100 900", style: "italic" },
    { path: "./fonts/archivo-italic-latin-ext.woff2", weight: "100 900", style: "italic" },
  ],
  variable: "--font-archivo-italic",
  display: "swap",
  preload: false,
});

export const geist = GeistSans;
