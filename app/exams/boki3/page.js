import Link from 'next/link'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import { exams, featureLabels } from '../../../lib/data'
import styles from './exam.module.css'

export async function generateStaticParams() {
  return exams.map(e => ({ examId: e.id }))
}

export async function generateMetadata({ params }) {
  const exam = exams.find(e => e.id === params.examId)
  return {
    title: `${exam?.name || '試験'} 対策 | 合格ナビ`,
    description: exam?.description || '',
  }
}

const toolCards = [
  {
    key: 'guide',
    title: '学習ガイド',
    icon: '📖',
    desc: '各分野の要点・重要事項をまとめたガイド。試験前の確認にも最適。',
    color: '#3B82F6',
    bg: '#EFF6FF',
    href: (id) => `/exams/${id}/guide`,
    label: 'ガイドを読む',
  },
  {
    key: 'practice',
    title: '練習問題',
    icon: '📝',
    desc: '過去問ベースの練習問題。詳しい解説付きで理解を深められます。',
    color: '#C0392B',
    bg: '#FAEDEC',
    href: (id) => `/practice?exam=${id}`,
    label: '問題を解く',
  },
  {
    key: 'flashcards',
    title: '知識カード',
    icon: '🃏',
    desc: '重要用語・公式・概念をカード形式で効率的に暗記。',
    color: '#7C3AED',
    bg: '#F5F3FF',
    href: (id) => `/exams/${id}/flashcards`,
    label: 'カードで学ぶ',
  },
  {
    key: 'mock',
    title: '模擬試験',
    icon: '📋',
    desc: '本番形式の模擬試験。時間制限あり。合格ラインを体験しよう。',
    color: '#059669',
    bg: '#ECFDF5',
    href: (id) => `/exams/${id}/mock`,
    label: '模擬試験を受ける',
  },
  {
    key: 'ai',
    title: 'AI解説',
    icon: '🤖',
    desc: '分からない問題はAIに質問。日本語で丁寧に解説します。',
    color: '#C9A84C',
    bg: '#FEFCE8',
    href: (id) => `/practice?exam=${id}`,
    label: 'AI解説を使う',
  },
]

export default function ExamPage({ params }) {
  const { examId } = params
  const exam = exams.find(e => e.id === examId)

  if (!exam) {
    return (
      <>
        <Navbar />
        <main style={{textAlign:'center', padding:'4rem'}}>
          <p>試験が見つかりません。</p>
          <Link href="/exams">試験一覧へ戻る</Link>
        </main>
        <Footer />
      </>
    )
  }

  const availableTools = toolCards.filter(t => exam.features.includes(t.key))
  const isAvailable = exam.questionCount > 0

  return (
    <>
      <Navbar />

      {/* ヘッダー */}
      <div className={styles.examHeader}>
        <div className={styles.examHeaderInner}>
          <Link href="/exams" className={styles.backLink}>← 試験一覧</Link>
          <div className={styles.examHeaderMain}>
            <div className={styles.examHeaderIcon}>{exam.icon}</div>
            <div>
              <div className={styles.examHeaderCategory}>{exam.categoryLabel}</div>
              <h1 className={styles.examHeaderName}>{exam.name}</h1>
              <p className={styles.examHeaderDesc}>{exam.description}</p>
            </div>
          </div>
          <div className={styles.examHeaderMeta}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>難易度</span>
              <span className={styles.metaValue}>{exam.difficulty}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>実施頻度</span>
              <span className={styles.metaValue}>{exam.examFrequency}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>合格率</span>
              <span className={styles.metaValue}>{exam.passRate}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>収録問題数</span>
              <span className={styles.metaValue}>{exam.questionCount}問</span>
            </div>
          </div>
        </div>
      </div>

      <main className={styles.main}>

        {!isAvailable && (
          <div className={styles.comingSoon}>
            🚧 この試験のコンテンツは現在準備中です。近日公開予定！
          </div>
        )}

        {/* 学習ツール一覧 */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>学習ツール</h2>
          <div className={styles.toolGrid}>
            {availableTools.map(tool => (
              <div key={tool.key} className={styles.toolCard} style={{'--tool-color': tool.color, '--tool-bg': tool.bg}}>
                <div className={styles.toolIcon}>{tool.icon}</div>
                <div className={styles.toolTitle}>{tool.title}</div>
                <div className={styles.toolDesc}>{tool.desc}</div>
                {isAvailable ? (
                  <Link href={tool.href(examId)} className={styles.toolBtn}>
                    {tool.label} →
                  </Link>
                ) : (
                  <span className={styles.toolBtnDisabled}>準備中</span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* おすすめの学習順序 */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>おすすめの学習順序</h2>
          <div className={styles.flowWrap}>
            {[
              { step: 1, icon: '📖', title: '学習ガイド', desc: 'まず全体像を把握' },
              { step: 2, icon: '🃏', title: '知識カード', desc: '用語・概念を暗記' },
              { step: 3, icon: '📝', title: '練習問題', desc: '問題演習で定着' },
              { step: 4, icon: '📋', title: '模擬試験', desc: '本番形式で確認' },
              { step: 5, icon: '🤖', title: 'AI解説', desc: '弱点を集中克服' },
            ].map((s, i) => (
              <div key={s.step} className={styles.flowStep}>
                <div className={styles.flowNum}>{s.step}</div>
                <div className={styles.flowIcon}>{s.icon}</div>
                <div className={styles.flowTitle}>{s.title}</div>
                <div className={styles.flowDesc}>{s.desc}</div>
                {i < 4 && <div className={styles.flowArrow}>→</div>}
              </div>
            ))}
          </div>
        </section>

        {/* 他の試験 */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>他の試験も見る</h2>
          <div className={styles.otherExams}>
            {exams.filter(e => e.id !== examId).slice(0, 4).map(e => (
              <Link key={e.id} href={`/exams/${e.id}`} className={styles.otherExamCard}>
                <span>{e.icon}</span>
                <span>{e.nameShort}</span>
                <span className={styles.otherArrow}>→</span>
              </Link>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
