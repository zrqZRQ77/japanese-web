// ============================================================
// 進捗管理フック
// ストレージの読み書きは progressAdapter.ts に委譲している
// 将来 Supabase に移行する時は progressAdapter.ts だけ変える
// ============================================================
'use client'
import { useState, useEffect, useCallback } from 'react'
import { ExamProgress } from '@/lib/types'
import {
  loadProgressFromStorage,
  saveProgressToStorage,
  deleteProgressFromStorage,
} from '@/lib/storage/progressAdapter'

export function getDefaultProgress(examId: string): ExamProgress {
  return {
    examId,
    completedChapters: [],
    currentChapterId: 'ch1',
    studyMinutes: 0,
    questionsAnswered: 0,
    correctRate: 0,
    streakDays: 0,
    lastStudiedAt: '',
  }
}

function getPreviousDay(dateStr: string): string {
  const d = new Date(dateStr)
  d.setDate(d.getDate() - 1)
  return d.toISOString().split('T')[0]
}

function calcUpdatedProgress(
  base: ExamProgress,
  chapterId: string,
  answeredCount: number,
  correctCount: number,
): ExamProgress {
  const completedChapters = Array.from(new Set([...base.completedChapters, chapterId]))
  const totalAnswered = base.questionsAnswered + answeredCount
  const prevCorrect = Math.round(base.correctRate * base.questionsAnswered / 100)
  const newCorrectRate = totalAnswered > 0
    ? Math.round(((prevCorrect + correctCount) / totalAnswered) * 100)
    : 0

  const today = new Date().toISOString().split('T')[0]
  const lastDay = base.lastStudiedAt?.split('T')[0]
  let streakDays = base.streakDays
  if (lastDay === today) {
    // 当日は変更なし
  } else if (lastDay === getPreviousDay(today)) {
    streakDays += 1
  } else {
    streakDays = 1
  }

  return {
    ...base,
    completedChapters,
    currentChapterId: chapterId,
    questionsAnswered: totalAnswered,
    correctRate: newCorrectRate,
    studyMinutes: base.studyMinutes + 5,
    streakDays,
    lastStudiedAt: new Date().toISOString(),
  }
}

/** React フック：進捗の読み書き */
export function useProgress(examId: string) {
  const [progress, setProgress] = useState<ExamProgress | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const p = loadProgressFromStorage(examId) ?? getDefaultProgress(examId)
    setProgress(p)
    setLoaded(true)
  }, [examId])

  const update = useCallback((patch: Partial<ExamProgress>) => {
    setProgress(prev => {
      const next = { ...(prev ?? getDefaultProgress(examId)), ...patch }
      saveProgressToStorage(next)
      return next
    })
  }, [examId])

  const completeChapter = useCallback((
    chapterId: string,
    answeredCount: number,
    correctCount: number,
  ) => {
    setProgress(prev => {
      const base = prev ?? getDefaultProgress(examId)
      const next = calcUpdatedProgress(base, chapterId, answeredCount, correctCount)
      saveProgressToStorage(next)
      return next
    })
  }, [examId])

  const resetProgress = useCallback(() => {
    const fresh = getDefaultProgress(examId)
    deleteProgressFromStorage(examId)
    setProgress(fresh)
  }, [examId])

  return { progress, loaded, update, completeChapter, resetProgress }
}
