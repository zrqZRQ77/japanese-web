// ============================================================
// 試験ページ共通左サイドバー
// 修改此文件 → 所有考试页面左侧导航同步更新
// ============================================================
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ExamMeta } from '@/lib/types'

const NAV_ITEMS = [
  { key: 'dashboard', label: 'ダッシュボード', icon: '⊞', path: '' },
  { key: 'guide',     label: '学習ガイド',     icon: '📖', path: '/guide' },
  { key: 'questions', label: '練習問題',        icon: '✏️', path: '/questions' },
  { key: 'cards',     label: '知識カード',      icon: '🃏', path: '/cards' },
  { key: 'mock',      label: '模擬試験',        icon: '📋', path: '/mock-exam' },
  { key: 'ai',        label: 'AI質問',          icon: '🤖', path: '/ai-chat' },
]

interface Props {
  exam: ExamMeta
}

export default function ExamSidebar({ exam }: Props) {
  const pathname = usePathname()
  const base = `/exams/${exam.id}`

  return (
    <aside style={{
      width: 'var(--sidebar-width)',
      minWidth: 'var(--sidebar-width)',
      borderRight: '1px solid var(--color-border)',
      background: '#fff',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    }}>
      {/* 試験名ヘッダー */}
      <div style={{
        padding: '20px 20px 16px',
        borderBottom: '1px solid var(--color-border)',
      }}>
        <div style={{
          fontSize: '0.75rem', fontWeight: 700,
          color: 'var(--color-text-muted)',
          letterSpacing: '0.06em', marginBottom: 4,
        }}>現在の試験</div>
        <div style={{
          fontWeight: 800, fontSize: '1.05rem',
          color: 'var(--color-text)',
        }}>{exam.shortName}</div>
      </div>

      {/* ナビメニュー */}
      <nav style={{ padding: '12px 12px', flex: 1 }}>
        {NAV_ITEMS.map(item => {
          const href = `${base}${item.path}`
          const isActive = item.path === ''
            ? pathname === base || pathname === `${base}/`
            : pathname.startsWith(`${base}${item.path}`)

          return (
            <Link key={item.key} href={href} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '9px 12px', borderRadius: 'var(--radius-sm)',
              marginBottom: 2,
              textDecoration: 'none',
              fontWeight: isActive ? 700 : 500,
              fontSize: '0.9rem',
              color: isActive ? 'var(--color-primary)' : 'var(--color-text)',
              background: isActive ? 'var(--color-primary-light)' : 'transparent',
              transition: 'background 0.1s',
            }}>
              <span style={{ fontSize: '1rem', width: 20, textAlign: 'center' }}>{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* 学習ヒント（已移除应客户要求） */}
    </aside>
  )
}
