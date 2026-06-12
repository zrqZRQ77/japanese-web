"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ExamGuideChapterFour() {
  const params = useParams();
  const examId = params.examId || 'boki3';

  // 本章内部小节目录
  const menuItems = [
    { id: 'three-methods', label: '1. 商品売買の基本「三分法」' },
    { id: 'purchase-sales', label: '2. 仕入と売上の仕訳ルール' },
    { id: 'returns', label: '3. 返品（へんぴん）の処理' },
    { id: 'credit-sales', label: '4. クレジット売掛金（頻出！）' },
  ];

  const [activeSection, setActiveSection] = useState('three-methods');

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
          
          {/* 进度条区块 (第四章进度设为 40%) */}
          <div style={{ marginBottom: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '700', color: colors.avocado, marginBottom: '8px' }}>
              <span>進捗</span>
              <span>40%</span>
            </div>
            <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: '40%', height: '100%', background: colors.avocado, borderRadius: '3px' }}></div>
            </div>
          </div>

          {/* 章节列表 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* 已完成的第1、2、3章 */}
            <div style={{ fontSize: '14px', fontWeight: '500', color: colors.textGray, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Link href={`/exams/${examId}/guide/ch1`} style={{ textDecoration: 'none', color: 'inherit' }}>第1章 簿記の基本</Link>
              <span style={{ color: colors.avocado, fontWeight: 'bold' }}>✓ 完了</span>
            </div>
            <div style={{ fontSize: '14px', fontWeight: '500', color: colors.textGray, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Link href={`/exams/${examId}/guide/ch2`} style={{ textDecoration: 'none', color: 'inherit' }}>第2章 取引と仕訳の基礎</Link>
              <span style={{ color: colors.avocado, fontWeight: 'bold' }}>✓ 完了</span>
            </div>
            <div style={{ fontSize: '14px', fontWeight: '500', color: colors.textGray, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Link href={`/exams/${examId}/guide/ch3`} style={{ textDecoration: 'none', color: 'inherit' }}>第3章 現金と預金</Link>
              <span style={{ color: colors.avocado, fontWeight: 'bold' }}>✓ 完了</span>
            </div>

            {/* 当前展开的第4章 */}
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: colors.textDark, marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>第4章 商品売買</span>
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
            <div style={{ fontSize: '14px', fontWeight: '500', color: colors.textLightGray, padding: '8px 0' }}>第5章 その他の債権・債務</div>
            <div style={{ fontSize: '14px', fontWeight: '500', color: colors.textLightGray, padding: '8px 0' }}>第6章 固定資産と経費</div>
          </div>
        </aside>

        {/* 👉 右侧主内容区 */}
        <main style={{ flex: 1, padding: '40px 60px' }}>
          
          {/* 顶部面包屑 */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', paddingBottom: '16px', borderBottom: `1px solid ${colors.border}` }}>
            <div style={{ fontSize: '13px', color: colors.textGray, fontWeight: '500' }}>
              第4章 商品売買 <span style={{ margin: '0 8px' }}>&gt;</span> 
              <span style={{ color: colors.avocado, fontWeight: '700' }}>
                {menuItems.find(item => item.id === activeSection)?.label || '1. 商品売買の基本「三分法」'}
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
            <section id="three-methods" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: '800', color: colors.textDark, marginBottom: '24px' }}>
                1. 商品売買の基本「三分法」
              </h1>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '16px' }}>
                企業が利益を得るための最も基本的な活動が「商品を安く仕入れて、高く売る」ことです。
                日商簿記3級では、この商品売買を記録する方法として<strong>「三分法（さんぶんぽう）」</strong>というルールを必ず使います。
              </p>

              <div style={{ background: colors.avocadoLight, padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', fontWeight: '800', color: colors.avocado }}>
                  ポイント：三分法で使う３つの勘定科目
                </h4>
                <p style={{ margin: 0, fontSize: '14.5px', color: colors.textDark, lineHeight: '1.8' }}>
                  三分法という名前の通り、以下の3つの勘定科目に分けて記録します。<br/><br/>
                  ① <strong>仕入（しいれ）</strong>：【費用のグループ】商品を仕入れた時に使う。<br/>
                  ② <strong>売上（うりあげ）</strong>：【収益のグループ】商品を販売した時に使う。<br/>
                  ③ <strong>繰越商品（くりこししょうひん）</strong>：【資産のグループ】決算時に売れ残った商品を表す（※決算まで使いません！）。
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section id="purchase-sales" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: colors.textDark, marginBottom: '20px' }}>
                2. 仕入と売上の仕訳ルール
              </h2>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '24px' }}>
                日常の取引では「仕入（費用）」と「売上（収益）」の2つだけを使います。費用は左側（借方）、収益は右側（貸方）が定位置（ホームポジション）です。
              </p>
              
              <div style={{ border: `1px solid ${colors.border}`, padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
                <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: '800', color: colors.textDark }}>
                  ✍️ 基本の仕訳例
                </h4>
                <div style={{ fontSize: '14.5px', color: colors.textGray, lineHeight: '1.8' }}>
                  <p style={{ margin: '0 0 8px 0', color: colors.avocado, fontWeight: 'bold' }}>【ケース1：現金の支払い・受け取り】</p>
                  <p style={{ margin: '0 0 8px 0' }}>商品1,000円を仕入れ、代金は現金で支払った。</p>
                  <div style={{ background: '#f8fafc', padding: '12px', border: `1px dashed ${colors.border}`, textAlign: 'center', fontWeight: 'bold', color: colors.textDark, marginBottom: '16px' }}>
                    （借方）仕入 1,000 ／ （貸方）現金 1,000
                  </div>

                  <p style={{ margin: '0 0 8px 0' }}>商品1,500円を売り上げ、代金は現金で受け取った。</p>
                  <div style={{ background: '#f8fafc', padding: '12px', border: `1px dashed ${colors.border}`, textAlign: 'center', fontWeight: 'bold', color: colors.textDark, marginBottom: '24px' }}>
                    （借方）現金 1,500 ／ （貸方）売上 1,500
                  </div>

                  <p style={{ margin: '0 0 8px 0', color: colors.avocado, fontWeight: 'bold' }}>【ケース2：掛け（ツケ）での取引】</p>
                  <p style={{ margin: '0 0 8px 0' }}>商品1,000円を仕入れ、代金は掛けとした。</p>
                  <div style={{ background: '#f8fafc', padding: '12px', border: `1px dashed ${colors.border}`, textAlign: 'center', fontWeight: 'bold', color: colors.textDark, marginBottom: '16px' }}>
                    （借方）仕入 1,000 ／ （貸方）買掛金 1,000
                  </div>
                  <p style={{ margin: '0 0 8px 0' }}>商品1,500円を売り上げ、代金は掛けとした。</p>
                  <div style={{ background: '#f8fafc', padding: '12px', border: `1px dashed ${colors.border}`, textAlign: 'center', fontWeight: 'bold', color: colors.textDark }}>
                    （借方）売掛金 1,500 ／ （貸方）売上 1,500
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section id="returns" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: colors.textDark, marginBottom: '20px' }}>
                3. 返品（へんぴん）の処理
              </h2>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '16px' }}>
                品違いや傷があったために、仕入れた商品を返すことを「仕入戻し」、売り上げた商品が返ってくることを「売上戻り」と言います。
              </p>

              <div style={{ background: colors.avocadoLight, padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', fontWeight: '800', color: colors.avocado }}>
                  超シンプル！返品は「逆仕訳」をするだけ
                </h4>
                <p style={{ margin: 0, fontSize: '14.5px', color: colors.textDark, lineHeight: '1.8' }}>
                  簿記では、一度書いた仕訳を消しゴムで消すことはできません。<br/>
                  無かったことにするためには、<strong>「売った時（または仕入れた時）と全く逆の仕訳」</strong>をして相殺します。
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section id="credit-sales" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: colors.textDark, marginBottom: '20px' }}>
                4. クレジット売掛金（頻出！）
              </h2>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '24px' }}>
                現代のビジネスではクレジットカード決済が当たり前です。そのため、最近の簿記3級の試験では「クレジット売掛金」が頻繁に出題されます。
                通常の売掛金と違い、<strong>信販会社（カード会社）への手数料（支払手数料：費用）</strong>が差し引かれるのがポイントです。
              </p>
              
              <div style={{ border: `1px solid ${colors.border}`, padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
                <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: '800', color: colors.textDark }}>
                  ✍️ 例題：クレジットカード決済の売上
                </h4>
                <div style={{ fontSize: '14.5px', color: colors.textGray, lineHeight: '1.8' }}>
                  <p style={{ margin: '0 0 16px 0' }}>
                    商品10,000円をクレジットカード払いで販売した。なお、信販会社への決済手数料（売上の2％）を販売時に計上する。
                  </p>
                  <p style={{ margin: '0 0 8px 0', color: colors.avocado, fontWeight: 'bold' }}>【考え方】</p>
                  <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
                    <li>売上（収益の増加）：10,000円</li>
                    <li>支払手数料（費用の増加）：10,000 × 2% = 200円</li>
                    <li>クレジット売掛金（資産の増加）：10,000 - 200 = 9,800円（※手数料を引いた額）</li>
                  </ul>
                  <div style={{ background: '#f8fafc', padding: '12px', border: `1px dashed ${colors.border}`, textAlign: 'center', fontWeight: 'bold', color: colors.textDark }}>
                    （借方）<br/>
                    クレジット売掛金 9,800<br/>
                    支払手数料 200<br/>
                    ／<br/>
                    （貸方）<br/>
                    売上 10,000
                  </div>
                </div>
              </div>
            </section>

            {/* 🏁 底部导航栏 */}
            <div style={{ borderTop: `1px solid ${colors.border}`, paddingTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              
              <Link href={`/exams/${examId}/guide/ch3`} style={{ textDecoration: 'none' }}>
                <button style={{ backgroundColor: '#ffffff', color: colors.textDark, border: `1px solid ${colors.border}`, padding: '12px 20px', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  ← 前の項目（第3章）
                </button>
              </Link>

              <Link href={`/exams/${examId}/guide`} style={{ textDecoration: 'none', color: colors.textGray, fontSize: '14px', fontWeight: '600' }}>
                章のトップに戻る
              </Link>

              <Link href={`/exams/${examId}/guide/ch5`} style={{ textDecoration: 'none' }}>
                <button style={{ backgroundColor: colors.darkButton, color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  次の項目（第5章） →
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
