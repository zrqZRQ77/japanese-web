"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ExamGuideChapter7() {
  const params = useParams();
  const examId = params.examId || 'boki3';

  const menuItems = [
    { id: 'adjusting-entries', label: '1. 決算整理（けっさんせいり）と経過勘定' },
    { id: 'prepaid', label: '2. 費用の繰延（前払費用）' },
    { id: 'deferred', label: '3. 収益の繰延（前受収益）' },
    { id: 'accrued', label: '4. 費用の見越（未払費用）' }
  ];

  const [activeSection, setActiveSection] = useState('adjusting-entries');

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
              <span>70%</span>
            </div>
            <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: '70%', height: '100%', background: colors.avocado, borderRadius: '3px' }}></div>
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
            <div style={{ fontSize: '14px', fontWeight: '500', color: colors.textGray, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Link href={`/exams/${examId}/guide/ch5`} style={{ textDecoration: 'none', color: 'inherit' }}>第5章</Link>
              <span style={{ color: colors.avocado, fontWeight: 'bold' }}>✓ 完了</span>
            </div>
            <div style={{ fontSize: '14px', fontWeight: '500', color: colors.textGray, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Link href={`/exams/${examId}/guide/ch6`} style={{ textDecoration: 'none', color: 'inherit' }}>第6章</Link>
              <span style={{ color: colors.avocado, fontWeight: 'bold' }}>✓ 完了</span>
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: colors.textDark, marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>第7章 収益・費用の繰延と見越</span>
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
              第7章 収益・費用の繰延と見越 <span style={{ margin: '0 8px' }}>&gt;</span> 
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
            
            <section id="adjusting-entries" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: '800', color: colors.textDark, marginBottom: '24px' }}>
                1. 決算整理（けっさんせいり）と経過勘定
              </h1>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '16px' }}>
                簿記の成績表（決算書）は、1年間という区切りで作成します。
                しかし、「家賃を1年分まとめて先払いした」というような場合、その中には「来年分の家賃」が含まれてしまっています。
                正しく今年の純粋な損益を計算するために、期間のズレを調整する手続きを<strong>経過勘定（けいかかんじょう）</strong>の整理と言います。
              </p>
            </section>

            <section id="prepaid" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: colors.textDark, marginBottom: '20px' }}>
                2. 費用の繰延（前払費用）
              </h2>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '16px' }}>
                当期に支払った費用のうち、次期（来年）以降のサービスに対応する金額を、今年の費用からマイナスして翌期へ送り出す手続きです。
                調整には<strong>前払費用（まえばらいひよう：資産）</strong>勘定を使用します。
              </p>
              <div style={{ background: colors.avocadoLight, padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', fontWeight: '800', color: colors.avocado }}>
                  仕訳の型
                </h4>
                <p style={{ margin: 0, fontSize: '14.5px', color: colors.textDark, lineHeight: '1.7' }}>
                  （借方）<strong>前払保険料</strong>（資産の増加） ／ （貸方）<strong>支払保険料</strong>（費用の減少）
                </p>
              </div>
            </section>

            <section id="deferred" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: colors.textDark, marginBottom: '20px' }}>
                3. 収益の繰延（前受収益）
              </h2>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '16px' }}>
                当期に受け取った収益（地代や利息など）のうち、来期に属する部分を今年の収益から差し引く処理です。
                <strong>前受収益（まえうけしゅうえき：負債）</strong>として処理します。
              </p>
            </section>

            <section id="accrued" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: colors.textDark, marginBottom: '20px' }}>
                4. 費用の見越（未払費用）
              </h2>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '16px' }}>
                「代金の支払いは来年だけど、サービス自体は今年もう受けている」という場合、今年の費用として計上しなければなりません。
                これを費用の見越と呼び、相手科目に<strong>未払費用（みばらいひよう：負債）</strong>を使用します。
              </p>
            </section>

            
            <div style={{ borderTop: `1px solid ${colors.border}`, paddingTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link href={`/exams/${examId}/guide/ch6`} style={{ textDecoration: 'none' }}>
                <button style={{ backgroundColor: '#ffffff', color: colors.textDark, border: `1px solid ${colors.border}`, padding: '12px 20px', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  ← 前の項目（第6章）
                </button>
              </Link>

              <Link href={`/exams/${examId}/guide`} style={{ textDecoration: 'none', color: colors.textGray, fontSize: '14px', fontWeight: '600' }}>
                章のトップに戻る
              </Link>

              <Link href={`/exams/${examId}/guide/ch8`} style={{ textDecoration: 'none' }}>
                <button style={{ backgroundColor: colors.darkButton, color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  次の項目（第8章） →
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
