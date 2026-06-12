"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ExamGuideChapterTwo() {
  const params = useParams();
  const examId = params.examId || 'boki3';

  // 本章内部小节目录
  const menuItems = [
    { id: 'what-is-transaction', label: '1. 簿記上の「取引」とは' },
    { id: 'account-titles', label: '2. 勘定科目（かんじょうかもく）' },
    { id: 'shiwake-steps', label: '3. 仕訳（しわけ）の3ステップ' },
    { id: 'tenki-ledger', label: '4. 総勘定元帳への転記（てんき）' },
  ];

  const [activeSection, setActiveSection] = useState('what-is-transaction');

  // 智能监测滚动，自动高亮左侧极简目录
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

  // 牛油果色系定义 (与第一章保持完全一致)
  const colors = {
    avocado: '#7A9D54',       
    avocadoLight: '#F5F8F2',  
    textDark: '#111111',
    textGray: '#475569',
    textLightGray: '#94a3b8',
    border: '#e2e8f0',
    darkButton: '#2C3E20'     
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: '"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", Meiryo, sans-serif' }}>
      
      {/* 顶部通栏 */}
      <header style={{ background: '#ffffff', padding: '16px 40px', borderBottom: `1px solid ${colors.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href="/" style={{ fontWeight: '900', fontSize: '22px', color: colors.textDark, textDecoration: 'none' }}>
            合格<span style={{ color: colors.avocado }}>ナビ</span>
          </Link>
        </div>
        <Link href={`/exams/${examId}`} style={{ color: colors.textGray, textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>
          ← ダッシュボードに戻る
        </Link>
      </header>

      {/* 页面主体内容：左右双栏布局 */}
      <div style={{ display: 'flex', maxWidth: '1200px', margin: '40px auto', background: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', overflow: 'hidden' }}>
        
        {/* 👈 左侧导航栏 */}
        <aside style={{ width: '280px', borderRight: `1px solid ${colors.border}`, padding: '30px 20px', flexShrink: 0 }}>
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: colors.textDark, marginBottom: '24px' }}>簿記3級 学習ガイド</h2>
          
          {/* 进度条区块 (第二章进度设为 20%) */}
          <div style={{ marginBottom: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '700', color: colors.avocado, marginBottom: '8px' }}>
              <span>進捗</span>
              <span>20%</span>
            </div>
            <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: '20%', height: '100%', background: colors.avocado, borderRadius: '3px' }}></div>
            </div>
          </div>

          {/* 章节列表 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* 已完成的第1章 */}
            <div style={{ fontSize: '14px', fontWeight: '500', color: colors.textGray, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Link href={`/exams/${examId}/guide/ch1`} style={{ textDecoration: 'none', color: 'inherit' }}>
                第1章 簿記の基本
              </Link>
              <span style={{ color: colors.avocado, fontWeight: 'bold' }}>✓ 完了</span>
            </div>

            {/* 当前展开的第2章 */}
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: colors.textDark, marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>第2章 取引と仕訳の基礎</span>
                <span style={{ color: colors.avocado, fontSize: '18px' }}>•</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', borderLeft: `2px solid ${colors.border}`, marginLeft: '6px' }}>
                {menuItems.map((item) => {
                  const isCurrent = activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      style={{
                        padding: '10px 0 10px 16px',
                        fontSize: '13px',
                        textDecoration: 'none',
                        color: isCurrent ? colors.avocado : colors.textGray,
                        fontWeight: isCurrent ? '700' : '500',
                        borderLeft: isCurrent ? `2px solid ${colors.avocado}` : '2px solid transparent',
                        marginLeft: '-2px',
                        transition: 'all 0.2s'
                      }}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </div>
            </div>

            {/* 其他未展开章节示意 */}
            <div style={{ fontSize: '14px', fontWeight: '500', color: colors.textLightGray, padding: '8px 0' }}>第3章 現金と預金</div>
            <div style={{ fontSize: '14px', fontWeight: '500', color: colors.textLightGray, padding: '8px 0' }}>第4章 商品売買</div>
          </div>
        </aside>

        {/* 👉 右侧主内容区 */}
        <main style={{ flex: 1, padding: '40px 60px' }}>
          
          {/* 顶部面包屑与操作图标 */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', paddingBottom: '16px', borderBottom: `1px solid ${colors.border}` }}>
            <div style={{ fontSize: '13px', color: colors.textGray, fontWeight: '500' }}>
              第2章 取引と仕訳の基礎 <span style={{ margin: '0 8px' }}>&gt;</span> 
              <span style={{ color: colors.avocado, fontWeight: '700' }}>
                {menuItems.find(item => item.id === activeSection)?.label || '1. 簿記上の「取引」とは'}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '12px', color: colors.textLightGray }}>
              <span style={{ cursor: 'pointer' }}>🔖</span>
              <span style={{ cursor: 'pointer' }}>⭐</span>
              <span style={{ cursor: 'pointer' }}>📤</span>
            </div>
          </div>

          <div style={{ maxWidth: '680px' }}>
            
            {/* Section 1 */}
            <section id="what-is-transaction" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: '800', color: colors.textDark, marginBottom: '24px' }}>
                1. 簿記上の「取引」とは
              </h1>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '16px' }}>
                私たちが普段の生活で使う「取引」という言葉と、簿記の世界の「取引」は少し意味が異なります。
                簿記の世界では、<strong>「資産・負債・純資産・収益・費用のいずれかが増減すること」</strong>だけを取引と呼びます。
              </p>

              <div style={{ background: colors.avocadoLight, padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', fontWeight: '800', color: colors.avocado }}>
                  ポイント：日常の取引 vs 簿記の取引（超重要頻出）
                </h4>
                <p style={{ margin: 0, fontSize: '14.5px', color: colors.textDark, lineHeight: '1.7' }}>
                  <strong>【簿記では「取引」にならないもの】</strong><br/>
                  ❌ 建物を借りる「契約」をした（まだお金も動かず、建物も使っていない）<br/>
                  ❌ 新しい従業員を「採用」した（まだ給料は発生していない）<br/><br/>
                  <strong>【簿記では「取引」になるもの】</strong><br/>
                  ✅ 倉庫が火災で「焼失」した（資産が減少したため、立派な簿記上の取引です！）<br/>
                  ✅ 現金が盗難にあった（現金という資産が減ったため）
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section id="account-titles" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: colors.textDark, marginBottom: '20px' }}>
                2. 勘定科目（かんじょうかもく）
              </h2>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '24px' }}>
                取引の内容を記録する際、「社長のお金」「机やパソコン」「銀行からの借金」といった日常用語をそのまま帳簿に書くと、人によって表現がバラバラになり混乱してしまいます。そこで、あらかじめ決められた共通の名前を使います。これを<strong>勘定科目</strong>と呼びます。
              </p>
              
              <ul style={{ paddingLeft: '24px', fontSize: '15px', lineHeight: '1.8', color: colors.textGray }}>
                <li style={{ marginBottom: '8px' }}>机、パソコン、コピー機など ➔ <strong>備品（びひん）</strong></li>
                <li style={{ marginBottom: '8px' }}>販売するために仕入れた品物 ➔ <strong>商品（しょうひん）</strong></li>
                <li style={{ marginBottom: '8px' }}>銀行から借りたお金 ➔ <strong>借入金（かりいれきん）</strong></li>
                <li style={{ marginBottom: '8px' }}>電車代やタクシー代など ➔ <strong>旅費交通費（りょひこうつうひ）</strong></li>
              </ul>
            </section>

            {/* Section 3 */}
            <section id="shiwake-steps" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: colors.textDark, marginBottom: '20px' }}>
                3. 仕訳（しわけ）の3ステップ
              </h2>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '16px' }}>
                簿記上の取引が発生したとき、それを「借方（左）」と「貸方（右）」に分けて記録する作業を<strong>仕訳（しわけ）</strong>と言います。仕訳はパズルと同じで、以下の3つのステップで考えれば絶対に間違えません。
              </p>

              <div style={{ border: `1px solid ${colors.border}`, padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
                <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: '800', color: colors.textDark }}>
                  ✍️ 例題：銀行から現金1,000円を借り入れた
                </h4>
                <div style={{ fontSize: '14.5px', color: colors.textGray, lineHeight: '1.8' }}>
                  <p style={{ margin: '0 0 8px 0', color: colors.avocado, fontWeight: 'bold' }}>ステップ①：登場する勘定科目を見つける</p>
                  <p style={{ margin: '0 0 16px 0' }}>「現金」と「借入金」の2つが登場します。</p>

                  <p style={{ margin: '0 0 8px 0', color: colors.avocado, fontWeight: 'bold' }}>ステップ②：グループ（5大要素）と増減を考える</p>
                  <p style={{ margin: '0 0 16px 0' }}>・現金（資産）が「増えた」<br/>・借入金（負債）が「増えた」</p>

                  <p style={{ margin: '0 0 8px 0', color: colors.avocado, fontWeight: 'bold' }}>ステップ③：ホームポジションのルールに当てはめる</p>
                  <p style={{ margin: '0 0 16px 0' }}>資産の増加は左側（借方）、負債の増加は右側（貸方）に書きます。</p>

                  <div style={{ background: '#f8fafc', padding: '12px', border: `1px dashed ${colors.border}`, textAlign: 'center', fontWeight: 'bold', color: colors.textDark }}>
                    （借方）現金 1,000 ／ （貸方）借入金 1,000
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section id="tenki-ledger" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: colors.textDark, marginBottom: '20px' }}>
                4. 総勘定元帳への転記（てんき）
              </h2>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '24px' }}>
                仕訳帳に記録した内容は、日付順に並んでいるだけなので、「いま現金はいくらあるのか？」がすぐには分かりません。そこで、勘定科目ごとに分かれた専用のノート（これを<strong>総勘定元帳</strong>と呼びます）に書き写します。この書き写す作業を<strong>転記（てんき）</strong>と言います。
              </p>
              
              <div style={{ background: colors.avocadoLight, padding: '24px', borderRadius: '8px' }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', fontWeight: '800', color: colors.avocado }}>
                  T字勘定（Tアカウント）のイメージ
                </h4>
                <p style={{ margin: 0, fontSize: '14.5px', color: colors.textDark, lineHeight: '1.7' }}>
                  総勘定元帳の各ページは、アルファベットの「T」の形に似ているためT字勘定と呼ばれます。<br/>
                  仕訳で左側（借方）に書いた金額は、T字勘定でも<strong>必ず左側</strong>に転記します。仕訳の左右がそのままT字勘定の左右と連動する仕組みです。
                </p>
              </div>
            </section>

            {/* 🏁 底部导航栏 */}
            <div style={{ borderTop: `1px solid ${colors.border}`, paddingTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              
              <Link href={`/exams/${examId}/guide/ch1`} style={{ textDecoration: 'none' }}>
                <button style={{ backgroundColor: '#ffffff', color: colors.textDark, border: `1px solid ${colors.border}`, padding: '12px 20px', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  ← 前の項目（第1章）
                </button>
              </Link>

              <Link href={`/exams/${examId}/guide`} style={{ textDecoration: 'none', color: colors.textGray, fontSize: '14px', fontWeight: '600' }}>
                章のトップに戻る
              </Link>

              <Link href={`/exams/${examId}/guide/ch3`} style={{ textDecoration: 'none' }}>
                <button style={{ backgroundColor: colors.darkButton, color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  次の項目（第3章） →
                </button>
              </Link>
              
            </div>
          </div>
        </main>
      </div>

      <style jsx global>{` html { scroll-behavior: smooth; } `}</style>
    </div>
  );
}
