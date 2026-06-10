"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ExamGuideChapterTwo() {
  const params = useParams();
  const examId = params.examId || 'boki3';

  // 第2章 内部の極簡目次
  const menuItems = [
    { id: 'ch2-intro', label: '1. 仕訳はただのパズル' },
    { id: 'bs-change', label: '2. 資産負債表（B/S）の変動' },
    { id: 'pl-connect', label: '3. 損益計算書（P/L）との連結' },
    { id: 'golden-rule', label: '4. 仕訳の絶対法則' },
  ];

  const [activeSection, setActiveSection] = useState('ch2-intro');

  // 智能监测右侧滚动，自动高亮左侧极简目录
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;
      for (const item of menuItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', fontFamily: '"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", Meiryo, sans-serif', color: '#111111' }}>
      
      {/* 顶部通栏 */}
      <header style={{ background: '#ffffff', padding: '16px 40px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 1px 2px rgba(0,0,0,0.01)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href="/" style={{ fontWeight: '900', fontSize: '22px', color: '#111111', textDecoration: 'none' }}>
            合格<span style={{ color: '#b93a26' }}>ナビ</span>
          </Link>
          <span style={{ color: '#e2e8f0' }}>|</span>
          <span style={{ fontSize: '14px', fontWeight: '700', color: '#64748b' }}>日商簿記3級 合格テキスト</span>
        </div>
        <Link href={`/exams/${examId}`} style={{ color: '#666666', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>
          ← ダッシュボードに戻る
        </Link>
      </header>

      {/* 现代 Wiki 双栏容器 */}
      <div style={{ display: 'flex', maxWidth: '1100px', margin: '0 auto', padding: '40px 20px', gap: '50px' }}>
        
        {/* 👈 左侧极简固定导航栏 */}
        <aside style={{ width: '220px', flexShrink: 0, position: 'sticky', top: '100px', height: 'calc(100vh - 140px)' }}>
          <div style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', letterSpacing: '1px', marginBottom: '16px' }}>
            第2章 内の目次
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', borderLeft: '1px solid #e2e8f0' }}>
            {menuItems.map((item) => {
              const isCurrent = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  style={{
                    fontSize: '13.5px',
                    padding: '8px 12px',
                    textDecoration: 'none',
                    fontWeight: isCurrent ? '700' : '500',
                    color: isCurrent ? '#b93a26' : '#475569',
                    borderLeft: isCurrent ? '3px solid #b93a26' : '3px solid transparent',
                    marginLeft: '-1px',
                    transition: 'all 0.15s ease',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          <div style={{ marginTop: '40px', padding: '12px', background: '#f8fafc', borderRadius: '6px', fontSize: '12px', color: '#64748b', lineHeight: '1.5' }}>
            💡 1章の「ホームポジション」の記憶を頭の片隅に置いて読み進めましょう。
          </div>
        </aside>

        {/* 👉 右侧黄金沉浸式长文（第2章 硬核大白话内容） */}
        <main style={{ flex: 1, maxWidth: '720px' }}>
          
          {/* 章头标题 */}
          <div style={{ marginBottom: '40px', borderBottom: '1px solid #f1f5f9', paddingBottom: '20px' }}>
            <span style={{ color: '#b93a26', fontSize: '13px', fontWeight: '800', letterSpacing: '0.5px' }}>第2章 • 仕訳の基礎とゲームのルール</span>
            <h1 style={{ fontSize: '28px', fontWeight: '900', lineHeight: '1.4', margin: '6px 0 0 0', color: '#111111' }}>
              【大白話】仕訳の基礎：ルール違反にならないための「左右の等式」
            </h1>
          </div>

          {/* 1. 引入节 */}
          <section id="ch2-intro" style={{ marginBottom: '50px', scrollMarginTop: '120px' }}>
            <p style={{ fontSize: '16.5px', lineHeight: '1.85', color: '#334155', marginBottom: '20px' }}>
              第1章では、お金の「来歴（右側）」と「現在地（左側）」という大原則を学びました。
              第2章では、実際のビジネスで毎日起きる無数の動きを、どのように帳簿に記録していくか、つまり<strong>「仕訳（しわけ）」</strong>の具体的なパズルルールを解き明かします。
            </p>
            <p style={{ fontSize: '16.5px', lineHeight: '1.85', color: '#334155' }}>
              多くの受験生が「売掛金が減ったら右？左？」と混乱して挫折しますが、それはルールの根本にある<strong>「等式のバランス」</strong>を見ていないからです。仕訳はただの左右のバランスゲームです。
            </p>
          </section>

          {/* 2. 资产负债表变动节 */}
          <section id="bs-change" style={{ marginBottom: '50px', scrollMarginTop: '120px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#111111', marginBottom: '16px', borderLeft: '4px solid #b93a26', paddingLeft: '12px' }}>
              ビジネスの動きによる「箱」のシーソー現象
            </h2>
            <p style={{ fontSize: '16.5px', lineHeight: '1.85', color: '#334155', marginBottom: '20px' }}>
              前回のカフェの例に戻りましょう。手元に 800万円の現金（左：資産）があり、調達元として資本金 500万円（右：純資産）と借入金 300万円（右：負債）がある状態です。
            </p>
            <p style={{ fontSize: '16.5px', lineHeight: '1.85', color: '#334155', marginBottom: '20px' }}>
              ここから、銀行へ 100万円の借金を現金で返済したとします。
              この時、ビジネス全体の形はどう変わるでしょうか？
            </p>

            {/* 核心金黄色大白话提炼框 */}
            <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '8px', borderLeft: '4px solid #c9a054', margin: '24px 0' }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', fontWeight: '800', color: '#c9a054' }}>
                💡 返済という現象の真実：
              </h4>
              <p style={{ margin: 0, fontSize: '14.5px', color: '#475569', lineHeight: '1.75' }}>
                ・左側のポケットから「現金」が 100万円減る（資産の減少）<br />
                ・右側のポケットから「借入金」という義務が 100万円減る（負債の減少）
              </p>
            </div>

            <p style={{ fontSize: '16.5px', lineHeight: '1.85', color: '#334155' }}>
              結果として、左側は 700万円、右側も 500万 + 200万 = 700万円となり、**左右のバランスは完全に保たれたまま、会社が少しスマート（縮小）になります。**これが仕訳の本質です。左右は常に同時に動くのです。
            </p>
          </section>

          {/* 3. 利润表连结节 */}
          <section id="pl-connect" style={{ marginBottom: '50px', scrollMarginTop: '120px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#111111', marginBottom: '16px', borderLeft: '4px solid #b93a26', paddingLeft: '12px' }}>
              「費用」と「収益」が右左に飛び出す理由
            </h2>
            <p style={{ fontSize: '16.5px', lineHeight: '1.85', color: '#334155', marginBottom: '20px' }}>
              次に、カフェでコーヒーが売れて 50万円の現金が入ってきた（収益）、同時に家賃として 10万円の現金を支払った（費用）というケースを考えます。
              これらは純資産（自分の儲け）を増減させる活動です。
            </p>
            <p style={{ fontSize: '16.5px', lineHeight: '1.85', color: '#334155', marginBottom: '20px' }}>
              ・<strong>収益（右側）：</strong> 純資産を**増やす**原因なので、純资产と同じ「右側」がホームです。<br />
              ・<strong>費用（左側）：</strong> 純資産を**減らす**原因なので、純資産とは逆の「左側」がホームです。
            </p>
            <p style={{ fontSize: '16.5px', lineHeight: '1.85', color: '#334155' }}>
              参考書にある「なぜ費用は左に書くのか」という疑問の答えは単純です。**費用を使えば使うほど、右側にある自分のお金（純資産）が削られていく。だから等式のバランスを取るために、費用は左側にスタンバイしているのです。**
            </p>
          </section>

          {/* 4. 绝对法则节 */}
          <section id="golden-rule" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#111111', marginBottom: '16px', borderLeft: '4px solid #b93a26', paddingLeft: '12px' }}>
              【完全保存版】仕訳の絶対法則マトリクス
            </h2>
            <p style={{ fontSize: '16.5px', lineHeight: '1.85', color: '#334155', marginBottom: '20px' }}>
              どんなに複雑な応用問題に出会っても、以下の**仕訳の絶対法則**さえ頭に叩き込んでおけば、絶対に迷わなくなります。
            </p>

            {/* 朱红色核心拼图规则框 */}
            <div style={{ background: '#fdf2f0', padding: '24px', borderRadius: '8px', border: '1px solid #fca5a5', marginBottom: '24px' }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '800', color: '#b93a26' }}>
                ⚖️ 勘定科目を左右どちらに書くかの全ルール
              </h4>
              <p style={{ margin: 0, fontSize: '14.5px', color: '#334155', lineHeight: '1.8' }}>
                <strong>1. 左側（借方）に書くとき：</strong><br />
                ・【資産】が<strong>増えた</strong>とき（例：現金が入ってきた）<br />
                ・【負債】が<strong>減った</strong>とき（例：借金を返した）<br />
                ・【費用】が<strong>発生した</strong>とき（例：水道光熱費を払った）<br /><br />
                <strong>2. 右側（貸方）に書くとき：</strong><br />
                ・【資産】が<strong>減った</strong>とき（例：現金を支払った）<br />
                ・【負債】が<strong>増えた</strong>とき（例：新たに借金をした）<br />
                ・【収益】が<strong>発生した</strong>とき（例：売上が上がった）
              </p>
            </div>

            <p style={{ fontSize: '16.5px', lineHeight: '1.85', color: '#334155' }}>
              例えば「現金 10万円を売り上げた」なら、資産の現金が増えたので左に【現金 10万】、収益が発生したので右に【売上 10万】。
              パズルのピースが左右でピタッと噛み合いましたね。これが仕訳のすべてです。
            </p>
          </section>

          {/* 分页行动点 */}
          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href={`/exams/${examId}/guide`} style={{ textDecoration: 'none', color: '#64748b', fontSize: '14px', fontWeight: '500' }}>
              ← 第1章に戻る
            </Link>
            <Link href={`/exams/${examId}/exercises`} style={{ textDecoration: 'none' }}>
              <button style={{ backgroundColor: '#b93a26', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '6px', fontSize: '15px', fontWeight: '700', cursor: 'pointer' }}>
                学んだ知識で「練習問題」に挑戦する →
              </button>
            </Link>
          </div>

        </main>

      </div>

      {/* 原生平滑滚动注入 */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>

    </div>
  );
}
