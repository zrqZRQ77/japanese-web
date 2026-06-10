"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ExamGuideChapterTwo() {
  const params = useParams();
  const examId = params.examId || 'boki3';

  const menuItems = [
    { id: 'ch2-intro', label: '1. 仕訳はただのパズル' },
    { id: 'bs-change', label: '2. 資産負債表（B/S）の変動' },
    { id: 'pl-connect', label: '3. 損益計算書（P/L）との連結' },
    { id: 'golden-rule', label: '4. 仕訳の絶対法則' },
  ];

  const [activeSection, setActiveSection] = useState('ch2-intro');

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

      <div style={{ display: 'flex', maxWidth: '1100px', margin: '0 auto', padding: '40px 20px', gap: '50px' }}>
        
        <aside style={{ width: '220px', flexShrink: 0, position: 'sticky', top: '100px', height: 'calc(100vh - 140px)' }}>
          <div style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', letterSpacing: '1px', marginBottom: '16px' }}>
            第2章 内の目次
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

        <main style={{ flex: 1, maxWidth: '720px' }}>
          
          <div style={{ marginBottom: '40px', borderBottom: '1px solid #f1f5f9', paddingBottom: '20px' }}>
            <span style={{ color: '#b93a26', fontSize: '13px', fontWeight: '800', letterSpacing: '0.5px' }}>第2章 • 仕訳の基礎とゲームのルール</span>
            <h1 style={{ fontSize: '28px', fontWeight: '900', lineHeight: '1.4', margin: '6px 0 0 0', color: '#111111' }}>
              【大白話】仕訳の基礎：ルール違反にならないための「左右の等式」
            </h1>
          </div>

          <section id="ch2-intro" style={{ marginBottom: '50px', scrollMarginTop: '120px' }}>
            <p style={{ fontSize: '16.5px', lineHeight: '1.85', color: '#334155', marginBottom: '20px' }}>
              第1章では、お金の「来歴（右側）」と「現在地（左側）」という大原則を学びました。
              第2章では、実際のビジネスで毎日起きる無数の動きを、どのように帳簿に記録していくか、つまり<strong>「仕訳（しわけ）」</strong>の具体的なパズルルールを解き明かします。
            </p>
          </section>

          <section id="bs-change" style={{ marginBottom: '50px', scrollMarginTop: '120px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#111111', marginBottom: '16px', borderLeft: '4px solid #b93a26', paddingLeft: '12px' }}>
              ビジネスの動きによる「箱」のシーソー現象
            </h2>
            <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '8px', borderLeft: '4px solid #c9a054', margin: '24px 0' }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', fontWeight: '800', color: '#c9a054' }}>💡 返済という現象の真実：</h4>
              <p style={{ margin: 0, fontSize: '14.5px', color: '#475569', lineHeight: '1.75' }}>
                ・左側のポケットから「現金」が 100万円減る（資産の減少）<br />
                ・右側のポケットから「借入金」という義務が 100万円減る（負債の減少）
              </p>
            </div>
          </section>

          <section id="pl-connect" style={{ marginBottom: '50px', scrollMarginTop: '120px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#111111', marginBottom: '16px', borderLeft: '4px solid #b93a26', paddingLeft: '12px' }}>
              「費用」と「収益」が右左に飛び出す理由
            </h2>
            <p style={{ fontSize: '16.5px', lineHeight: '1.85', color: '#334155' }}>
              収益を使えば使うほど、右側にある自分のお金が削られていく。だから等式のバランスを取るために、費用は左側にスタンバイしているのです。
            </p>
          </section>

          <section id="golden-rule" style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#111111', marginBottom: '16px', borderLeft: '4px solid #b93a26', paddingLeft: '12px' }}>
              【完全保存版】仕訳の絶対法則マトリクス
            </h2>
            <div style={{ background: '#fdf2f0', padding: '24px', borderRadius: '8px', border: '1px solid #fca5a5', marginBottom: '40px' }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '800', color: '#b93a26' }}>⚖️ 勘定科目を左右どちらに書くかの全ルール</h4>
              <p style={{ margin: 0, fontSize: '14.5px', color: '#334155', lineHeight: '1.8' }}>
                <strong>1. 左側（借方）に書くとき：</strong> 【資産】の増加 / 【負債】の減少 / 【費用】の発生<br />
                <strong>2. 右側（貸方）に書くとき：</strong> 【資産】の減少 / 【負債】の增加 / 【収益】の発生
              </p>
            </div>
          </section>

          {/* 🏁 底部多闭环控制台（按钮集群） */}
          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '30px' }}>
            {/* 1. 练习题卡片 */}
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: '800', color: '#111111' }}>🎯 第2章 の仕訳パズルに挑戦！</h4>
                <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>取引の二面性を理解したら、スピード演習で記憶にロックをかけましょう。</p>
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
              {/* 第3章未解锁时可返回目次或前往刷题 */}
              <Link href={`/exams/${examId}/guide`} style={{ textDecoration: 'none' }}>
                <button style={{ backgroundColor: '#94a3b8', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '6px', fontSize: '15px', fontWeight: '700', cursor: 'not-allowed' }} disabled>
                  第3章は近日公開 🔒
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