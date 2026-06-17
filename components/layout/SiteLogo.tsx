import Link from 'next/link'

export default function SiteLogo({ className }: { className?: string }) {
  const style: React.CSSProperties = {
    fontWeight: 900,
    fontSize: '1.15rem',
    color: 'var(--color-text)',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
  }
  const spanStyle: React.CSSProperties = { color: 'var(--color-primary)' }
  return (
    <Link href="/" style={style} className={className}>
      資格合格<span style={spanStyle}>ナビ</span>
    </Link>
  )
}
