/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['cloud.appwrite.io'],
  },
}

module.exports = nextConfig
