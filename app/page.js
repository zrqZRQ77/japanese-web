import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { exams, featureLabels } from '../lib/data'
import styles from './page.module.css'

export const metadata = {
  title: '合格ナビ — 無料の資格試験対策サイト',
  description: 'FP技能士・日商簿記・宅建士など日本の主要資格試験に特化した無料学習プラットフォーム。練習問題・知識カード・模擬試験・AI解説を無料で提供。',
}

const categories = [
  { id: 'fp', label: 'FP・金融', icon: '💴' },
  { id: 'accounting', label: '会計・経理', icon: '📊' },
  { id: 'realestate', label: '不動産', icon: '🏠' },
  { id: 'it', label: 'IT・テクノロジー', icon: '💻' },
]

export default function Home() {
  const activeExams = exams.filter(e => e.questionCount > 0)

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDeco} />
        <div className={styles.heroInner}>
          <div className={styles.heroLeft}>
            <div className={styles.heroBadge}>完全無料 · AI搭載 · 登録不要</div>
            <h1 className={styles.heroTitle}>
              資格合格を、<br /><span>無料で。</span>
            </h1>
            <p className={styles.heroSub}>
              FP技能士・日商簿記・宅建士など、<br />
              日本の主要資格に特化した学習プラットフォーム。<br />
              練習問題・知識カード・模擬試験・AI解説がすべて無料。
            </p>
            <div className={styles.heroCta}>
              <Link href="/exams" className="btn-primary">試験を選ぶ →</Link>
              <Link href={`/exams/fp3`} className="btn-ghost">FP3級を始める</Link>
            </div>
          </div>
          <div className={styles.heroRight}>
            <div className={styles.heroStats}>
              {[
                { num: '100+', label: '練習問題' },
                { num: '5種', label: '学習ツール' },
                { num: '無料', label: '全コンテンツ' },
                { num: 'AI', label: '即時解説' },
              ].map(s => (
                <div key={s.label} className={styles.heroStat}>
                  <div className={styles.heroStatNum}>{s.num}</div>
                  <div className={styles.heroStatLabel}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 特徴 */}
      <section className={styles.featuresSection}>
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionTitle}>5つの学習ツール、すべて無料</h2>
          <div className={styles.featuresGrid}>
            {Object.entries(featureLabels).map(([key, f]) => (
              <div key={key} className={styles.featureCard}>
                <div className={styles.featureIcon}>{f.icon}</div>
                <div className={styles.featureTitle}>{f.label}</div>
                <div className={styles.featureDesc}>
                  {key === 'practice' && '過去問ベースの練習問題。解説付きで理解を深められます。'}
                  {key === 'flashcards' && '重要用語・概念を知識カードで効率的に暗記。'}
                  {key === 'mock' && '本番形式の模擬試験で実力を測定。時間制限あり。'}
                  {key === 'guide' && '各分野の要点をまとめた学習ガイド。試験直前の確認にも。'}
                  {key === 'ai' && '分からない問題はAIに質問。日本語で丁寧に解説。'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 対応試験一覧 */}
      <section className={styles.examsSection}>
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionTitle}>対応試験一覧</h2>

          {categories.map(cat => {
            const catExams = exams.filter(e => e.category === cat.id)
            if (!catExams.length) return null
            return (
              <div key={cat.id} className={styles.categoryBlock}>
                <div className={styles.categoryLabel}>
                  <span>{cat.icon}</span> {cat.label}
                </div>
                <div className={styles.examGrid}>
                  {catExams.map(exam => (
                    <Link
                      key={exam.id}
                      href={exam.questionCount > 0 ? `/exams/${exam.id}` : '#'}
                      className={`${styles.examCard} ${exam.questionCount === 0 ? styles.examCardSoon : ''}`}
                    >
                      <div className={styles.examCardTop}>
                        <span className={styles.examIcon}>{exam.icon}</span>
                        <span className={`tag tag-${exam.tag}`}>{exam.tagLabel}</span>
                      </div>
                      <div className={styles.examName}>{exam.name}</div>
                      <div className={styles.examMeta}>
                        <span>難易度 {exam.difficulty}</span>
                        <span>{exam.examFrequency}</span>
                      </div>
                      <div className={styles.examFeatures}>
                        {exam.features.map(f => (
                          <span key={f} className={styles.examFeatureTag}>
                            {featureLabels[f]?.icon} {featureLabels[f]?.label}
                          </span>
                        ))}
                      </div>
                      {exam.questionCount > 0
                        ? <div className={styles.examCta}>学習を始める →</div>
                        : <div className={styles.examCtaSoon}>近日公開</div>
                      }
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>今すぐ<span>無料</span>で始めよう</h2>
        <p className={styles.ctaSub}>登録不要。すぐに学習を開始できます。</p>
        <div className={styles.ctaButtons}>
          <Link href="/exams/fp3" className="btn-primary">FP3級から始める →</Link>
          <Link href="/exams/boki3" className="btn-ghost">日商簿記3級を見る →</Link>
        </div>
      </section>

      <Footer />
    </>
  )
}
