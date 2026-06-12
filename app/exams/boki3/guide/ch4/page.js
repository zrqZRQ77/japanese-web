"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ExamGuideChapterFourUpgrade() {
  const params = useParams();
  const examId = params.examId || 'boki3';

  // 本章内部小节目录（硬核扩充：运费陷阱与信用卡结算）
  const menuItems = [
    { id: 'three-methods', label: '1. 商品売買の基本「三分法」の仕訳' },
    { id: 'returns-logic', label: '2. 返品（へんぴん）は逆仕訳で消す' },
    { id: 'freight-traps', label: '3. 【大題の罠】諸掛り（運賃）の3パターン' },
    { id: 'credit-sales', label: '4. 【CBT頻出】クレジット売掛金と手数料' },
  ];

  const [activeSection, setActiveSection] = useState('three-methods');

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
              <span>進捗</span><span>40%</span>
            </div>
            <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: '40%', height: '100%', background: colors.avocado, borderRadius: '3px' }}></div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[1, 2, 3].map(ch => (
              <div key={ch} style={{ fontSize: '14px', fontWeight: '500', color: colors.textGray, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Link href={`/exams/${examId}/guide/ch${ch}`} style={{ textDecoration: 'none', color: 'inherit' }}>第{ch}章</Link>
                <span style={{ color: colors.avocado, fontWeight: 'bold' }}>✓ 完了</span>
              </div>
            ))}
            
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: colors.textDark, marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>第4章 商品売買</span>
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
            <div style={{ fontSize: '14px', fontWeight: '500', color: colors.textLightGray, padding: '8px 0' }}>第5章 その他の債権・債務</div>
          </div>
        </aside>

        <main style={{ flex: 1, padding: '40px 60px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', paddingBottom: '16px', borderBottom: `1px solid ${colors.border}` }}>
            <div style={{ fontSize: '13px', color: colors.textGray, fontWeight: '500' }}>
              第4章 商品売買 <span style={{ margin: '0 8px' }}>&gt;</span> 
              <span style={{ color: colors.avocado, fontWeight: '700' }}>{menuItems.find(item => item.id === activeSection)?.label}</span>
            </div>
          </div>

          <div style={{ maxWidth: '680px' }}>
            
            <section id="three-methods" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: '800', color: colors.textDark, marginBottom: '24px' }}>1. 商品売買の基本「三分法」の仕訳</h1>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '16px' }}>
                企業が商品を「安く仕入れて、高く売る」活動を記録する際、日商簿記3級では<strong>「仕入（費用）」「売上（収益）」「繰越商品（資産）」</strong>の3つの箱に分けて記録する<strong>三分法（さんぶんぽう）</strong>を必ず使います。
              </p>
              
              <div style={{ border: `1px solid ${colors.border}`, padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
                <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: '800', color: colors.textDark }}>✍️ 例題：掛け（ツケ）による仕入と売上</h4>
                <div style={{ fontSize: '14.5px', color: colors.textGray, lineHeight: '1.8' }}>
                  <p style={{ margin: '0 0 8px 0', color: colors.avocado, fontWeight: 'bold' }}>① 商品を仕入れた時（費用の発生）</p>
                  <p style={{ margin: '0 0 8px 0' }}>商品 10,000円を仕入れ、代金は掛けとした。</p>
                  <div style={{ background: '#f8fafc', padding: '12px', border: `1px dashed ${colors.border}`, textAlign: 'center', fontWeight: 'bold', color: colors.textDark, marginBottom: '20px' }}>
                    （借方）仕入 10,000 ／ （貸方）買掛金 10,000
                  </div>
                  
                  <p style={{ margin: '0 0 8px 0', color: colors.avocado, fontWeight: 'bold' }}>② 商品を売り上げた時（収益の発生）</p>
                  <p style={{ margin: '0 0 8px 0' }}>上記の商品を 15,000円で売り上げ、代金は掛けとした。</p>
                  <div style={{ background: '#f8fafc', padding: '12px', border: `1px dashed ${colors.border}`, textAlign: 'center', fontWeight: 'bold', color: colors.textDark }}>
                    （借方）売掛金 15,000 ／ （貸方）売上 15,000
                  </div>
                </div>
              </div>
            </section>

            <section id="returns-logic" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: colors.textDark, marginBottom: '20px' }}>2. 返品（へんぴん）は逆仕訳で消す</h2>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '16px' }}>
                品違いや破損などにより商品を返品したり、返品されたりした場合は、新しい勘定科目は使いません。<strong>「売った時・仕入れた時と全く逆の仕訳（逆仕訳）」</strong>をして、金額を相殺（マイナス）します。
              </p>

              <div style={{ border: `1px solid ${colors.border}`, padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
                <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: '800', color: colors.textDark }}>✍️ 例題：仕入戻しと売上戻り</h4>
                <div style={{ fontSize: '14.5px', color: colors.textGray, lineHeight: '1.8' }}>
                  <p style={{ margin: '0 0 8px 0' }}>掛けで仕入れた商品のうち、1,000円分にキズがあったため返品した。</p>
                  <div style={{ background: '#f8fafc', padding: '12px', border: `1px dashed ${colors.border}`, textAlign: 'center', fontWeight: 'bold', color: colors.textDark, marginBottom: '16px' }}>
                    （借方）買掛金 1,000 ／ （貸方）仕入 1,000
                  </div>
                  <p style={{ margin: '0 0 0 0', fontSize: '13.5px', color: '#b93a26', fontWeight: 'bold' }}>※仕入れた時の「（借）仕入／（貸）買掛金」の左右をひっくり返すだけ！</p>
                </div>
              </div>
            </section>

            <section id="freight-traps" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: colors.textDark, marginBottom: '20px' }}>3. 【大題の罠】諸掛り（運賃）の3パターン</h2>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '16px' }}>
                商品を運ぶための送料や保険料を<strong>諸掛り（しょがかり）</strong>と言います。試験では<strong>「買う時か、売る時か」「誰が運賃を負担するか」</strong>で処理が劇的に変わるため、以下の3パターンを絶対に暗記してください。
              </p>
              
              <div style={{ background: colors.avocadoLight, padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', fontWeight: '800', color: colors.avocado }}>🚨 運賃処理の絶対ルール</h4>
                <p style={{ margin: '0 0 8px 0', fontSize: '14.5px', color: colors.textDark, lineHeight: '1.7', fontWeight: 'bold' }}>
                  ①【仕入諸掛り】買う時の運賃 ➔ 無条件で「商品の原価（仕入）」に足す！<br/>
                  ②【売上諸掛り（当社負担）】売る時の自腹運賃 ➔ 「発送費（費用）」にする！<br/>
                  ③【売上諸掛り（先方負担）】売る時の立て替え運賃 ➔ 相手への請求額（売掛金など）に足す！
                </p>
              </div>

              <div style={{ border: `1px solid ${colors.border}`, padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
                <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: '800', color: colors.textDark }}>✍️ 比較演習：運賃の3パターン制覇</h4>
                <div style={{ fontSize: '14.5px', color: colors.textGray, lineHeight: '1.8' }}>
                  
                  <p style={{ margin: '0 0 4px 0', color: colors.avocado, fontWeight: 'bold' }}>パターン①：仕入時の運賃</p>
                  <p style={{ margin: '0 0 8px 0' }}>商品 50,000円を掛けで仕入れ、引取運賃 2,000円は現金で支払った。</p>
                  <p style={{ margin: '0 0 8px 0' }}>➔ 運賃は「仕入」に合体させます（50,000 + 2,000 = 52,000）。</p>
                  <div style={{ background: '#f8fafc', padding: '12px', border: `1px dashed ${colors.border}`, textAlign: 'left', fontWeight: 'bold', color: colors.textDark, marginBottom: '20px' }}>
                    （借方）仕入 52,000 ／ （貸方）買掛金 50,000<br/>
                               ／ （貸方）現 金  2,000
                  </div>

                  <p style={{ margin: '0 0 4px 0', color: colors.avocado, fontWeight: 'bold' }}>パターン②：売上時の運賃（当社負担）</p>
                  <p style={{ margin: '0 0 8px 0' }}>商品 80,000円を掛けで売り上げ、発送運賃 3,000円（当社負担）を現金で支払った。</p>
                  <p style={{ margin: '0 0 8px 0' }}>➔ 当社の自腹なので、経費として「発送費」を使います。</p>
                  <div style={{ background: '#f8fafc', padding: '12px', border: `1px dashed ${colors.border}`, textAlign: 'left', fontWeight: 'bold', color: colors.textDark, marginBottom: '20px' }}>
                    （借方）売掛金 80,000 ／ （貸方）売上 80,000<br/>
                    （借方）発送費  3,000 ／ （貸方）現金  3,000
                  </div>

                  <p style={{ margin: '0 0 4px 0', color: '#b93a26', fontWeight: 'bold' }}>パターン③：売上時の運賃（先方負担の立て替え）</p>
                  <p style={{ margin: '0 0 8px 0' }}>商品 80,000円を掛けで売り上げ、発送運賃 3,000円（先方負担）を現金で立て替え払いした。</p>
                  <p style={{ margin: '0 0 8px 0' }}>➔ 相手が払うべきものを立て替えたので、商品代金(8万)と一緒に運賃(3千円)も後で請求します。つまり「売掛金」を増やします。（※「立替金」を使う場合もありますが、試験では売掛金に含めるケースが頻出です）</p>
                  <div style={{ background: '#fdf2f0', padding: '12px', border: `1px dashed #fca5a5`, textAlign: 'left', fontWeight: 'bold', color: '#b93a26' }}>
                    （借方）売掛金 83,000 ／ （貸方）売上 80,000<br/>
                               ／ （貸方）現金  3,000
                  </div>

                </div>
              </div>
            </section>

            <section id="credit-sales" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: colors.textDark, marginBottom: '20px' }}>4. 【CBT頻出】クレジット売掛金と手数料</h2>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '16px' }}>
                最近のネット試験（CBT）で毎回のように出題されるのがクレジットカード決済です。
                カード会社を通じて販売した場合、後で入金される権利を<strong>「クレジット売掛金（資産）」</strong>といい、カード会社に取られる手数料は販売時に<strong>「支払手数料（費用）」</strong>として差し引くのがポイントです。
              </p>
              
              <div style={{ border: `1px solid ${colors.border}`, padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
                <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: '800', color: colors.textDark }}>✍️ 例題：クレジットカード決済の処理</h4>
                <div style={{ fontSize: '14.5px', color: colors.textGray, lineHeight: '1.8' }}>
                  <p style={{ margin: '0 0 8px 0' }}>商品 100,000円をクレジット払いで販売した。なお、信販会社への決済手数料（売上の2％）を販売時に計上する。</p>
                  <p style={{ margin: '0 0 8px 0', color: colors.avocado, fontWeight: 'bold' }}>【考え方】</p>
                  <p style={{ margin: '0 0 12px 0' }}>売上は全額（10万）ですが、手数料2,000円（10万×2%）を引かれた残り98,000円だけが、後日「クレジット売掛金」として入金されます。</p>
                  <div style={{ background: '#f8fafc', padding: '12px', border: `1px dashed ${colors.border}`, textAlign: 'left', fontWeight: 'bold', color: colors.textDark }}>
                    （借方）クレジット売掛金 98,000 ／ （貸方）売上 100,000<br/>
                    （借方）支 払 手 数 料  2,000 ／
                  </div>
                </div>
              </div>
            </section>
            
            <div style={{ borderTop: `1px solid ${colors.border}`, paddingTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link href={`/exams/${examId}/guide/ch3`} style={{ textDecoration: 'none' }}>
                <button style={{ backgroundColor: '#ffffff', color: colors.textDark, border: `1px solid ${colors.border}`, padding: '12px 20px', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  ← 前の項目（第3章）
                </button>
              </Link>
              <Link href={`/exams/${examId}/guide`} style={{ textDecoration: 'none', color: colors.textGray, fontSize: '14px', fontWeight: '600' }}>章のトップに戻る</Link>
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
