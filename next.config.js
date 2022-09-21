/** @type {import('next').NextConfig} */

const LEGAL_IMAGE_DOMAINS =
  process.env.LEGAL_IMAGE_DOMAINS ??
  'editools-gcs-dev.readr.tw,editools-gcs.readr.tw'
const legalImageDomains = LEGAL_IMAGE_DOMAINS.split(',')
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: legalImageDomains,
  },
}

module.exports = nextConfig
