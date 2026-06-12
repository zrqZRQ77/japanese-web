"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ExamGuideChapterTwo() {
  const params = useParams();
  const examId = params.examId || 'boki3';

  // 第二章内部小节目录
  const menuItems = [
    { id: 'ch2-intro', label: '1. 仕訳はただのパズル' },
    { id: 'bs-change', label: '2. 貸借対照表（B/S）の変動' },
    { id: 'pl-connect', label: '3. 損益計算書（P/L）との連結' },
    { id: 'golden-rule', label: '4. 仕訳の絶対法則' },
  ];

  const [activeSection, setActiveSection] = useState('ch2-intro');

  // 监测滚动以更新左侧导航高亮
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;
      menuItems.forEach((item) => {
        const el = document.getElementById(item.id);
        if (el && scrollPosition >= el.offsetTop && scrollPosition < el.offsetTop + el.offsetHeight) {
          setActiveSection(item.id);
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const colors = {
    avocado: '#7A9D54',
    avocadoLight: '#F5F8F2',
    textDark: '#111111',
    textGray: '#475569',
    border: '#e2e8f0',
    darkButton: '#2C3E20'
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: '"Helvetica Neue", Arial, sans-serif' }}>
      <header style={{ background: '#ffffff', padding: '16px 40px', borderBottom: `1px solid ${colors.border}`, position: 'sticky', top: 0, zIndex: 100, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ fontWeight: '900', fontSize: '22px', color: colors.textDark, textDecoration: 'none' }}>
          合格<span style={{ color: colors.avocado }}>ナビ</span>
        </Link>
        <Link href={`/exams/${examId}`} style={{ color: colors.textGray, fontSize: '14px' }}>← ダッシュボードに戻る</Link>
      </header>

      <div style={{ display: 'flex', maxWidth: '1100px', margin: '40px auto', gap: '40px', padding: '0 20px' }}>
        <aside style={{ width: '260px', flexShrink: 0 }}>
          <div style={{ background: '#ffffff', padding: '24px', borderRadius: '12px', border: `1px solid ${colors.border}` }}>
            <h2 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '20px' }}>簿記3級 学習ガイド</h2>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: colors.avocado, fontWeight: '700', marginBottom: '8px' }}>
                <span>進捗</span><span>50%</span>
              </div>
              <div style={{ height: '6px', background: colors.border, borderRadius: '3px' }}>
                <div style={{ width: '50%', height: '100%', background: colors.avocado, borderRadius: '3px' }}></div>
              </div>
            </div>
            {menuItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} style={{ 
                display: 'block', padding: '10px 0', fontSize: '14px', textDecoration: 'none',
                color: activeSection === item.id ? colors.avocado : colors.textGray,
                borderLeft: activeSection === item.id ? `3px solid ${colors.avocado}` : '3px solid transparent',
                paddingLeft: '12px'
              }}>
                {item.label}
              </a>
            ))}
          </div>
        </aside>

        <main style={{ flex: 1, background: '#ffffff', padding: '40px', borderRadius: '12px', border: `1px solid ${colors.border}` }}>
          <div style={{ marginBottom: '30px', borderBottom: `1px solid ${colors.border}`, paddingBottom: '20px' }}>
            <p style={{ color: colors.avocado, fontSize: '12px', fontWeight: '800' }}>第2章 勘定科目と5要素</p>
            <h1 style={{ fontSize: '26px', fontWeight: '900', margin: '10px 0' }}>仕訳のメカニズムを解き明かす</h1>
          </div>

          <section id="ch2-intro" style={{ marginBottom: '40px' }}>
            <p style={{ lineHeight: '1.8', color: colors.textGray }}>第1章で学んだ「左右のルール」をベースに、実際のビジネスシーンでどのように仕訳が行われるのかを見ていきましょう。</p>
          </section>

          <section id="bs-change" style={{ marginBottom: '40px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '15px' }}>2. 貸借対照表（B/S）の変動</h3>
            <div style={{ background: colors.avocadoLight, padding: '20px', borderRadius: '8px' }}>
              <p style={{ color: colors.avocado, fontWeight: '700', margin: '0 0 10px 0' }}>ポイント：B/Sは常に左右バランスする</p>
              <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6' }}>資産が増えれば、必ず負債か純資産が増える。この「左右の対照」こそが簿記の安定性を支えています。</p>
            </div>
          </section>

          {/* 底部导航 */}
          <div style={{ marginTop: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href={`/exams/${examId}/guide/ch1`} style={{ color: colors.textGray, textDecoration: 'none', fontWeight: '600' }}>← 前の項目</Link>
            <Link href={`/exams/${examId}/guide/ch3`}>
              <button style={{ background: colors.darkButton, color: '#fff', padding: '12px 24px', borderRadius: '6px', border: 'none', fontWeight: '700', cursor: 'pointer' }}>次の項目 →</button>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}