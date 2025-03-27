import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  webpack: (config) => {
    // react-pdf için gerekli worker ayarları
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;

    // PDF için dosya yükleme desteği
    config.module.rules.push({
      test: /\.(pdf)$/i,
      type: 'asset/resource',
    });

    return config;
  },
  // PDF dosyalarını public klasöründen servis ettiğimizden emin oluyoruz
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.licdn.com',
        pathname: '/dms/image/**',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        pathname: '/**', // Allowing all paths under this domain
      },
    ],
    // Performans ve güvenlik için ek ayarlar
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
