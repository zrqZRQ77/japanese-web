import Link from 'next/link'
import Navbar from '../../../../components/Navbar'
import Footer from '../../../../components/Footer'
import { exams } from '../../../../lib/data'

const pageInfo = {
  flashcards: { title: '知識カード', icon: '🃏', desc: '重要用語・概念をカード形式で暗記', color: '#7C3AED' },
  mock: { title: '模擬試験', icon: '📋', desc: '本番形式の模擬試験で実力を確認', color: '#059669' },
  guide: { title: '学習ガイド', icon: '📖', desc: '各分野の要点をまとめたガイド', color: '#3B82F6' },
}

export default function Page({ params }) {
  const { examId } = params
  const exam = exams.find(e => e.id === examId)
  const info = pageInfo['flashcards']

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem', minHeight: 'calc(100vh - 130px)' }}>
        <Link href={'/exams/' + examId} style={{ fontSize: '13px', color: 'var(--jp-gray)', textDecoration: 'none', display: 'inline-block', marginBottom: '1.5rem' }}>
          ← {exam?.name || '試験'}に戻る
        </Link>
        <div style={{ textAlign: 'center', padding: '4rem 2rem', background: '#fff', borderRadius: '12px', border: '1px solid var(--jp-border)' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{info.icon}</div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.8rem' }}>
            {exam?.name} — {info.title}
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--jp-gray)', marginBottom: '1.5rem' }}>
            {info.desc}
          </p>
          <div style={{ display: 'inline-block', background: '#fef9ee', border: '1px solid #f0d080', borderRadius: '8px', padding: '1rem 1.5rem', fontSize: '13px', color: '#7a5500' }}>
            🚧 このコンテンツは現在準備中です。近日公開予定！
          </div>
          <div style={{ marginTop: '2rem' }}>
            <Link href={'/practice?exam=' + examId} style={{ display: 'inline-block', background: 'var(--jp-red)', color: '#fff', padding: '10px 24px', borderRadius: '4px', fontSize: '13px', fontWeight: '500', textDecoration: 'none' }}>
              先に練習問題を解く →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
