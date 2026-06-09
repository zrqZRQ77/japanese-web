'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { questions, exams } from '../../lib/data'
import styles from './practice.module.css'

function PracticeContent() {
  const searchParams = useSearchParams()
  const examId = searchParams.get('exam') || 'fp3'
  const exam = exams.find(e => e.id === examId) || exams[0]
  const qs = questions[examId] || questions['fp3']

  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [aiAnswer, setAiAnswer] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [showAi, setShowAi] = useState(false)

  const q = qs[current]

  function selectOption(idx) {
    if (selected !== null) return
    setSelected(idx)
    if (idx === q.answer) setScore(s => s + 1)
  }

  function next() {
    if (current + 1 >= qs.length) {
      setFinished(true)
    } else {
      setCurrent(c => c + 1)
      setSelected(null)
      setAiAnswer('')
      setShowAi(false)
    }
  }

  function restart() {
    setCurrent(0)
    setSelected(null)
    setScore(0)
    setFinished(false)
    setAiAnswer('')
    setShowAi(false)
  }

  async function askAI() {
    setShowAi(true)
    setAiLoading(true)
    setAiAnswer('')
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q.question,
          options: q.options,
          correctAnswer: q.options[q.answer],
          explanation: q.explanation,
        }),
      })
      const data = await res.json()
      setAiAnswer(data.answer)
    } catch {
      setAiAnswer('AI解説の取得に失敗しました。APIキーが設定されているか確認してください。')
    }
    setAiLoading(false)
  }

  if (finished) {
    const pct = Math.round((score / qs.length) * 100)
    return (
      <>
        <Navbar />
        <main className={styles.main}>
          <div className={styles.resultBox}>
            <div className={styles.resultIcon}>{pct >= 70 ? '🎉' : '📚'}</div>
            <h2 className={styles.resultTitle}>
              {pct >= 70 ? '素晴らしい結果です！' : 'もう少し復習しましょう'}
            </h2>
            <div className={styles.resultScore}>
              <span className={styles.scoreNum}>{score}</span>
              <span className={styles.scoreDen}> / {qs.length}問正解</span>
            </div>
            <div className={styles.resultPct} style={{ color: pct >= 70 ? 'var(--jp-green)' : 'var(--jp-red)' }}>
              正答率 {pct}%
            </div>
            <div className={styles.resultMsg}>
              {pct >= 70
                ? '合格ラインを超えています。このまま学習を続けましょう！'
                : '間違えた問題を重点的に復習することをおすすめします。'}
            </div>
            <div className={styles.resultBtns}>
              <button className="btn-primary" onClick={restart}>もう一度挑戦する</button>
              <Link href="/exams" className="btn-secondary">他の試験を選ぶ</Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.header}>
          <Link href="/exams" className={styles.backLink}>← 試験一覧</Link>
          <h1 className={styles.examTitle}>{exam.name}</h1>
          <div className={styles.progressInfo}>
            {current + 1} / {qs.length}問
          </div>
        </div>

        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${((current) / qs.length) * 100}%` }}
          />
        </div>

        <div className={styles.questionBox}>
          <div className={styles.category}>{q.category}</div>
          <h2 className={styles.questionText}>問 {current + 1}. {q.question}</h2>

          <div className={styles.options}>
            {q.options.map((opt, i) => {
              let cls = styles.option
              if (selected !== null) {
                if (i === q.answer) cls += ` ${styles.correct}`
                else if (i === selected && i !== q.answer) cls += ` ${styles.wrong}`
              }
              return (
                <button key={i} className={cls} onClick={() => selectOption(i)}>
                  <span className={styles.optNum}>{i + 1}</span>
                  <span>{opt}</span>
                </button>
              )
            })}
          </div>

          {selected !== null && (
            <div className={styles.explanationBox}>
              <div className={styles.explanationTitle}>
                {selected === q.answer ? '✓ 正解！' : '✗ 不正解'}
              </div>
              <p className={styles.explanationText}>{q.explanation}</p>

              {!showAi ? (
                <button className={styles.aiBtn} onClick={askAI}>
                  🤖 AIにもっと詳しく聞く
                </button>
              ) : (
                <div className={styles.aiBox}>
                  <div className={styles.aiLabel}>🤖 AI解説</div>
                  {aiLoading ? (
                    <div className={styles.aiLoading}>解説を生成中...</div>
                  ) : (
                    <p className={styles.aiText}>{aiAnswer}</p>
                  )}
                </div>
              )}

              <button className="btn-primary" onClick={next} style={{ marginTop: '1rem' }}>
                {current + 1 >= qs.length ? '結果を見る →' : '次の問題 →'}
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

export default function PracticePage() {
  return (
    <Suspense fallback={<div style={{padding:'2rem',textAlign:'center'}}>読み込み中...</div>}>
      <PracticeContent />
    </Suspense>
  )
}
