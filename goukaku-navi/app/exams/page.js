import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { exams } from '../../lib/data'
import styles from './exams.module.css'

export const metadata = {
  title: '試験一覧 | 合格ナビ',
  description: 'FP技能士、証券外務員、宅建士など対応試験の一覧です。',
}

const categories = [
  { id: 'fp', label: 'FP・ファイナンシャル' },
  { id: 'securities', label: '証券・金融' },
  { id: 'realestate', label: '不動産' },
  { id: 'accounting', label: '会計・経理' },
]

export default function ExamsPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <h1 className={styles.pageTitle}>試験一覧</h1>
        <p className={styles.pageSub}>対応している資格試験の一覧です。各試験のページから練習問題を始められます。</p>

        {categories.map(cat => {
          const catExams = exams.filter(e => e.category === cat.id)
          if (catExams.length === 0) return null
          return (
            <section key={cat.id} className={styles.category}>
              <h2 className="section-title">{cat.label}</h2>
              <div className={styles.grid}>
                {catExams.map(exam => (
                  <div key={exam.id} className={styles.card}>
                    <div className={styles.cardTop}>
                      <span className={styles.icon}>{exam.icon}</span>
                      <span className={`tag tag-${exam.tag}`}>{exam.tagLabel}</span>
                    </div>
                    <h3 className={styles.cardName}>{exam.name}</h3>
                    <p className={styles.cardDesc}>{exam.description}</p>
                    <div className={styles.cardMeta}>
                      {exam.questionCount > 0 ? `${exam.questionCount}問収録` : '準備中'}
                    </div>
                    {exam.questionCount > 0 ? (
                      <Link href={`/practice?exam=${exam.id}`} className="btn-primary" style={{fontSize:'13px',padding:'8px 18px',display:'inline-block',marginTop:'1rem'}}>
                        練習を始める →
                      </Link>
                    ) : (
                      <button disabled style={{fontSize:'13px',padding:'8px 18px',marginTop:'1rem',background:'#eee',border:'none',borderRadius:'3px',color:'#999'}}>
                        近日公開
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )
        })}
      </main>
      <Footer />
    </>
  )
}
