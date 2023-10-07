/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "uploadthing.com",
      "utfs.io",
      "user-images.githubusercontent.com"
    ]
  }
}

module.exports = nextConfig
