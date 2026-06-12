"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ExamGuideChapter5() {
  const params = useParams();
  const examId = params.examId || 'boki3';

  const menuItems = [
    { id: 'receivables', label: '1. 未収入金と未払金' },
    { id: 'advances', label: '2. 前払金と前受金' },
    { id: 'suspense', label: '3. 立替金と預り金' },
    { id: 'notes', label: '4. 受取手形と支払手形' }
  ];

  const [activeSection, setActiveSection] = useState('receivables');

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

      <div style={{ display: 'flex', maxWidth: '1200px', margin: '40px auto', background: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        
        <aside style={{ width: '280px', borderRight: `1px solid ${colors.border}`, padding: '30px 20px', flexShrink: 0 }}>
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: colors.textDark, marginBottom: '24px' }}>簿記3級 学習ガイド</h2>
          
          <div style={{ marginBottom: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '700', color: colors.avocado, marginBottom: '8px' }}>
              <span>進捗</span>
              <span>50%</span>
            </div>
            <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: '50%', height: '100%', background: colors.avocado, borderRadius: '3px' }}></div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            <div style={{ fontSize: '14px', fontWeight: '500', color: colors.textGray, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Link href={`/exams/${examId}/guide/ch1`} style={{ textDecoration: 'none', color: 'inherit' }}>第1章</Link>
              <span style={{ color: colors.avocado, fontWeight: 'bold' }}>✓ 完了</span>
            </div>
            <div style={{ fontSize: '14px', fontWeight: '500', color: colors.textGray, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Link href={`/exams/${examId}/guide/ch2`} style={{ textDecoration: 'none', color: 'inherit' }}>第2章</Link>
              <span style={{ color: colors.avocado, fontWeight: 'bold' }}>✓ 完了</span>
            </div>
            <div style={{ fontSize: '14px', fontWeight: '500', color: colors.textGray, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Link href={`/exams/${examId}/guide/ch3`} style={{ textDecoration: 'none', color: 'inherit' }}>第3章</Link>
              <span style={{ color: colors.avocado, fontWeight: 'bold' }}>✓ 完了</span>
            </div>
            <div style={{ fontSize: '14px', fontWeight: '500', color: colors.textGray, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Link href={`/exams/${examId}/guide/ch4`} style={{ textDecoration: 'none', color: 'inherit' }}>第4章</Link>
              <span style={{ color: colors.avocado, fontWeight: 'bold' }}>✓ 完了</span>
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: colors.textDark, marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>第5章 その他の債権・債務</span>
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
            <div style={{ fontSize: '14px', fontWeight: '500', color: colors.textLightGray, padding: '8px 0' }}>
              第6章
            </div>
            <div style={{ fontSize: '14px', fontWeight: '500', color: colors.textLightGray, padding: '8px 0' }}>
              第7章
            </div>
            <div style={{ fontSize: '14px', fontWeight: '500', color: colors.textLightGray, padding: '8px 0' }}>
              第8章
            </div>
            <div style={{ fontSize: '14px', fontWeight: '500', color: colors.textLightGray, padding: '8px 0' }}>
              第9章
            </div>
            <div style={{ fontSize: '14px', fontWeight: '500', color: colors.textLightGray, padding: '8px 0' }}>
              第10章
            </div>
          </div>
        </aside>

        <main style={{ flex: 1, padding: '40px 60px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', paddingBottom: '16px', borderBottom: `1px solid ${colors.border}` }}>
            <div style={{ fontSize: '13px', color: colors.textGray, fontWeight: '500' }}>
              第5章 その他の債権・債務 <span style={{ margin: '0 8px' }}>&gt;</span> 
              <span style={{ color: colors.avocado, fontWeight: '700' }}>
                {menuItems.find(item => item.id === activeSection)?.label || ''}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '12px', color: colors.textLightGray }}>
              <span style={{ cursor: 'pointer' }}>🔖</span>
              <span style={{ cursor: 'pointer' }}>⭐</span>
              <span style={{ cursor: 'pointer' }}>📤</span>
            </div>
          </div>

          <div style={{ maxWidth: '680px' }}>
            
            <section id="receivables" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: '800', color: colors.textDark, marginBottom: '24px' }}>
                1. 未収入金と未払金
              </h1>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '16px' }}>
                本業の商品売買（第4章）以外の取引、例えば「使わなくなったパソコン（備品）を売却した」「社用車を購入した」という時のツケは、売掛金・買掛金ではなく、<strong>未収入金（みしゅうにゅうきん：資産）</strong>および<strong>未払金（みばらいきん：負債）</strong>として処理します。
              </p>
              <div style={{ background: colors.avocadoLight, padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', fontWeight: '800', color: colors.avocado }}>
                  ポイント：商品売買かそれ以外かで科目が完全に変わる！
                </h4>
                <p style={{ margin: 0, fontSize: '14.5px', color: colors.textDark, lineHeight: '1.7' }}>
                  ・商品（本業）をツケで販売 ➔ <strong>売掛金</strong><br/>
                  ・備品（本業以外）をツケで販売 ➔ <strong>未収入金</strong>
                </p>
              </div>
            </section>

            <section id="advances" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: colors.textDark, marginBottom: '20px' }}>
                2. 前払金と前受金
              </h2>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '16px' }}>
                商品の売買契約を結んだ際に、内金や手付金（前金）を支払ったり受け取ったりした時の勘定科目です。
                先に支払ったお金は商品を要求できる権利なので<strong>前払金（まえばらいきん：資産）</strong>、先に受け取ったお金は商品を引き渡す義務なので<strong>前受金（まえうけきん：負債）</strong>となります。
              </p>
            </section>

            <section id="suspense" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: colors.textDark, marginBottom: '20px' }}>
                3. 立替金と預り金
              </h2>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '16px' }}>
                会社が役員や従業員、あるいは取引先の代金を一時的に肩代わりした場合は<strong>立替金（たてかえきん：資産）</strong>を使います。
                逆に、給与から天引きする社会保険料や所得税のように、後で本人に代わって支払うために一時的にプールするお金は<strong>預り金（あずかりきん：負債）</strong>で仕訳します。
              </p>
            </section>

            <section id="notes" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: colors.textDark, marginBottom: '20px' }}>
                4. 受取手形と支払手形
              </h2>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '16px' }}>
                「○月○日に指定金額を支払います」と約束した有価証券を約束手形と呼びます。
                手形代金を受け取る権利は<strong>受取手形（うけとりてがた：資産）</strong>、代金を支払う義務は<strong>支払手形（しはらいてがた：負債）</strong>として処理します。
              </p>
            </section>

            
            <div style={{ borderTop: `1px solid ${colors.border}`, paddingTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link href={`/exams/${examId}/guide/ch4`} style={{ textDecoration: 'none' }}>
                <button style={{ backgroundColor: '#ffffff', color: colors.textDark, border: `1px solid ${colors.border}`, padding: '12px 20px', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  ← 前の項目（第4章）
                </button>
              </Link>

              <Link href={`/exams/${examId}/guide`} style={{ textDecoration: 'none', color: colors.textGray, fontSize: '14px', fontWeight: '600' }}>
                章のトップに戻る
              </Link>

              <Link href={`/exams/${examId}/guide/ch6`} style={{ textDecoration: 'none' }}>
                <button style={{ backgroundColor: colors.darkButton, color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  次の項目（第6章） →
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
