// ============================================================
// 模擬試験 JSON ローダー
// /content/exams/{examId}/mock-exam/questions.json を読み込む
// ============================================================
import fs from 'fs'
import path from 'path'
import { MockQuestionSet } from '../types'

const CONTENT_ROOT = path.join(/*turbopackIgnore: true*/ process.cwd(), 'content', 'exams')

export function getMockQuestionSet(examId: string): MockQuestionSet | null {
  const filePath = path.join(CONTENT_ROOT, examId, 'mock-exam', 'questions.json')
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(raw) as MockQuestionSet
}
