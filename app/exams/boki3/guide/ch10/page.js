"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ExamGuideChapterTen() {
  const params = useParams();
  const examId = params.examId || 'boki3';

  // 本章内部小节目录
  const menuItems = [
    { id: 'worksheet', label: '1. 【図解】精算表（せいさんひょう）の構造' },
    { id: 'pl_statement', label: '2. 【図解】損益計算書（P/L）の作成' },
    { id: 'bs_statement', label: '3. 【図解】貸借対照表（B/S）の作成' },
    { id: 'final_advice', label: '4. 簿記3級合格への最終ステップ' },
  ];

  const [activeSection, setActiveSection] = useState('worksheet');

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
              <span>進捗</span><span>100% 🎉</span>
            </div>
            <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: '100%', height: '100%', background: colors.avocado, borderRadius: '3px' }}></div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(ch => (
              <div key={ch} style={{ fontSize: '14px', fontWeight: '500', color: colors.textGray, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Link href={`/exams/${examId}/guide/ch${ch}`} style={{ textDecoration: 'none', color: 'inherit' }}>第{ch}章</Link>
                <span style={{ color: colors.avocado, fontWeight: 'bold' }}>✓ 完了</span>
              </div>
            ))}
            
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: colors.textDark, marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>第10章 決算と財務諸表</span>
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
          </div>
        </aside>

        <main style={{ flex: 1, padding: '40px 60px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', paddingBottom: '16px', borderBottom: `1px solid ${colors.border}` }}>
            <div style={{ fontSize: '13px', color: colors.textGray, fontWeight: '500' }}>
              第10章 決算と財務諸表の作成 <span style={{ margin: '0 8px' }}>&gt;</span> 
              <span style={{ color: colors.avocado, fontWeight: '700' }}>{menuItems.find(item => item.id === activeSection)?.label}</span>
            </div>
          </div>

          <div style={{ maxWidth: '680px' }}>
            
            <section id="worksheet" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: '800', color: colors.textDark, marginBottom: '24px' }}>1. 【図解】精算表（せいさんひょう）の構造</h1>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '16px' }}>
                精算表とは、決算のスタート地点である「残高試算表」から、ゴールである「損益計算書（P/L）」と「貸借対照表（B/S）」を作成するまでの全プロセスを1枚の紙にまとめた<strong>決算の設計図（下書き）</strong>です。
              </p>
              
              {/* 精算表 HTML 绘制 */}
              <div style={{ marginBottom: '24px', overflowX: 'auto' }}>
                <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse', textAlign: 'center', border: `2px solid ${colors.textDark}`, backgroundColor: '#ffffff' }}>
                  <thead>
                    <tr>
                      <th rowSpan="2" style={{ padding: '8px', borderRight: `1px solid ${colors.border}`, borderBottom: `2px solid ${colors.textDark}`, width: '22%', backgroundColor: colors.avocadoLight, fontSize: '14px' }}>勘定科目</th>
                      <th colSpan="2" style={{ padding: '4px', borderRight: `1px solid ${colors.border}`, borderBottom: `1px solid ${colors.border}`, backgroundColor: '#f8fafc', fontSize: '13px' }}>残高試算表</th>
                      <th colSpan="2" style={{ padding: '4px', borderRight: `1px solid ${colors.border}`, borderBottom: `1px solid ${colors.border}`, backgroundColor: '#f8fafc', fontSize: '13px' }}>損益計算書</th>
                      <th colSpan="2" style={{ padding: '4px', borderBottom: `1px solid ${colors.border}`, backgroundColor: '#f8fafc', fontSize: '13px' }}>貸借対照表</th>
                    </tr>
                    <tr style={{ backgroundColor: '#f8fafc', borderBottom: `2px solid ${colors.textDark}`, fontSize: '12px' }}>
                      <th style={{ borderRight: `1px dotted ${colors.border}`, padding: '4px' }}>借</th><th style={{ borderRight: `1px solid ${colors.border}` }}>貸</th>
                      <th style={{ borderRight: `1px dotted ${colors.border}` }}>借</th><th style={{ borderRight: `1px solid ${colors.border}` }}>貸</th>
                      <th style={{ borderRight: `1px dotted ${colors.border}` }}>借</th><th>貸</th>
                    </tr>
                  </thead>
                  <tbody style={{ fontSize: '13px', color: colors.textDark }}>
                    <tr style={{ borderBottom: `1px dashed ${colors.border}` }}>
                      <td style={{ borderRight: `1px solid ${colors.border}`, textAlign: 'left', paddingLeft: '8px' }}>現金 (資産)</td>
                      <td style={{ borderRight: `1px dotted ${colors.border}` }}>300</td><td style={{ borderRight: `1px solid ${colors.border}` }}></td>
                      <td style={{ borderRight: `1px dotted ${colors.border}` }}></td><td style={{ borderRight: `1px solid ${colors.border}` }}></td>
                      <td style={{ borderRight: `1px dotted ${colors.border}`, fontWeight: 'bold' }}>300</td><td></td>
                    </tr>
                    <tr style={{ borderBottom: `1px dashed ${colors.border}` }}>
                      <td style={{ borderRight: `1px solid ${colors.border}`, textAlign: 'left', paddingLeft: '8px' }}>備品 (資産)</td>
                      <td style={{ borderRight: `1px dotted ${colors.border}` }}>200</td><td style={{ borderRight: `1px solid ${colors.border}` }}></td>
                      <td style={{ borderRight: `1px dotted ${colors.border}` }}></td><td style={{ borderRight: `1px solid ${colors.border}` }}></td>
                      <td style={{ borderRight: `1px dotted ${colors.border}`, fontWeight: 'bold' }}>200</td><td></td>
                    </tr>
                    <tr style={{ borderBottom: `1px dashed ${colors.border}` }}>
                      <td style={{ borderRight: `1px solid ${colors.border}`, textAlign: 'left', paddingLeft: '8px' }}>借入金 (負債)</td>
                      <td style={{ borderRight: `1px dotted ${colors.border}` }}></td><td style={{ borderRight: `1px solid ${colors.border}` }}>150</td>
                      <td style={{ borderRight: `1px dotted ${colors.border}` }}></td><td style={{ borderRight: `1px solid ${colors.border}` }}></td>
                      <td style={{ borderRight: `1px dotted ${colors.border}` }}></td><td style={{ fontWeight: 'bold' }}>150</td>
                    </tr>
                    <tr style={{ borderBottom: `1px dashed ${colors.border}` }}>
                      <td style={{ borderRight: `1px solid ${colors.border}`, textAlign: 'left', paddingLeft: '8px' }}>資本金 (純資産)</td>
                      <td style={{ borderRight: `1px dotted ${colors.border}` }}></td><td style={{ borderRight: `1px solid ${colors.border}` }}>200</td>
                      <td style={{ borderRight: `1px dotted ${colors.border}` }}></td><td style={{ borderRight: `1px solid ${colors.border}` }}></td>
                      <td style={{ borderRight: `1px dotted ${colors.border}` }}></td><td style={{ fontWeight: 'bold' }}>200</td>
                    </tr>
                    <tr style={{ borderBottom: `1px dashed ${colors.border}` }}>
                      <td style={{ borderRight: `1px solid ${colors.border}`, textAlign: 'left', paddingLeft: '8px' }}>売上 (収益)</td>
                      <td style={{ borderRight: `1px dotted ${colors.border}` }}></td><td style={{ borderRight: `1px solid ${colors.border}` }}>500</td>
                      <td style={{ borderRight: `1px dotted ${colors.border}` }}></td><td style={{ borderRight: `1px solid ${colors.border}`, fontWeight: 'bold' }}>500</td>
                      <td style={{ borderRight: `1px dotted ${colors.border}` }}></td><td></td>
                    </tr>
                    <tr style={{ borderBottom: `1px dashed ${colors.border}` }}>
                      <td style={{ borderRight: `1px solid ${colors.border}`, textAlign: 'left', paddingLeft: '8px' }}>仕入 (費用)</td>
                      <td style={{ borderRight: `1px dotted ${colors.border}` }}>300</td><td style={{ borderRight: `1px solid ${colors.border}` }}></td>
                      <td style={{ borderRight: `1px dotted ${colors.border}`, fontWeight: 'bold' }}>300</td><td style={{ borderRight: `1px solid ${colors.border}` }}></td>
                      <td style={{ borderRight: `1px dotted ${colors.border}` }}></td><td></td>
                    </tr>
                    <tr style={{ borderBottom: `1px solid ${colors.textDark}` }}>
                      <td style={{ borderRight: `1px solid ${colors.border}`, textAlign: 'left', paddingLeft: '8px' }}>給料 (費用)</td>
                      <td style={{ borderRight: `1px dotted ${colors.border}` }}>50</td><td style={{ borderRight: `1px solid ${colors.border}` }}></td>
                      <td style={{ borderRight: `1px dotted ${colors.border}`, fontWeight: 'bold' }}>50</td><td style={{ borderRight: `1px solid ${colors.border}` }}></td>
                      <td style={{ borderRight: `1px dotted ${colors.border}` }}></td><td></td>
                    </tr>
                    {/* 当期纯利益计算行 */}
                    <tr style={{ backgroundColor: '#fdf2f0', fontWeight: 'bold', color: '#b93a26' }}>
                      <td style={{ borderRight: `1px solid ${colors.border}`, textAlign: 'left', paddingLeft: '8px' }}>当期純利益</td>
                      <td style={{ borderRight: `1px dotted ${colors.border}` }}></td><td style={{ borderRight: `1px solid ${colors.border}` }}></td>
                      <td style={{ borderRight: `1px dotted ${colors.border}` }}>150</td><td style={{ borderRight: `1px solid ${colors.border}` }}></td>
                      <td style={{ borderRight: `1px dotted ${colors.border}` }}></td><td>150</td>
                    </tr>
                    <tr style={{ borderTop: `2px solid ${colors.textDark}`, backgroundColor: '#f8fafc', fontWeight: 'bold' }}>
                      <td style={{ borderRight: `1px solid ${colors.border}`, textAlign: 'center' }}>合 計</td>
                      <td style={{ borderRight: `1px dotted ${colors.border}` }}>850</td><td style={{ borderRight: `1px solid ${colors.border}` }}>850</td>
                      <td style={{ borderRight: `1px dotted ${colors.border}` }}>500</td><td style={{ borderRight: `1px solid ${colors.border}` }}>500</td>
                      <td style={{ borderRight: `1px dotted ${colors.border}` }}>500</td><td>500</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style={{ background: colors.avocadoLight, padding: '16px', borderRadius: '8px', marginBottom: '24px' }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', fontWeight: '800', color: colors.avocado }}>💡 精算表のポイント</h4>
                <p style={{ margin: 0, fontSize: '14px', color: colors.textDark, lineHeight: '1.7' }}>
                  ・<strong>費用と収益</strong>の残高は「損益計算書」の列へ移動します。<br/>
                  ・<strong>資産・負債・純資産</strong>の残高は「貸借対照表」の列へ移動します。<br/>
                  ・P/Lの差額（この図では 貸方500 - 借方350 = 150）が<strong>当期純利益</strong>となり、B/Sの貸方に書き写すことで、B/Sも左右の合計が500でピッタリ一致します！
                </p>
              </div>
            </section>

            <section id="pl_statement" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: colors.textDark, marginBottom: '20px' }}>2. 【図解】損益計算書（P/L）の作成</h2>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '16px' }}>
                <strong>損益計算書（Profit and Loss Statement）</strong>は、企業の一期間の「経営成績（いくら稼いで、何にいくら使ったか）」を表す外部公開用のレポートです。左に費用、右に収益を配置します。
              </p>
              
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                <div style={{ width: '450px', backgroundColor: '#ffffff', border: `2px solid ${colors.textDark}` }}>
                  <div style={{ textAlign: 'center', fontWeight: '900', fontSize: '16px', backgroundColor: '#f8fafc', padding: '8px', borderBottom: `2px solid ${colors.textDark}` }}>
                    損益計算書<br/><span style={{ fontSize: '12px', fontWeight: 'normal' }}>(自 ×年4月1日 至 〇年3月31日)</span>
                  </div>
                  <div style={{ display: 'flex', fontSize: '14.5px' }}>
                    {/* 借方：費用 */}
                    <div style={{ flex: 1, borderRight: `1px solid ${colors.textDark}`, padding: '12px' }}>
                      <div style={{ fontWeight: 'bold', borderBottom: '1px solid #ccc', marginBottom: '8px', paddingBottom: '4px' }}>借方（費用の部）</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}><span>仕入（売上原価）</span><span>300</span></div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}><span>給料</span><span>50</span></div>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', color: '#b93a26', fontWeight: 'bold' }}><span>当期純利益</span><span>150</span></div>
                    </div>
                    {/* 貸方：収益 */}
                    <div style={{ flex: 1, padding: '12px' }}>
                      <div style={{ fontWeight: 'bold', borderBottom: '1px solid #ccc', marginBottom: '8px', paddingBottom: '4px' }}>貸方（収益の部）</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}><span>売上</span><span>500</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="bs_statement" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: colors.textDark, marginBottom: '20px' }}>3. 【図解】貸借対照表（B/S）の作成</h2>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '16px' }}>
                <strong>貸借対照表（Balance Sheet）</strong>は、決算日時点における企業の「財政状態（どれだけ資産があり、いくら借金があるか）」を表すレポートです。左に資産、右に負債と純資産を配置します。
              </p>
              
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                <div style={{ width: '450px', backgroundColor: '#ffffff', border: `2px solid ${colors.textDark}` }}>
                  <div style={{ textAlign: 'center', fontWeight: '900', fontSize: '16px', backgroundColor: '#f8fafc', padding: '8px', borderBottom: `2px solid ${colors.textDark}` }}>
                    貸借対照表<br/><span style={{ fontSize: '12px', fontWeight: 'normal' }}>(〇年3月31日 現在)</span>
                  </div>
                  <div style={{ display: 'flex', fontSize: '14.5px' }}>
                    {/* 借方：資産 */}
                    <div style={{ flex: 1, borderRight: `1px solid ${colors.textDark}`, padding: '12px' }}>
                      <div style={{ fontWeight: 'bold', borderBottom: '1px solid #ccc', marginBottom: '8px', paddingBottom: '4px' }}>借方（資産の部）</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}><span>現金</span><span>300</span></div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}><span>備品</span><span>200</span></div>
                    </div>
                    {/* 貸方：負債・純資産 */}
                    <div style={{ flex: 1, padding: '12px' }}>
                      <div style={{ fontWeight: 'bold', borderBottom: '1px solid #ccc', marginBottom: '8px', paddingBottom: '4px' }}>貸方（負債の部）</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}><span>借入金</span><span>150</span></div>
                      
                      <div style={{ fontWeight: 'bold', borderBottom: '1px solid #ccc', marginBottom: '8px', paddingBottom: '4px' }}>貸方（純資産の部）</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}><span>資本金</span><span>200</span></div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#b93a26', fontWeight: 'bold' }}><span>繰越利益剰余金</span><span>(＋150)</span></div>
                    </div>
                  </div>
                </div>
              </div>
              <p style={{ fontSize: '14px', color: '#b93a26', fontWeight: 'bold', textAlign: 'center' }}>
                ※P/Lで計算された「当期純利益（150）」が、B/Sの純資産に合流し、左右が500で一致します！
              </p>
            </section>

            <section id="final_advice" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: colors.textDark, marginBottom: '20px' }}>4. 簿記3級合格への最終ステップ</h2>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray, marginBottom: '16px' }}>
                これまでの全10章、本当にお疲れ様でした！
                簿記の基本概念から仕訳パズル、決算書作成まで、あなたは試験合格に必要なすべての武器を手に入れました。
              </p>
              <div style={{ background: colors.avocadoLight, padding: '24px', borderRadius: '8px', textAlign: 'center' }}>
                <h3 style={{ color: colors.avocado, margin: '0 0 12px 0', fontSize: '20px', fontWeight: '900' }}>👑 講座修了おめでとうございます！</h3>
                <p style={{ margin: '0 0 16px 0', fontSize: '15px', color: colors.textDark, lineHeight: '1.6' }}>
                  これからはインプットを終わらせ、<strong>「過去問・予想問題の演習（アウトプット）」</strong>に全振りしてください。<br/>
                  実際の試験時間は「60分」と非常に短いです。スピードと正確性を磨きましょう！
                </p>
                <Link href={`/exams/${examId}/exercises`} style={{ textDecoration: 'none' }}>
                  <button style={{ backgroundColor: colors.avocado, color: '#ffffff', border: 'none', padding: '14px 28px', borderRadius: '8px', fontSize: '16px', fontWeight: '800', cursor: 'pointer', boxShadow: '0 4px 6px rgba(122, 157, 84, 0.3)' }}>
                    📝 さっそく総合模擬問題に挑戦する
                  </button>
                </Link>
              </div>
            </section>
            
            <div style={{ borderTop: `1px solid ${colors.border}`, paddingTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link href={`/exams/${examId}/guide/ch9`} style={{ textDecoration: 'none' }}>
                <button style={{ backgroundColor: '#ffffff', color: colors.textDark, border: `1px solid ${colors.border}`, padding: '12px 20px', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  ← 前の項目（第9章）
                </button>
              </Link>
              <Link href={`/exams/${examId}`} style={{ textDecoration: 'none' }}>
                <button style={{ backgroundColor: colors.darkButton, color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  🎉 コース修了（ダッシュボードへ戻る）
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
