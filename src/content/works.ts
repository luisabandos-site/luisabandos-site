import { categories } from "./categories";
import { photos } from "./photos";
import type { Work } from "./types";

/**
 * Projetos e filmes das categorias em cards. Cada um tem uma página em
 * /trabalho/<categoria>/<slug> com o texto e a galeria.
 */
export const works: Work[] = [
  {
    slug: "a-cidade-grita",
    title: "a cidade grita.",
    category: categories.projetos,
    cover: photos.cidadeGritaDitadura,
    text: [
      "O projeto “a cidade grita.” nasceu em 2019 de forma despretensiosa, com o objetivo de registrar e catalogar pixos encontrados no interior de São Paulo. O projeto cresceu, se desenvolveu e encontrou significado em si mesmo.",
      "Para além de fotos, são reflexões sobre o caráter político, social, coletivo, comunicativo, efêmero – alguns dos pixos retratados nessa exposição já foram apagados –, de construção de memória e de retomada de espaços da pixação.",
      "As fotografias buscam destacar o que o pixador e artista Cripta Djan caracteriza como “um mecanismo de memória e valorização” e o que o diretor de cinema João Weiner chama de “efeito colateral do sistema”.",
    ],
    photos: [
      photos.cidadeGritaDitadura,
      photos.cidadeGritaTempo,
      photos.cidadeGritaSemDo,
      photos.cidadeGritaMarighella,
      photos.cidadeGritaLagrima,
      photos.cidadeGritaFoster,
      photos.cidadeGritaMuro,
      photos.cidadeGritaCartaz,
      photos.cidadeGritaViaduto,
      photos.cidadeGritaGrades,
      photos.cidadeGritaBanca,
    ],
  },
];
