"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ExamGuideChapterThree() {
  const params = useParams();
  const examId = params.examId || 'boki3';

  // 第3章 内部の網羅的目次（内容を一切削らないための完全マッピング）
  const menuItems = [
    { id: 'cash-asset', label: '1. 現金と預金（通貨代用証券の罠）' },
    { id: 'credit-trade', label: '2. 商品売買と「ツケ」（売掛・買掛）' },
    { id: 'bills-shiwake', label: '3. 約束手形のやり取りと権利・義務' },
    { id: 'card-deposit', label: '4. クレジット決済と手付金（前払・前受）' },
  ];

  const [activeSection, setActiveSection] = useState('cash-asset');

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

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', fontFamily: '"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", Meiryo, sans-serif', color: '#111111' }}>
      
      {/* 顶部通栏 */}
      <header style={{ background: '#ffffff', padding: '16px 40px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 1px 2px rgba(0,0,0,0.01)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href="/" style={{ fontWeight: '900', fontSize: '22px', color: '#111111', textDecoration: 'none' }}>
            合格<span style={{ color: '#b93a26' }}>ナビ</span>
          </Link>
          <span style={{ color: '#e2e8f0' }}>|</span>
          <span style={{ fontSize: '14px', fontWeight: '700', color: '#64748b' }}>日商簿記3級 合格テキスト</span>
        </div>
        <Link href={`/exams/${examId}`} style={{ color: '#666666', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>
          ← ダッシュボードに戻る
        </Link>
      </header>

      {/* 现代 Wiki 双栏容器 */}
      <div style={{ display: 'flex', maxWidth: '1100px', margin: '0 auto', padding: '40px 20px', gap: '50px' }}>
        
        {/* 👈 左侧极简固定导航栏 */}
        <aside style={{ width: '220px', flexShrink: 0, position: 'sticky', top: '100px', height: 'calc(100vh - 140px)' }}>
          <div style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', letterSpacing: '1px', marginBottom: '16px' }}>
            第3章 内の目次
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', borderLeft: '1px solid #e2e8f0' }}>
            {menuItems.map((item) => {
              const isCurrent = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  style={{
                    fontSize: '13.5px',
                    padding: '8px 12px',
                    textDecoration: 'none',
                    fontWeight: isCurrent ? '700' : '500',
                    color: isCurrent ? '#b93a26' : '#475569',
                    borderLeft: isCurrent ? '3px solid #b93a26' : '3px solid transparent',
                    marginLeft: '-1px',
                    transition: 'all 0.15s ease',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        </aside>

        {/* 👉 右侧黄金沉浸式长文（高信息密度、完整保留所有核心原理） */}
        <main style={{ flex: 1, maxWidth: '720px' }}>
          
          <div style={{ marginBottom: '40px', borderBottom: '1px solid #f1f5f9', paddingBottom: '20px' }}>
            <span style={{ color: '#b93a26', fontSize: '13px', fontWeight: '800', letterSpacing: '0.5px' }}>第3章 • 主要勘定科目の実務</span>
            <h1 style={{ fontSize: '28px', fontWeight: '900', lineHeight: '1.4', margin: '6px 0 0 0', color: '#111111' }}>
              【大白話】主要勘定科目の実務：実ビジネスの取引をすべて脳内にマッピングする
            </h1>
          </div>

          {/* 1. 现金与预金 */}
          <section id="cash-asset" style={{ marginBottom: '50px', scrollMarginTop: '120px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#111111', marginBottom: '16px', borderLeft: '4px solid #b93a26', paddingLeft: '12px' }}>
              1. 現金と預金（通貨代用証券の罠）
            </h2>
            <p style={{ fontSize: '16.5px', lineHeight: '1.85', color: '#334155', marginBottom: '20px' }}>
              まず、誰もが知っている「現金」です。しかし、**簿記の世界における「現金」の範囲は、私たちが普段財布に入れている紙幣や硬貨（通貨）よりも広い**という点に最大の罠があります。
            </p>
            <p style={{ fontSize: '16.5px', lineHeight: '1.85', color: '#334155', marginBottom: '20px' }}>
              銀行に行けばいつでも即座に本物の現金に換えてもらえる紙切れのことを、簿記では<strong>「通貨代用証券（つうかだいようしょうけん）」</strong>と呼び、これらもすべて【現金】という資産の箱の中に放り込みます。
            </p>

            <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #c9a054', marginBottom: '24px' }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', fontWeight: '800', color: '#c9a054' }}>⚠️ 試験に出る「現金」扱いの代表例（丸暗記不要、本質を突く）：</h4>
              <p style={{ margin: 0, fontSize: '14px', color: '#475569', lineHeight: '1.75' }}>
                • <strong>他人振出の小切手（たにんふりだしのこぎって）：</strong> 他の会社が発行した小切手。銀行に持っていけば1秒で現金化できるため、手に入れた瞬間【現金（資産）】の増加として左側に書きます。<br />
                • <strong>配当金領収書（はいとうきんりょうしゅうしょ）：</strong> 株の配当をもらうための紙切れ。これも郵便局に持っていけばお金をくれるので【現金】です。
              </p>
            </div>

            <p style={{ fontSize: '16.5px', lineHeight: '1.85', color: '#334155', marginBottom: '20px' }}>
              逆に、自分で小切手を発行して（振り出して）相手にお金を支払うときは、自分の<strong>当座預金（とうざよきん）</strong>という口座から後でお金が引き落とされるため、右側に【当座預金（資産の減少）】と記録します。
            </p>
          </section>

          {/* 2. 赊账买卖 */}
          <section id="credit-trade" style={{ marginBottom: '50px', scrollMarginTop: '120px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#111111', marginBottom: '16px', borderLeft: '4px solid #b93a26', paddingLeft: '12px' }}>
              2. 商品売買と「ツケ」（売掛金・買掛金）
            </h2>
            <p style={{ fontSize: '16.5px', lineHeight: '1.85', color: '#334155', marginBottom: '20px' }}>
              企業間のビジネスでは、その都度現金を支払うことは稀です。「今月の購入分は、来月末にまとめて払います」という、いわゆる<strong>「ツケ（信用取引）」</strong>が基本です。
            </p>
            <p style={{ fontSize: '16.5px', lineHeight: '1.85', color: '#334155', marginBottom: '20px' }}>
              商品を売って、後でお金をもらう権利を<strong>売掛金（うりかけきん）</strong>、商品を仕入れて、後でお金を支払う義務を<strong>買掛金（かいかけきん）</strong>と呼びます。
            </p>

            <div style={{ background: '#fdf2f0', padding: '24px', borderRadius: '8px', border: '1px solid #fca5a5', marginBottom: '24px' }}>
              <h4 style={{ margin: '0 0 10px 0', fontSize: '15px', fontWeight: '800', color: '#b93a26' }}>✍️ ツケ取引の2段階仕訳（完全網羅）：</h4>
              <p style={{ margin: 0, fontSize: '14px', color: '#334155', lineHeight: '1.8' }}>
                <strong>① 商品 10万円を売り上げ、代金はツケとした時：</strong><br />
                （借方）売掛金 100,000 ／（貸方）売上 100,000<br />
                <span style={{ color: '#64748b' }}>→ 後でお金をもらえる「権利（資産）」が左側に誕生します。</span><br /><br />
                <strong>② 後日、売掛金 10万円が当座預金に振り込まれた時：</strong><br />
                （借方）当座預金 100,000 ／（貸方）売掛金 100,000<br />
                <span style={{ color: '#64748b' }}>→ お金が無事に入ってきたので、役目を終えた「権利（資産）」を右側に書いて消滅させます。</span>
              </p>
            </div>
          </section>

          {/* 3. 汇票（手形） */}
          <section id="bills-shiwake" style={{ marginBottom: '50px', scrollMarginTop: '120px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#111111', marginBottom: '16px', borderLeft: '4px solid #b93a26', paddingLeft: '12px' }}>
              3. 約束手形のやり取りと権利・義務
            </h2>
            <p style={{ fontSize: '16.5px', lineHeight: '1.85', color: '#334155', marginBottom: '20px' }}>
              ツケ（売掛金）よりもさらに法的な強制力が強い、一種の「絶対に破れない支払いの約束チケット」が<strong>約束手形（やくそくてがた）</strong>です。
              チケットには「〇月〇日に、この紙と引き換えに〇〇万円を支払います」と書かれています。
            </p>
            <p style={{ fontSize: '16.5px', lineHeight: '1.85', color: '#334155', marginBottom: '20px' }}>
              ・そのチケットを受け取った側：後でお金を貰える権利 ➡️ <strong>受取手形（うけとりてがた・資産）</strong><br />
              ・そのチケットを発行して渡した側：後でお金を払う義務 ➡️ <strong>支払手形（しはらいてがた・負債）</strong>
            </p>

            <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #64748b', marginBottom: '24px' }}>
              <p style={{ margin: 0, fontSize: '14.5px', color: '#475569', lineHeight: '1.75' }}>
                💡 <strong>本質思考：</strong> 名前が売掛金から「受取手形」に変わっただけで、左側（ホームポジション）が権利（資産）であるという複式簿記の構造は全く同じです。形が変わっても、本質を見失わないようにしましょう。
              </p>
            </div>
          </section>

          {/* 4. 信用卡与定金 */}
          <section id="card-deposit" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#111111', marginBottom: '16px', borderLeft: '4px solid #b93a26', paddingLeft: '12px' }}>
              4. クレジット決済と手付金（前払金・前受金）
            </h2>
            <p style={{ fontSize: '16.5px', lineHeight: '1.85', color: '#334155', marginBottom: '20px' }}>
              現代の簿記3級試験で非常に重視されるのが、お客様がクレジットカードで買い物をした実務です。
              このとき、お店は信販会社（カード会社）から後でお金を回収することになるため、売掛金ではなく<strong>クレジット売掛金（資産）</strong>という専用の箱を使って、左側に記録します。
            </p>
            <p style={{ fontSize: '16.5px', lineHeight: '1.85', color: '#334155', marginBottom: '20px' }}>
              また、高額な商品を注文する際、事前に支払う「内金・定金（手付金）」の処理も超重要です。
            </p>

            <div style={{ background: '#fdf2f0', padding: '20px', borderRadius: '8px', border: '1px solid #fca5a5' }}>
              <h4 style={{ margin: '0 0 6px 0', fontSize: '15px', fontWeight: '800', color: '#b93a26' }}>👑 手付金の名称トラップを突破する：</h4>
              <p style={{ margin: 0, fontSize: '14.5px', color: '#334155', lineHeight: '1.75' }}>
                • <strong>前払金（まえばらいきん・資産）：</strong> 先にお金を払ったことで、「後で商品を納品してもらう権利」を得たため、左側が定位置。<br />
                • <strong>前受金（まえうけきん・負債）：</strong> 先にお金をもらってしまったことで、「後で商品を渡さなければならない義務」を背負ったため、右側が定位置。
              </p>
            </div>
          </section>

          {/* 🏁 底部多闭环控制台（按钮集群） */}
          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '30px' }}>
            
            {/* 1. 专属实战练习卡片 */}
            <div style={{ background: '#111111', borderRadius: '8px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              <div>
                <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '800', color: '#ffffff' }}>🔥 最重要章の仕訳をリアルタイム演習！</h4>
                <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8' }}>小切手、手形、前払金など、試験の第1問（仕訳問題）の8割がここから出題されます。</p>
              </div>
              <Link href={`/exams/${examId}/exercises`} style={{ textDecoration: 'none' }}>
                <button style={{ backgroundColor: '#ffffff', color: '#111111', border: 'none', padding: '12px 20px', borderRadius: '6px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', transition: 'opacity 0.2s' }}>
                  実戦問題へ GO
                </button>
              </Link>
            </div>

            {/* 2. 导航链路 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link href={`/exams/${examId}/guide`} style={{ textDecoration: 'none', color: '#64748b', fontSize: '14.5px', fontWeight: '600' }}>
                ← 章一覧（目次）に戻る
              </Link>
              <Link href={`/exams/${examId}/guide/ch4`} style={{ textDecoration: 'none' }}>
                <button style={{ backgroundColor: '#b93a26', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '6px', fontSize: '15px', fontWeight: '700', cursor: 'pointer' }}>
                  第4章「決算と財務諸表」に進む →
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