import Link from 'next/link'
import SiteLogo, { BrandText } from '@/components/layout/SiteLogo'

const FOOTER_LINKS = [
  { href: '/privacy', label: 'プライバシーポリシー' },
  { href: '/operator', label: '運営者情報' },
  { href: '/contact', label: 'お問い合わせ' },
  { href: '/disclaimer', label: '免責事項' },
]

export default function SiteFooter() {
  return (
    <footer style={{
      background: 'var(--color-bg)',
      color: 'var(--color-text-muted)',
      padding: '32px 0',
      borderTop: '1px solid var(--color-border)',
      fontSize: '0.875rem',
    }}>
      <div className="container-page" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 18,
        flexWrap: 'wrap',
      }}>
        <div>
          <div style={{ marginBottom: 8 }}>
            <SiteLogo />
          </div>
          <p>© 2026 <BrandText />. All rights reserved.</p>
        </div>
        <nav aria-label="フッターリンク" style={{
          display: 'flex',
          gap: 14,
          flexWrap: 'wrap',
          justifyContent: 'flex-end',
        }}>
          {FOOTER_LINKS.map(link => (
            <Link key={link.href} href={link.href} style={{
              color: 'var(--color-text-secondary)',
              textDecoration: 'none',
              fontWeight: 700,
            }}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  )
}
