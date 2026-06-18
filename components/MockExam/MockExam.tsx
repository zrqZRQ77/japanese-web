"use client"
import React, { useEffect, useMemo, useState } from 'react'
import type { Question } from '../../lib/types'

interface Props {
  initialQuestions: Question[]
  durationMinutes?: number
  questionsCount?: number
}

function shuffle<T>(arr: T[]) {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function randomizeNumbersInText(text: string) {
  // Replace integers with nearby random numbers to avoid copying exact sources
  return text.replace(/\d+/g, (m) => {
    const n = Number(m)
    if (Number.isNaN(n)) return m
    const delta = Math.floor(Math.random() * 19) - 9 // -9..+9
    return String(Math.max(1, n + delta))
  })
}

function prepareQuestion(q: Question) {
  const q2: Question = JSON.parse(JSON.stringify(q))
  q2.text = randomizeNumbersInText(q2.text)
  if (q2.options) {
    q2.options = q2.options.map((opt) => ({ ...opt, text: randomizeNumbersInText(opt.text) }))
  }
  q2.explanation = randomizeNumbersInText(q2.explanation || '')
  return q2
}

export default function MockExam({ initialQuestions, durationMinutes = 20, questionsCount = 10 }: Props) {
  const [started, setStarted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(durationMinutes * 60)
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})
  const [submitted, setSubmitted] = useState(false)
  const prepared = useMemo(() => {
    const pool = shuffle(initialQuestions).slice(0, questionsCount).map(prepareQuestion)
    return pool
  }, [initialQuestions, questionsCount])

  useEffect(() => {
    if (!started || submitted) return
    const t = setInterval(() => {
      setTimeLeft((s) => {
        if (s <= 1) {
          clearInterval(t)
          setSubmitted(true)
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(t)
  }, [started, submitted])

  function selectOption(q: Question, label: string, checked?: boolean) {
    setAnswers((prev) => {
      const key = q.id
      if (q.type === 'multiple') {
        const prevArr = (prev[key] as string[]) || []
        const next = checked ? [...prevArr, label] : prevArr.filter((l) => l !== label)
        return { ...prev, [key]: next }
      }
      return { ...prev, [key]: label }
    })
  }

  function computeScore() {
    let correct = 0
    prepared.forEach((q) => {
      const ans = answers[q.id]
      if (!ans) return
      if (q.type === 'multiple') {
        const expected = Array.isArray(q.correctAnswer) ? q.correctAnswer : [String(q.correctAnswer)]
        const a = Array.isArray(ans) ? ans.slice().sort().join(',') : String(ans)
        const e = expected.slice().sort().join(',')
        if (a === e) correct += 1
      } else {
        if (String(q.correctAnswer) === String(ans)) correct += 1
      }
    })
    return { total: prepared.length, correct }
  }

  const { total, correct } = submitted ? computeScore() : { total: prepared.length, correct: 0 }

  return (
    <div className="container-page">
      <div style={{ padding: '32px 0' }}>
        <div className="max-w-5xl mx-auto">
          <div style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: 10 }} className="p-4 mb-4">
            <div className="flex items-center justify-between">
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>模拟考试（练习）</h2>
              <div className="text-sm text-gray-600">剩余时间: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</div>
            </div>
            <p className="text-sm text-gray-500 mt-2">共 {prepared.length} 题 · 计时 {durationMinutes} 分钟</p>
            {!started && (
              <div className="mt-4">
                <button
                  onClick={() => setStarted(true)}
                  style={{ background: 'var(--color-primary)', color: '#fff', border: '1px solid var(--color-border)' }}
                  className="px-4 py-2 rounded"
                >开始考试</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {prepared.map((q, idx) => (
        <div key={q.id} className={`mb-4 p-4 rounded border ${idx === current ? 'border-blue-300 bg-blue-50' : 'border-gray-100 bg-white'}`}>
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm text-gray-600">题 {idx + 1}</div>
              <div className="mt-2 text-base" dangerouslySetInnerHTML={{ __html: q.text }} />
            </div>
            <div className="text-sm text-gray-500">{q.type || 'single'}</div>
          </div>

          <div className="mt-3 space-y-2">
            {q.options && q.options.map((opt) => (
              <label key={opt.label} className="flex items-center gap-3">
                {q.type === 'multiple' ? (
                  <input type="checkbox" checked={Array.isArray(answers[q.id]) && (answers[q.id] as string[]).includes(opt.label)} onChange={(e) => selectOption(q, opt.label, e.target.checked)} />
                ) : (
                  <input type="radio" name={q.id} checked={answers[q.id] === opt.label} onChange={() => selectOption(q, opt.label)} />
                )}
                <span className="text-sm" dangerouslySetInnerHTML={{ __html: `${opt.label}. ${opt.text}` }} />
              </label>
            ))}
          </div>

          <div className="mt-3 flex justify-between items-center">
            <div className="space-x-2">
              <button className="px-3 py-1 border rounded" onClick={() => setCurrent((c) => Math.max(0, c - 1))}>上一题</button>
              <button className="px-3 py-1 border rounded" onClick={() => setCurrent((c) => Math.min(prepared.length - 1, c + 1))}>下一题</button>
            </div>
            {!submitted ? (
              <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={() => setSubmitted(true)}>交卷并评分</button>
            ) : null}
          </div>

          {submitted && (
            <div className="mt-3 p-3 bg-white border rounded">
              <div className="text-sm text-gray-700">正确答案: {String(q.correctAnswer)}</div>
              <div className="text-sm text-gray-600 mt-1">解析: <span dangerouslySetInnerHTML={{ __html: q.explanation || '-' }} /></div>
            </div>
          )}
        </div>
      ))}

      {submitted && (
        <div className="mt-4 p-4 bg-white rounded shadow">
          <div className="text-lg">得分: {correct} / {total}</div>
          <div className="text-sm text-gray-600 mt-2">比例: {(correct / total * 100).toFixed(1)}%</div>
        </div>
      )}
    </div>
  )
}
