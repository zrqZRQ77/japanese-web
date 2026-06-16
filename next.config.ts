import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // MDX サポート（将来の拡張用）
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  experimental: {
    // Server Components でファイルシステムアクセスを許可
  },
}

export default nextConfig
