"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ExamGuideChapterNine() {
  const params = useParams();
  const examId = params.examId || 'boki3';

  // 本章内部小节目录
  const menuItems = [
    { id: 'trial_balance_types', label: '1. 試算表（しさんひょう）の役割' },
    { id: 'balance_trial_balance', label: '2. 【図解】残高試算表の構造' },
    { id: 'closing_pl', label: '3. 収益・費用の締め切り（損益振替）' },
    { id: 'closing_bs', label: '4. 【図解】帳簿（T字勘定）の締め切り' },
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
              <h1 style={{ fontSize: '24px', fontWeight: '800', color: colors.textDark, marginBottom: '24px' }}>1. 試算表（しさんひょう）の役割</h1>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '16px' }}>
                決算手続きに入る前に、日々の仕訳や総勘定元帳（帳簿）への転記にミスがないかを確認するための集計表を<strong>試算表（Trial Balance: T/B）</strong>と呼びます。試算表には以下の3種類があります。
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
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: colors.textDark, marginBottom: '20px' }}>2. 【図解】残高試算表の構造</h2>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '24px' }}>
                百聞は一見に如かず。実際に「残高試算表」がどのような形をしているか見てみましょう。
                最大のルールは<strong>「勘定科目のホームポジション（定位置）に必ず残高がくる」</strong>ことです。
              </p>
              
              {/* 真实的残高试算表 HTML 绘制 */}
              <div style={{ marginBottom: '24px', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', border: `2px solid ${colors.textDark}`, backgroundColor: '#ffffff' }}>
                  <thead>
                    <tr>
                      <th colSpan="3" style={{ padding: '12px', borderBottom: `1px solid ${colors.textDark}`, backgroundColor: colors.avocadoLight, fontSize: '16px', fontWeight: '900', letterSpacing: '2px' }}>残 高 試 算 表</th>
                    </tr>
                    <tr style={{ backgroundColor: '#f8fafc', borderBottom: `2px solid ${colors.textDark}`, fontSize: '14px' }}>
                      <th style={{ padding: '12px', borderRight: `1px solid ${colors.border}`, width: '30%' }}>借方（残高）</th>
                      <th style={{ padding: '12px', borderRight: `1px solid ${colors.border}`, width: '40%' }}>勘定科目</th>
                      <th style={{ padding: '12px', width: '30%' }}>貸方（残高）</th>
                    </tr>
                  </thead>
                  <tbody style={{ fontSize: '14.5px', color: colors.textDark }}>
                    {/* 资产类 (左边) */}
                    <tr style={{ borderBottom: `1px dashed ${colors.border}` }}>
                      <td style={{ padding: '8px', borderRight: `1px solid ${colors.border}` }}>500,000</td>
                      <td style={{ padding: '8px', borderRight: `1px solid ${colors.border}`, fontWeight: 'bold' }}>現 金（資産）</td>
                      <td style={{ padding: '8px' }}></td>
                    </tr>
                    <tr style={{ borderBottom: `1px dashed ${colors.border}` }}>
                      <td style={{ padding: '8px', borderRight: `1px solid ${colors.border}` }}>300,000</td>
                      <td style={{ padding: '8px', borderRight: `1px solid ${colors.border}`, fontWeight: 'bold' }}>備 品（資産）</td>
                      <td style={{ padding: '8px' }}></td>
                    </tr>
                    {/* 负债/纯资产类 (右边) */}
                    <tr style={{ borderBottom: `1px dashed ${colors.border}` }}>
                      <td style={{ padding: '8px', borderRight: `1px solid ${colors.border}` }}></td>
                      <td style={{ padding: '8px', borderRight: `1px solid ${colors.border}`, fontWeight: 'bold' }}>買掛金（負債）</td>
                      <td style={{ padding: '8px' }}>200,000</td>
                    </tr>
                    <tr style={{ borderBottom: `1px dashed ${colors.border}` }}>
                      <td style={{ padding: '8px', borderRight: `1px solid ${colors.border}` }}></td>
                      <td style={{ padding: '8px', borderRight: `1px solid ${colors.border}`, fontWeight: 'bold' }}>資本金（純資産）</td>
                      <td style={{ padding: '8px' }}>400,000</td>
                    </tr>
                    {/* 收益类 (右边) */}
                    <tr style={{ borderBottom: `1px dashed ${colors.border}` }}>
                      <td style={{ padding: '8px', borderRight: `1px solid ${colors.border}` }}></td>
                      <td style={{ padding: '8px', borderRight: `1px solid ${colors.border}`, fontWeight: 'bold' }}>売 上（収益）</td>
                      <td style={{ padding: '8px' }}>600,000</td>
                    </tr>
                    {/* 费用类 (左边) */}
                    <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                      <td style={{ padding: '8px', borderRight: `1px solid ${colors.border}` }}>400,000</td>
                      <td style={{ padding: '8px', borderRight: `1px solid ${colors.border}`, fontWeight: 'bold' }}>仕 入（費用）</td>
                      <td style={{ padding: '8px' }}></td>
                    </tr>
                    {/* 合计 */}
                    <tr style={{ borderTop: `2px solid ${colors.textDark}`, backgroundColor: '#f8fafc', fontWeight: '900' }}>
                      <td style={{ padding: '12px', borderRight: `1px solid ${colors.border}` }}>1,200,000</td>
                      <td style={{ padding: '12px', borderRight: `1px solid ${colors.border}` }}>合 計</td>
                      <td style={{ padding: '12px' }}>1,200,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p style={{ fontSize: '14.5px', color: '#b93a26', fontWeight: 'bold' }}>
                👆 注目：試算表の一番下の「借方合計」と「貸方合計」は必ず一致します（貸借平均の原理）。一致しなければ仕訳か転記にミスがあります。
              </p>
            </section>

            <section id="closing_pl" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: colors.textDark, marginBottom: '20px' }}>3. 収益・費用の締め切り（損益振替）</h2>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '16px' }}>
                決算整理が終わったら、いよいよ帳簿を締め切ります（リセットして来年に備える作業）。
                収益と費用は「今年1年間だけの成績」なので、<strong>来年に持ち越さず、残高をすべてゼロ（0）にします。</strong>
                このゼロにするために、すべての残高を<strong>「損益（そんえき）」</strong>という特別な集計勘定に投げ込みます。
              </p>
              <div style={{ border: `1px solid ${colors.border}`, padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
                <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: '800', color: colors.textDark }}>✍️ 例題：損益振替仕訳と当期純利益の計上</h4>
                <div style={{ fontSize: '14.5px', color: colors.textGray, lineHeight: '1.8' }}>
                  <p style={{ margin: '0 0 8px 0', color: colors.avocado, fontWeight: 'bold' }}>ステップ①：収益と費用をゼロにして「損益」に集める</p>
                  <p style={{ margin: '0 0 8px 0' }}>当期の売上（収益）は 600,000円、仕入（費用）は 400,000円だった。</p>
                  <div style={{ background: '#f8fafc', padding: '12px', border: `1px dashed ${colors.border}`, textAlign: 'left', fontWeight: 'bold', color: colors.textDark, marginBottom: '16px' }}>
                    （借方）売上 600,000 ／ （貸方）損益 600,000  ←収益の相殺<br/>
                    （借方）損益 400,000 ／ （貸方）仕入 400,000  ←費用の相殺
                  </div>
                  
                  <p style={{ margin: '0 0 8px 0', color: colors.avocado, fontWeight: 'bold' }}>ステップ②：利益を算出して「繰越利益剰余金」へ移す</p>
                  <p style={{ margin: '0 0 8px 0' }}>「損益」勘定の右側（60万）から左側（40万）を引くと、20万円の利益が出たことがわかります。これを会社の純資産（繰越利益剰余金）に足し込みます。</p>
                  <div style={{ background: '#fdf2f0', padding: '12px', border: `1px dashed #fca5a5`, textAlign: 'center', fontWeight: 'bold', color: '#b93a26' }}>
                    （借方）損益 200,000 ／ （貸方）繰越利益剰余金 200,000
                  </div>
                </div>
              </div>
            </section>

            <section id="closing_bs" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: colors.textDark, marginBottom: '20px' }}>4. 【図解】帳簿（T字勘定）の締め切り</h2>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '16px' }}>
                収益・費用と違い、現金（資産）や買掛金（負債）は「年末でゼロになる」わけではありません。残高を来年もそのまま引き継ぐため、帳簿（総勘定元帳）上で<strong>赤字で「次期繰越」</strong>と記入し、二重線で帳簿を締め切ります。
              </p>
              
              {/* 真实的 T字账户结账 HTML 绘制 */}
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                <div style={{ width: '400px', backgroundColor: '#ffffff', padding: '20px', border: `1px solid ${colors.border}`, borderRadius: '8px' }}>
                  {/* T字头部 */}
                  <div style={{ textAlign: 'center', fontWeight: '900', fontSize: '16px', color: colors.textDark, borderBottom: '2px solid #111', paddingBottom: '6px', marginBottom: '4px' }}>
                    現 金（資産）
                  </div>
                  {/* T字左右两边 */}
                  <div style={{ display: 'flex' }}>
                    {/* 左边（借方） */}
                    <div style={{ flex: 1, borderRight: '2px solid #111', paddingRight: '12px', paddingTop: '8px', fontSize: '14.5px', color: colors.textGray }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span>前期繰越</span><span>200,000</span></div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span>売上</span><span>400,000</span></div>
                      <div style={{ height: '30px' }}></div> {/* 占位符保证高度一致 */}
                      
                      {/* 合计线 */}
                      <div style={{ borderTop: '1px solid #111', marginTop: '16px', paddingTop: '6px', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', color: colors.textDark }}>
                        <span></span><span>600,000</span>
                      </div>
                      {/* 双横线结账 */}
                      <div style={{ borderBottom: '3px double #111', marginTop: '2px' }}></div>
                      
                      {/* 新一年的开始 */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontWeight: 'bold', color: colors.textDark }}>
                        <span>前期繰越</span><span>500,000</span>
                      </div>
                    </div>
                    
                    {/* 右边（贷方） */}
                    <div style={{ flex: 1, paddingLeft: '12px', paddingTop: '8px', fontSize: '14.5px', color: colors.textGray }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span>仕入</span><span>100,000</span></div>
                      
                      {/* 红字次期繰越 */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: '#b93a26', fontWeight: 'bold' }}>
                        <span>次期繰越</span><span>500,000</span>
                      </div>
                      <div style={{ height: '30px' }}></div>
                      
                      {/* 合计线 */}
                      <div style={{ borderTop: '1px solid #111', marginTop: '16px', paddingTop: '6px', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', color: colors.textDark }}>
                        <span></span><span>600,000</span>
                      </div>
                      {/* 双横线结账 */}
                      <div style={{ borderBottom: '3px double #111', marginTop: '2px' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              <p style={{ fontSize: '14.5px', color: colors.textGray, lineHeight: '1.8' }}>
                👆 資産グループの「現金」の帳簿（T字勘定）を締め切る様子です。左側（入金60万）と右側（出金10万）の差額である50万円を、<strong>赤字で「次期繰越」</strong>と右側に書き込むことで左右の合計を60万で一致させ、二重線（＝）を引きます。そして翌年の左側に「前期繰越 50万」として新しい帳簿がスタートします。
              </p>
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
