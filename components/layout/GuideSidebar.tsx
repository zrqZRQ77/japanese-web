// ============================================================
// 学習ガイド 左サイドバー（章節目次）
// 修改此文件 → 所有考试的学習ガイド左栏同步更新
// ============================================================
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ChapterMeta } from '@/lib/types'

interface Props {
  examId: string
  chapters: ChapterMeta[]
  currentChapterId: string
  currentSectionId?: string
  progress: number  // 0-100
}

export default function GuideSidebar({ examId, chapters, currentChapterId, progress }: Props) {
  const [expanded, setExpanded] = useState<string>(currentChapterId)
  const base = `/exams/${examId}/guide`

  return (
    <aside style={{
      width: 'var(--guide-sidebar-width)',
      minWidth: 'var(--guide-sidebar-width)',
      borderRight: '1px solid var(--color-border)',
      background: '#fff',
      height: '100%',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* ヘッダー */}
      <div style={{ padding: '20px 20px 0' }}>
        <Link href={`/exams/${examId}`} style={{
          fontSize: '0.78rem', color: 'var(--color-text-muted)',
          textDecoration: 'none', fontWeight: 600,
          display: 'flex', alignItems: 'center', gap: 4,
          marginBottom: 12,
        }}>← ダッシュボード</Link>
        <div style={{ fontWeight: 800, fontSize: '1rem', marginBottom: 10 }}>
          簿記3級 学習ガイド
        </div>
        {/* 進捗バー */}
        <div style={{ marginBottom: 16 }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            fontSize: '0.75rem', color: 'var(--color-text-muted)',
            marginBottom: 4,
          }}>
            <span>進捗</span><span>{progress}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      {/* 章節リスト */}
      <nav style={{ padding: '0 10px 20px', flex: 1 }}>
        {chapters.map(ch => {
          const isCurrentChapter = ch.id === currentChapterId
          const isExpanded = expanded === ch.id

          return (
            <div key={ch.id} style={{ marginBottom: 2 }}>
              {/* 章タイトル */}
              <button
                onClick={() => setExpanded(isExpanded ? '' : ch.id)}
                style={{
                  width: '100%', textAlign: 'left',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '9px 10px',
                  borderRadius: 'var(--radius-sm)',
                  background: isCurrentChapter ? 'var(--color-primary-light)' : 'transparent',
                  border: 'none', cursor: 'pointer',
                  fontWeight: isCurrentChapter ? 700 : 500,
                  fontSize: '0.875rem',
                  color: isCurrentChapter ? 'var(--color-primary)' : 'var(--color-text)',
                }}
              >
                <span>第{ch.number}章 {ch.title}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5"
                  style={{ transform: isExpanded ? 'rotate(180deg)' : 'none', transition: '0.2s', flexShrink: 0 }}>
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              {/* セクションリスト */}
              {isExpanded && (
                <div style={{ paddingLeft: 10 }}>
                  {ch.sections.map(sec => (
                    <Link key={sec.id}
                      href={`${base}/${ch.id}?section=${sec.id}`}
                      style={{
                        display: 'block',
                        padding: '7px 10px',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.825rem',
                        color: 'var(--color-text-secondary)',
                        textDecoration: 'none',
                        borderLeft: '2px solid var(--color-border)',
                        marginLeft: 8,
                        marginBottom: 1,
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = 'var(--color-bg-subtle)'
                        e.currentTarget.style.color = 'var(--color-text)'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'transparent'
                        e.currentTarget.style.color = 'var(--color-text-secondary)'
                      }}
                    >
                      {sec.number} {sec.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>
    </aside>
  )
}
