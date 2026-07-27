import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'etmjycldjyrbsbcuuwzf.supabase.co',
        port: '',
        pathname: '**',
      },
    ],
    // Allow unoptimized for local assets (JPG/PNG from design)
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    // Add custom quality settings
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    // Add custom qualities
    qualities: [75, 85],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Add custom quality support
    loader: 'default',
  },
};

export default nextConfig;