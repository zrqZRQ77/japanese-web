import type { Metadata } from 'next'
import { Noto_Sans_JP } from 'next/font/google'
import '../styles/globals.css'
import { DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from '@/lib/seo'
import AdSenseScript from '@/components/monetization/AdSenseScript'
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics'

const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION
const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: 'variable',
  display: 'swap',
  variable: '--font-noto-sans-jp',
  fallback: ['Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'Yu Gothic', 'Meiryo', 'system-ui', 'sans-serif'],
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — 無料で学ぶ日本の資格`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: `${SITE_NAME} — 無料で学ぶ日本の資格`,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'ja_JP',
    type: 'website',
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — 無料で学ぶ日本の資格`,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE.url],
  },
  verification: googleSiteVerification ? {
    google: googleSiteVerification,
  } : undefined,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={notoSansJP.variable}>
      <body>
        {children}
        <GoogleAnalytics />
        <AdSenseScript />
      </body>
    </html>
  )
}
