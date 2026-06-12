"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ExamGuideChapterSeven() {
  const params = useParams();
  const examId = params.examId || 'boki3';

  // 本章内部小节目录
  const menuItems = [
    { id: 'accrual_basis', label: '1. なぜ決算で調整が必要なのか？' },
    { id: 'prepaid_expense', label: '2. 費用の繰延（前払費用）' },
    { id: 'unearned_revenue', label: '3. 収益の繰延（前受収益）' },
    { id: 'accrued_expense', label: '4. 費用の見越（未払費用）' },
  ];

  const [activeSection, setActiveSection] = useState('accrual_basis');

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
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: '"Helvetica Neue", Arial, sans-serif' }}>
      
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

      <div style={{ display: 'flex', maxWidth: '1200px', margin: '40px auto', background: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', overflow: 'hidden' }}>
        
        <aside style={{ width: '280px', borderRight: `1px solid ${colors.border}`, padding: '30px 20px', flexShrink: 0 }}>
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: colors.textDark, marginBottom: '24px' }}>簿記3級 学習ガイド</h2>
          
          <div style={{ marginBottom: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '700', color: colors.avocado, marginBottom: '8px' }}>
              <span>進捗</span><span>70%</span>
            </div>
            <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: '70%', height: '100%', background: colors.avocado, borderRadius: '3px' }}></div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[1, 2, 3, 4, 5, 6].map(ch => (
              <div key={ch} style={{ fontSize: '14px', fontWeight: '500', color: colors.textGray, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Link href={`/exams/${examId}/guide/ch${ch}`} style={{ textDecoration: 'none', color: 'inherit' }}>第{ch}章</Link>
                <span style={{ color: colors.avocado, fontWeight: 'bold' }}>✓ 完了</span>
              </div>
            ))}
            
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: colors.textDark, marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>第7章 収益・費用の繰延・見越</span>
                <span style={{ color: colors.avocado, fontSize: '18px' }}>•</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', borderLeft: `2px solid ${colors.border}`, marginLeft: '6px' }}>
                {menuItems.map((item) => {
                  const isCurrent = activeSection === item.id;
                  return (
                    <a key={item.id} href={`#${item.id}`} style={{ padding: '10px 0 10px 16px', fontSize: '13px', textDecoration: 'none', color: isCurrent ? colors.avocado : colors.textGray, fontWeight: isCurrent ? '700' : '500', borderLeft: isCurrent ? `2px solid ${colors.avocado}` : '2px solid transparent', marginLeft: '-2px' }}>
                      {item.label}
                    </a>
                  );
                })}
              </div>
            </div>
            <div style={{ fontSize: '14px', fontWeight: '500', color: colors.textLightGray, padding: '8px 0' }}>第8章 貸倒引当金と消費税</div>
          </div>
        </aside>

        <main style={{ flex: 1, padding: '40px 60px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', paddingBottom: '16px', borderBottom: `1px solid ${colors.border}` }}>
            <div style={{ fontSize: '13px', color: colors.textGray, fontWeight: '500' }}>
              第7章 収益・費用の繰延と見越 <span style={{ margin: '0 8px' }}>&gt;</span> 
              <span style={{ color: colors.avocado, fontWeight: '700' }}>{menuItems.find(item => item.id === activeSection)?.label}</span>
            </div>
          </div>

          <div style={{ maxWidth: '680px' }}>
            
            <section id="accrual_basis" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: '800', color: colors.textDark, marginBottom: '24px' }}>1. なぜ決算で調整が必要なのか？</h1>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '16px' }}>
                簿記の損益計算書（P/L）には、<strong>「当期の純粋な1年間の費用と収益」</strong>だけを載せる必要があります。
                しかし、現実のビジネスでは「家賃を来年分まで先払いした」「利息を後でまとめて受け取る」といったズレが発生します。
                このズレを修正し、正しい期間に割り振る手続きを<strong>経過勘定（けいかかんじょう）</strong>の整理と呼びます。
              </p>
              <div style={{ background: colors.avocadoLight, padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', fontWeight: '800', color: colors.avocado }}>💡 2つの基本アプローチ</h4>
                <p style={{ margin: 0, fontSize: '14.5px', color: colors.textDark, lineHeight: '1.7' }}>
                  ① <strong>繰延（くりのべ）</strong>：当期に支払った/受け取ったが、来年分のものは今年の分から削る（前払費用・前受収益）。<br/>
                  ② <strong>見越（みこし）</strong>：当期にまだ支払っていない/受け取っていないが、今年の分は今期に足す（未払費用・未収収益）。
                </p>
              </div>
            </section>

            <section id="prepaid_expense" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: colors.textDark, marginBottom: '20px' }}>2. 費用の繰延（前払費用）</h2>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '16px' }}>
                当期に支払った費用のうち、来期のサービス分を今年の費用からマイナスし、<strong>前払費用（資産）</strong>に振り替えます。
              </p>
              
              <div style={{ border: `1px solid ${colors.border}`, padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
                <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: '800', color: colors.textDark }}>✍️ 例題：保険料の前払い（月割計算）</h4>
                <div style={{ fontSize: '14.5px', color: colors.textGray, lineHeight: '1.8' }}>
                  <p style={{ margin: '0 0 8px 0' }}><strong>【状況】</strong> 決算日は12月31日。当年10月1日に、向こう1年分の保険料 12,000円を現金で支払い、全额「支払保険料（費用）」として記帳していた。</p>
                  <p style={{ margin: '0 0 8px 0', color: colors.avocado, fontWeight: 'bold' }}>【計算の考え方】</p>
                  <p style={{ margin: '0 0 12px 0' }}>
                    ・1ヶ月あたりの保険料：12,000円 ÷ 12ヶ月 ＝ 1,000円<br/>
                    ・当期の対象期間（10月〜12月）：3ヶ月分 ➔ 3,000円（今年の費用）<br/>
                    ・来期の対象期間（翌年1月〜9月）：<strong>9ヶ月分 ➔ 9,000円（来年の費用＝繰延べる分）</strong>
                  </p>
                  <p style={{ margin: '0 0 8px 0', color: colors.avocado, fontWeight: 'bold' }}>【決算整理仕訳】</p>
                  <p style={{ margin: '0 0 12px 0' }}>支払保険料という費用を9,000円分減らし（右側）、前払保険料（左側）に変えます。</p>
                  <div style={{ background: '#f8fafc', padding: '12px', border: `1px dashed ${colors.border}`, textAlign: 'center', fontWeight: 'bold', color: colors.textDark }}>
                    （借方）前払保険料 9,000 ／ （貸方）支払保険料 9,000
                  </div>
                </div>
              </div>
            </section>

            <section id="unearned_revenue" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: colors.textDark, marginBottom: '20px' }}>3. 収益の繰延（前受収益）</h2>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '16px' }}>
                当期に受け取った収益のうち、来期分の金額を今年の収益からマイナスし、<strong>前受収益（負債）</strong>に振り替えます。
              </p>
              
              <div style={{ border: `1px solid ${colors.border}`, padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
                <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: '800', color: colors.textDark }}>✍️ 例題：地代の先受け</h4>
                <div style={{ fontSize: '14.5px', color: colors.textGray, lineHeight: '1.8' }}>
                  <p style={{ margin: '0 0 8px 0' }}>本地代受取総額のうち、翌期に属する期間分の地代が 50,000円あることが判明したため、決算整理を行う。</p>
                  <p style={{ margin: '0 0 8px 0', color: colors.avocado, fontWeight: 'bold' }}>【考え方】</p>
                  <p style={{ margin: '0 0 16px 0' }}>当期の「受取地代（収益）」を50,000円減らし（左側）、まだサービスを提供していない義務として「前受地代（負債・右側）」に計上します。</p>
                  <div style={{ background: '#f8fafc', padding: '12px', border: `1px dashed ${colors.border}`, textAlign: 'center', fontWeight: 'bold', color: colors.textDark }}>
                    （借方）受取地代 50,000 ／ （貸方）前受地代 50,000
                  </div>
                </div>
              </div>
            </section>

            <section id="accrued_expense" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: colors.textDark, marginBottom: '20px' }}>4. 費用の見越（未払費用）</h2>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '16px' }}>
                「支払いは来年だけど、サービス自体は今年受けている」という場合、その未払いの経費を今年の費用として追加し、同時に<strong>未払費用（負債）</strong>を計上します。
              </p>
              
              <div style={{ border: `1px solid ${colors.border}`, padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
                <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: '800', color: colors.textDark }}>✍️ 例題：未払利息の計上</h4>
                <div style={{ fontSize: '14.5px', color: colors.textGray, lineHeight: '1.8' }}>
                  <p style={{ margin: '0 0 8px 0' }}>借入金に対する利息が、当期分として 6,000円発生しているが、支払日は翌期のため未払いである。</p>
                  <p style={{ margin: '0 0 8px 0', color: colors.avocado, fontWeight: 'bold' }}>【考え方】</p>
                  <p style={{ margin: '0 0 16px 0' }}>支払っていなくても今年の費用なので、借方に「支払利息（費用）」を増やし、右側に後で払う義務として「未払利息（負債）」を置きます。</p>
                  <div style={{ background: '#f8fafc', padding: '12px', border: `1px dashed ${colors.border}`, textAlign: 'center', fontWeight: 'bold', color: colors.textDark }}>
                    （借方）支払利息 6,000 ／ （貸方）未払利息 6,000
                  </div>
                </div>
              </div>
            </section>
            
            <div style={{ borderTop: `1px solid ${colors.border}`, paddingTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link href={`/exams/${examId}/guide/ch6`} style={{ textDecoration: 'none' }}>
                <button style={{ backgroundColor: '#ffffff', color: colors.textDark, border: `1px solid ${colors.border}`, padding: '12px 20px', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  ← 前の項目（第6章）
                </button>
              </Link>
              <Link href={`/exams/${examId}/guide`} style={{ textDecoration: 'none', color: colors.textGray, fontSize: '14px', fontWeight: '600' }}>章のトップに戻る</Link>
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
