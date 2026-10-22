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
    // Quando o CMS (ex.: Sanity) entrar, liberar o domínio das imagens aqui:
    // remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
};

export default nextConfig;
