import type { Photo } from "./types";
import heroShowFile from "./images/hero-show.jpg";
import showVentiladorFile from "./images/show-ventilador.jpg";
import retratoAvenidaFile from "./images/retrato-avenida.jpg";
import editorialAmareloFile from "./images/editorial-amarelo.jpg";
import retratoTorreFile from "./images/retrato-torre.jpg";
import pistaCheiaFile from "./images/pista-cheia.jpg";
import stillRelogioFile from "./images/still-relogio.jpg";
import retratoVermelhoFile from "./images/retrato-vermelho.jpg";
import stillBandeiraFile from "./images/still-bandeira.jpg";
import djFisheyeFile from "./images/dj-fisheye.jpg";
import djVermelhoFile from "./images/dj-vermelho.jpg";
import djVerdeFile from "./images/dj-verde.jpg";
import luisaRetratoFile from "./images/luisa-retrato.jpg";
import festaSereiaFile from "./images/festa-sereia.jpg";
import showDancaFile from "./images/show-danca.jpg";
import makingOfBastidorFile from "./images/making-of-bastidor.jpg";
import stillEscritorioFile from "./images/still-escritorio.jpg";
import retratoFumacaFile from "./images/retrato-fumaca.jpg";
import retratoCoroaFile from "./images/retrato-coroa.jpg";
import cidadeGritaFosterFile from "./images/cidade-grita-foster.jpg";
import cidadeGritaCartazFile from "./images/cidade-grita-cartaz.jpg";
import setCameraFile from "./images/set-camera.jpg";
import setLuzVerdeFile from "./images/set-luz-verde.jpg";

/**
 * Biblioteca de fotos.
 *
 * Arquivos em `src/content/images/`: versões em alta (lado maior com 3000 px,
 * sRGB) geradas a partir dos originais da Luísa. O Next.js cria sozinho as
 * versões leves (AVIF/WebP) para cada tela.
 *
 * As fotos são importadas (não ficam em `public/`) para o endereço de cada uma
 * levar uma impressão digital do arquivo. Assim o navegador pode guardá-las
 * por anos, e quando uma foto é trocada o endereço muda sozinho.
 *
 * As datas vêm dos dados da câmera. Os nomes e lugares ainda são PROVISÓRIOS:
 * troque pelos reais.
 */
const photo = (p: Photo): Photo => p;

export const photos = {
  heroShow: photo({
    id: "hero-show",
    src: heroShowFile.src,
    width: heroShowFile.width,
    height: heroShowFile.height,
    alt: "Artista de boné e camiseta branca com os braços erguidos no palco, luz azul ao fundo",
    title: "Show ao vivo",
    location: "São Paulo, SP",
    date: "2025-11",
    color: "#201d59",
    focus: "46% 85%",
    blur: "data:image/webp;base64,UklGRm4AAABXRUJQVlA4IGIAAADQAQCdASoMAAgAAoBCJbACdAD5juggQAD+++3lppV/4ETz/wddQ09o8L1Zk9bSPFFMtp0lKjHT2/EkqZpJPeM73YUfqPfvd81N6t7J2x5QwX/8Hfrb/U378fGiNM8ZzEAAAA==",
  }),
  showVentilador: photo({
    id: "show-ventilador",
    src: showVentiladorFile.src,
    width: showVentiladorFile.width,
    height: showVentiladorFile.height,
    alt: "Cantora de cabelo ruivo e roupa dourada no palco, ao lado de um ventilador, com fumaça e luzes ao fundo",
    title: "Palco e fumaça",
    location: "São Paulo, SP",
    date: "2026-10",
    color: "#744f3b",
    focus: "54% 94%",
    blur: "data:image/webp;base64,UklGRmYAAABXRUJQVlA4IFoAAADQAQCdASoMAAgAAoBCJZACdADcDblOQAD+769cNxFHNzxI/3xBupj/mxS8jRT5OfULwh+hh1zYv5ZWGBsAQgtecSS0Oju/4gAuSEWtk8nua5LuvITEQr6AAAA=",
  }),
  retratoAvenida: photo({
    id: "retrato-avenida",
    src: retratoAvenidaFile.src,
    width: retratoAvenidaFile.width,
    height: retratoAvenidaFile.height,
    alt: "Homem de camisa escura sentado num muro à beira de uma avenida, ao entardecer",
    title: "Retrato na avenida",
    location: "São Carlos, SP",
    date: "2026-02",
    color: "#4b423a",
    focus: "54% 50%",
    blur: "data:image/webp;base64,UklGRlgAAABXRUJQVlA4IEwAAADQAQCdASoMAAgAAoBCJYwCdAD0bZMYAAD+8b97R+ZnSVcUzTTDy0uHbYpLuZ5BzqQd/m1ddpaKuy0iOdWE2cMcdFyn7zBLFJP5AAAA",
  }),
  editorialAmarelo: photo({
    id: "editorial-amarelo",
    src: editorialAmareloFile.src,
    width: editorialAmareloFile.width,
    height: editorialAmareloFile.height,
    alt: "Mulher deitada de costas sobre fundo amarelo, de meia-calça azul",
    title: "Editorial amarelo",
    location: "Estúdio",
    date: "2025-10",
    color: "#e4ac3d",
    focus: "50% 92%",
    blur: "data:image/webp;base64,UklGRmAAAABXRUJQVlA4IFQAAAAwAgCdASoIAAwAAoBCJbACdLoAAwkqb1JBAAD+7fwVvJhPDfDGb2O6VmNzQOVX/02Dl/9NgbpzWCqa5DwtrZtH8HG6/+CC2oq0DvX1huHnc+nXgAA=",
  }),
  retratoTorre: photo({
    id: "retrato-torre",
    src: retratoTorreFile.src,
    width: retratoTorreFile.width,
    height: retratoTorreFile.height,
    alt: "Retrato de mulher de cabelo cacheado ao pôr do sol, com uma torre de energia ao fundo",
    title: "Retrato ao entardecer",
    location: "São Carlos, SP",
    date: "2025-05",
    color: "#8d7775",
    blur: "data:image/webp;base64,UklGRmAAAABXRUJQVlA4IFQAAAAwAgCdASoIAAwAAoBCJQBOj+ADBl4hqsGsAAD+6u4DYOmNTF784ot5Qp1Wg/hrHYQo3e6ZxUyDfKbGb2F1AiyUTEmRth6x9cLP0XX0RAzJZEoAAAA=",
  }),
  pistaCheia: photo({
    id: "pista-cheia",
    src: pistaCheiaFile.src,
    width: pistaCheiaFile.width,
    height: pistaCheiaFile.height,
    alt: "Público em volta da cabine do DJ numa festa, vista com lente olho de peixe",
    title: "Pista cheia",
    location: "São Carlos, SP",
    date: "2024-03",
    color: "#0e1310",
    blur: "data:image/webp;base64,UklGRkAAAABXRUJQVlA4IDQAAADQAQCdASoMAAgAAoBCJZwAAu19cEpPAAD+/Mjt/MgQawb4kv2aX/33ElykcJ1tVXLoEAAA",
  }),
  stillRelogio: photo({
    id: "still-relogio",
    src: stillRelogioFile.src,
    width: stillRelogioFile.width,
    height: stillRelogioFile.height,
    alt: "Relógio azul sobre cetim rosa e manta verde, à beira de um lago",
    title: "Still — o tempo",
    location: "Brotas, SP",
    date: "2024-12",
    color: "#47483a",
    blur: "data:image/webp;base64,UklGRmAAAABXRUJQVlA4IFQAAADwAQCdASoIAAwAAoBCJQBOgCPQPCueiVAA/vsKhuSR9LWqm7Ozv/Z/4fB3fOUf7b9/CM2tmfX8zAKXv/d/MdN8Xfh1yvWn9Cz4J8d2p4nfjFFwMAA=",
  }),
  retratoVermelho: photo({
    id: "retrato-vermelho",
    src: retratoVermelhoFile.src,
    width: retratoVermelhoFile.width,
    height: retratoVermelhoFile.height,
    alt: "Retrato de mulher com gola plissada sob luz vermelha",
    title: "Retrato em vermelho",
    location: "São Paulo, SP",
    date: "2025-03",
    color: "#8a0b19",
    blur: "data:image/webp;base64,UklGRmAAAABXRUJQVlA4IFQAAADQAQCdASoIAAwAAoBCJbACdADzfh+yNAD+9HPuvT9nSvfPdZLqBYTjMBuyq2iupCYy/ShNQud0FyzM9v/oY92uiwn/ud8huvZeZl7e2lqLl3w8AAA=",
  }),
  stillBandeira: photo({
    id: "still-bandeira",
    src: stillBandeiraFile.src,
    width: stillBandeiraFile.width,
    height: stillBandeiraFile.height,
    alt: "Mulher envolta na bandeira do Brasil segurando uma arma, cena de filme",
    title: "Still de set",
    location: "Ribeirão Preto, SP",
    date: "2024-11",
    color: "#7a5357",
    blur: "data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAAAQAgCdASoIAAwAAoBCJbACdAEf/+b/PTAAAP0CHpv5A/yF7cPcOkugWPcJ9TjojFvk+9n3w0ThVX90pKG5gJ9tOlcFzZe2y1FomST5KyNmGko1iTOWNNsb/IvO+G/VzxYb5hvxhgAAAA==",
  }),
  djFisheye: photo({
    id: "dj-fisheye",
    src: djFisheyeFile.src,
    width: djFisheyeFile.width,
    height: djFisheyeFile.height,
    alt: "DJ mixando, vista de cima com lente olho de peixe e luzes em movimento",
    title: "Na cabine",
    location: "São Carlos, SP",
    date: "2024-03",
    color: "#0d1615",
    blur: "data:image/webp;base64,UklGRkQAAABXRUJQVlA4IDgAAADQAQCdASoIAAwAAoBCJZQC7AEf9yz0AAD+/G0IG6ywVZRYEnatDjVO/WsJyU2/m16Nt8PafG4AAA==",
  }),
  djVermelho: photo({
    id: "dj-vermelho",
    src: djVermelhoFile.src,
    width: djVermelhoFile.width,
    height: djVermelhoFile.height,
    alt: "DJ de fone de ouvido iluminada por luz vermelha e amarela",
    title: "Set noturno",
    location: "São Carlos, SP",
    date: "2024-03",
    color: "#621b0e",
    blur: "data:image/webp;base64,UklGRnIAAABXRUJQVlA4IGYAAAAQAgCdASoMAAgAAoBCJbACdLoAAnO5KwMAAP75Z0yAJ1g4nR/XOQIUqfurbQIbQ1Je07mzucs7BnkIdLY7qfCvu6GhV8FknNQ1cllPtB8SOeUtG95QJ19/PqlkP8EsxK5heGXDgAA=",
  }),
  djVerde: photo({
    id: "dj-verde",
    src: djVerdeFile.src,
    width: djVerdeFile.width,
    height: djVerdeFile.height,
    alt: "DJ loiro de olhos fechados tocando, com rastros de luz verde",
    title: "Festa de graça na rua",
    location: "São Carlos, SP",
    date: "2024-03",
    color: "#253628",
    blur: "data:image/webp;base64,UklGRmQAAABXRUJQVlA4IFgAAAAQAgCdASoIAAwAAoBCJYwCw7D0pzcCyhJYAP76DDJqDEuOr/DtZfId8SoqmqfM6+naONSOG0lWeZVe3W10ZU/bbFhgysjIzepGAYBIAjA/yYGCyadl4AAA",
  }),
  luisaRetrato: photo({
    id: "luisa-retrato",
    src: luisaRetratoFile.src,
    width: luisaRetratoFile.width,
    height: luisaRetratoFile.height,
    alt: "Luísa Bandos segurando a câmera, sob luz roxa",
    title: "Luísa Bandos",
    location: "São Carlos, SP",
    date: "2025-06",
    color: "#512a49",
    blur: "data:image/webp;base64,UklGRnYAAABXRUJQVlA4IGoAAAAwAgCdASoKAAwAAoBCJbACdAEO9Lk/MdErSAD+76NJ6qJ/f1J1+ur34/1p60W/MEM+ZviER2mLTvEvlJ1BM2hAf2YvcK7r2fqcT6X22fXVe+PPw2/gOaXvmBe7wrzHnkVknmoBZodhcAAA",
  }),
  festaSereia: photo({
    id: "festa-sereia",
    src: festaSereiaFile.src,
    width: festaSereiaFile.width,
    height: festaSereiaFile.height,
    alt: "Mulher com maquiagem de sereia sorrindo numa festa",
    title: "Noite de festa",
    location: "São Carlos, SP",
    date: "2025-11",
    color: "#746e6f",
    blur: "data:image/webp;base64,UklGRngAAABXRUJQVlA4IGwAAAAQAgCdASoIAAwAAoBCJbACdAD0phGK7UEAAP6cH3pe8RQTUcpszv73kHZU0XCMtn+xxoVJFMqOArd/1SC7Ft8fx8P8DXrmo0X9YOCImWV1O+Xq3deld91/O7jIYH6cw3d+k4GMf9eBCJAMAAA=",
  }),
  showDanca: photo({
    id: "show-danca",
    src: showDancaFile.src,
    width: showDancaFile.width,
    height: showDancaFile.height,
    alt: "Cantora com figurino dourado de braços erguidos sob refletores",
    title: "Show — abertura",
    location: "São Paulo, SP",
    date: "2026-10",
    color: "#917b81",
    blur: "data:image/webp;base64,UklGRmYAAABXRUJQVlA4IFoAAADQAQCdASoIAAwAAoBCJQBOgCKT4AyVsAD9U+D4JXKawlcg1z5i97a4JBc/aQrKTfCfPuAzrhRPF26rMpJfL8gBcTwFmy0Vl0UyyDZ0EAbubUY8MBaiKWTAAAA=",
  }),
  makingOfBastidor: photo({
    id: "making-of-bastidor",
    src: makingOfBastidorFile.src,
    width: makingOfBastidorFile.width,
    height: makingOfBastidorFile.height,
    alt: "Bastidor de set com atriz de gola de tule e equipe ao redor",
    title: "Bastidor de set",
    location: "São Paulo, SP",
    date: "2025-03",
    color: "#80443f",
    blur: "data:image/webp;base64,UklGRmQAAABXRUJQVlA4IFgAAADwAQCdASoIAAwAAoBCJbACdAEega/nwSAA/q3pgHc9J46m8GiQAfq9nFgTeB86R7yGp151P8W/lHXE0fVrupTsXj269ujxYoD6Ef8Ec1qTdybmmmtegAAA",
  }),
  stillEscritorio: photo({
    id: "still-escritorio",
    src: stillEscritorioFile.src,
    width: stillEscritorioFile.width,
    height: stillEscritorioFile.height,
    alt: "Homem de costas diante de um computador antigo e um relógio de parede",
    title: "Still — escritório",
    location: "São Carlos, SP",
    date: "2024-12",
    color: "#9f9e99",
    blur: "data:image/webp;base64,UklGRlgAAABXRUJQVlA4IEwAAADwAQCdASoIAAwAAoBCJZwC7AD0e44V20AA/vrczrOjh7Dc9LPOGAv8WxHHXTfvc7IrDlvhpwGrn9/40ktCAdfjKgBOAxeIDAtzQAAA",
  }),
  retratoFumaca: photo({
    id: "retrato-fumaca",
    src: retratoFumacaFile.src,
    width: retratoFumacaFile.width,
    height: retratoFumacaFile.height,
    alt: "Retrato noturno de mulher de cabelo cacheado sob luz vermelha",
    title: "Retrato noturno",
    location: "São Carlos, SP",
    date: "2025-05",
    color: "#30141c",
    blur: "data:image/webp;base64,UklGRlYAAABXRUJQVlA4IEoAAADQAQCdASoIAAwAAoBCJQBOgCHgGK0AAAD++uj+JZY3b9AFU7Y0Mvi5Q5fEWc7t2b7Q7TTunXsZprsTVOuav9PJPFsVbvEi9gAAAA==",
  }),
  retratoCoroa: photo({
    id: "retrato-coroa",
    src: retratoCoroaFile.src,
    width: retratoCoroaFile.width,
    height: retratoCoroaFile.height,
    alt: "Retrato de rapaz com uma coroa na cabeça, fundo cinza",
    title: "Retrato com coroa",
    location: "São Carlos, SP",
    date: "2026-01",
    color: "#6a5f60",
    blur: "data:image/webp;base64,UklGRlgAAABXRUJQVlA4IEwAAAAQAgCdASoIAAwAAoBCJZQCw7Ytpvd34f64AP7c+3/njkfjmJLwQiKyjmm1dIGL8ChqemZte1DhywdEknDqnXcCG6cLyo90UmVEAAAA",
  }),
  cidadeGritaFoster: photo({
    id: "cidade-grita-foster",
    src: cidadeGritaFosterFile.src,
    width: cidadeGritaFosterFile.width,
    height: cidadeGritaFosterFile.height,
    alt: "Fachada de casarão com pichação escrita Mansão Foster, em preto e branco",
    title: "A cidade grita — Mansão Foster",
    location: "São Carlos, SP",
    date: "2026-02",
    color: "#888888",
    blur: "data:image/webp;base64,UklGRkgAAABXRUJQVlA4IDwAAACwAQCdASoIAAwAAoBCJaQAAp1URSAAAP5stj9RggCR6XZn1/8g1uzlOpHpZFUwdcw3DVKCEy1NjBVQAAA=",
  }),
  cidadeGritaCartaz: photo({
    id: "cidade-grita-cartaz",
    src: cidadeGritaCartazFile.src,
    width: cidadeGritaCartazFile.width,
    height: cidadeGritaCartazFile.height,
    alt: "Cartaz rasgado sobre parede vermelha com frase escrita à mão",
    title: "A cidade grita — cartaz",
    location: "São Carlos, SP",
    date: "2026-02",
    color: "#832d2f",
    blur: "data:image/webp;base64,UklGRmgAAABXRUJQVlA4IFwAAAAQAgCdASoMAAgAAoBCJbACdAYqNgehvrbgAP70L5+yiVTf5cU48ntmG1zbabjODsx3TFpW0I3wPzscjzf6ELvU02+ar85KDH/8uTndBaNanYJW/4Fh+/P17AAAAA==",
  }),
  setCamera: photo({
    id: "set-camera",
    src: setCameraFile.src,
    width: setCameraFile.width,
    height: setCameraFile.height,
    alt: "Equipe de filmagem num apartamento, com câmera e luz montadas",
    title: "Set de filmagem",
    location: "São Paulo, SP",
    date: "2024-11",
    color: "#254858",
    blur: "data:image/webp;base64,UklGRnIAAABXRUJQVlA4IGYAAADwAQCdASoMAAgAAoBCJZACdAEekCWB0AAA/uZ6nX+m9ZntKre2WmQh5UINAhdWAidJB6GZ4CeHgGqfcQO/K6CG/2YAaJBX+kh/qQ18cwmedJxEal3nVuLIo6tP1NTb6FkGcAsAAAA=",
  }),
  setLuzVerde: photo({
    id: "set-luz-verde",
    src: setLuzVerdeFile.src,
    width: setLuzVerdeFile.width,
    height: setLuzVerdeFile.height,
    alt: "Câmera de cinema sob luz verde durante uma filmagem",
    title: "Câmera em cena",
    location: "São Paulo, SP",
    date: "2025-03",
    color: "#1c4320",
    blur: "data:image/webp;base64,UklGRl4AAABXRUJQVlA4IFIAAADQAQCdASoIAAwAAoBCJYgCdAEDboUK8AD+9MfFpPyyzDLx6X9HNUE6m5b8fzyeYZjQwBcrru1wy6Z9uvMe21hOvq8QIzbmJ2zIRm3BRv5ksAAA",
  }),
} satisfies Record<string, Photo>;
