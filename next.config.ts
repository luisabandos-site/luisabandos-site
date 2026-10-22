import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Qualidade única para todas as fotos: alta o bastante para não perder
    // detalhe, leve o bastante para carregar rápido.
    qualities: [85],
    // Inclui 2560px para telas grandes e retina mostrarem a foto bem nítida.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3840],
    // Quando o CMS (ex.: Sanity) entrar, liberar o domínio das imagens aqui:
    // remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
};

export default nextConfig;
