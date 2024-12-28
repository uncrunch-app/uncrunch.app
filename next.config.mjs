import path from 'path'
import { fileURLToPath } from 'url'
import createNextIntlPlugin from 'next-intl/plugin'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'codeberg.org',
      },
    ],
    domains: ['localhost'],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}

export default withNextIntl(nextConfig)
