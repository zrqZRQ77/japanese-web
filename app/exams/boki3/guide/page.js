"use client";

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ExamGuide() {
  const params = useParams();
  // 动态获取当前是 boki3 还是 fp3
  const examId = params.examId || 'boki3'; 
  
  const isBoki = examId.includes('boki');
  const title = isBoki ? '日商簿記3級' : 'FP技能士3級';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', fontFamily: '"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", Meiryo, sans-serif', color: '#111111' }}>
      
      {/* 統一感のある赤茶色のナビゲーションバー */}
      <header style={{ background: '#ffffff', padding: '16px 40px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ fontWeight: '900', fontSize: '22px', color: '#111111', textDecoration: 'none' }}>
          合格<span style={{ color: '#b93a26' }}>ナビ</span>
        </Link>
        <Link href={`/exams/${examId}`} style={{ color: '#666666', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>
          ← ダッシュボードに戻る
        </Link>
      </header>

      {/* 没入型読書のための黄金幅：最大720px */}
      <main style={{ maxWidth: '720px', margin: '0 auto', padding: '60px 20px' }}>
        
        {/* 記事ヘッダー */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ fontSize: '14px', fontWeight: '700', color: '#b93a26', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            {title} / 第1章：簿記の根本的な仕組み
          </div>
          <h1 style={{ fontSize: '30px', fontWeight: '900', lineHeight: '1.4', margin: '0 0 16px 0', color: '#111111' }}>
            【噛み砕き解説】複式簿記の本質：なぜ資産は左側、負債は右側なのか？
          </h1>
          <div style={{ fontSize: '14px', color: '#64748b' }}>
            更新日: 2026年6月 • 精読時間: 約 5 分
          </div>
        </div>

        {/* 記事本文 */}
        <section style={{ fontSize: '16.5px', lineHeight: '1.8', color: '#334155' }}>
          <p style={{ marginBottom: '24px' }}>
            多くの人が日商簿記3級の学習を始める際、聞き慣れない勘定科目と複雑な「借方・貸方」の配置に圧倒されてしまいます。一般的な参考書では、「資産の増加は借方、負債の増加は貸方…」と丸暗記を強要されがちです。
          </p>
          
          <p style={{ marginBottom: '24px', fontWeight: '700', color: '#111111' }}>
            今回は、難しい専門用語を一切使わず、ビジネスの根本的な論理（ファーストプリンシプル）から、このルールの本質をすっきりと解き明かします。
          </p>

          <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#111111', marginTop: '40px', marginBottom: '16px', borderLeft: '4px solid #b93a26', paddingLeft: '12px' }}>
            1. お金の「調達源泉」と「運用形態」
          </h2>
          <p style={{ marginBottom: '24px' }}>
            あなたがカフェを開業すると想像してください。まず最初にお金が必要です。自分の貯金から 500万円、銀行から 300万円を借りて、合計 800万円を集めたとします。
          </p>

          {/* 大白話（噛み砕き）ビジネス論理ボックス（薄グレー背景、左側に金色の太線） */}
          <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '8px', borderLeft: '4px solid #c9a054', marginBottom: '28px' }}>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '700', color: '#c9a054' }}>💡 ビジネスの本質：</h4>
            <p style={{ margin: 0, fontSize: '15px', color: '#475569', lineHeight: '1.7' }}>
              簿記の帳簿とは、単なる数字の羅列ではなく、一種の<strong>「資金追跡マップ」</strong>です。記録しているのは以下の2点だけです：
              <br /><strong>右側（貸方）：</strong> お金をどこから持ってきたか？（資金の調達源泉）
              <br /><strong>左側（借方）：</strong> そのお金が今何に化けているか？（資金の運用形態）
            </p>
          </div>

          <p style={{ marginBottom: '24px' }}>
            つまり、カフェの 800万円は、帳簿上で次のように表現されます。
          </p>

          <ul style={{ paddingLeft: '20px', marginBottom: '24px' }}>
            <li style={{ marginBottom: '12px' }}>
              <strong>右側（貸方 - 調達）：</strong> 
              銀行から借りた 300万円（簿記ではこれを
              {/* クリック可能な用語リンク */}
              <Link href="#concept-fuzai" style={{ color: '#b93a26', fontWeight: '700', textDecoration: 'underline', margin: '0 4px' }}>
                負債
              </Link>
              と呼びます）＋ 自分が用意した 500万円（これを
              <Link href="#concept-junshisan" style={{ color: '#b93a26', fontWeight: '700', textDecoration: 'underline', margin: '0 4px' }}>
                純資産
              </Link>
              と呼びます）。
            </li>
            <li style={{ marginBottom: '12px' }}>
              <strong>左側（借方 - 運用）：</strong> 
              集まった 800万円が、そのまま銀行口座に預けられている状態（これを
              <Link href="#concept-shisan" style={{ color: '#b93a26', fontWeight: '700', textDecoration: 'underline', margin: '0 4px' }}>
                資産
              </Link>
              と呼びます）。
            </li>
          </ul>

          {/* アンカー概念解説 1 */}
          <div id="concept-shisan" style={{ marginTop: '48px', padding: '24px', background: '#fdf2f0', borderRadius: '8px', border: '1px solid #fca5a5' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', fontWeight: '800', color: '#b93a26' }}>📚 用語解説：資産（しさん）</h3>
            <p style={{ margin: 0, fontSize: '15px', color: '#334155', lineHeight: '1.6' }}>
              <strong>資産</strong>とは、資金が形を変えた**具体的な運用の姿**です。手元にある現金や銀行預金はもちろん、カフェを経営するために購入したコーヒーマシン（備品）や店舗（土地・建物）など、将来的にビジネスに役立つものはすべて資産です。お金の「使い道」であるため、初期位置は必ず**左側（借方）**になります。
            </p>
          </div>

          {/* アンカー概念解説 2 */}
          <div id="concept-fuzai" style={{ marginTop: '24px', padding: '24px', background: '#fdf2f0', borderRadius: '8px', border: '1px solid #fca5a5' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', fontWeight: '800', color: '#b93a26' }}>📚 用語解説：負債（ふさい）</h3>
            <p style={{ margin: 0, fontSize: '15px', color: '#334155', lineHeight: '1.6' }}>
              <strong>負債</strong>とは、**他者から調達した、いずれ返済しなければならないお金**です（銀行からの借入金や、材料を後払いで買った際の買掛金など）。これは外部からの資金調達を意味するため、定位置は必ず**右側（貸方）**になります。
            </p>
          </div>

          {/* アンカー概念解説 3 */}
          <div id="concept-junshisan" style={{ marginTop: '24px', padding: '24px', background: '#fdf2f0', borderRadius: '8px', border: '1px solid #fca5a5' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', fontWeight: '800', color: '#b93a26' }}>📚 用語解説：純資産（じゅんしさん）</h3>
            <p style={{ margin: 0, fontSize: '15px', color: '#334155', lineHeight: '1.6' }}>
              <strong>純資産</strong>とは、負債とは異なり、**誰にも返済する必要のない、本当の意味での自分のお金**です（最初に出資した資本金や、ビジネスを通じて稼ぎ出した利益の蓄積）。これは内部からの資金調達を意味するため、同じく定位置は**右側（貸方）**になります。
            </p>
          </div>

          <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#111111', marginTop: '48px', marginBottom: '16px', borderLeft: '4px solid #b93a26', paddingLeft: '12px' }}>
            2. 取引の「二面性」
          </h2>
          <p style={{ marginBottom: '24px' }}>
            例えば、集めたお金の中から 200万円を使って、イタリア製の高級エスプレッソマシンを購入したとします。この時、会計上はどのように記録されるでしょうか？
          </p>
          <p style={{ marginBottom: '24px' }}>
            ここで登場するのが、簿記の最も基礎的な動作である
            <Link href="#concept-shiwake" style={{ color: '#b93a26', fontWeight: '700', textDecoration: 'underline', margin: '0 4px' }}>
              仕訳（しわけ）
            </Link>
            です。どんな経済活動も、必ず左と右の双方に影響を与えます。
          </p>

          {/* アンカー概念解説 4 */}
          <div id="concept-shiwake" style={{ marginTop: '32px', padding: '24px', background: '#f1f5f9', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', fontWeight: '800', color: '#475569' }}>✍️ 核心技術：仕訳（しわけ）とは？</h3>
            <p style={{ margin: 0, fontSize: '15px', color: '#334155', lineHeight: '1.6' }}>
              <strong>仕訳</strong>は、簿記における記録の最小単位です。コーヒーマシンの購入という1つの出来事を、次のように左右に分解して記録します：
              <br />（左側・借方）：コーヒーマシンという資産が 200万円増えた
              <br />（右側・貸方）：銀行預金という資産が 200万円減った
              <br /><strong>結果として、左右の合計金額は常に一致します。これが「貸借一致の原則」です。</strong>
            </p>
          </div>

        </section>

      </main>
    </div>
  );
}