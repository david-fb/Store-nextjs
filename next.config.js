/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  images: {
    domains: ['placeimg.com', 'pamibb.com', 'firebasestorage.googleapis.com'],
  }
};

module.exports = nextConfig
