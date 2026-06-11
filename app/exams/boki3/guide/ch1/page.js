"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ExamGuideChapterOne() {
  const params = useParams();
  const examId = params.examId || 'boki3';

  // 本章内部小节目录
  const menuItems = [
    { id: 'intro', label: '1. 丸暗記からの解放' },
    { id: 'core-logic', label: '2. 借方・貸方の本質' },
    { id: 'five-boxes', label: '3. 簿記の5大要素' },
    { id: 'shiwake', label: '4. 取引の二面性と仕訳' },
  ];

  const [activeSection, setActiveSection] = useState('intro');

  // 智能监测滚动，自动高亮左侧极简目录
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
            第1章 内の目次
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

        {/* 👉 右侧黄金沉浸式长文 */}
        <main style={{ flex: 1, maxWidth: '720px' }}>
          
          <div style={{ marginBottom: '40px', borderBottom: '1px solid #f1f5f9', paddingBottom: '20px' }}>
            <span style={{ color: '#b93a26', fontSize: '13px', fontWeight: '800', letterSpacing: '0.5px' }}>第1章 • 簿記の根本原理</span>
            <h1 style={{ fontSize: '28px', fontWeight: '900', lineHeight: '1.4', margin: '6px 0 0 0', color: '#111111' }}>
              【超わかりやすい】複式簿記の本質：なぜ資産は左側、負債は右側なのか？
            </h1>
          </div>

          <section id="intro" style={{ marginBottom: '50px', scrollMarginTop: '120px' }}>
            <p style={{ fontSize: '16.5px', lineHeight: '1.85', color: '#334155', marginBottom: '20px' }}>
              多くの人が日商簿記3級の学習を始める際、聞き慣れない勘定科目と複雑な「借方・貸方」の配置に圧倒されてしまいます。
              一般的な参考書では、「資産の増加は借方、負債の増加は貸方…」と丸暗記を強要されがちですが、これではパズルを解いているようでビジネスの本質が見えてきません。
            </p>
            <p style={{ fontSize: '16.5px', lineHeight: '1.85', color: '#334155', fontWeight: '700' }}>
              ここでは難しい専門用語を一切使わず、お金の「調達源泉（どこから来たか）」と「運用形態（今どこにあるか）」という第一性原理から、このルールの本质をすっきりと解き明かします。
            </p>
          </section>

          <section id="core-logic" style={{ marginBottom: '50px', scrollMarginTop: '120px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#111111', marginBottom: '16px', borderLeft: '4px solid #b93a26', paddingLeft: '12px' }}>
              お金の「来歴」と「現在地」：借方・貸方の真の正体
            </h2>
            <p style={{ fontSize: '16.5px', lineHeight: '1.85', color: '#334155', marginBottom: '20px' }}>
              あなたが小さなカフェを開業すると想像してください。まず最初にお金が必要です。
              自分の貯金から500万円、銀行から300万円を借りて、合計800万円を集めたとします。
              簿記の世界では、この出来事を「お金をどこから持ってきたか」と「そのお金が今何に形を変えているか」という2つの側面から同時に記録します。
            </p>

            <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '8px', borderLeft: '4px solid #c9a054', margin: '24px 0' }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', fontWeight: '800', color: '#c9a054' }}>
                💡 商業の絶対的なルール（ファーストプリンシプル）：
              </h4>
              <p style={{ margin: 0, fontSize: '14.5px', color: '#475569', lineHeight: '1.75', whiteSpace: 'pre-line' }}>
                右側（貸方）：お金をどこから持ってきたか？【資金の調達源泉】
                左侧（借方）：そのお金が今何に化けているか？【資金の運用形態】
              </p>
            </div>
          </section>

          <section id="five-boxes" style={{ marginBottom: '50px', scrollMarginTop: '120px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#111111', marginBottom: '16px', borderLeft: '4px solid #b93a26', paddingLeft: '12px' }}>
              簿記を構成する「5大要素」のホームポジション
            </h2>
            <p style={{ fontSize: '16.5px', lineHeight: '1.85', color: '#334155', marginBottom: '20px' }}>
              簿記に登場するあらゆる勘定科目は、すべて以下の5つの箱のどれかに分類されます。
              この5大要素にも、先ほどの左右の論理がそのまま適用されます。
            </p>
            <ul style={{ paddingLeft: '20px', fontSize: '16px', lineHeight: '1.8', color: '#334155', marginBottom: '20px' }}>
              <li style={{ marginBottom: '8px' }}><strong>資産（左側）：</strong> お金が化けている現在の姿（現金、店舗、備品、商品など）。</li>
              <li style={{ marginBottom: '8px' }}><strong>負債（右側）：</strong> 他人から調達した、いずれ返さなければならないお金（借入金、買掛金など）。</li>
              <li style={{ marginBottom: '8px' }}><strong>純資産（右側）：</strong> 誰にも返す必要のない、本当の自分のお金（資本金など）。</li>
            </ul>
          </section>

          <section id="shiwake" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#111111', marginBottom: '16px', borderLeft: '4px solid #b93a26', paddingLeft: '12px' }}>
              取引の二面性と仕訳の黄金ルール
            </h2>
            <p style={{ fontSize: '16.5px', lineHeight: '1.85', color: '#334155', marginBottom: '20px' }}>
              集めたお金の中から 200万円を使って、イタリア製の高級エスプレッソマシンを購入したとします。
              この時、あなたの手元から「現金（資産）」という姿が200万円分減り、代わりに「備品（資産）」という姿が200万円分増えます。
            </p>

            <div style={{ background: '#fdf2f0', padding: '20px', borderRadius: '8px', border: '1px solid #fca5a5', marginBottom: '40px' }}>
              <h4 style={{ margin: '0 0 6px 0', fontSize: '15px', fontWeight: '800', color: '#b93a26' }}>
                ✍️ 仕訳のパズルルール：
              </h4>
              <p style={{ margin: 0, fontSize: '14.5px', color: '#334155', lineHeight: '1.6' }}>
                • その要素を<strong>増やしたい</strong>なら：本来の定位置（ホームポジション）の側に書く！<br />
                • その要素を<strong>减らしたい</strong>なら：本来の定位置とは逆の側に書く！
              </p>
            </div>
          </section>

          {/* 🏁 底部多闭环控制台（按钮集群） */}
          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '30px' }}>
            {/* 1. 独立突出的练习题跳转卡片 */}
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: '800', color: '#111111' }}>🎯 第1章 の内容をマスターしましたか？</h4>
                <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>基礎知識を定着させるために、実際の仕訳問題に挑戦してみましょう。</p>
              </div>
              <Link href={`/exams/${examId}/exercises`} style={{ textDecoration: 'none' }}>
                <button style={{ backgroundColor: '#111111', color: '#ffffff', border: 'none', padding: '10px 18px', borderRadius: '6px', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>
                  練習問題を解く
                </button>
              </Link>
            </div>

            {/* 2. 页面路由导航按钮 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link href={`/exams/${examId}/guide`} style={{ textDecoration: 'none', color: '#64748b', fontSize: '14.5px', fontWeight: '600' }}>
                ← 章一覧（目次）に戻る
              </Link>
              <Link href={`/exams/${examId}/guide/ch2`} style={{ textDecoration: 'none' }}>
                <button style={{ backgroundColor: '#b93a26', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '6px', fontSize: '15px', fontWeight: '700', cursor: 'pointer' }}>
                  第2章「仕訳のルール」に進む →
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