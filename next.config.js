/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // Configure the port for production
  experimental: {
    serverComponentsExternalPackages: [],
  },
};

module.exports = nextConfig;