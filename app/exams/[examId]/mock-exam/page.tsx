import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import MockExam from '@/components/MockExam/MockExam'
import { getAllQuestionSets } from '@/lib/content/question-loader'
import { getExamById } from '@/lib/types/exams-registry'
import type { Question } from '@/lib/types'
import { createPageMetadata } from '@/lib/seo'

interface Props {
  params: Promise<{ examId: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { examId } = await params
  const exam = getExamById(examId)
  if (!exam) return createPageMetadata({ title: '模擬試験', path: `/exams/${examId}/mock-exam`, noIndex: true })

  return createPageMetadata({
    title: `${exam.shortName} 模擬試験`,
    description: `${exam.name}の模擬試験ページです。練習問題を使って実戦形式で確認できます。`,
    path: `/exams/${examId}/mock-exam`,
  })
}

export default async function MockExamPage({ params }: Props) {
  const { examId } = await params
  const exam = getExamById(examId)
  if (!exam) notFound()

  const sets = getAllQuestionSets(examId)
  const questions: Question[] = sets.flatMap(s => s.questions)
  const serialized = JSON.parse(JSON.stringify(questions)) as Question[]

  return (
    <>
      <Navbar />
      <MockExam
        initialQuestions={serialized}
        examId={examId}
        examName={exam.name}
        durationMinutes={examId === 'boki3' ? 60 : 30}
        passRate={examId === 'boki3' ? 70 : 60}
      />
    </>
  )
}
