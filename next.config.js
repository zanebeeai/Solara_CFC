/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'build',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mt1.google.com',
      },
    ],
  },
}

module.exports = nextConfig
