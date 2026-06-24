import { ImageResponse } from 'next/og'
import { DEFAULT_DESCRIPTION, SITE_NAME } from '@/lib/seo'

export const alt = `${SITE_NAME} — 無料で学ぶ日本の資格`
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          padding: 72,
          color: '#f4f3ef',
          background: '#1a1d29',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <div
            style={{
              color: '#c9a24b',
              fontSize: 30,
              fontWeight: 800,
              letterSpacing: 2,
            }}
          >
            JAPANESE-HUB.COM
          </div>
          <div
            style={{
              width: 96,
              height: 96,
              border: '3px solid #c9a24b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#c9a24b',
              fontSize: 32,
              fontWeight: 900,
            }}
          >
            JP
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              color: '#c9a24b',
              fontSize: 34,
              fontWeight: 800,
            }}
          >
            無料で学ぶ日本の資格
          </div>
          <div
            style={{
              maxWidth: 920,
              color: '#f4f3ef',
              fontSize: 88,
              fontWeight: 900,
              lineHeight: 1.08,
            }}
          >
            {SITE_NAME}
          </div>
          <div
            style={{
              maxWidth: 930,
              color: '#d5d1c7',
              fontSize: 32,
              lineHeight: 1.45,
            }}
          >
            {DEFAULT_DESCRIPTION}
          </div>
        </div>

        <div
          style={{
            borderTop: '2px solid rgba(201, 162, 75, 0.42)',
            paddingTop: 24,
            color: '#c9a24b',
            fontSize: 28,
            fontWeight: 800,
            display: 'flex',
            gap: 28,
          }}
        >
          <span>日商簿記3級</span>
          <span>FP3級</span>
          <span>ITパスポート</span>
        </div>
      </div>
    ),
    size
  )
}
