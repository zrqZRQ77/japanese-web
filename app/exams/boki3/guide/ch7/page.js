"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ExamGuideChapterSeven() {
  const params = useParams();
  const examId = params.examId || 'boki3';

  // 本章内部小节目录
  const menuItems = [
    { id: 'accrual_basis', label: '1. 決算整理と「月割計算」の基本' },
    { id: 'prepaid_expense', label: '2. 費用の繰延（前払費用）と再振替' },
    { id: 'unearned_revenue', label: '3. 収益の繰延（前受収益）' },
    { id: 'accrued_expense_rev', label: '4. 費用の見越と収益の見越' },
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
              <h1 style={{ fontSize: '24px', fontWeight: '800', color: colors.textDark, marginBottom: '24px' }}>1. 決算整理と「月割計算」の基本</h1>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '16px' }}>
                損益計算書（P/L）には<strong>「当期の純粋な1年間の費用と収益」</strong>だけを載せます。しかし、「家賃を1年分まとめて先払いした」場合など、来年の分まで支払っているズレ（経過勘定）が生じます。試験では、このズレを<strong>月割計算（つきわりけいさん）</strong>で正確に割り出す能力が問われます。
              </p>
            </section>

            <section id="prepaid_expense" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: colors.textDark, marginBottom: '20px' }}>2. 費用の繰延（前払費用）と再振替</h2>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '16px' }}>
                当期に支払った費用のうち、来期のサービス分を今年の費用からマイナスし、<strong>前払費用（資産）</strong>に振り替えます。そして、<strong>翌年の期首には必ず元に戻す仕訳（再振替仕訳）</strong>を行います。
              </p>
              
              <div style={{ border: `1px solid ${colors.border}`, padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
                <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: '800', color: colors.textDark }}>✍️ 例題：保険料の前払いと翌期の処理（頻出）</h4>
                <div style={{ fontSize: '14.5px', color: colors.textGray, lineHeight: '1.8' }}>
                  <p style={{ margin: '0 0 8px 0', color: colors.avocado, fontWeight: 'bold' }}>【状況】決算日は12月31日。</p>
                  <p style={{ margin: '0 0 8px 0' }}>当年8月1日に、向こう1年分（当年8月〜翌年7月）の保険料 12,000円を現金で支払い、全额「支払保険料（費用）」として記帳していた。</p>
                  
                  <p style={{ margin: '16px 0 8px 0', color: colors.avocado, fontWeight: 'bold' }}>① 当期の決算日（12月31日）の仕訳</p>
                  <p style={{ margin: '0 0 12px 0' }}>
                    ・1ヶ月分：12,000円 ÷ 12ヶ月 ＝ 1,000円<br/>
                    ・当期分（8〜12月）：5ヶ月 ＝ 5,000円<br/>
                    ・<strong>来期分（翌1〜7月）：7ヶ月 ＝ 7,000円 ➔ これを繰り延べる！</strong>
                  </p>
                  <div style={{ background: '#f8fafc', padding: '12px', border: `1px dashed ${colors.border}`, textAlign: 'center', fontWeight: 'bold', color: colors.textDark }}>
                    （借方）前払保険料 7,000 ／ （貸方）支払保険料 7,000
                  </div>

                  <p style={{ margin: '16px 0 8px 0', color: '#b93a26', fontWeight: 'bold' }}>② 翌期の期首（翌年1月1日）の再振替仕訳（超重要）</p>
                  <p style={{ margin: '0 0 12px 0' }}>
                    新年になったら、決算で行った仕訳を<strong>左右逆にしてリセット</strong>します。これにより、7,000円が正しく「新年の費用（支払保険料）」として計上されます。
                  </p>
                  <div style={{ background: '#fdf2f0', padding: '12px', border: `1px dashed #fca5a5`, textAlign: 'center', fontWeight: 'bold', color: '#b93a26' }}>
                    （借方）支払保険料 7,000 ／ （貸方）前払保険料 7,000
                  </div>
                </div>
              </div>
            </section>

            <section id="unearned_revenue" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: colors.textDark, marginBottom: '20px' }}>3. 収益の繰延（前受収益）</h2>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '16px' }}>
                当期に受け取った収益のうち、来期分の金額を今年の収益からマイナスし、<strong>前受収益（負債）</strong>に振り替えます。「まだサービスを提供していないのに受け取ったお金＝負債」と考えます。
              </p>
              
              <div style={{ border: `1px solid ${colors.border}`, padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
                <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: '800', color: colors.textDark }}>✍️ 例題：地代の先受け</h4>
                <div style={{ fontSize: '14.5px', color: colors.textGray, lineHeight: '1.8' }}>
                  <p style={{ margin: '0 0 8px 0' }}>決算にあたり、受取地代のうち来期分が50,000円含まれていることが判明した。</p>
                  <div style={{ background: '#f8fafc', padding: '12px', border: `1px dashed ${colors.border}`, textAlign: 'center', fontWeight: 'bold', color: colors.textDark }}>
                    （借方）受取地代 50,000 ／ （貸方）前受地代 50,000
                  </div>
                  <p style={{ margin: '12px 0 0 0', fontSize: '13px', color: colors.textGray }}>※こちらも翌期首には（借方）前受地代 ／（貸方）受取地代 と再振替仕訳を行います。</p>
                </div>
              </div>
            </section>

            <section id="accrued_expense_rev" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: colors.textDark, marginBottom: '20px' }}>4. 費用の見越と収益の見越</h2>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '16px' }}>
                「支払いや受け取りは来年だけど、サービス自体は今年すでに発生している」場合、今年の費用・収益として追加計上します。相手科目は<strong>未払費用（負債）</strong>または<strong>未収収益（資産）</strong>を使ります。
              </p>
              
              <div style={{ background: colors.avocadoLight, padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
                <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: '800', color: colors.avocado }}>✍️ 見越の仕訳パターンまとめ</h4>
                <div style={{ fontSize: '14.5px', color: colors.textDark, lineHeight: '1.8' }}>
                  <p style={{ margin: '0 0 4px 0', fontWeight: 'bold' }}>【費用の見越】今年の借入金利息 6,000円が未払いである。</p>
                  <div style={{ background: '#ffffff', padding: '8px', border: `1px solid ${colors.border}`, textAlign: 'center', marginBottom: '16px' }}>
                    （借方）支払利息 6,000 ／ （貸方）未払利息 6,000
                  </div>
                  <p style={{ margin: '0 0 4px 0', fontWeight: 'bold' }}>【収益の見越】今年の貸付金利息 8,000円が未収である。</p>
                  <div style={{ background: '#ffffff', padding: '8px', border: `1px solid ${colors.border}`, textAlign: 'center' }}>
                    （借方）未収利息 8,000 ／ （貸方）受取利息 8,000
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
