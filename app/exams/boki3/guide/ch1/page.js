"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ExamGuideChapterOne() {
  const params = useParams();
  const examId = params.examId || 'boki3';

  // 本章内部小节目录
  const menuItems = [
    { id: 'intro', label: '1. 丸暗記からの解放' },
    { id: 'core-logic', label: '2. 借方・貸方の本質' },
    { id: 'five-boxes', label: '3. 簿記の5大要素' },
    { id: 'shiwake', label: '4. 取引の二面性と仕訳' },
  ];

  const [activeSection, setActiveSection] = useState('intro');

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
    avocado: '#7A9D54',       // 主牛油果绿
    avocadoLight: '#F5F8F2',  // 浅牛油果背景
    textDark: '#111111',
    textGray: '#475569',
    textLightGray: '#94a3b8',
    border: '#e2e8f0',
    darkButton: '#2C3E20'     // 深色按钮
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
        
        {/* 👈 左侧导航栏 (参考图样式) */}
        <aside style={{ width: '280px', borderRight: `1px solid ${colors.border}`, padding: '30px 20px', flexShrink: 0 }}>
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: colors.textDark, marginBottom: '24px' }}>簿記3級 学習ガイド</h2>
          
          {/* 进度条区块 */}
          <div style={{ marginBottom: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '700', color: colors.avocado, marginBottom: '8px' }}>
              <span>進捗</span>
              <span>25%</span>
            </div>
            <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: '25%', height: '100%', background: colors.avocado, borderRadius: '3px' }}></div>
            </div>
          </div>

          {/* 章节列表 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* 当前展开的第1章 */}
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: colors.textDark, marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>第1章 簿記の基本</span>
                <span style={{ color: colors.avocado }}>✓</span>
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
            <div style={{ fontSize: '14px', fontWeight: '500', color: colors.textLightGray, padding: '8px 0' }}>第2章 勘定科目と5要素</div>
            <div style={{ fontSize: '14px', fontWeight: '500', color: colors.textLightGray, padding: '8px 0' }}>第3章 仕訳の基礎</div>
            <div style={{ fontSize: '14px', fontWeight: '500', color: colors.textLightGray, padding: '8px 0' }}>第4章 現金と預金</div>
          </div>
        </aside>

        {/* 👉 右侧主内容区 */}
        <main style={{ flex: 1, padding: '40px 60px' }}>
          
          {/* 顶部面包屑与操作图标 */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', paddingBottom: '16px', borderBottom: `1px solid ${colors.border}` }}>
            <div style={{ fontSize: '13px', color: colors.textGray, fontWeight: '500' }}>
              第1章 簿記の基本 <span style={{ margin: '0 8px' }}>&gt;</span> 
              <span style={{ color: colors.avocado, fontWeight: '700' }}>
                {menuItems.find(item => item.id === activeSection)?.label || '1. 丸暗記からの解放'}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '12px', color: colors.textLightGray }}>
              {/* 占位图标，可替换为实际 SVG */}
              <span style={{ cursor: 'pointer' }}>🔖</span>
              <span style={{ cursor: 'pointer' }}>⭐</span>
              <span style={{ cursor: 'pointer' }}>📤</span>
            </div>
          </div>

          <div style={{ maxWidth: '680px' }}>
            <section id="intro" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: '800', color: colors.textDark, marginBottom: '24px' }}>
                1. 丸暗記からの解放
              </h1>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '16px' }}>
                多くの人が日商簿記3級の学習を始める際、聞き慣れない勘定科目と複雑な「借方・貸方」の配置に圧倒されてしまいます。
                一般的な参考書では、「資産の増加は借方、負債の増加は貸方…」と丸暗記を強要されがちですが、これではパズルを解いているようでビジネスの本質が見えてきません。
              </p>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, fontWeight: '700' }}>
                ここでは難しい専門用語を一切使わず、お金の「調達源泉（どこから来たか）」と「運用形態（今どこにあるか）」という第一性原理から、このルールの本质をすっきりと解き明かします。
              </p>
            </section>

            <section id="core-logic" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: colors.textDark, marginBottom: '20px' }}>
                2. 借方・貸方の本質
              </h2>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '24px' }}>
                あなたが小さなカフェを開業すると想像してください。まず最初にお金が必要です。
                自分の貯金から500万円、銀行から300万円を借りて、合計800万円を集めたとします。
                簿記の世界では、この出来事を「お金をどこから持ってきたか」と「そのお金が今何に形を変えているか」という2つの側面から同時に記録します。
              </p>

              {/* 参考图中的 "ポイント" 风格框 (牛油果色) */}
              <div style={{ background: colors.avocadoLight, padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', fontWeight: '800', color: colors.avocado }}>
                  ポイント：商業の絶対的なルール
                </h4>
                <p style={{ margin: 0, fontSize: '14.5px', color: colors.textDark, lineHeight: '1.7', whiteSpace: 'pre-line' }}>
                  右側（貸方）：お金をどこから持ってきたか？【資金の調達源泉】{'\n'}
                  左侧（借方）：そのお金が今何に化けているか？【資金の運用形態】
                </p>
              </div>
            </section>

            <section id="five-boxes" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: colors.textDark, marginBottom: '20px' }}>
                3. 簿記の5大要素
              </h2>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '16px' }}>
                簿記に登場するあらゆる勘定科目は、すべて以下の5つの箱のどれかに分類されます。
                この5大要素にも、先ほどの左右の論理がそのまま適用されます。
              </p>
              <ul style={{ paddingLeft: '24px', fontSize: '15px', lineHeight: '1.8', color: colors.textGray }}>
                <li style={{ marginBottom: '8px' }}><strong>資産（左側）：</strong> お金が化けている現在の姿（現金、店舗、備品、商品など）。</li>
                <li style={{ marginBottom: '8px' }}><strong>負債（右側）：</strong> 他人から調達した、いずれ返さなければならないお金（借入金、買掛金など）。</li>
                <li style={{ marginBottom: '8px' }}><strong>純資産（右側）：</strong> 誰にも返す必要のない、本当の自分のお金（資本金など）。</li>
              </ul>
            </section>

            <section id="shiwake" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: colors.textDark, marginBottom: '20px' }}>
                4. 取引の二面性と仕訳
              </h2>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '24px' }}>
                集めたお金の中から 200万円を使って、イタリア製の高級エスプレッソマシンを購入したとします。
                この時、あなたの手元から「現金（資産）」という姿が200万円分減り、代わりに「備品（資産）」という姿が200万円分増えます。
              </p>

              {/* 参考图中的 "例題" 风格框 (白底描边) */}
              <div style={{ border: `1px solid ${colors.border}`, padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
                <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: '800', color: colors.textDark }}>
                  ✍️ 仕訳のパズルルール
                </h4>
                <div style={{ fontSize: '14.5px', color: colors.textGray, lineHeight: '1.8' }}>
                  <p style={{ margin: '0 0 8px 0' }}>• その要素を<strong>増やしたい</strong>なら：本来の定位置（ホームポジション）の側に書く！</p>
                  <p style={{ margin: 0 }}>• その要素を<strong>减らしたい</strong>なら：本来の定位置とは逆の側に書く！</p>
                </div>
              </div>
            </section>

            {/* 🏁 底部导航栏 (严格对齐参考图底部的三个按钮排版) */}
            <div style={{ borderTop: `1px solid ${colors.border}`, paddingTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              
              <Link href={`/exams/${examId}/guide`} style={{ textDecoration: 'none' }}>
                <button style={{ backgroundColor: '#ffffff', color: colors.textDark, border: `1px solid ${colors.border}`, padding: '12px 20px', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  ← 前の項目
                </button>
              </Link>

              <Link href={`/exams/${examId}/guide`} style={{ textDecoration: 'none', color: colors.textGray, fontSize: '14px', fontWeight: '600' }}>
                章のトップに戻る
              </Link>

              <Link href={`/exams/${examId}/guide/ch2`} style={{ textDecoration: 'none' }}>
                <button style={{ backgroundColor: colors.darkButton, color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  次の項目 →
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
