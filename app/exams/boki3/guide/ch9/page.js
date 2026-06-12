"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ExamGuideChapterNine() {
  const params = useParams();
  const examId = params.examId || 'boki3';

  // 本章内部小节目录
  const menuItems = [
    { id: 'trial_balance_types', label: '1. 試算表（しさんひょう）の3つの種類' },
    { id: 'balance_trial_balance', label: '2. 残高試算表の作成とチェック' },
    { id: 'closing_pl', label: '3. 収益・費用の締め切り（損益振替）' },
    { id: 'closing_bs', label: '4. 資産・負債・純資産の締め切り' },
  ];

  const [activeSection, setActiveSection] = useState('trial_balance_types');

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
              <span>進捗</span><span>90%</span>
            </div>
            <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: '90%', height: '100%', background: colors.avocado, borderRadius: '3px' }}></div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map(ch => (
              <div key={ch} style={{ fontSize: '14px', fontWeight: '500', color: colors.textGray, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Link href={`/exams/${examId}/guide/ch${ch}`} style={{ textDecoration: 'none', color: 'inherit' }}>第{ch}章</Link>
                <span style={{ color: colors.avocado, fontWeight: 'bold' }}>✓ 完了</span>
              </div>
            ))}
            
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: colors.textDark, marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>第9章 試算表と帳簿の締め切り</span>
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
            <div style={{ fontSize: '14px', fontWeight: '500', color: colors.textLightGray, padding: '8px 0' }}>第10章 決算と財務諸表の作成</div>
          </div>
        </aside>

        <main style={{ flex: 1, padding: '40px 60px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', paddingBottom: '16px', borderBottom: `1px solid ${colors.border}` }}>
            <div style={{ fontSize: '13px', color: colors.textGray, fontWeight: '500' }}>
              第9章 試算表と帳簿の締め切り <span style={{ margin: '0 8px' }}>&gt;</span> 
              <span style={{ color: colors.avocado, fontWeight: '700' }}>{menuItems.find(item => item.id === activeSection)?.label}</span>
            </div>
          </div>

          <div style={{ maxWidth: '680px' }}>
            
            <section id="trial_balance_types" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: '800', color: colors.textDark, marginBottom: '24px' }}>1. 試算表（しさんひょう）の3つの種類</h1>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '16px' }}>
                決算手続きに入る前に、日々の仕訳や総勘定元帳への転記にミスがないかを確認するための集計表を<strong>試算表（Trial Balance: T/B）</strong>と呼びます。試算表には以下の3種類があります。
              </p>
              <div style={{ background: colors.avocadoLight, padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
                <ul style={{ paddingLeft: '20px', fontSize: '14.5px', color: colors.textDark, lineHeight: '1.8', margin: 0 }}>
                  <li><strong>合計試算表</strong>：各勘定口座の「借方の合計」と「貸方の合計」をそのまま集計した表。</li>
                  <li><strong>残高試算表（★試験で最も重要）</strong>：各勘定口座の借方と貸方を相殺し、「残高」だけを集計した表。</li>
                  <li><strong>合計残高試算表</strong>：上記2つをドッキングさせた表。</li>
                </ul>
              </div>
            </section>

            <section id="balance_trial_balance" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: colors.textDark, marginBottom: '20px' }}>2. 残高試算表の作成とチェック</h2>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '16px' }}>
                残高試算表を作成する際の最大のルールは<strong>「簿記の5大要素のホームポジション（定位置）」</strong>に必ず残高がくるということです。もし逆側に残高が来ていたら、どこかで計算ミスをしています。
              </p>
              
              <div style={{ border: `1px solid ${colors.border}`, padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
                <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: '800', color: colors.textDark }}>💡 残高の定位置（超重要）</h4>
                <div style={{ fontSize: '14.5px', color: colors.textGray, lineHeight: '1.8' }}>
                  <p style={{ margin: '0 0 4px 0', fontWeight: 'bold' }}>【必ず左側（借方）に残高がくるもの】</p>
                  <p style={{ margin: '0 0 12px 0' }}>資産（現金、売掛金、備品など）／ 費用（仕入、給料、支払家賃など）</p>
                  
                  <p style={{ margin: '0 0 4px 0', fontWeight: 'bold' }}>【必ず右側（貸方）に残高がくるもの】</p>
                  <p style={{ margin: '0 0 12px 0' }}>負債（買掛金、借入金など）／ 純資産（資本金など）／ 収益（売上、受取手数料など）</p>

                  <div style={{ background: '#f8fafc', padding: '12px', border: `1px dashed ${colors.border}`, textAlign: 'center', fontWeight: 'bold', color: '#b93a26' }}>
                    ※試算表の「借方残高の合計」と「貸方残高の合計」は、必ず一致します（貸借平均の原理）。
                  </div>
                </div>
              </div>
            </section>

            <section id="closing_pl" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: colors.textDark, marginBottom: '20px' }}>3. 収益・費用の締め切り（損益振替）</h2>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '16px' }}>
                決算整理が終わったら、いよいよ帳簿を締め切ります（リセットして来年に備える作業）。
                収益と費用は「今年1年間だけの成績」なので、<strong>来年に持ち越さず、残高をすべてゼロ（0）にします。</strong>
                このゼロにするために、すべての残高を<strong>「損益（そんえき）」</strong>という特別なゴミ箱（集計勘定）に投げ込みます。
              </p>
              <div style={{ border: `1px solid ${colors.border}`, padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
                <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: '800', color: colors.textDark }}>✍️ 例題：損益振替仕訳と当期純利益の計上</h4>
                <div style={{ fontSize: '14.5px', color: colors.textGray, lineHeight: '1.8' }}>
                  <p style={{ margin: '0 0 8px 0', color: colors.avocado, fontWeight: 'bold' }}>ステップ①：収益と費用をゼロにして「損益」に集める</p>
                  <p style={{ margin: '0 0 8px 0' }}>当期の売上（収益）は 1,000円、仕入（費用）は 700円だった。</p>
                  <div style={{ background: '#f8fafc', padding: '12px', border: `1px dashed ${colors.border}`, textAlign: 'left', fontWeight: 'bold', color: colors.textDark, marginBottom: '16px' }}>
                    （借方）売上 1,000 ／ （貸方）損益 1,000  ←収益の相殺<br/>
                    （借方）損益 700 ／ （貸方）仕入 700  ←費用の相殺
                  </div>
                  
                  <p style={{ margin: '0 0 8px 0', color: colors.avocado, fontWeight: 'bold' }}>ステップ②：利益を算出して「繰越利益剰余金」へ移す</p>
                  <p style={{ margin: '0 0 8px 0' }}>「損益」勘定の右側（1,000円）から左側（700円）を引くと、300円の利益が出たことがわかります。これを会社の純資産（繰越利益剰余金）に足し込みます。</p>
                  <div style={{ background: '#fdf2f0', padding: '12px', border: `1px dashed #fca5a5`, textAlign: 'center', fontWeight: 'bold', color: '#b93a26' }}>
                    （借方）損益 300 ／ （貸方）繰越利益剰余金 300
                  </div>
                </div>
              </div>
            </section>

            <section id="closing_bs" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: colors.textDark, marginBottom: '20px' }}>4. 資産・負債・純資産の締め切り</h2>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '16px' }}>
                収益・費用と違い、現金（資産）や借入金（負債）は「年末でゼロになる」わけではありません。来年もそのまま引き継ぐ必要があります。
              </p>
              
              <div style={{ background: colors.avocadoLight, padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
                <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: '800', color: colors.avocado }}>💡 次期繰越（じきくりこし）による締め切り</h4>
                <div style={{ fontSize: '14.5px', color: colors.textDark, lineHeight: '1.8' }}>
                  <p style={{ margin: '0 0 8px 0' }}>資産・負債・純資産の各勘定口座では、借方と貸方の差額を赤字で<strong>「次期繰越」</strong>と記入し、左右の合計を一致させて二重線（＝）で締め切ります。</p>
                  <p style={{ margin: 0 }}>そして、翌年の新しい行の反対側に黒字で<strong>「前期繰越（ぜんきくりこし）」</strong>と記入し、新しい1年をスタートさせます。</p>
                </div>
              </div>
            </section>
            
            <div style={{ borderTop: `1px solid ${colors.border}`, paddingTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link href={`/exams/${examId}/guide/ch8`} style={{ textDecoration: 'none' }}>
                <button style={{ backgroundColor: '#ffffff', color: colors.textDark, border: `1px solid ${colors.border}`, padding: '12px 20px', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  ← 前の項目（第8章）
                </button>
              </Link>
              <Link href={`/exams/${examId}/guide`} style={{ textDecoration: 'none', color: colors.textGray, fontSize: '14px', fontWeight: '600' }}>章のトップに戻る</Link>
              <Link href={`/exams/${examId}/guide/ch10`}>
                <button style={{ backgroundColor: colors.darkButton, color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  次の項目（第10章） →
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
