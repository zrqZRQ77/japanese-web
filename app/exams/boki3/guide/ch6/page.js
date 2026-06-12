"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ExamGuideChapterSix() {
  const params = useParams();
  const examId = params.examId || 'boki3';

  // 本章内部小节目录
  const menuItems = [
    { id: 'acquisition', label: '1. 固定資産の取得と付随費用' },
    { id: 'depreciation_calc', label: '2. 減価償却費の計算ルール' },
    { id: 'depreciation_journal', label: '3. 減価償却の記帳（間接法）' },
    { id: 'supplies', label: '4. 消耗品の処理（資産と費用）' },
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
                建物、車両運搬具、備品などを購入した際、本体価格だけでなく、仲介手数料、運送料、据付費などの<strong>付随費用（ふずいひよう）</strong>がかかることがよくあります。簿記の絶対ルールとして、これら付随費用は「経費」にせず、<strong>固定資産の取得原価（本体価格）に足して仕訳</strong>します。
              </p>
              
              <div style={{ border: `1px solid ${colors.border}`, padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
                <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: '800', color: colors.textDark }}>✍️ 例題：付随費用を含む購入</h4>
                <div style={{ fontSize: '14.5px', color: colors.textGray, lineHeight: '1.8' }}>
                  <p style={{ margin: '0 0 8px 0' }}>営業用の自動車1,000,000円を購入し、購入手数料等50,000円と共に小切手を振り出して支払った。</p>
                  <p style={{ margin: '0 0 8px 0', color: colors.avocado, fontWeight: 'bold' }}>【考え方】</p>
                  <p style={{ margin: '0 0 16px 0' }}>車両運搬具の価値は、本体 100万円 ＋ 手数料 5万円 ＝ 1,050,000円として記録します。</p>
                  <div style={{ background: '#f8fafc', padding: '12px', border: `1px dashed ${colors.border}`, textAlign: 'center', fontWeight: 'bold', color: colors.textDark }}>
                    （借方）車両運搬具 1,050,000 ／ （貸方）当座預金 1,050,000
                  </div>
                </div>
              </div>
            </section>

            <section id="depreciation_calc" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: colors.textDark, marginBottom: '20px' }}>2. 減価償却費の計算ルール</h2>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '16px' }}>
                車やパソコンは、時間が経つにつれて価値が減っていきます。この減った価値を毎年の「費用」として計上することを<strong>減価償却（げんかしょうきゃく）</strong>と言います。日商簿記3級では、毎年同じ金額を減らしていく<strong>定額法（ていがくほう）</strong>の計算が頻出します。
              </p>
              
              <div style={{ background: colors.avocadoLight, padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', fontWeight: '800', color: colors.avocado }}>💡 定額法の計算公式</h4>
                <p style={{ margin: '0 0 16px 0', fontSize: '14.5px', color: colors.textDark, lineHeight: '1.7' }}>
                  <strong>1年分の減価償却費 ＝ （取得原価 － 残存価額） ÷ 耐用年数</strong><br/>
                  ※最近の試験では「残存価額はゼロ（0円）」と指示されるのが主流です。
                </p>
                <div style={{ fontSize: '14.5px', color: colors.textDark, lineHeight: '1.8', background: '#ffffff', padding: '12px', borderRadius: '4px' }}>
                  <strong>【計算例】</strong> 取得原価 1,000,000円、耐用年数 5年、残存価額 ゼロの場合<br/>
                  1,000,000円 ÷ 5年 ＝ <strong>年間 200,000円（減価償却費）</strong>
                </div>
              </div>
            </section>

            <section id="depreciation_journal" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: colors.textDark, marginBottom: '20px' }}>3. 減価償却の記帳（間接法）</h2>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '16px' }}>
                減価償却の記帳方法には、資産の金額を直接減らす直接法と、減った分を別の箱に貯めていく<strong>間接法（かんせつほう）</strong>があります。試験では圧倒的に間接法が出ます。間接法では<strong>減価償却累計額（資産のマイナスを意味する勘定）</strong>を使います。
              </p>
              
              <div style={{ border: `1px solid ${colors.border}`, padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
                <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: '800', color: colors.textDark }}>✍️ 例題：決算時の減価償却（間接法）</h4>
                <div style={{ fontSize: '14.5px', color: colors.textGray, lineHeight: '1.8' }}>
                  <p style={{ margin: '0 0 8px 0' }}>決算にあたり、車両運搬具（取得原価 1,000,000円）について定額法（耐用年数5年、残存価額ゼロ）で減価償却を行う。記帳は間接法による。</p>
                  <p style={{ margin: '0 0 8px 0', color: colors.avocado, fontWeight: 'bold' }}>【考え方】</p>
                  <p style={{ margin: '0 0 16px 0' }}>費用の発生（左側）と、累計額の増加（右側）を記録します。車両運搬具という勘定科目は直接触りません。</p>
                  <div style={{ background: '#f8fafc', padding: '12px', border: `1px dashed ${colors.border}`, textAlign: 'center', fontWeight: 'bold', color: colors.textDark }}>
                    （借方）減価償却費 200,000 ／ （貸方）減価償却累計額 200,000
                  </div>
                </div>
              </div>
            </section>

            <section id="supplies" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: colors.textDark, marginBottom: '20px' }}>4. 消耗品の処理（資産と費用）</h2>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '16px' }}>
                コピー用紙やインクなど、短期間で使い切るものを消耗品と呼びます。購入した時にすべて「費用」として処理する方法（費用処理法）が一般的です。この場合、勘定科目は<strong>消耗品費（費用）</strong>を使います。
              </p>
              
              <div style={{ border: `1px solid ${colors.border}`, padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
                <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: '800', color: colors.textDark }}>✍️ 例題：消耗品の購入</h4>
                <div style={{ fontSize: '14.5px', color: colors.textGray, lineHeight: '1.8' }}>
                  <p style={{ margin: '0 0 8px 0' }}>コピー用紙とトナー代として、10,000円を現金で支払った。購入時に全額を費用として処理する。</p>
                  <div style={{ background: '#f8fafc', padding: '12px', border: `1px dashed ${colors.border}`, textAlign: 'center', fontWeight: 'bold', color: colors.textDark }}>
                    （借方）消耗品費 10,000 ／ （貸方）現金 10,000
                  </div>
                  <p style={{ margin: '16px 0 0 0', fontSize: '13px', color: '#b93a26' }}>※もし問題文で「資産として処理する」と指定された場合は、借方を「消耗品（資産）」とします。</p>
                </div>
              </div>
            </section>
            
            <div style={{ borderTop: `1px solid ${colors.border}`, paddingTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link href={`/exams/${examId}/guide/ch5`} style={{ textDecoration: 'none' }}>
                <button style={{ backgroundColor: '#ffffff', color: colors.textDark, border: `1px solid ${colors.border}`, padding: '12px 20px', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  ← 前の項目（第5章）
                </button>
              </Link>
              <Link href={`/exams/${examId}/guide`} style={{ textDecoration: 'none', color: colors.textGray, fontSize: '14px', fontWeight: '600' }}>章のトップに戻る</Link>
              <Link href={`/exams/${examId}/guide/ch7`} style={{ textDecoration: 'none' }}>
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
