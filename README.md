# 合格ナビ — 日本の資格試験対策サイト

FP技能士・証券外務員など日本の主要資格試験に特化した無料学習プラットフォームです。

## 機能
- 練習問題（FP3級・FP2級・証券外務員）
- AI即時解説（Claude API使用）
- 試験一覧ページ
- スマホ対応レスポンシブデザイン

## デプロイ方法（Vercel）

### 1. GitHubにアップロード
1. GitHub.com でリポジトリを新規作成（例：goukaku-navi）
2. このフォルダの中身をすべてアップロード

### 2. Vercelにデプロイ
1. vercel.com にログイン
2. 「Add New Project」→ GitHubリポジトリを選択
3. そのまま「Deploy」をクリック

### 3. AI機能を有効にする（オプション）
1. Vercel Dashboard → Settings → Environment Variables
2. `ANTHROPIC_API_KEY` を追加（Anthropicサイトで取得）
3. Redeployすれば完了

## ローカルで起動する場合
```bash
npm install
npm run dev
```
http://localhost:3000 で確認できます。

## 問題を追加する方法
`lib/data.js` を編集するだけです：
- `exams` 配列：試験の基本情報
- `questions` オブジェクト：各試験の問題
