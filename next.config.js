/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  use: ['@svgr/webpack'],
  swcMinify: true,
  optimizeFonts: true,
  images: {
    remotePatterns:[
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        // port: '',
        // pathname: '/account123/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      }
    ],
    minimumCacheTTL: 15000000,
  }
};

module.exports = nextConfig
