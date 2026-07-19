import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF tem melhor compressão; WebP como fallback amplamente suportado
    formats: ['image/avif', 'image/webp'],
    // Dimensões mínimas para lazy loading: evita processar ícones SVG como imagens
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 dias
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Segurança básica que não interfere com rastreamento do Googlebot
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      {
        // Cache longo para assets estáticos com hash no nome (imagens, fontes, JS/CSS buildados)
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // Cache moderado para imagens do public/
        source: '/gallery/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
        ],
      },
    ]
  },
};

export default nextConfig;
