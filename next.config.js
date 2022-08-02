/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['editools-gcs-dev.readr.tw', 'editools-gcs.readr.tw'],
  },
}

module.exports = nextConfig
