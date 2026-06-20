'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Script from 'next/script'
import { trackPageView } from '@/lib/analytics'

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
const isConfigured = process.env.NODE_ENV === 'production'
  && Boolean(measurementId?.startsWith('G-'))

export default function GoogleAnalytics() {
  const pathname = usePathname()
  const isInitialPage = useRef(true)

  useEffect(() => {
    if (!isConfigured) return
    if (isInitialPage.current) {
      isInitialPage.current = false
      return
    }
    trackPageView(pathname)
  }, [pathname])

  if (!isConfigured || !measurementId) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${measurementId}');
        `}
      </Script>
    </>
  )
}
