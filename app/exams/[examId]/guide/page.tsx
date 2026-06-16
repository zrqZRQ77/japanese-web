// ============================================================
// 学習ガイド 一覧ページ  /exams/[examId]/guide
// ============================================================
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import ExamSidebar from '@/components/layout/ExamSidebar'
import GuideSidebar from '@/components/layout/GuideSidebar'
import { getExamById } from '@/lib/types/exams-registry'
import { getChaptersByExam } from '@/lib/types/chapters-registry'

const STATUS_MAP: Record<string, { label: string; color: string; bg: string; border: string }> = {
  ch1: { label: '✓ 完了', color: 'var(--color-success)', bg: '#f0fdf4', border: '#86efac' },
  ch2: { label: '✓ 完了', color: 'var(--color-success)', bg: '#f0fdf4', border: '#86efac' },
  ch3: { label: '✓ 完了', color: 'var(--color-success)', bg: '#f0fdf4', border: '#86efac' },
  ch4: { label: '学習中', color: 'var(--color-warning)', bg: '#fffbeb', border: '#fcd34d' },
}

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
        <ExamSidebar exam={exam} />
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          <GuideSidebar examId={examId} chapters={chapters} currentChapterId="" progress={25} />

          <main style={{ flex: 1, overflowY: 'auto', padding: '36px 40px', background: '#fff' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: 6 }}>
              {exam.shortName} 学習ガイド
            </h1>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 32, fontSize: '0.9rem' }}>
              各章の解説を読んで、基礎から理解を深めましょう。
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {chapters.map(ch => {
                const st = STATUS_MAP[ch.id]
                return (
                  <Link key={ch.id} href={`${base}/guide/${ch.id}`}
                    style={{ textDecoration: 'none' }}>
                    <div style={{
                      border: `1px solid ${st ? st.border : 'var(--color-border)'}`,
                      background: st ? st.bg : 'var(--color-bg-subtle)',
                      borderRadius: 'var(--radius-md)',
                      padding: '18px 22px',
                      display: 'flex', alignItems: 'center',
                      justifyContent: 'space-between', gap: 16,
                      cursor: 'pointer',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{
                          width: 40, height: 40, borderRadius: '50%',
                          background: st ? st.color : 'var(--color-border)',
                          color: '#fff', display: 'flex',
                          alignItems: 'center', justifyContent: 'center',
                          fontWeight: 900, fontSize: '0.875rem', flexShrink: 0,
                          opacity: st ? 1 : 0.4,
                        }}>{ch.number}</div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 2 }}>
                            第{ch.number}章 {ch.title}
                          </div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                            {ch.sections.length}セクション
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        {st && (
                          <span style={{
                            fontSize: '0.8rem', fontWeight: 700,
                            color: st.color,
                          }}>{st.label}</span>
                        )}
                        {!st && (
                          <span style={{
                            fontSize: '0.8rem', color: 'var(--color-text-muted)',
                          }}>未学習</span>
                        )}
                        <span style={{ color: 'var(--color-text-muted)', fontSize: '1rem' }}>›</span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
