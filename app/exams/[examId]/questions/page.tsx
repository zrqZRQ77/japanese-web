import { notFound } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import ExamSidebar from '@/components/layout/ExamSidebar'
import { getExamById } from '@/lib/types/exams-registry'
import { getChaptersByExam } from '@/lib/types/chapters-registry'
import { getAllQuestionSets } from '@/lib/content/question-loader'
import { getAllCardSets } from '@/lib/content/card-loader'
import InlineQuestionCard from '@/components/features/questions/InlineQuestionCard'

interface Props {
  params: Promise<{ examId: string }>
}

function accentColor(colorKey?: string) {
  switch (colorKey) {
    case 'green': return '#10b981'
    case 'blue': return '#3b82f6'
    case 'purple': return '#7c3aed'
    default: return '#f59e0b'
  }
}

export default async function QuestionsIndexPage({ params }: Props) {
  const { examId } = await params
  const exam = getExamById(examId)
  if (!exam) notFound()

  const chapters = getChaptersByExam(examId)
  const questionSets = getAllQuestionSets(examId)
  const qMap = new Map(questionSets.map(q => [q.chapterId, q]))
  const cardSets = getAllCardSets(examId)
  const cardMap = new Map(cardSets.map(c => [c.chapterId, c]))

  const accent = accentColor(exam.color)

  return (
    <>
      <Navbar />
      <div style={{ display: 'flex', height: 'calc(100vh - 64px)', overflow: 'hidden' }}>
        <ExamSidebar exam={exam} />

        <main style={{ flex: 1, overflowY: 'auto', background: 'var(--color-bg-subtle)', padding: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 18 }}>
            <h1 style={{ fontSize: '1.35rem', fontWeight: 800 }}>練習問題</h1>
            <div style={{ color: 'var(--color-text-secondary)' }}>{exam.name}</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 18 }}>
            {chapters.map(ch => {
              const qs = qMap.get(ch.id)
              const cardSet = cardMap.get(ch.id)
              const cardCount = cardSet ? cardSet.cards.length : 0

              return (
                <article key={ch.id} style={{ background: 'white', borderRadius: 10, overflow: 'hidden', boxShadow: '0 8px 20px rgba(2,6,23,0.06)', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ height: 8, background: accent }} />

                  <div style={{ display: 'flex', gap: 12, padding: 16, alignItems: 'center', borderBottom: '1px solid var(--color-border)' }}>
                    <div style={{ width: 56, height: 56, borderRadius: 10, background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>📘</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 800 }}>第{ch.number}章</div>
                      <div style={{ fontSize: '0.96rem', marginTop: 6 }}>{ch.title}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <InlineQuestionCard questionSet={qs} chapterTitle={ch.title} examId={examId} chapterId={ch.id} />
                    </div>
                  </div>

                  <div style={{ padding: 14, display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      <div style={{ padding: '8px 12px', borderRadius: 8, background: '#fff', border: '1px solid #eef2ff', fontWeight: 700 }}>Study Guide</div>
                      <div style={{ padding: '8px 12px', borderRadius: 8, background: '#fff', border: '1px solid #e6fffa' }}>Flashcards <span style={{ color: 'var(--color-text-secondary)', marginLeft: 8 }}>{cardCount} cards</span></div>
                      <div style={{ padding: '8px 12px', borderRadius: 8, background: '#fff', border: '1px solid #fef3c7' }}>Cheat Sheet</div>
                    </div>

                    <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>{exam.shortName}</div>
                  </div>
                </article>
              )
            })}
          </div>
        </main>
      </div>
    </>
  )
}
