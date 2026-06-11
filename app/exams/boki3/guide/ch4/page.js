"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ExamGuideChapterFour() {
  const params = useParams();
  const examId = params.examId || 'boki3';

  // 第4章 内部の網羅的目次
  const menuItems = [
    { id: 'trial-balance', label: '1. 試算表（T/B）の本質と集計' },
    { id: 'tb-structure', label: '2. 試算表の構造：なぜ左右が一致するのか' },
    { id: 'bs-pl-split', label: '3. 運命の分岐点：B/SとP/Lへの自動振り分け' },
    { id: 'goal-view', label: '4. 決算の全体像（マクロ俯瞰マップ）' },
  ];

  const [activeSection, setActiveSection] = useState('trial-balance');

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
            第4章 内の目次
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
            <span style={{ color: '#b93a26', fontSize: '13px', fontWeight: '800', letterSpacing: '0.5px' }}>第4章 • 決算の全体像と試算表</span>
            <h1 style={{ fontSize: '28px', fontWeight: '900', lineHeight: '1.4', margin: '6px 0 0 0', color: '#111111' }}>
              【超わかりやすい】試算表と決算の全体像：散らばったパズルが一瞬で一枚の絵になる瞬間
            </h1>
          </div>

          {/* 1. 试算表的本质 */}
          <section id="trial-balance" style={{ marginBottom: '50px', scrollMarginTop: '120px' }}>
            <p style={{ fontSize: '16.5px', lineHeight: '1.85', color: '#334155', marginBottom: '20px' }}>
              第3章までで、私たちは「現金が増えた」「売掛金を回収した」といった日々の取引を、その都度「仕訳（しわけ）」という小さなパズルピースに分解して記録してきました。
            </p>
            <p style={{ fontSize: '16.5px', lineHeight: '1.85', color: '#334155', marginBottom: '20px' }}>
              しかし、1年間で数千、数万と積み重なった仕訳データをそのまま眺めても、会社が儲かっているのかどうかは全く分かりません。
              そこで、期末（決算期）になったら、これらバラバラのデータを1つの大きな集計表にドサッと流し込みます。この集計表を<strong>試算表（しさんひょう、英: Trial Balance = T/B）</strong>と呼びます。
            </p>

            <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '8px', borderLeft: '4px solid #c9a054', margin: '24px 0' }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', fontWeight: '800', color: '#c9a054' }}>💡 試算表の役割はたったの2つ：</h4>
              <p style={{ margin: 0, fontSize: '14.5px', color: '#475569', lineHeight: '1.75' }}>
                ① 1年間の仕訳の計算に<strong>「ミスがないか」</strong>をチェックする（検算機能）<br />
                ② 財務諸表（B/SとP/L）を作るための<strong>「材料置場」</strong>となる（準備機能）
              </p>
            </div>
          </section>

          {/* 2. 试算表的等式构造 */}
          <section id="tb-structure" style={{ marginBottom: '50px', scrollMarginTop: '120px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#111111', marginBottom: '16px', borderLeft: '4px solid #b93a26', paddingLeft: '12px' }}>
              試算表の構造：なぜ左右の合計金額が「絶対」に一致するのか
            </h2>
            <p style={{ fontSize: '16.5px', lineHeight: '1.85', color: '#334155', marginBottom: '20px' }}>
              試験で最もよく狙われるのが<strong>「合計残高試算表（ごうけいざんだかしさんひょう）」</strong>です。
              名前は難しそうですが、構造は極めてシンプルです。真ん中に「勘定科目」が並び、その左右にそれぞれの合計額と差し引き残高を並べただけの表です。
            </p>
            <p style={{ fontSize: '16.5px', lineHeight: '1.85', color: '#334155', marginBottom: '20px' }}>
              ここで複式簿記の第一性原理が最高の威力を発揮します。
              全ての仕訳は必ず「左側（借方）の金額 ＝ 右側（貸方）の金額」というルールで書かれていました。
              そのため、それらを何万回集計しようとも、<strong>試算表の「左側の総合計」と「右側の総合計」は絶対に寸分の狂いもなく一致します。</strong>
            </p>

            <div style={{ background: '#fdf2f0', padding: '20px', borderRadius: '8px', border: '1px solid #fca5a5', marginBottom: '20px' }}>
              <h4 style={{ margin: '0 0 6px 0', fontSize: '15px', fontWeight: '800', color: '#b93a26' }}>🛡️ 試験での絶対的防壁：</h4>
              <p style={{ margin: 0, fontSize: '14.5px', color: '#334155', lineHeight: '1.6' }}>
                もし試験中に試算表の左右の合計が1円でもズレていたら、それはどこかの仕訳の左右を書き間違えたか、転記の計算ミスをした証拠です。言い換えれば、<strong>自給自足でミスの場所を特定できる</strong>仕組みになっています。
              </p>
            </div>
          </section>

          {/* 3. B/S与P/L的自动分流 */}
          <section id="bs-pl-split" style={{ marginBottom: '50px', scrollMarginTop: '120px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#111111', marginBottom: '16px', borderLeft: '4px solid #b93a26', paddingLeft: '12px' }}>
              運命の分岐点：試算表からB/SとP/Lへの自動振り分け
            </h2>
            <p style={{ fontSize: '16.5px', lineHeight: '1.85', color: '#334155', marginBottom: '20px' }}>
              試算表の集計が終わり、左右の金額が一致したらいよいよ最終局面、<strong>「決算（財務諸表の作成）」</strong>です。
              ここでやることは、試算表に並んだ科目を、第1章・第2章で学んだ「5大要素の定位置」に基づいて、2つの報告書へ機械的に仕分けしていくだけです。
            </p>

            {/* 双栏等式大白话对比 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', margin: '28px 0' }}>
              <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', borderTop: '4px solid #b93a26' }}>
                <h4 style={{ margin: '0 0 8px 0', color: '#b93a26', fontSize: '15px' }}>🏢 貸借対照表（B/S）へ行く箱</h4>
                <p style={{ margin: 0, fontSize: '13.5px', color: '#475569', lineHeight: '1.7' }}>
                  <strong>【資産・負債・純資産】</strong><br />
                  財産の「現在地」と「来歴」を表す、会社のリアルな健康状態。これらは翌年にも引き継がれます。
                </p>
              </div>
              <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', borderTop: '4px solid #c9a054' }}>
                <h4 style={{ margin: '0 0 8px 0', color: '#c9a054', fontSize: '15px' }}>📊 損益計算書（P/L）へ行く箱</h4>
                <p style={{ margin: 0, fontSize: '13.5px', color: '#475569', lineHeight: '1.7' }}>
                  <strong>【費用・収益】</strong><br />
                  この1年間で「どう稼いで、どう使ったか」の営業成績。役割を終えたら数字はゼロにリセットされます。
                </p>
              </div>
            </div>

            <p style={{ fontSize: '16.5px', lineHeight: '1.85', color: '#334155' }}>
              試算表という1つの材料置場から、上の3つの箱（資産・負債・純資産）がB/Sへ引っ越し、下の2つの箱（費用・収益）がP/Lへ引っ越す。
              これだけで、ビジネスの全貌を映し出す決算書が自動的に完成します。
            </p>
          </section>

          {/* 4. 决算全貌俯瞰 */}
          <section id="goal-view" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#111111', marginBottom: '16px', borderLeft: '4px solid #b93a26', paddingLeft: '12px' }}>
              決算の全体像（マクロ俯瞰マップ）
            </h2>
            <p style={{ fontSize: '16.5px', lineHeight: '1.85', color: '#334155', marginBottom: '20px' }}>
              これで、簿記3級の全行程の背骨（メインストリーム）が繋がりました。全体の流れを1本のタイムラインで脳内に焼き付けてください：
            </p>

            <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <span style={{ background: '#111111', color: '#ffffff', fontSize: '12px', fontWeight: '800', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>1</span>
                  <div style={{ fontSize: '14.5px', color: '#334155' }}><strong>日々の取引：</strong> 経済活動を【仕訳】という最小単位に分解（第2章・第3章）</div>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <span style={{ background: '#111111', color: '#ffffff', fontSize: '12px', fontWeight: '800', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>2</span>
                  <div style={{ fontSize: '14.5px', color: '#334155' }}><strong>期末の集計：</strong> 全ての数字を【試算表（T/B）】に集めて左右の検算（第4章）</div>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <span style={{ background: '#111111', color: '#ffffff', fontSize: '12px', fontWeight: '800', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>3</span>
                  <div style={{ fontSize: '14.5px', color: '#334155' }}><strong>最終の報告：</strong> 5大要素の属性に従って【B/S】と【P/L】に完全分離（第1章・第4章）</div>
                </div>
              </div>
            </div>

            <p style={{ fontSize: '16.5px', lineHeight: '1.85', color: '#334155', marginTop: '20px' }}>
              「なーんだ、簿記って結局これだけの話だったのか！」と思えれば、あなたの勝ちです。
              全体の地図が手に入ったので、これから細かな特有の科目（固定資産の減価償却など）や細かな計算ルールが出てきても、もう迷子になることはありません。
            </p>
          </section>

          {/* 🏁 底部多闭环控制台（按钮集群） */}
          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '30px' }}>
            
            {/* 1. 专属实战练习卡片 */}
            <div style={{ background: '#111111', borderRadius: '8px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '800', color: '#ffffff' }}>🎯 決算と試算表の集計パズルに挑戦！</h4>
                <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8' }}>左右の金額がピタッと一致する複式簿記の快感を、実際の演習問題で体感しよう。</p>
              </div>
              <Link href={`/exams/${examId}/exercises`} style={{ textDecoration: 'none' }}>
                <button style={{ backgroundColor: '#ffffff', color: '#111111', border: 'none', padding: '12px 20px', borderRadius: '6px', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>
                  集計問題を解く
                </button>
              </Link>
            </div>

            {/* 2. 导航链路 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link href={`/exams/${examId}/guide`} style={{ textDecoration: 'none', color: '#64748b', fontSize: '14.5px', fontWeight: '600' }}>
                ← 章一覧（目次）に戻る
              </Link>
              {/* 下一章暂未解锁 */}
              <Link href={`/exams/${examId}/guide`} style={{ textDecoration: 'none' }}>
                <button style={{ backgroundColor: '#94a3b8', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '6px', fontSize: '15px', fontWeight: '700', cursor: 'not-allowed' }} disabled>
                  第5章は近日公開 🔒
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