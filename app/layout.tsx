import "./globals.css";

export const metadata = {
  title: "資格合格ナビ",
  description: "完全無料の資格学習プラットフォーム",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-[#f8fafc] text-[#0f172a] min-h-screen">
        {children}
      </body>
    </html>
  );
}