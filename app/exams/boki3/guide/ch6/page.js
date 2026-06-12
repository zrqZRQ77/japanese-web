"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ExamGuideChapterSixUpgrade() {
  const params = useParams();
  const examId = params.examId || 'boki3';

  const menuItems = [
    { id: 'acquisition', label: '1. 固定資産の取得と付随費用' },
    { id: 'depreciation_basic', label: '2. 減価償却の基礎（定額法）' },
    { id: 'mid_term_sale', label: '3. 【最難関】固定資産の期中売却' },
    { id: 'supplies', label: '4. 消耗品の記帳（費用/資産法）' },
  ];

  const [activeSection, setActiveSection] = useState('acquisition');

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
              <span>進捗</span><span>60%</span>
            </div>
            <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: '60%', height: '100%', background: colors.avocado, borderRadius: '3px' }}></div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[1, 2, 3, 4, 5].map(ch => (
              <div key={ch} style={{ fontSize: '14px', fontWeight: '500', color: colors.textGray, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Link href={`/exams/${examId}/guide/ch${ch}`} style={{ textDecoration: 'none', color: 'inherit' }}>第{ch}章</Link>
                <span style={{ color: colors.avocado, fontWeight: 'bold' }}>✓ 完了</span>
              </div>
            ))}
            
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: colors.textDark, marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>第6章 固定資産と経費</span>
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
            <div style={{ fontSize: '14px', fontWeight: '500', color: colors.textLightGray, padding: '8px 0' }}>第7章 収益・費用の繰延と見越</div>
          </div>
        </aside>

        <main style={{ flex: 1, padding: '40px 60px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', paddingBottom: '16px', borderBottom: `1px solid ${colors.border}` }}>
            <div style={{ fontSize: '13px', color: colors.textGray, fontWeight: '500' }}>
              第6章 固定資産と経費 <span style={{ margin: '0 8px' }}>&gt;</span> 
              <span style={{ color: colors.avocado, fontWeight: '700' }}>{menuItems.find(item => item.id === activeSection)?.label}</span>
            </div>
          </div>

          <div style={{ maxWidth: '680px' }}>
            
            <section id="acquisition" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: '800', color: colors.textDark, marginBottom: '24px' }}>1. 固定資産の取得と付随費用</h1>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '16px' }}>
                固定資産購入時の仲介手数料や運送費などの<strong>付随費用</strong>は、すべて「固定資産の取得原価」に合体させます。
              </p>
              <div style={{ border: `1px solid ${colors.border}`, padding: '24px', borderRadius: '8px' }}>
                <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: '800', color: colors.textDark }}>✍️ 例題：備品の購入</h4>
                <div style={{ fontSize: '14.5px', color: colors.textGray, lineHeight: '1.8' }}>
                  <p>パソコン(備品)10万円を購入し、据付費用5,000円と合わせて小切手を振り出した。<br/>
                  <strong>（借方）備品 105,000 ／ （貸方）当座預金 105,000</strong></p>
                </div>
              </div>
            </section>

            <section id="depreciation_basic" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: colors.textDark, marginBottom: '20px' }}>2. 減価償却の基礎（定額法）</h2>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '16px' }}>
                定額法は、毎年同じ額を費用にする方法です。<strong>（取得原価 － 残存価額）÷ 耐用年数</strong>。3級では「残存価額0円」が標準です。
              </p>
            </section>

            <section id="mid_term_sale" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: colors.textDark, marginBottom: '20px' }}>3. 【最難関】固定資産の期中売却</h2>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '16px' }}>
                試験本番で最も差がつくのがこれ。<strong>期中（決算日ではない日）に売る場合</strong>、まずは売却日まで使った分だけの「当期分減価償却費」を月割りで計上しなければなりません。
              </p>
              
              <div style={{ border: `1px solid ${colors.border}`, padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
                <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: '800', color: colors.textDark }}>✍️ 例題：9月末の期中売却（間接法）</h4>
                <div style={{ fontSize: '14.5px', color: colors.textGray, lineHeight: '1.8' }}>
                  <p><strong>【状況】</strong>4月1日決算の会社。当年9月末に、備品（取得原価 120,000円、前期末までの減価償却累計額 80,000円）を 30,000円で売却し、現金を受け取った。耐用年数6年、定額法。</p>
                  
                  <p style={{ color: colors.avocado, fontWeight: 'bold', marginTop: '12px' }}>① 当期分折旧（4月〜9月の6ヶ月分）を計上</p>
                  <p>月額折旧：120,000 ÷ 6年 ÷ 12ヶ月 ＝ 1,666... → 年額 20,000円。 6ヶ月分＝<strong>10,000円</strong>。</p>
                  <div style={{ background: '#f8fafc', padding: '10px', border: `1px dashed ${colors.border}`, fontWeight: 'bold' }}>
                    （借方）減価償却費 10,000 ／ （貸方）減価償却累計額 10,000
                  </div>

                  <p style={{ color: colors.avocado, fontWeight: 'bold', marginTop: '12px' }}>② 売却処理（帳簿価額との差額を判定）</p>
                  <p>・帳簿価額＝取得(120,000) - 累計額(前期80,000 + 当期当月分10,000) ＝ 30,000円<br/>
                     ・売値 30,000円 ＝ 帳簿価額 30,000円 ➔ 損益なし！</p>
                  <div style={{ background: '#f8fafc', padding: '10px', border: `1px dashed ${colors.border}`, fontWeight: 'bold' }}>
                    （借方）現 金 30,000<br/>
                    （借方）減価償却累計額 90,000 ／ （貸方）備 品 120,000
                  </div>
                </div>
              </div>
            </section>

            <section id="supplies" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: colors.textDark, marginBottom: '20px' }}>4. 消耗品の処理</h2>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray }}>購入時に全額「費用（消耗品費）」にする方法と、使った分だけを資産から振り替える方法があります。</p>
            </section>
            
            <div style={{ borderTop: `1px solid ${colors.border}`, paddingTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link href={`/exams/${examId}/guide/ch5`} style={{ textDecoration: 'none' }}>
                <button style={{ backgroundColor: '#ffffff', color: colors.textDark, border: `1px solid ${colors.border}`, padding: '12px 20px', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  ← 前の項目（第5章）
                </button>
              </Link>
              <Link href={`/exams/${examId}/guide`} style={{ textDecoration: 'none', color: colors.textGray, fontSize: '14px', fontWeight: '600' }}>章のトップに戻る</Link>
              <Link href={`/exams/${examId}/guide/ch7`}>
                <button style={{ backgroundColor: colors.darkButton, color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  次の項目（第7章） →
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
