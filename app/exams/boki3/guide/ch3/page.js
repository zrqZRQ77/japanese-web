"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ExamGuideChapterThree() {
  const params = useParams();
  const examId = params.examId || 'boki3';

  // 本章内部小节目录
  const menuItems = [
    { id: 'what-is-cash', label: '1. 簿記における「現金」とは' },
    { id: 'cash-over-short', label: '2. 現金過不足（げんきんかぶそく）' },
    { id: 'checking-account', label: '3. 当座預金（とうざよきん）と小切手' },
    { id: 'petty-cash', label: '4. 小口現金（こぐちげんきん）' },
  ];

  const [activeSection, setActiveSection] = useState('what-is-cash');

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

  // 牛油果色系定义
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
          
          {/* 进度条区块 (第三章进度设为 30%) */}
          <div style={{ marginBottom: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '700', color: colors.avocado, marginBottom: '8px' }}>
              <span>進捗</span>
              <span>30%</span>
            </div>
            <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: '30%', height: '100%', background: colors.avocado, borderRadius: '3px' }}></div>
            </div>
          </div>

          {/* 章节列表 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* 已完成的第1、2章 */}
            <div style={{ fontSize: '14px', fontWeight: '500', color: colors.textGray, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Link href={`/exams/${examId}/guide/ch1`} style={{ textDecoration: 'none', color: 'inherit' }}>
                第1章 簿記の基本
              </Link>
              <span style={{ color: colors.avocado, fontWeight: 'bold' }}>✓ 完了</span>
            </div>
            <div style={{ fontSize: '14px', fontWeight: '500', color: colors.textGray, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Link href={`/exams/${examId}/guide/ch2`} style={{ textDecoration: 'none', color: 'inherit' }}>
                第2章 取引と仕訳の基礎
              </Link>
              <span style={{ color: colors.avocado, fontWeight: 'bold' }}>✓ 完了</span>
            </div>

            {/* 当前展开的第3章 */}
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: colors.textDark, marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>第3章 現金と預金</span>
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
            <div style={{ fontSize: '14px', fontWeight: '500', color: colors.textLightGray, padding: '8px 0' }}>第4章 商品売買</div>
            <div style={{ fontSize: '14px', fontWeight: '500', color: colors.textLightGray, padding: '8px 0' }}>第5章 その他の債権・債務</div>
          </div>
        </aside>

        {/* 👉 右侧主内容区 */}
        <main style={{ flex: 1, padding: '40px 60px' }}>
          
          {/* 顶部面包屑与操作图标 */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', paddingBottom: '16px', borderBottom: `1px solid ${colors.border}` }}>
            <div style={{ fontSize: '13px', color: colors.textGray, fontWeight: '500' }}>
              第3章 現金と預金 <span style={{ margin: '0 8px' }}>&gt;</span> 
              <span style={{ color: colors.avocado, fontWeight: '700' }}>
                {menuItems.find(item => item.id === activeSection)?.label || '1. 簿記における「現金」とは'}
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
            <section id="what-is-cash" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: '800', color: colors.textDark, marginBottom: '24px' }}>
                1. 簿記における「現金」とは
              </h1>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '16px' }}>
                私たちが普段使う「現金」といえば、お札（紙幣）や硬貨ですが、簿記の世界ではそれだけではありません。
                <strong>「金融機関に持っていけば、すぐに現金に換えてもらえるもの（通貨代用証券）」</strong>も、すべて「現金（資産）」として仕訳します。ここが試験で最も狙われるポイントです。
              </p>

              <div style={{ background: colors.avocadoLight, padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', fontWeight: '800', color: colors.avocado }}>
                  ポイント：簿記で「現金」として扱うもの（超重要！）
                </h4>
                <ul style={{ paddingLeft: '20px', fontSize: '14.5px', color: colors.textDark, lineHeight: '1.8', margin: 0 }}>
                  <li><strong>他人振出小切手</strong>（他人が振り出した小切手）</li>
                  <li><strong>送金小切手</strong></li>
                  <li><strong>郵便為替証書</strong>（ゆうちょ銀行で換金できる証書）</li>
                  <li><strong>配当金領収証</strong>（株の配当をもらうためのチケット）</li>
                </ul>
                <p style={{ margin: '12px 0 0 0', fontSize: '13.5px', color: '#b93a26', fontWeight: 'bold' }}>
                  ⚠️注意：自分で振り出した小切手（自己振出小切手）は「当座預金」になるので、現金ではありません！
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section id="cash-over-short" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: colors.textDark, marginBottom: '20px' }}>
                2. 現金過不足（げんきんかぶそく）
              </h2>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '24px' }}>
                帳簿（ノート）に書かれている現金の残高と、金庫の中にある実際の現金の金額が合わないことがあります。
                このズレの原因がわからない時に、一時的に使う勘定科目が<strong>「現金過不足」</strong>です。
                常に<strong>「実際の金額（金庫の中身）に、帳簿を合わせる」</strong>のがルールです。
              </p>
              
              <div style={{ border: `1px solid ${colors.border}`, padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
                <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: '800', color: colors.textDark }}>
                  ✍️ 例題：現金過不足の仕訳
                </h4>
                <div style={{ fontSize: '14.5px', color: colors.textGray, lineHeight: '1.8' }}>
                  <p style={{ margin: '0 0 8px 0', color: colors.avocado, fontWeight: 'bold' }}>【問題】</p>
                  <p style={{ margin: '0 0 16px 0' }}>
                    帳簿の現金残高は 10,000円だが、金庫の実際の現金は 9,000円だった。原因は不明である。
                  </p>
                  <p style={{ margin: '0 0 8px 0', color: colors.avocado, fontWeight: 'bold' }}>【考え方】</p>
                  <p style={{ margin: '0 0 16px 0' }}>
                    実際の現金（9,000円）に合わせるため、帳簿の現金を 1,000円減らします。<br/>現金の減少＝貸方（右側）です。
                  </p>
                  <div style={{ background: '#f8fafc', padding: '12px', border: `1px dashed ${colors.border}`, textAlign: 'center', fontWeight: 'bold', color: colors.textDark }}>
                    （借方）現金過不足 1,000 ／ （貸方）現金 1,000
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section id="checking-account" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: colors.textDark, marginBottom: '20px' }}>
                3. 当座預金（とうざよきん）と小切手
              </h2>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '16px' }}>
                企業が小切手を振り出す（発行する）ために、銀行に作っておく専用の口座を<strong>当座預金（資産）</strong>と言います。利息はつきませんが、安全に多額の支払いができるのが特徴です。
              </p>

              <div style={{ background: colors.avocadoLight, padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', fontWeight: '800', color: colors.avocado }}>
                  小切手の仕訳の絶対ルール
                </h4>
                <p style={{ margin: 0, fontSize: '14.5px', color: colors.textDark, lineHeight: '1.8' }}>
                  ① <strong>自分が小切手を振り出した時</strong><br/>
                  ➔ 自分の当座預金口座からお金が引き落とされるので、<strong>「当座預金（資産）の減少」</strong>とします。<br/><br/>
                  ② <strong>他人が振り出した小切手を受け取った時</strong><br/>
                  ➔ 銀行に持っていけばすぐに現金になるので、<strong>「現金（資産）の増加」</strong>とします（第1節の復習です）。
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section id="petty-cash" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: colors.textDark, marginBottom: '20px' }}>
                4. 小口現金（こぐちげんきん）
              </h2>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '24px' }}>
                切手代や文房具代など、日々の少額の支払いのために、経理部から各部署（用度係など）に前渡ししておく現金を<strong>小口現金（資産）</strong>と言います。
              </p>
              
              <ul style={{ paddingLeft: '24px', fontSize: '15px', lineHeight: '1.8', color: colors.textGray }}>
                <li style={{ marginBottom: '12px' }}>
                  <strong>定額資金前渡法（インプレスト・システム）</strong><br/>
                  毎月、決まった一定額（例：5万円）になるように、使った分だけを補充する管理方法のことです。試験ではこの言葉がよく出題されます。
                </li>
              </ul>
            </section>

            {/* 🏁 底部导航栏 */}
            <div style={{ borderTop: `1px solid ${colors.border}`, paddingTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              
              <Link href={`/exams/${examId}/guide/ch2`} style={{ textDecoration: 'none' }}>
                <button style={{ backgroundColor: '#ffffff', color: colors.textDark, border: `1px solid ${colors.border}`, padding: '12px 20px', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  ← 前の項目（第2章）
                </button>
              </Link>

              <Link href={`/exams/${examId}/guide`} style={{ textDecoration: 'none', color: colors.textGray, fontSize: '14px', fontWeight: '600' }}>
                章のトップに戻る
              </Link>

              <Link href={`/exams/${examId}/guide/ch4`} style={{ textDecoration: 'none' }}>
                <button style={{ backgroundColor: colors.darkButton, color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  次の項目（第4章） →
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