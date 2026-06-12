"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ExamGuideChapterThreeUpgrade() {
  const params = useParams();
  const examId = params.examId || 'boki3';

  // 本章内部小节目录（硬核扩充至5大核心Section）
  const menuItems = [
    { id: 'what-is-cash-trap', label: '1. 簿記上の「現金」と通貨代用証券の罠' },
    { id: 'cash-over-short-complete', label: '2. 現金過不足（期中から決算日までの完全処理）' },
    { id: 'checking-account-logic', label: '3. 当座預金と小切手（他人振出 vs 自己振出）' },
    { id: 'bank-overdraft-heavy', label: '4. 【重要難所】当座借越の処理と決算整理' },
    { id: 'petty-cash-imprest', label: '5. 小口現金と定額資金前渡法の仕組み' },
  ];

  const [activeSection, setActiveSection] = useState('what-is-cash-trap');

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

  // 牛油果色系定义
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
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: '"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", Meiryo, sans-serif' }}>
      
      {/* 顶部通栏 */}
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

      {/* 页面主体内容：左右双栏布局 */}
      <div style={{ display: 'flex', maxWidth: '1200px', margin: '40px auto', background: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', overflow: 'hidden' }}>
        
        {/* 👈 左侧导航栏 */}
        <aside style={{ width: '280px', borderRight: `1px solid ${colors.border}`, padding: '30px 20px', flexShrink: 0 }}>
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: colors.textDark, marginBottom: '24px' }}>簿記3級 学習ガイド</h2>
          
          {/* 进度条区块 (第三章升级，进度设为 30%) */}
          <div style={{ marginBottom: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '700', color: colors.avocado, marginBottom: '8px' }}>
              <span>進捗</span>
              <span>30%</span>
            </div>
            <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: '30%', height: '100%', background: colors.avocado, borderRadius: '3px' }}></div>
            </div>
          </div>

          {/* 章节列表 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ fontSize: '14px', fontWeight: '500', color: colors.textGray, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Link href={`/exams/${examId}/guide/ch1`} style={{ textDecoration: 'none', color: 'inherit' }}>第1章 簿記の基本</Link>
              <span style={{ color: colors.avocado, fontWeight: 'bold' }}>✓ 完了</span>
            </div>
            <div style={{ fontSize: '14px', fontWeight: '500', color: colors.textGray, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Link href={`/exams/${examId}/guide/ch2`} style={{ textDecoration: 'none', color: 'inherit' }}>第2章 取引と仕訳の基礎</Link>
              <span style={{ color: colors.avocado, fontWeight: 'bold' }}>✓ 完了</span>
            </div>

            {/* 当前展开的第3章 */}
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: colors.textDark, marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>第3章 現金と預金</span>
                <span style={{ color: colors.avocado, fontSize: '18px' }}>•</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', borderLeft: `2px solid ${colors.border}`, marginLeft: '6px' }}>
                {menuItems.map((item) => {
                  const isCurrent = activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      style={{
                        padding: '10px 0 10px 16px',
                        fontSize: '13px',
                        textDecoration: 'none',
                        color: isCurrent ? colors.avocado : colors.textGray,
                        fontWeight: isCurrent ? '700' : '500',
                        borderLeft: isCurrent ? `2px solid ${colors.avocado}` : '2px solid transparent',
                        marginLeft: '-2px',
                        transition: 'all 0.2s'
                      }}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </div>
            </div>

            <div style={{ fontSize: '14px', fontWeight: '500', color: colors.textLightGray, padding: '8px 0' }}>第4章 商品売買</div>
            <div style={{ fontSize: '14px', fontWeight: '500', color: colors.textLightGray, padding: '8px 0' }}>第5章 その他の債権・債務</div>
          </div>
        </aside>

        {/* 👉 右侧主内容区 */}
        <main style={{ flex: 1, padding: '40px 60px' }}>
          
          {/* 顶部面包屑 */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', paddingBottom: '16px', borderBottom: `1px solid ${colors.border}` }}>
            <div style={{ fontSize: '13px', color: colors.textGray, fontWeight: '500' }}>
              第3章 現金と預金 <span style={{ margin: '0 8px' }}>&gt;</span> 
              <span style={{ color: colors.avocado, fontWeight: '700' }}>
                {menuItems.find(item => item.id === activeSection)?.label}
              </span>
            </div>
          </div>

          <div style={{ maxWidth: '680px' }}>
            
            {/* Section 1 */}
            <section id="what-is-cash-trap" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: '800', color: colors.textDark, marginBottom: '24px' }}>
                1. 簿記上の「現金」と通貨代用証券の罠
              </h1>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '16px' }}>
                簿記上の「現金」には、紙幣や硬硬貨などの通貨だけでなく、銀行に持っていけばいつでも換金できる<strong>「通貨代用証券（つうかだいようしょうけん）」</strong>も含まれます。
              </p>

              <div style={{ background: colors.avocadoLight, padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', fontWeight: '800', color: colors.avocado }}>
                  ⚠️ 絶対暗記：通貨代用証券（現金として扱うもの）
                </h4>
                <p style={{ margin: 0, fontSize: '14.5px', color: colors.textDark, lineHeight: '1.7' }}>
                  ・<strong>他人振出小切手</strong>（取引先などが発行した小切手）<br/>
                  ・<strong>送金小切手</strong> / <strong>郵便為替証書</strong><br/>
                  ・<strong>配当金領収証</strong>（株主配当金を受け取るための証書）
                </p>
              </div>

              <div style={{ border: `1px solid ${colors.border}`, padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
                <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: '800', color: '#b93a26' }}>
                  🚨 猛毒罠：小切手の「振出人」を必ず確認せよ！
                </h4>
                <div style={{ fontSize: '14.5px', color: colors.textGray, lineHeight: '1.8' }}>
                  <p style={{ margin: '0 0 8px 0' }}><strong>【罠のケース】</strong>売掛金回収として、得意先が持っていた「当店（弊社）が過去に振り出した小切手」を回収した。</p>
                  <p style={{ margin: '0 0 8px 0', color: colors.avocado, fontWeight: 'bold' }}>【考え方】</p>
                  <p style={{ margin: '0 0 12px 0' }}>他人が振り出した小切手なら「現金」ですが、<strong>自己振出小切手（自社が過去に発行した小切手）</strong>が返ってきた場合は、過去の当座預金のマイナスを取り消すため、借方は<strong>「当座預金」</strong>の増加になります！</p>
                  <div style={{ background: '#f8fafc', padding: '12px', border: `1px dashed ${colors.border}`, textAlign: 'left', fontWeight: 'bold', color: colors.textDark }}>
                    ❌ 誤：（借）現 金 10,000 ／（貸）売掛金 10,000<br/>
                    ⭕ 正：（借）当座預金 10,000 ／（貸）売掛金 10,000
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section id="cash-over-short-complete" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: colors.textDark, marginBottom: '20px' }}>
                2. 現金過不足（期中から決算日までの完全処理）
              </h2>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '16px' }}>
                金庫にある「実際の現金」と、ノート上の「帳簿残高」がズレている時、原因が判明するまで一時的に<strong>「現金過不足（げんきんかぶそく）」</strong>というアパート（仮の勘定）に避難させます。
                常に<strong>「実際の金額（金庫）」に帳簿を合わせる</strong>のが鉄則です。
              </p>
              
              <div style={{ border: `1px solid ${colors.border}`, padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
                <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: '800', color: colors.textDark }}>
                  ✍️ 超頻出：期中から決算までの3段階仕訳
                </h4>
                <div style={{ fontSize: '14.5px', color: colors.textGray, lineHeight: '1.8' }}>
                  <p style={{ margin: '0 0 4px 0', color: colors.avocado, fontWeight: 'bold' }}>【ステップ①：期中にズレを発見】</p>
                  <p style={{ margin: '0 0 8px 0' }}>金庫の現金が帳簿より 5,000円少なかったため、帳簿を減らして金庫に合わせた。</p>
                  <div style={{ background: '#f8fafc', padding: '12px', border: `1px dashed ${colors.border}`, textAlign: 'center', fontWeight: 'bold', color: colors.textDark, marginBottom: '16px' }}>
                    （借方）現金過不足 5,000 ／ （貸方）現 金 5,000
                  </div>

                  <p style={{ margin: '0 0 4px 0', color: colors.avocado, fontWeight: 'bold' }}>【ステップ②：期中に原因が一部判明】</p>
                  <p style={{ margin: '0 0 8px 0' }}>調査の結果、上記のうち 3,000円は「旅費交通費」の記入漏れだと分かった。</p>
                  <div style={{ background: '#f8fafc', padding: '12px', border: `1px dashed ${colors.border}`, textAlign: 'center', fontWeight: 'bold', color: colors.textDark, marginBottom: '16px' }}>
                    （借方）旅費交通費 3,000 ／ （貸方）現金過不足 3,000
                  </div>

                  <p style={{ margin: '0 0 4px 0', color: colors.avocado, fontWeight: 'bold' }}>【ステップ③：決算日になっても原因不明】</p>
                  <p style={{ margin: '0 0 8px 0' }}>残りの 2,000円（5,000 - 3,000）は決算日になっても原因が分からなかった。</p>
                  <p style={{ margin: '0 0 8px 0' }}>➔ 決算書に「原因不明」の科目は載せられないため、現金の不足分（大損した）を<strong>雑損（ざっそん：費用）</strong>に振り替えて現金過不足を完全に消去します。</p>
                  <div style={{ background: '#fdf2f0', padding: '12px', border: `1px dashed #fca5a5`, textAlign: 'center', fontWeight: 'bold', color: '#b93a26' }}>
                    （借方）雑 損 2,000 ／ （貸方）現金過不足 2,000
                  </div>
                </div>
              </div>

              <div style={{ background: colors.avocadoLight, padding: '20px', borderRadius: '8px', borderLeft: `4px solid ${colors.avocado}` }}>
                <h5 style={{ margin: '0 0 6px 0', fontSize: '14.5px', fontWeight: '800', color: colors.textDark }}>🚨 決算日本番のウルトラ罠：決算日当日にズレを発見した場合</h5>
                <p style={{ margin: 0, fontSize: '13.5px', color: colors.textGray, lineHeight: '1.6' }}>
                  もし問題文に「<strong>決算日において</strong>、現金の実際有高が帳簿残高より1,000円不足している」とあったら、一時避难勘定である「現金過不足」は<strong>絶対に使ってはいけません！</strong><br/>
                  決算日その日に見つかったズレは、ダイレクトに<strong>「雑損」または「雑益」</strong>で仕訳します。<br/>
                  <strong>⭕ 仕訳：（借）雑 損 1,000 ／（貸）現 金 1,000</strong>
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section id="checking-account-logic" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: colors.textDark, marginBottom: '20px' }}>
                3. 当座預金と小切手（他人振出 vs 自己振出）
              </h2>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '16px' }}>
                小切手決済を行うための専用口座が<strong>当座預金（とうざよきん）</strong>です。
                実務・試験において小切手は「誰が振り出したか」によって完全に処理が分かれるため、学生にここを徹底的に叩き込む必要があります。
              </p>

              <div style={{ background: colors.avocadoLight, padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', fontWeight: '800', color: colors.avocado }}>
                  ⚖️ 小切手仕訳の双子ルール（大題・分録のコア）
                </h4>
                <p style={{ margin: 0, fontSize: '14px', color: colors.textDark, lineHeight: '1.8' }}>
                  ① <strong>小切手を振り出した（発行した）とき</strong><br/>
                  ➔ 当座預金口座からお金が引かれる義務が確定するため、<strong>貸方に「当座預金（資産の減少）」</strong>。<br/><br/>
                  ② <strong>他人振出の小切手を受け取ったとき</strong><br/>
                  ➔ 銀行に行けば即換金できる「通貨代用証券」なので、下書きや記憶を頼りにせず<strong>借方に「現金（資産の増加）」</strong>。
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section id="bank-overdraft-heavy" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: colors.textDark, marginBottom: '20px' }}>
                4. 【重要難所】当座借越の処理と決算整理
              </h2>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '16px' }}>
                本来、預金残高がゼロになったら支票は不渡り（不渡り）になりますが、あらかじめ銀行と<strong>当座借越契約（とうざかりこしけいやく）</strong>を結んでおくと、設定した限度額まで残高がマイナスになっても銀行が一時的に立て替えてくれます。
              </p>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '16px' }}>
                日商簿記3級の試験では、期中はマイナス残高になってもそのまま「当座預金」勘定を使い続ける<strong>「一本法（いっぽんほう）」</strong>が主流です。
              </p>

              <div style={{ border: `1px solid ${colors.border}`, padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
                <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: '800', color: colors.textDark }}>
                  ✍️ 例题：一本法での期中から決算整理
                </h4>
                <div style={{ fontSize: '14.5px', color: colors.textGray, lineHeight: '1.8' }}>
                  <p style={{ margin: '0 0 4px 0', color: colors.avocado, fontWeight: 'bold' }}>【期中の取引】</p>
                  <p style={{ margin: '0 0 8px 0' }}>当座預金残高が 10,000円の状態で、買掛金 30,000円の支払いのために小切手を振り出した。（当座借越契約あり）</p>
                  <p style={{ margin: '0 0 8px 0' }}>➔ 一本法では残高がマイナス 20,000円になっても、気にせず「当座預金」を右側に書きます。</p>
                  <div style={{ background: '#f8fafc', padding: '12px', border: `1px dashed ${colors.border}`, textAlign: 'center', fontWeight: 'bold', color: colors.textDark, marginBottom: '20px' }}>
                    （借方）買掛金 30,000 ／ （貸方）当座預金 30,000
                  </div>

                  <p style={{ margin: '0 0 4px 0', color: '#b93a26', fontWeight: 'bold' }}>【決算日の振替処理（★★★超超重要）】</p>
                  <p style={{ margin: '0 0 8px 0' }}>上記のまま決算日を迎えた。当座預金账户の残高はマイナス 20,000円である。</p>
                  <p style={{ margin: '0 0 8px 0' }}>➔ 外部の人に見せる貸借対照表（B/S）の資産の欄に「預金がマイナス」と書くわけにはいきません。これは銀行からの借金と同じなので、決算日に一時的に<strong>短期借入金（たんきかりいれきん：負債）</strong>に振り替えます！</p>
                  <div style={{ background: '#fdf2f0', padding: '12px', border: `1px dashed #fca5a5`, textAlign: 'center', fontWeight: 'bold', color: '#b93a26' }}>
                    （借方）当座預金 20,000 ／ （貸方）短期借入金 20,000
                  </div>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section id="petty-cash-imprest" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: colors.textDark, marginBottom: '20px' }}>
                5. 小口現金と定額資金前渡法の仕組み
              </h2>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '24px' }}>
                会社の各部署（総務部など）で使う水道代、切手代、タクシー代などの少額の支払いのために、経理部から事前に前渡ししておく資金を<strong>小口現金（こぐちげんきん：資産）</strong>と呼びます。
                これを管理する仕組みが<strong>定額資金前渡法（インプレスト・システム）</strong>です。
              </p>
              
              <div style={{ border: `1px solid ${colors.border}`, padding: '24px', borderRadius: '8px' }}>
                <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: '800', color: colors.textDark }}>
                  ✍️ 実務フローに沿った仕訳例
                </h4>
                <div style={{ fontSize: '14.5px', color: colors.textGray, lineHeight: '1.8' }}>
                  <p style={{ margin: '0 0 4px 0', fontWeight: '700' }}>① 用度係（各部署）にお金を前渡しした時</p>
                  <div style={{ background: '#f8fafc', padding: '10px', border: `1px dashed ${colors.border}`, textAlign: 'center', fontWeight: 'bold', color: colors.textDark, marginBottom: '16px' }}>
                    （借方）小口現金 50,000 ／ （貸方）当座預金 50,000
                  </div>

                  <p style={{ margin: '0 0 4px 0', fontWeight: '700' }}>② 用度係が日々の経费を支払った時</p>
                  <p style={{ margin: '0 0 8px 0', color: '#b93a26' }}>⚠️ 経理部はこの時点では「何も仕訳をしません」。用度係の報告を待ちます。</p>

                  <p style={{ margin: '16px 0 4px 0', fontWeight: '700' }}>③ 用度係から「通信費 3,000円、旅費交通費 2,000円」の報告を受け、即座に同額を補充した時</p>
                  <p style={{ margin: '0 0 8px 0' }}>➔ 報告された費用を計上し、補充した分だけ当座預金を減らします。</p>
                  <div style={{ background: '#f8fafc', padding: '10px', border: `1px dashed ${colors.border}`, textAlign: 'left', fontWeight: 'bold', color: colors.textDark }}>
                    （借方）通 信 費 3,000 ／ （貸方）当座預金 5,000<br/>
                        旅費交通費 2,000
                  </div>
                </div>
              </div>
            </section>

            {/* 🏁 底部导航栏 */}
            <div style={{ borderTop: `1px solid ${colors.border}`, paddingTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '40px' }}>
              <Link href={`/exams/${examId}/guide/ch2`} style={{ textDecoration: 'none' }}>
                <button style={{ backgroundColor: '#ffffff', color: colors.textDark, border: `1px solid ${colors.border}`, padding: '12px 20px', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  ← 前の項目（第2章）
                </button>
              </Link>

              <Link href={`/exams/${examId}/guide`} style={{ textDecoration: 'none', color: colors.textGray, fontSize: '14px', fontWeight: '600' }}>
                章のトップに戻る
              </Link>

              <Link href={`/exams/${examId}/guide/ch4`} style={{ textDecoration: 'none' }}>
                <button style={{ backgroundColor: colors.darkButton, color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  次の項目（第4章） →
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
