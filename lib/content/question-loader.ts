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
  const sets: QuestionSet[] = fs.readdirSync(dir)
    .filter(f => f.endsWith('.json'))
    .sort()
    .map(f => {
      const raw = fs.readFileSync(path.join(dir, f), 'utf-8')
      return JSON.parse(raw) as QuestionSet
    })

  // 如果存在官方导入文件 official.json（位于 exam 根或 questions 目录），优先放到数组开头
  const officialPaths = [
    path.join(CONTENT_ROOT, examId, 'official.json'),
    path.join(CONTENT_ROOT, examId, 'questions', 'official.json'),
  ]
  for (const p of officialPaths) {
    if (fs.existsSync(p)) {
      try {
        const raw = fs.readFileSync(p, 'utf-8')
        const off = JSON.parse(raw) as QuestionSet
        // 若结构看起来合理，则放到前面
        if (off && off.questions && Array.isArray(off.questions)) {
          sets.unshift(off)
          break
        }
      } catch (e) {
        // ignore parse errors
      }
    }
  }

  return sets
}
