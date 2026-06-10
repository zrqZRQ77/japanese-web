'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { exams } from '../../lib/data'
import styles from './practice.module.css'

// correct_answer "ア"/"イ"/"ウ"/"エ" → 選択肢インデックスに変換
function getAnswerIndex(correct_answer, options) {
  const labels = ['ア', 'イ', 'ウ', 'エ']
  // correct_answerが"ア"などのラベルの場合
  const idx = labels.indexOf(correct_answer)
  if (idx !== -1) return idx
  // correct_answerが数字の場合（旧フォーマット互換）
  const num = parseInt(correct_answer)
  if (!isNaN(num)) return num
  // optionsの先頭文字で一致検索
  return options.findIndex(o => o.startsWith(correct_answer))
}

function PracticeContent() {
  const searchParams = useSearchParams()
  const examId = searchParams.get('exam') || 'fp3'
  const exam = exams.find(e => e.id === examId) || exams[0]

  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [aiAnswer, setAiAnswer] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [showAi, setShowAi] = useState(false)
  const [categoryFilter, setCategoryFilter] = useState('all')

  // JSONを動的に読み込む
  useEffect(() => {
    setLoading(true)
    setCurrent(0)
    setSelected(null)
    setScore(0)
    setFinished(false)
    setAiAnswer('')
    setShowAi(false)

    fetch(`/data/${examId}.json`)
      .then(r => {
        if (!r.ok) throw new Error('not found')
        return r.json()
      })
      .then(data => {
        setQuestions(data)
        setLoading(false)
      })
      .catch(() => {
        setQuestions([])
        setLoading(false)
      })
  }, [examId])

  // カテゴリ一覧
  const categories = ['all', ...Array.from(new Set(questions.map(q => q.category)))]

  // フィルター後の問題
  const filteredQs = categoryFilter === 'all'
    ? questions
    : questions.filter(q => q.category === categoryFilter)

  const q = filteredQs[current]

  function selectOption(idx) {
    if (selected !== null || !q) return
    setSelected(idx)
    const ansIdx = getAnswerIndex(q.correct_answer, q.options)
    if (idx === ansIdx) setScore(s => s + 1)
  }

  function next() {
    if (current + 1 >= filteredQs.length) {
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
    if (!q) return
    setShowAi(true)
    setAiLoading(true)
    setAiAnswer('')
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q.question_text,
          options: q.options,
          correctAnswer: q.options[getAnswerIndex(q.correct_answer, q.options)],
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

  if (loading) {
    return (
      <>
        <Navbar />
        <main className={styles.main}>
          <div style={{textAlign:'center', padding:'4rem', color:'var(--jp-gray)'}}>
            問題を読み込み中...
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (questions.length === 0) {
    return (
      <>
        <Navbar />
        <main className={styles.main}>
          <div style={{textAlign:'center', padding:'4rem'}}>
            <p style={{color:'var(--jp-gray)', marginBottom:'1rem'}}>この試験の問題はまだ準備中です。</p>
            <Link href="/exams" className="btn-primary">試験一覧に戻る</Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (finished) {
    const pct = Math.round((score / filteredQs.length) * 100)
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
              <span className={styles.scoreDen}> / {filteredQs.length}問正解</span>
            </div>
            <div className={styles.resultPct} style={{color: pct >= 70 ? 'var(--jp-green)' : 'var(--jp-red)'}}>
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

  const ansIdx = q ? getAnswerIndex(q.correct_answer, q.options) : -1

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.header}>
          <Link href="/exams" className={styles.backLink}>← 試験一覧</Link>
          <h1 className={styles.examTitle}>{exam.name}</h1>
          <div className={styles.progressInfo}>{current + 1} / {filteredQs.length}問</div>
        </div>

        {/* カテゴリフィルター */}
        {categories.length > 2 && (
          <div className={styles.filterWrap}>
            {categories.map(cat => (
              <button
                key={cat}
                className={`${styles.filterBtn} ${categoryFilter === cat ? styles.filterActive : ''}`}
                onClick={() => { setCategoryFilter(cat); setCurrent(0); setSelected(null); setFinished(false); setScore(0); }}
              >
                {cat === 'all' ? 'すべて' : cat}
              </button>
            ))}
          </div>
        )}

        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{width: `${(current / filteredQs.length) * 100}%`}} />
        </div>

        <div className={styles.questionBox}>
          {q.difficulty && (
            <div style={{display:'flex', gap:'8px', marginBottom:'8px'}}>
              <span className={styles.category}>{q.category}</span>
              <span className={styles.category} style={{
                background: q.difficulty === 'Hard' ? '#fee2e2' : q.difficulty === 'Medium' ? '#fef9ee' : '#eaf3de',
                color: q.difficulty === 'Hard' ? '#a32d2d' : q.difficulty === 'Medium' ? '#7a5500' : '#27500a',
              }}>{q.difficulty}</span>
            </div>
          )}
          {!q.difficulty && <div className={styles.category}>{q.category}</div>}

          <h2 className={styles.questionText}>
            問 {current + 1}. {q.question_text}
          </h2>

          <div className={styles.options}>
            {q.options.map((opt, i) => {
              let cls = styles.option
              if (selected !== null) {
                if (i === ansIdx) cls += ` ${styles.correct}`
                else if (i === selected && i !== ansIdx) cls += ` ${styles.wrong}`
              }
              return (
                <button key={i} className={cls} onClick={() => selectOption(i)}>
                  <span>{opt}</span>
                </button>
              )
            })}
          </div>

          {selected !== null && (
            <div className={styles.explanationBox}>
              <div className={styles.explanationTitle}>
                {selected === ansIdx ? '✓ 正解！' : `✗ 不正解　正解：${q.correct_answer}`}
              </div>
              <p className={styles.explanationText}>{q.explanation}</p>

              {!showAi ? (
                <button className={styles.aiBtn} onClick={askAI}>
                  🤖 AIにもっと詳しく聞く
                </button>
              ) : (
                <div className={styles.aiBox}>
                  <div className={styles.aiLabel}>🤖 AI解説</div>
                  {aiLoading
                    ? <div className={styles.aiLoading}>解説を生成中...</div>
                    : <p className={styles.aiText}>{aiAnswer}</p>
                  }
                </div>
              )}

              <button className="btn-primary" onClick={next} style={{marginTop:'1rem'}}>
                {current + 1 >= filteredQs.length ? '結果を見る →' : '次の問題 →'}
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
    <Suspense fallback={<div style={{padding:'2rem', textAlign:'center'}}>読み込み中...</div>}>
      <PracticeContent />
    </Suspense>
  )
}
