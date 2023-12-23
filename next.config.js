/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    largePageDataBytes: 800 * 20000,
  },
  compiler: {
    removeConsole: false
  },
  
}

module.exports = nextConfig
