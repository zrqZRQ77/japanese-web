import Link from 'next/link'

export function BrandText({ className }: { className?: string }) {
  const style: React.CSSProperties = {
    fontWeight: 900,
    fontSize: '1.12rem',
    color: 'var(--color-brand)',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    letterSpacing: 0,
    fontFamily: 'var(--font-sans)',
  }
  return (
    <span style={style} className={className}>
      資格合格ナビ
    </span>
  )
}

export default function SiteLogo({ className }: { className?: string }) {
  return (
    <Link href="/" style={{ textDecoration: 'none' }} className={className}>
      <BrandText />
    </Link>
  )
}
