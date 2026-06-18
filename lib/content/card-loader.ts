// ============================================================
// 知識カード JSON ローダー
// /content/exams/{examId}/cards/{chapterId}.json を読み込む
// ============================================================
import fs from 'fs'
import path from 'path'
import { CardSet } from '../types'

const CONTENT_ROOT = path.join(/*turbopackIgnore: true*/ process.cwd(), 'content', 'exams')

export function getCardSet(examId: string, chapterId: string): CardSet | null {
  const filePath = path.join(CONTENT_ROOT, examId, 'cards', `${chapterId}.json`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(raw) as CardSet
}

export function getAllCardSets(examId: string): CardSet[] {
  const dir = path.join(CONTENT_ROOT, examId, 'cards')
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.json'))
    .sort()
    .map(f => {
      const raw = fs.readFileSync(path.join(dir, f), 'utf-8')
      return JSON.parse(raw) as CardSet
    })
}
