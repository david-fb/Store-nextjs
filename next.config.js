/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    customKey: 'customValue',
  },
  compress: true,
  images: {
    domains: ['placeimg.com'],
  }
};

module.exports = nextConfig
