# 資格合格ナビ — アーキテクチャ設計書

## 技術スタック
- **フレームワーク**: Next.js 15 (App Router)
- **言語**: TypeScript
- **スタイル**: Tailwind CSS + CSS Variables
- **コンテンツ**: MDX (学習ガイド) + JSON (練習問題・知識カード)

---

## ディレクトリ構造

```
shikaku-navi/
├── app/                          # Next.js App Router ページ
│   ├── layout.tsx                # 全ページ共通レイアウト
│   ├── page.tsx                  # ホームページ
│   └── exams/[examId]/          # 各試験の動的ルート
│       ├── page.tsx              # ダッシュボード
│       ├── guide/[chapterId]/    # 学習ガイド
│       ├── questions/[chapterId]/# 練習問題
│       ├── cards/                # 知識カード
│       ├── mock-exam/            # 模擬試験
│       └── ai-chat/              # AI質問
│
├── components/                   # 再利用可能なUIコンポーネント
│   ├── layout/                   # レイアウト部品（変更→全ページ反映）
│   │   ├── Navbar.tsx
│   │   ├── ExamSidebar.tsx       # 試験ページ共通左サイドバー
│   │   └── GuideSidebar.tsx      # 学習ガイド左章節目次
│   ├── ui/                       # 汎用UI部品
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── ProgressBar.tsx
│   │   └── Badge.tsx
│   └── features/                 # 機能別コンポーネント
│       ├── dashboard/
│       ├── guide/
│       ├── questions/
│       └── cards/
│
├── lib/                          # ロジック・データ層
│   ├── types/
│   │   ├── index.ts              # 全型定義
│   │   ├── exams-registry.ts     # 試験登録（新試験追加はここだけ）
│   │   └── chapters-registry.ts # 章節登録
│   └── content/
│       ├── guide-loader.ts       # MDXローダー
│       ├── question-loader.ts    # JSONローダー
│       └── card-loader.ts        # JSONローダー
│
├── content/                      # コンテンツファイル（コード不要）
│   └── exams/
│       ├── boki3/
│       │   ├── guide/ch4/ch4-s1.mdx
│       │   ├── questions/ch4.json
│       │   └── cards/ch4.json
│       └── fp3/                  # 新試験追加例
│
└── styles/
    └── globals.css               # デザイントークン（ここだけ変更で全ページ反映）
```

---

## コンテンツ追加方法（コード不要）

### 新しい試験を追加
1. `lib/types/exams-registry.ts` に1行追記
2. `lib/types/chapters-registry.ts` に章節リストを追記
3. `content/exams/{新試験ID}/` フォルダを作成してMDX/JSONを追加

### 新しい章を追加
1. `content/exams/{examId}/guide/{chapterId}/` にMDXファイルを追加
2. `content/exams/{examId}/questions/{chapterId}.json` を追加
3. `content/exams/{examId}/cards/{chapterId}.json` を追加

---

## デザイン変更方法

| 変更したいもの | 変更ファイル |
|---|---|
| 全サイトの色・フォント | `styles/globals.css` の CSS変数 |
| 全ページのナビバー | `components/layout/Navbar.tsx` |
| 全試験ページの左サイドバー | `components/layout/ExamSidebar.tsx` |
| 練習問題の見た目 | `components/features/questions/QuestionCard.tsx` |
| 学習ガイドの見た目 | `components/features/guide/GuideContent.tsx` |
