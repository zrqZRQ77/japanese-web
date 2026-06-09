import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { exams } from '../lib/data'
import styles from './page.module.css'

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroDeco} />
        <div className={styles.heroInner}>
          <div className={styles.heroLeft}>
            <div className={styles.heroBadge}>完全無料 · AI搭載</div>
            <h1 className={styles.heroTitle}>
              資格試験の合格を、<br />
              <span>無料で。</span>
            </h1>
            <p className={styles.heroSub}>
              FP技能士・証券外務員・宅建士など、<br />
              日本の主要資格試験に特化した学習プラットフォーム。<br />
              AIが分からない問題を丁寧に解説します。
            </p>
            <div className={styles.heroCta}>
              <Link href="/practice" className="btn-primary">練習問題を始める →</Link>
              <Link href="/exams" className="btn-ghost">試験一覧を見る</Link>
            </div>
          </div>
          <div className={styles.heroRight}>
            <div className={styles.cardStack}>
              <div className={`${styles.hcard} ${styles.hcard1}`}>
                <div className={styles.hcardLabel}>FP2級</div>
                <div className={styles.hcardTitle}>タックスプランニング</div>
                <div className={styles.hcardQ}>所得税の計算方法について...</div>
              </div>
              <div className={`${styles.hcard} ${styles.hcard2}`}>
                <div className={styles.hcardLabel}>証券外務員</div>
                <div className={styles.hcardTitle}>株式市場の基礎</div>
                <div className={styles.hcardQ}>信用取引における委託保証金率...</div>
              </div>
              <div className={`${styles.hcard} ${styles.hcard3}`}>
                <div className={styles.hcardLabel}>FP3級 · 問題1</div>
                <div className={styles.hcardTitle}>ライフプランニング</div>
                <div className={styles.hcardQ}>老齢基礎年金の受給開始年齢として、正しいものはどれか。</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className={styles.statsBar}>
        {[
          { num: '12,000+', label: '練習問題' },
          { num: '25+', label: '対応資格試験' },
          { num: '無料', label: '全コンテンツ' },
          { num: 'AI', label: '即時解説機能' },
        ].map(s => (
          <div key={s.label} className={styles.statItem}>
            <div className={styles.statNum}>{s.num}</div>
            <div className={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      <main className={styles.main}>
        {/* Exams */}
        <section className={styles.section}>
          <h2 className="section-title">対応試験一覧</h2>
          <div className={styles.examGrid}>
            {exams.map(exam => (
              <Link
                key={exam.id}
                href={exam.questionCount > 0 ? `/practice?exam=${exam.id}` : '#'}
                className={styles.examCard}
              >
                <div className={styles.examIcon}>{exam.icon}</div>
                <div className={styles.examName}>{exam.name}</div>
                <div className={styles.examMeta}>
                  {exam.questionCount > 0 ? `${exam.questionCount}問収録` : '準備中'}
                </div>
                <span className={`tag tag-${exam.tag}`}>{exam.tagLabel}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className={styles.section}>
          <h2 className="section-title">主な機能</h2>
          <div className={styles.featureGrid}>
            {[
              { icon: '🤖', title: 'AI即時解説', desc: '分からない問題はAIに質問。日本語で丁寧に解説します。毎日10回まで無料。' },
              { icon: '📝', title: '豊富な練習問題', desc: '過去問ベースの問題を多数収録。詳しい解説付きで理解を深められます。' },
              { icon: '📊', title: '学習進捗管理', desc: '正答率・弱点分野を可視化。苦手な項目を集中的に学習できます。' },
              { icon: '📱', title: 'スマホ対応', desc: '通勤・通学中もスマートフォンで快適に学習できます。' },
              { icon: '🆓', title: '完全無料', desc: 'すべての練習問題・学習ガイドが無料。登録不要でそのまま始められます。' },
              { icon: '🔄', title: '定期更新', desc: '試験の改定に合わせて問題を随時更新。常に最新の情報で学習できます。' },
            ].map(f => (
              <div key={f.title} className={styles.featureCard}>
                <div className={styles.featureIcon}>{f.icon}</div>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>今すぐ<span>無料</span>で始めよう</h2>
        <p className={styles.ctaSub}>アカウント登録不要。すぐに練習問題を解き始められます。</p>
        <div className={styles.ctaButtons}>
          <Link href="/practice?exam=fp3" className="btn-primary">FP3級から始める →</Link>
          <Link href="/practice?exam=fp2" className="btn-ghost">FP2級に挑戦する →</Link>
        </div>
      </section>

      <Footer />
    </>
  )
}
