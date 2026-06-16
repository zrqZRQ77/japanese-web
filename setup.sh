#!/bin/bash
# ============================================================
# 一键更新脚本 — 在 shikaku-navi-1-6 根目录运行
# 使用方法：bash setup.sh
# ============================================================

echo "🚀 更新开始..."

# ===== 1. GuideSidebar.tsx =====
cat > components/layout/GuideSidebar.tsx << 'EOF'
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ChapterMeta } from '@/lib/types'

interface Props {
  examId: string
  chapters: ChapterMeta[]
  currentChapterId: string
  currentSectionId?: string
  progress?: number
}

export default function GuideSidebar({ examId, chapters, currentChapterId, currentSectionId }: Props) {
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
      <div style={{ padding: '16px 14px 0' }}>
        <Link href={`/exams/${examId}`} style={{
          fontSize: '0.75rem', color: 'var(--color-text-muted)',
          textDecoration: 'none', fontWeight: 600,
          display: 'flex', alignItems: 'center', gap: 4,
          marginBottom: 10,
        }}>← ダッシュボード</Link>
        <div style={{
          fontWeight: 800, fontSize: '0.9rem',
          marginBottom: 14, color: 'var(--color-text)',
          lineHeight: 1.4,
        }}>学習ガイド</div>
      </div>

      <nav style={{ padding: '0 8px 20px', flex: 1 }}>
        {chapters.map(ch => {
          const isCurrentChapter = ch.id === currentChapterId
          const isExpanded = expanded === ch.id
          return (
            <div key={ch.id} style={{ marginBottom: 1 }}>
              <button
                onClick={() => setExpanded(isExpanded ? '' : ch.id)}
                style={{
                  width: '100%', textAlign: 'left',
                  display: 'flex', alignItems: 'flex-start',
                  justifyContent: 'space-between', gap: 6,
                  padding: '8px 10px',
                  borderRadius: 'var(--radius-sm)',
                  background: isCurrentChapter ? 'var(--color-primary-light)' : 'transparent',
                  border: 'none', cursor: 'pointer',
                  fontWeight: isCurrentChapter ? 700 : 500,
                  fontSize: '0.82rem',
                  color: isCurrentChapter ? 'var(--color-primary)' : 'var(--color-text)',
                  lineHeight: 1.4,
                }}
              >
                <span style={{ flex: 1 }}>第{ch.number}章 {ch.title}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5"
                  style={{ transform: isExpanded ? 'rotate(180deg)' : 'none', transition: '0.2s', flexShrink: 0, marginTop: 2 }}>
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              {isExpanded && (
                <div style={{ paddingLeft: 8, marginBottom: 4 }}>
                  {ch.sections.map(sec => {
                    const isActiveSection = sec.id === currentSectionId
                    return (
                      <Link key={sec.id}
                        href={`${base}/${ch.id}?section=${sec.id}`}
                        style={{
                          display: 'block', padding: '6px 10px',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.78rem',
                          color: isActiveSection ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                          textDecoration: 'none',
                          borderLeft: `2px solid ${isActiveSection ? 'var(--color-primary)' : 'var(--color-border)'}`,
                          marginLeft: 8, marginBottom: 1,
                          background: isActiveSection ? 'var(--color-primary-light)' : 'transparent',
                          fontWeight: isActiveSection ? 600 : 400,
                        }}
                      >{sec.number} {sec.title}</Link>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </nav>
    </aside>
  )
}
EOF
echo "✅ GuideSidebar.tsx"

# ===== 2. guide/page.tsx =====
mkdir -p "app/exams/[examId]/guide"
cat > "app/exams/[examId]/guide/page.tsx" << 'EOF'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import GuideSidebar from '@/components/layout/GuideSidebar'
import { getExamById } from '@/lib/types/exams-registry'
import { getChaptersByExam } from '@/lib/types/chapters-registry'

export default async function GuideIndexPage({ params }: { params: Promise<{ examId: string }> }) {
  const { examId } = await params
  const exam = getExamById(examId)
  if (!exam) notFound()
  const chapters = getChaptersByExam(examId)
  const base = `/exams/${examId}`

  return (
    <>
      <Navbar />
      <div style={{ display: 'flex', height: 'calc(100vh - 64px)', overflow: 'hidden' }}>
        <GuideSidebar examId={examId} chapters={chapters} currentChapterId="" progress={0} />
        <main style={{
          flex: 1, overflowY: 'auto',
          background: 'var(--color-bg-subtle)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ maxWidth: 560, width: '100%', padding: '0 24px' }}>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <div style={{ fontSize: '3.5rem', marginBottom: 16 }}>📖</div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--color-text)', marginBottom: 10 }}>
                {exam.shortName} 学習ガイド
              </h1>
              <p style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                全{chapters.length}章構成で、基礎から体系的に学べます。<br />
                左のメニューから章を選んで学習を始めましょう。
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 40 }}>
              {[
                { label: '総章数', value: `${chapters.length}章` },
                { label: '総セクション', value: `${chapters.reduce((s, c) => s + c.sections.length, 0)}節` },
                { label: '学習状況', value: '準備中' },
              ].map(item => (
                <div key={item.label} style={{
                  background: '#fff', border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)', padding: '20px 16px',
                  textAlign: 'center', boxShadow: 'var(--shadow-card)',
                }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--color-primary)', marginBottom: 4 }}>{item.value}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>{item.label}</div>
                </div>
              ))}
            </div>
            {chapters[0] && (
              <div style={{ textAlign: 'center' }}>
                <Link href={`${base}/guide/${chapters[0].id}`} style={{
                  display: 'inline-block', padding: '14px 40px',
                  background: 'var(--color-primary)', color: '#fff',
                  borderRadius: 'var(--radius-sm)', fontWeight: 700,
                  fontSize: '1rem', textDecoration: 'none',
                }}>第1章から始める →</Link>
                <div style={{ marginTop: 12, fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                  または左のメニューから任意の章を選択
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  )
}
EOF
echo "✅ guide/page.tsx"

# ===== 3. cards/page.tsx =====
mkdir -p "app/exams/[examId]/cards"
cat > "app/exams/[examId]/cards/page.tsx" << 'EOF'
import { notFound } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import { getExamById } from '@/lib/types/exams-registry'

export default async function Page({ params }: { params: Promise<{ examId: string }> }) {
  const { examId } = await params
  const exam = getExamById(examId)
  if (!exam) notFound()
  return (
    <>
      <Navbar />
      <main style={{
        height: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: 'var(--color-bg-subtle)', gap: 16,
      }}>
        <div style={{ fontSize: '3rem' }}>🃏</div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text)' }}>{exam.shortName} 知識カード</h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>このページは準備中です。</p>
      </main>
    </>
  )
}
EOF
echo "✅ cards/page.tsx"

# ===== 4. mock-exam/page.tsx =====
mkdir -p "app/exams/[examId]/mock-exam"
cat > "app/exams/[examId]/mock-exam/page.tsx" << 'EOF'
import { notFound } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import { getExamById } from '@/lib/types/exams-registry'

export default async function Page({ params }: { params: Promise<{ examId: string }> }) {
  const { examId } = await params
  const exam = getExamById(examId)
  if (!exam) notFound()
  return (
    <>
      <Navbar />
      <main style={{
        height: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: 'var(--color-bg-subtle)', gap: 16,
      }}>
        <div style={{ fontSize: '3rem' }}>📋</div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text)' }}>{exam.shortName} 模擬試験</h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>このページは準備中です。</p>
      </main>
    </>
  )
}
EOF
echo "✅ mock-exam/page.tsx"

# ===== 5. ai-chat/page.tsx =====
mkdir -p "app/exams/[examId]/ai-chat"
cat > "app/exams/[examId]/ai-chat/page.tsx" << 'EOF'
import { notFound } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import { getExamById } from '@/lib/types/exams-registry'

export default async function Page({ params }: { params: Promise<{ examId: string }> }) {
  const { examId } = await params
  const exam = getExamById(examId)
  if (!exam) notFound()
  return (
    <>
      <Navbar />
      <main style={{
        height: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: 'var(--color-bg-subtle)', gap: 16,
      }}>
        <div style={{ fontSize: '3rem' }}>🤖</div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text)' }}>{exam.shortName} AI質問</h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>このページは準備中です。</p>
      </main>
    </>
  )
}
EOF
echo "✅ ai-chat/page.tsx"

# ===== 6. questions/[chapterId]/page.tsx =====
mkdir -p "app/exams/[examId]/questions/[chapterId]"
cat > "app/exams/[examId]/questions/[chapterId]/page.tsx" << 'EOF'
import { notFound } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import QuestionClient from '@/components/features/questions/QuestionClient'
import { getExamById } from '@/lib/types/exams-registry'
import { getChapterById } from '@/lib/types/chapters-registry'
import { getQuestionSet } from '@/lib/content/question-loader'

interface Props {
  params: Promise<{ examId: string; chapterId: string }>
}

export default async function QuestionsPage({ params }: Props) {
  const { examId, chapterId } = await params
  const exam = getExamById(examId)
  if (!exam) notFound()
  const chapter = getChapterById(examId, chapterId)
  if (!chapter) notFound()
  const questionSet = getQuestionSet(examId, chapterId)

  if (!questionSet || questionSet.questions.length === 0) {
    return (
      <>
        <Navbar />
        <main style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          height: 'calc(100vh - 64px)',
          background: 'var(--color-bg-subtle)', gap: 12,
        }}>
          <div style={{ fontSize: '3rem' }}>✏️</div>
          <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>第{chapter.number}章 {chapter.title}</div>
          <div style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>この章の練習問題は準備中です。</div>
        </main>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div style={{ display: 'flex', height: 'calc(100vh - 64px)', overflow: 'hidden' }}>
        <QuestionClient
          questions={questionSet.questions}
          chapterTitle={questionSet.chapterTitle}
          examId={examId}
          chapterId={chapterId}
        />
      </div>
    </>
  )
}
EOF
echo "✅ questions/[chapterId]/page.tsx"

# ===== 7. chapters-registry.ts =====
cat > lib/types/chapters-registry.ts << 'EOF'
import { ChapterMeta } from './index'

export const CHAPTERS_REGISTRY: Record<string, ChapterMeta[]> = {
  boki3: [
    { id: 'ch1', number: 1, title: '簿記の基本', sections: [
      { id: 'ch1-s1', number: '1-1', title: '簿記とは' },
      { id: 'ch1-s2', number: '1-2', title: '資産・負債・純資産' },
      { id: 'ch1-s3', number: '1-3', title: '収益と費用' },
    ]},
    { id: 'ch2', number: 2, title: '勘定科目と5要素', sections: [
      { id: 'ch2-s1', number: '2-1', title: '勘定科目とは' },
      { id: 'ch2-s2', number: '2-2', title: '5要素の分類' },
    ]},
    { id: 'ch3', number: 3, title: '仕訳の基礎', sections: [
      { id: 'ch3-s1', number: '3-1', title: '仕訳のルール' },
      { id: 'ch3-s2', number: '3-2', title: '借方と貸方' },
    ]},
    { id: 'ch4', number: 4, title: '現金と預金', sections: [
      { id: 'ch4-s1', number: '4-1', title: '現金とは' },
      { id: 'ch4-s2', number: '4-2', title: '現金として扱うもの' },
      { id: 'ch4-s3', number: '4-3', title: '当座預金とは' },
      { id: 'ch4-s4', number: '4-4', title: '普通預金とは' },
      { id: 'ch4-s5', number: '4-5', title: '小口現金とは' },
    ]},
    { id: 'ch5', number: 5, title: '商品売買', sections: [
      { id: 'ch5-s1', number: '5-1', title: '商品の仕入れ' },
      { id: 'ch5-s2', number: '5-2', title: '商品の売上げ' },
      { id: 'ch5-s3', number: '5-3', title: '返品の処理' },
      { id: 'ch5-s4', number: '5-4', title: '諸掛り' },
    ]},
    { id: 'ch6', number: 6, title: '売掛金・買掛金', sections: [
      { id: 'ch6-s1', number: '6-1', title: '売掛金とクレジット売掛金' },
      { id: 'ch6-s2', number: '6-2', title: '買掛金' },
    ]},
    { id: 'ch7', number: 7, title: '手形', sections: [
      { id: 'ch7-s1', number: '7-1', title: '約束手形' },
      { id: 'ch7-s2', number: '7-2', title: '電子記録債権' },
      { id: 'ch7-s3', number: '7-3', title: '手形の裏書・割引' },
    ]},
    { id: 'ch8', number: 8, title: 'その他の債権・債務', sections: [
      { id: 'ch8-s1', number: '8-1', title: '貸付金・借入金' },
      { id: 'ch8-s2', number: '8-2', title: '未収金・未払金' },
      { id: 'ch8-s3', number: '8-3', title: '前払金・前受金' },
    ]},
    { id: 'ch9', number: 9, title: '固定資産', sections: [
      { id: 'ch9-s1', number: '9-1', title: '固定資産の取得' },
      { id: 'ch9-s2', number: '9-2', title: '減価償却' },
      { id: 'ch9-s3', number: '9-3', title: '固定資産の売却' },
    ]},
    { id: 'ch10', number: 10, title: '費用・収益の見越し繰延べ', sections: [
      { id: 'ch10-s1', number: '10-1', title: '費用の繰延べ・収益の繰延べ' },
      { id: 'ch10-s2', number: '10-2', title: '費用の見越し・収益の見越し' },
      { id: 'ch10-s3', number: '10-3', title: '再振替仕訳まとめ' },
    ]},
    { id: 'ch11', number: 11, title: '決算整理', sections: [
      { id: 'ch11-s1', number: '11-1', title: '決算整理とは' },
      { id: 'ch11-s2', number: '11-2', title: '売上原価の計算' },
      { id: 'ch11-s3', number: '11-3', title: '貸倒引当金' },
      { id: 'ch11-s4', number: '11-4', title: '消耗品の処理' },
    ]},
    { id: 'ch12', number: 12, title: '試算表と精算表', sections: [
      { id: 'ch12-s1', number: '12-1', title: '試算表' },
      { id: 'ch12-s2', number: '12-2', title: '精算表' },
      { id: 'ch12-s3', number: '12-3', title: '決算の流れ' },
    ]},
    { id: 'ch13', number: 13, title: '財務諸表', sections: [
      { id: 'ch13-s1', number: '13-1', title: '貸借対照表' },
      { id: 'ch13-s2', number: '13-2', title: '損益計算書' },
      { id: 'ch13-s3', number: '13-3', title: '財務諸表のまとめ' },
    ]},
  ],
  fp3: [
    { id: 'ch1', number: 1, title: 'ライフプランニングと資金計画', sections: [
      { id: 'ch1-s1', number: '1-1', title: 'FPとは' },
      { id: 'ch1-s2', number: '1-2', title: 'ライフプランニング' },
    ]},
    { id: 'ch2', number: 2, title: 'リスク管理', sections: [
      { id: 'ch2-s1', number: '2-1', title: '保険の基礎知識' },
    ]},
  ],
}

export function getChaptersByExam(examId: string): ChapterMeta[] {
  return CHAPTERS_REGISTRY[examId] ?? []
}

export function getChapterById(examId: string, chapterId: string): ChapterMeta | undefined {
  return getChaptersByExam(examId).find(c => c.id === chapterId)
}
EOF
echo "✅ chapters-registry.ts"

echo ""
echo "🎉 全部完了！次のステップ："
echo "  git add ."
echo "  git commit -m \"update: apply all fixes\""
echo "  git push --set-upstream origin master"
