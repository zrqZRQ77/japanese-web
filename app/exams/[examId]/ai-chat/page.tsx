import { notFound } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import ExamSidebar from '@/components/layout/ExamSidebar'
import { getExamById } from '@/lib/types/exams-registry'

export default async function Page({ params }: { params: Promise<{ examId: string }> }) {
  const { examId } = await params
  const exam = getExamById(examId)
  if (!exam) notFound()
  return (
    <>
      <Navbar />
      <div style={{ display: 'flex', height: 'calc(100vh - 64px)' }}>
        <ExamSidebar exam={exam} />
        <main style={{ flex: 1, padding: '3rem', background: 'var(--color-bg-subtle)' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{exam.shortName}</h1>
          <p style={{ color: 'var(--color-text-secondary)', marginTop: '1rem' }}>このページは準備中です。</p>
        </main>
      </div>
    </>
  )
}
