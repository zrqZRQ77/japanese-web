import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.logo}>合格<span>ナビ</span></div>
          <p>日本の資格試験合格を、無料でサポート。<br/>AIが分からない問題を丁寧に解説します。</p>
        </div>
        <div className={styles.col}>
          <h4>試験カテゴリ</h4>
          <ul>
            <li><Link href="/exams/fp">FP技能士</Link></li>
            <li><Link href="/exams/securities">証券外務員</Link></li>
            <li><Link href="/exams/takken">宅地建物取引士</Link></li>
            <li><Link href="/exams/bookkeeping">日商簿記</Link></li>
          </ul>
        </div>
        <div className={styles.col}>
          <h4>学習ツール</h4>
          <ul>
            <li><Link href="/practice">練習問題</Link></li>
            <li><Link href="/guide">学習ガイド</Link></li>
            <li><Link href="/chat">AI質問</Link></li>
          </ul>
        </div>
        <div className={styles.col}>
          <h4>サイト情報</h4>
          <ul>
            <li><Link href="/about">このサイトについて</Link></li>
            <li><Link href="/privacy">プライバシーポリシー</Link></li>
            <li><Link href="/terms">利用規約</Link></li>
          </ul>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>© 2025 合格ナビ. All rights reserved. コンテンツは学習目的で提供しています。</p>
      </div>
    </footer>
  )
}
