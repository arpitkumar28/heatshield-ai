/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  // Transpiling these packages ensures they work correctly with ESM/Next.js
  transpilePackages: ['leaflet', 'react-leaflet'],
}

module.exports = nextConfig
