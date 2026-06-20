import type { Metadata } from 'next'

export const SITE_URL = 'https://japanese-hub.com'
export const SITE_NAME = '資格合格ナビ'
export const DEFAULT_DESCRIPTION = '日商簿記3級、FP3級、ITパスポートを無料で学べる資格学習サイト。学習ガイド、練習問題、知識カードで合格までの学習をサポートします。'

export function absoluteUrl(path = '/') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${normalizedPath}`
}

export function createPageMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '/',
  noIndex = false,
}: {
  title: string
  description?: string
  path?: string
  noIndex?: boolean
}): Metadata {
  return {
    title: path === '/' ? { absolute: title } : title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(path),
      siteName: SITE_NAME,
      locale: 'ja_JP',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
    robots: noIndex ? {
      index: false,
      follow: true,
    } : {
      index: true,
      follow: true,
    },
  }
}
