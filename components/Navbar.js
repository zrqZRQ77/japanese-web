'use client'
import Link from 'next/link'
import { useState } from 'react'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo}>
        合格<span>ナビ</span>
      </Link>

      <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
        <li><Link href="/exams">試験一覧</Link></li>
        <li><Link href="/practice">練習問題</Link></li>
        <li><Link href="/guide">学習ガイド</Link></li>
        <li><Link href="/chat">AI質問</Link></li>
      </ul>

      <div className={styles.right}>
        <Link href="/practice" className="btn-primary" style={{fontSize:'13px',padding:'8px 18px'}}>
          無料で始める
        </Link>
        <button className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>
    </nav>
  )
}
