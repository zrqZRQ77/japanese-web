"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ExamGuideChapterFive() {
  const params = useParams();
  const examId = params.examId || 'boki3';

  // 本章内部小节目录
  const menuItems = [
    { id: 'receivables', label: '1. 未収入金と未払金' },
    { id: 'advances', label: '2. 前払金と前受金' },
    { id: 'suspense', label: '3. 立替金と預り金' },
    { id: 'notes_and_er', label: '4. 手形と電子記録債権' },
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
              <span>進捗</span><span>50%</span>
            </div>
            <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: '50%', height: '100%', background: colors.avocado, borderRadius: '3px' }}></div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[1, 2, 3, 4].map(ch => (
              <div key={ch} style={{ fontSize: '14px', fontWeight: '500', color: colors.textGray, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Link href={`/exams/${examId}/guide/ch${ch}`} style={{ textDecoration: 'none', color: 'inherit' }}>第{ch}章</Link>
                <span style={{ color: colors.avocado, fontWeight: 'bold' }}>✓ 完了</span>
              </div>
            ))}
            
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: colors.textDark, marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>第5章 その他の債権・債務</span>
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
            <div style={{ fontSize: '14px', fontWeight: '500', color: colors.textLightGray, padding: '8px 0' }}>第6章 固定資産と経費</div>
          </div>
        </aside>

        <main style={{ flex: 1, padding: '40px 60px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', paddingBottom: '16px', borderBottom: `1px solid ${colors.border}` }}>
            <div style={{ fontSize: '13px', color: colors.textGray, fontWeight: '500' }}>
              第5章 その他の債権・債務 <span style={{ margin: '0 8px' }}>&gt;</span> 
              <span style={{ color: colors.avocado, fontWeight: '700' }}>{menuItems.find(item => item.id === activeSection)?.label}</span>
            </div>
          </div>

          <div style={{ maxWidth: '680px' }}>
            
            <section id="receivables" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: '800', color: colors.textDark, marginBottom: '24px' }}>1. 未収入金と未払金</h1>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '16px' }}>
                本業の「商品」以外のもの（例えば、使わなくなったパソコンや社用車、土地など）を売買し、代金を後払いにする場合は、売掛金・買掛金は使えません。代わりに<strong>未収入金（資産）</strong>と<strong>未払金（負債）</strong>を使います。
              </p>
              
              <div style={{ border: `1px solid ${colors.border}`, padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
                <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: '800', color: colors.textDark }}>✍️ 例題：備品の購入と売却</h4>
                <div style={{ fontSize: '14.5px', color: colors.textGray, lineHeight: '1.8' }}>
                  <p style={{ margin: '0 0 8px 0', color: colors.avocado, fontWeight: 'bold' }}>【購入のケース】</p>
                  <p style={{ margin: '0 0 8px 0' }}>営業用のコピー機（備品）300,000円を購入し、代金は月末に支払うことにした。</p>
                  <div style={{ background: '#f8fafc', padding: '12px', border: `1px dashed ${colors.border}`, textAlign: 'center', fontWeight: 'bold', color: colors.textDark, marginBottom: '20px' }}>
                    （借方）備品 300,000 ／ （貸方）未払金 300,000
                  </div>
                  
                  <p style={{ margin: '0 0 8px 0', color: colors.avocado, fontWeight: 'bold' }}>【売却のケース】</p>
                  <p style={{ margin: '0 0 8px 0' }}>不要になった応接セット（備品）50,000円を売却し、代金は翌月受け取ることにした。</p>
                  <div style={{ background: '#f8fafc', padding: '12px', border: `1px dashed ${colors.border}`, textAlign: 'center', fontWeight: 'bold', color: colors.textDark }}>
                    （借方）未収入金 50,000 ／ （貸方）備品 50,000
                  </div>
                </div>
              </div>
            </section>

            <section id="advances" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: colors.textDark, marginBottom: '20px' }}>2. 前払金と前受金</h2>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '16px' }}>
                商品の注文を受けた際や発注した際に、事前に「手付金（内金）」をやり取りすることがあります。先に支払ったお金は後で商品を受け取る権利になるため<strong>前払金（資産）</strong>、先に受け取ったお金は後で商品を渡す義務になるため<strong>前受金（負債）</strong>となります。
              </p>
              
              <div style={{ border: `1px solid ${colors.border}`, padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
                <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: '800', color: colors.textDark }}>✍️ 例題：手付金の支払いと商品の受け取り</h4>
                <div style={{ fontSize: '14.5px', color: colors.textGray, lineHeight: '1.8' }}>
                  <p style={{ margin: '0 0 8px 0', color: colors.avocado, fontWeight: 'bold' }}>① 注文時の仕訳</p>
                  <p style={{ margin: '0 0 8px 0' }}>商品100,000円を注文し、手付金として現金20,000円を支払った。</p>
                  <div style={{ background: '#f8fafc', padding: '12px', border: `1px dashed ${colors.border}`, textAlign: 'center', fontWeight: 'bold', color: colors.textDark, marginBottom: '20px' }}>
                    （借方）前払金 20,000 ／ （貸方）現金 20,000
                  </div>
                  
                  <p style={{ margin: '0 0 8px 0', color: colors.avocado, fontWeight: 'bold' }}>② 商品到着時の仕訳（重要！）</p>
                  <p style={{ margin: '0 0 8px 0' }}>上記の商品100,000円を受け取り、手付金20,000円を差し引いた残額を掛け（ツケ）とした。</p>
                  <div style={{ background: '#f8fafc', padding: '12px', border: `1px dashed ${colors.border}`, textAlign: 'center', fontWeight: 'bold', color: colors.textDark }}>
                    （借方）仕入 100,000 ／ （貸方）前払金 20,000<br/>
                                ／ （貸方）買掛金 80,000
                  </div>
                </div>
              </div>
            </section>

            <section id="suspense" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: colors.textDark, marginBottom: '20px' }}>3. 立替金と預り金</h2>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '16px' }}>
                従業員や取引先が負担すべきお金を会社が一時的に立て替えた場合は<strong>立替金（資産）</strong>を使います。逆に、給料から所得税などを天引きして一時的に預かる場合は<strong>預り金（負債）</strong>で処理します。
              </p>
              
              <div style={{ border: `1px solid ${colors.border}`, padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
                <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: '800', color: colors.textDark }}>✍️ 例題：給料の支払い（天引き）</h4>
                <div style={{ fontSize: '14.5px', color: colors.textGray, lineHeight: '1.8' }}>
                  <p style={{ margin: '0 0 8px 0' }}>従業員に給料300,000円を支払う際、所得税の源泉徴収分30,000円を差し引き、残額を当座預金から振り込んだ。</p>
                  <p style={{ margin: '0 0 8px 0', color: colors.avocado, fontWeight: 'bold' }}>【考え方】</p>
                  <p style={{ margin: '0 0 16px 0' }}>費用（給料）は全額発生しますが、会社から出ていくお金は税金を引いた分だけ。引いた税金は国に払うまで「預り金（負債）」となります。</p>
                  <div style={{ background: '#f8fafc', padding: '12px', border: `1px dashed ${colors.border}`, textAlign: 'center', fontWeight: 'bold', color: colors.textDark }}>
                    （借方）給料 300,000 ／ （貸方）預り金 30,000<br/>
                                ／ （貸方）当座預金 270,000
                  </div>
                </div>
              </div>
            </section>

            <section id="notes_and_er" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: colors.textDark, marginBottom: '20px' }}>4. 手形と電子記録債権</h2>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '16px' }}>
                約束手形を受け取った場合は<strong>受取手形（資産）</strong>、振り出した場合は<strong>支払手形（負債）</strong>です。近年は紙の手形ではなく、インターネット上の記録で債権・債務を管理するシステムが普及しており、これを<strong>電子記録債権（資産） / 電子記録債務（負債）</strong>と呼びます。
              </p>
              
              <div style={{ border: `1px solid ${colors.border}`, padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
                <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: '800', color: colors.textDark }}>✍️ 例題：電子記録債権の発生</h4>
                <div style={{ fontSize: '14.5px', color: colors.textGray, lineHeight: '1.8' }}>
                  <p style={{ margin: '0 0 8px 0' }}>得意先に対する売掛金500,000円について、電子記録債権の発生記録が行われた。</p>
                  <p style={{ margin: '0 0 8px 0', color: colors.avocado, fontWeight: 'bold' }}>【考え方】</p>
                  <p style={{ margin: '0 0 16px 0' }}>「売掛金」という資産が消滅し、「電子記録債権」という新しい強力な資産に生まれ変わったと考えます。</p>
                  <div style={{ background: '#f8fafc', padding: '12px', border: `1px dashed ${colors.border}`, textAlign: 'center', fontWeight: 'bold', color: colors.textDark }}>
                    （借方）電子記録債権 500,000 ／ （貸方）売掛金 500,000
                  </div>
                </div>
              </div>
            </section>
            
            <div style={{ borderTop: `1px solid ${colors.border}`, paddingTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link href={`/exams/${examId}/guide/ch4`} style={{ textDecoration: 'none' }}>
                <button style={{ backgroundColor: '#ffffff', color: colors.textDark, border: `1px solid ${colors.border}`, padding: '12px 20px', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  ← 前の項目（第4章）
                </button>
              </Link>
              <Link href={`/exams/${examId}/guide`} style={{ textDecoration: 'none', color: colors.textGray, fontSize: '14px', fontWeight: '600' }}>章のトップに戻る</Link>
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
