export const metadata = {
  title: 'Bilingual Learning Platform',
  description: 'Learn Japanese Accounting and Language Professional Skills',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#f8fafc' }}>
        {children}
      </body>
    </html>
  )
}
