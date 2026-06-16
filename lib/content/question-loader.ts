// ============================================================
// 練習問題 JSON ローダー
// /content/exams/{examId}/questions/{chapterId}.json を読み込む
// ============================================================
import fs from 'fs'
import path from 'path'
import { QuestionSet } from '../types'

const CONTENT_ROOT = path.join(process.cwd(), 'content', 'exams')

export function getQuestionSet(examId: string, chapterId: string): QuestionSet | null {
  const filePath = path.join(CONTENT_ROOT, examId, 'questions', `${chapterId}.json`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(raw) as QuestionSet
}

export function getAllQuestionSets(examId: string): QuestionSet[] {
  const dir = path.join(CONTENT_ROOT, examId, 'questions')
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.json'))
    .sort()
    .map(f => {
      const raw = fs.readFileSync(path.join(dir, f), 'utf-8')
      return JSON.parse(raw) as QuestionSet
    })
}
