'use client'
import { useState } from 'react'
import QuestionClient from './QuestionClient'
import { QuestionSet } from '@/lib/types'

interface Props {
  questionSet?: QuestionSet | null
  chapterTitle: string
  examId: string
  chapterId: string
}

export default function InlineQuestionCard({ questionSet, chapterTitle, examId, chapterId }: Props) {
  const [open, setOpen] = useState(false)

  const questions = questionSet?.questions ?? []

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <button onClick={() => setOpen(true)} style={{ background: '#111827', color: '#fff', padding: '8px 12px', borderRadius: 8, border: 'none', fontWeight: 700 }}>開始する</button>
        <div style={{ marginTop: 8, color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>{questions.length} 問</div>
      </div>

      {open && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(2,6,23,0.6)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '96%', height: '92%', background: '#fff', borderRadius: 12, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: 12, borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontWeight: 800 }}>{chapterTitle}</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => setOpen(false)} style={{ background: 'transparent', border: 'none', fontSize: '0.95rem', cursor: 'pointer' }}>閉じる</button>
              </div>
            </div>

            <div style={{ flex: 1, overflow: 'hidden' }}>
              <QuestionClient
                questions={questions}
                chapterTitle={chapterTitle}
                examId={examId}
                chapterId={chapterId}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
