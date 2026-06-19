import { notFound } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import ExamSidebar from '@/components/layout/ExamSidebar'
import FlashcardDeck from '@/components/features/cards/FlashcardDeck'
import { getExamById } from '@/lib/types/exams-registry'
import { getChaptersByExam } from '@/lib/types/chapters-registry'
import { getCardSet } from '@/lib/content/card-loader'

export default async function Page({ params }: { params: Promise<{ examId: string }> }) {
  const { examId } = await params
  const exam = getExamById(examId)
  if (!exam) notFound()

  const chapters = getChaptersByExam(examId)
  const cardSets = chapters.flatMap(ch => {
    const set = getCardSet(examId, ch.id)
    return set && set.cards.length > 0 ? [{ chapter: ch, set }] : []
  })
  const groups = cardSets.map(({ chapter, set }) => ({ chapter, cards: set.cards }))

  return (
    <>
      <Navbar />
      <div style={{
        display: 'flex',
        height: 'calc(100vh - 64px)',
        overflow: 'hidden',
      }}>
        <ExamSidebar exam={exam} />

        <main style={{
          flex: 1,
          overflowY: 'auto',
          background: 'var(--color-bg-subtle)',
          padding: '32px',
        }}>
          <FlashcardDeck examShortName={exam.shortName} groups={groups} />
        </main>
      </div>
    </>
  )
}
