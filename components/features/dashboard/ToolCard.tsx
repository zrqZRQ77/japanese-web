import Link from 'next/link'

interface Props {
  icon: string
  title: string
  desc: string
  linkLabel: string
  href: string
  color?: string
}

export default function ToolCard({ icon, title, desc, linkLabel, href, color = 'var(--color-primary)' }: Props) {
  return (
    <div style={{
      background: '#fff',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-md)',
      padding: '20px',
      display: 'flex', flexDirection: 'column', gap: 8,
    }}>
      <div style={{ fontSize: '2rem' }}>{icon}</div>
      <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{title}</div>
      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: 1.5, flex: 1 }}>
        {desc}
      </div>
      <Link href={href} style={{
        fontSize: '0.82rem', fontWeight: 600,
        color, textDecoration: 'none',
        display: 'flex', alignItems: 'center', gap: 4,
      }}>
        {linkLabel} →
      </Link>
    </div>
  )
}
