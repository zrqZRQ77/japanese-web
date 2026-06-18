// ============================================================
// 検索API  GET /api/search?q=キーワード&examId=boki3
// 問題・カード・章タイトルを横断検索する
// ============================================================
import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { QuestionSet, CardSet } from '@/lib/types'
import { EXAMS_REGISTRY } from '@/lib/types/exams-registry'
import { CHAPTERS_REGISTRY } from '@/lib/types/chapters-registry'

const CONTENT_ROOT = path.join(/*turbopackIgnore: true*/ process.cwd(), 'content', 'exams')

export interface SearchResult {
  type: 'question' | 'card' | 'chapter'
  examId: string
  examName: string
  chapterId: string
  chapterTitle: string
  title: string
  excerpt: string
  url: string
}

function highlight(text: string, query: string): string {
  const max = 120
  const lower = text.toLowerCase()
  const lowerQ = query.toLowerCase()
  const idx = lower.indexOf(lowerQ)
  if (idx === -1) return text.slice(0, max) + (text.length > max ? '…' : '')
  const start = Math.max(0, idx - 30)
  const end = Math.min(text.length, idx + query.length + 60)
  return (start > 0 ? '…' : '') + text.slice(start, end) + (end < text.length ? '…' : '')
}

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q')?.trim() ?? ''
  const filterExamId = req.nextUrl.searchParams.get('examId') ?? ''

  if (q.length < 1) {
    return NextResponse.json({ results: [], total: 0 })
  }

  const lower = q.toLowerCase()
  const results: SearchResult[] = []

  const exams = filterExamId
    ? EXAMS_REGISTRY.filter(e => e.id === filterExamId)
    : EXAMS_REGISTRY

  for (const exam of exams) {
    const chapters = CHAPTERS_REGISTRY[exam.id] ?? []

    // ── 章タイトル検索 ──────────────────────────────────────
    for (const ch of chapters) {
      if (
        ch.title.toLowerCase().includes(lower) ||
        ch.sections.some(s => s.title.toLowerCase().includes(lower))
      ) {
        results.push({
          type: 'chapter',
          examId: exam.id,
          examName: exam.name,
          chapterId: ch.id,
          chapterTitle: ch.title,
          title: `第${ch.number}章 ${ch.title}`,
          excerpt: ch.sections.map(s => s.title).join(' / '),
          url: `/exams/${exam.id}/guide/${ch.id}`,
        })
      }
    }

    // ── 練習問題 JSON 検索 ──────────────────────────────────
    const questionsDir = path.join(CONTENT_ROOT, exam.id, 'questions')
    if (fs.existsSync(questionsDir)) {
      for (const file of fs.readdirSync(questionsDir).filter(f => f.endsWith('.json'))) {
        try {
          const raw = fs.readFileSync(path.join(questionsDir, file), 'utf-8')
          const set: QuestionSet = JSON.parse(raw)
          for (const q2 of set.questions) {
            const searchable = [q2.text, q2.explanation, ...(q2.tags ?? [])].join(' ')
            if (searchable.toLowerCase().includes(lower)) {
              results.push({
                type: 'question',
                examId: exam.id,
                examName: exam.name,
                chapterId: set.chapterId,
                chapterTitle: set.chapterTitle,
                title: q2.text.slice(0, 60) + (q2.text.length > 60 ? '…' : ''),
                excerpt: highlight(q2.explanation, q),
                url: `/exams/${exam.id}/questions/${set.chapterId}`,
              })
            }
          }
        } catch { /* skip malformed */ }
      }
    }

    // ── 知識カード JSON 検索 ────────────────────────────────
    const cardsDir = path.join(CONTENT_ROOT, exam.id, 'cards')
    if (fs.existsSync(cardsDir)) {
      for (const file of fs.readdirSync(cardsDir).filter(f => f.endsWith('.json'))) {
        try {
          const raw = fs.readFileSync(path.join(cardsDir, file), 'utf-8')
          const set: CardSet = JSON.parse(raw)
          for (const card of set.cards) {
            const searchable = [card.front, card.back, ...(card.tags ?? [])].join(' ')
            if (searchable.toLowerCase().includes(lower)) {
              results.push({
                type: 'card',
                examId: exam.id,
                examName: exam.name,
                chapterId: set.chapterId,
                chapterTitle: set.chapterTitle,
                title: card.front.slice(0, 60) + (card.front.length > 60 ? '…' : ''),
                excerpt: highlight(card.back, q),
                url: `/exams/${exam.id}/cards`,
              })
            }
          }
        } catch { /* skip malformed */ }
      }
    }
  }

  // 重複除去（同じURLで同じタイトル）
  const seen = new Set<string>()
  const deduped = results.filter(r => {
    const key = `${r.type}:${r.url}:${r.title}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })

  return NextResponse.json({ results: deduped.slice(0, 40), total: deduped.length })
}
