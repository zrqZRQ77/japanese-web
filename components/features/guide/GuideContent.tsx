// ============================================================
// 学習ガイド 右側コンテンツエリア
// 修改此文件 → 所有教材内容页面的布局/颜色同步更新
// ============================================================
import Link from 'next/link'
import { ChapterMeta, GuideFrontmatter } from '@/lib/types'

interface Props {
  frontmatter: GuideFrontmatter
  contentHtml: string
  chapter: ChapterMeta
  examId: string
  prevLink?: { href: string; label: string }
  nextLink?: { href: string; label: string }
}

export default function GuideContent({
  frontmatter, contentHtml, chapter, examId, prevLink, nextLink
}: Props) {
  const base = `/exams/${examId}`

  return (
    <article style={{
      flex: 1, overflowY: 'auto',
      background: '#fff',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* トップバー：ブックマーク・お気に入り・共有 */}
      <div style={{
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 32px',
        borderBottom: '1px solid var(--color-border)',
        background: '#fff',
        position: 'sticky', top: 0, zIndex: 10,
      }}>
        {/* パンくずリスト */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
          <Link href={`${base}/guide`} style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 600 }}>
            第{chapter.number}章 {chapter.title}
          </Link>
          <span>›</span>
          <span style={{ color: 'var(--color-text)' }}>
            {frontmatter.sectionNumber} {frontmatter.sectionTitle}
          </span>
        </nav>
        {/* アクションボタン */}
        <div style={{ display: 'flex', gap: 8 }}>
          {['🔖', '⭐', '🗑️'].map(icon => (
            <button key={icon} style={{
              padding: '6px 10px', background: 'none',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer', fontSize: '1rem',
            }}>{icon}</button>
          ))}
        </div>
      </div>

      {/* 本文 */}
      <div style={{ flex: 1, padding: '36px 40px', maxWidth: 760 }}>
        {/* セクションタイトル */}
        <h1 style={{
          fontSize: '1.6rem', fontWeight: 900,
          marginBottom: 20, color: 'var(--color-text)',
          lineHeight: 1.3,
        }}>
          {frontmatter.sectionNumber} {frontmatter.sectionTitle}
        </h1>

        {/* MDXレンダリングエリア */}
        <div
          className="mdx-content"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        {/* 練習問題へのリンク */}
        <div style={{
          marginTop: 40, padding: '20px 24px',
          background: 'var(--color-primary-light)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid #bfdbfe',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
        }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 4 }}>
              この章の理解を確認しよう
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
              練習問題で知識を定着させましょう
            </div>
          </div>
          <Link href={`${base}/questions/${chapter.id}`} style={{
            padding: '9px 20px',
            background: 'var(--color-primary)', color: '#fff',
            borderRadius: 'var(--radius-sm)', fontWeight: 700,
            fontSize: '0.875rem', textDecoration: 'none', whiteSpace: 'nowrap',
          }}>練習問題を解く →</Link>
        </div>
      </div>

      {/* 前へ / 次へ ナビゲーション */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        padding: '20px 40px',
        borderTop: '1px solid var(--color-border)',
        background: 'var(--color-bg-subtle)',
        gap: 12, flexWrap: 'wrap',
      }}>
        {prevLink ? (
          <Link href={prevLink.href} style={{
            padding: '10px 20px',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.875rem', fontWeight: 600,
            color: 'var(--color-text)', textDecoration: 'none',
            background: '#fff',
          }}>← {prevLink.label}</Link>
        ) : <div />}

        <Link href={`${base}/guide`} style={{
          padding: '10px 20px',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.875rem', fontWeight: 600,
          color: 'var(--color-text-secondary)', textDecoration: 'none',
          background: '#fff',
        }}>章のトップに戻る</Link>

        {nextLink ? (
          <Link href={nextLink.href} style={{
            padding: '10px 20px',
            background: 'var(--color-primary)', color: '#fff',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.875rem', fontWeight: 700,
            textDecoration: 'none',
          }}>次の項目 → {nextLink.label}</Link>
        ) : <div />}
      </div>
    </article>
  )
}
