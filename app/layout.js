import './globals.css'

export const metadata = {
  title: '合格ナビ — 無料の資格試験対策サイト',
  description: 'FP技能士・証券外務員・宅建士などの資格試験に特化した無料学習プラットフォーム。AIが問題を解説します。',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
