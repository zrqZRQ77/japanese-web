// ============================================================
// 試験別ツールカード — /guide, /practice, /cards で共有
// カードの外枠・バッジ・アクション部分はここに集約し、
// 各ページは中身（統計・章別リンクなど）だけを差し替える
// ============================================================
import Link from 'next/link'

interface Action {
  href: string
  label: string
}

interface Props {
  category: string
  title: string
  countBadge: string
  description: string
  tags: string[]
  primaryAction: Action
  secondaryAction: Action
  children?: React.ReactNode
}

export default function ExamToolCard({
  category, title, countBadge, description, tags, primaryAction, secondaryAction, children,
}: Props) {
  return (
    <section style={{
      background: 'var(--color-bg)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-lg)',
      padding: 24,
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      boxShadow: 'var(--shadow-card)',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 12,
      }}>
        <div>
          <div style={{
            display: 'inline-block',
            background: 'var(--color-primary-light)',
            color: 'var(--color-primary-dark)',
            fontSize: '0.75rem',
            fontWeight: 700,
            padding: '3px 10px',
            borderRadius: 'var(--radius-sm)',
            marginBottom: 10,
          }}>{category}</div>
          <h2 style={{
            fontSize: '1.15rem',
            fontWeight: 800,
            color: 'var(--color-text)',
            margin: 0,
          }}>{title}</h2>
        </div>
        <div style={{
          fontSize: '0.75rem',
          fontWeight: 700,
          color: 'var(--color-text-secondary)',
          background: 'var(--color-bg-muted)',
          border: '1px solid var(--color-border)',
          padding: '4px 8px',
          borderRadius: 'var(--radius-sm)',
          whiteSpace: 'nowrap',
        }}>{countBadge}</div>
      </div>

      <p style={{
        fontSize: '0.875rem',
        color: 'var(--color-text-secondary)',
        lineHeight: 1.6,
        margin: 0,
      }}>{description}</p>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {tags.map(tag => (
          <span key={tag} style={{
            fontSize: '0.72rem', fontWeight: 600,
            color: 'var(--color-text-muted)',
            background: 'var(--color-bg-muted)',
            padding: '2px 8px', borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--color-border)',
          }}>{tag}</span>
        ))}
      </div>

      {children}

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 2 }}>
        <Link href={primaryAction.href} style={{
          display: 'inline-block',
          padding: '9px 14px',
          borderRadius: 'var(--radius-sm)',
          background: 'var(--color-primary)',
          color: 'var(--color-bg)',
          textDecoration: 'none',
          fontSize: '0.875rem',
          fontWeight: 700,
        }}>{primaryAction.label}</Link>
        <Link href={secondaryAction.href} style={{
          display: 'inline-block',
          padding: '9px 14px',
          borderRadius: 'var(--radius-sm)',
          background: 'var(--color-bg-subtle)',
          color: 'var(--color-text)',
          textDecoration: 'none',
          fontSize: '0.875rem',
          fontWeight: 700,
          border: '1px solid var(--color-border)',
        }}>{secondaryAction.label}</Link>
      </div>
    </section>
  )
}
