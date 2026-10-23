import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Só WebP: o AVIF fica bem mais leve, mas alisa o grão e as sombras das
    // fotos (shows, luz neon). Navegador sem WebP recebe o JPEG.
    formats: ["image/webp"],
    // 90 nas fotos da página e 95 na tela cheia (ver src/lib/quality.ts).
    qualities: [90, 95],
    // Inclui 2560px para telas grandes e retina mostrarem a foto bem nítida.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3840],
    // Fotos do painel não passam por aqui: o CDN do Sanity gera cada tamanho
    // (ver src/lib/sanity/image.ts).
  },
  // A seção Projetos virou Trabalho (2026-10) e "Projetos autorais" virou
  // "Projetos": links antigos (Google, mensagens) continuam funcionando.
  async redirects() {
    return [
      { source: "/projetos/projetos-autorais/:path*", destination: "/trabalho/projetos/:path*", permanent: true },
      { source: "/trabalho/projetos-autorais/:path*", destination: "/trabalho/projetos/:path*", permanent: true },
      { source: "/projetos/:path*", destination: "/trabalho/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
