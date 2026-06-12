"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ExamGuideChapterTwo() {
  const params = useParams();
  const examId = params.examId || 'boki3';

  // 第二章内部小节目录
  const menuItems = [
    { id: 'intro', label: '1. 勘定科目とは何か' },
    { id: 'five-elements', label: '2. 簿記の5大要素とホームポジション' },
    { id: 't-account', label: '3. T型勘定の仕組み' },
    { id: 'shiwake-rules', label: '4. 仕訳の具体的なルール' },
  ];

  const [activeSection, setActiveSection] = useState('intro');

  // 监测滚动以更新左侧导航高亮
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
        <Link href="/" style={{ fontWeight: '900', fontSize: '22px', color: colors.textDark, textDecoration: 'none' }}>
          合格<span style={{ color: colors.avocado }}>ナビ</span>
        </Link>
        <Link href={`/exams/${examId}`} style={{ color: colors.textGray, textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>← ダッシュボードに戻る</Link>
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
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: colors.textDark, marginBottom: '12px' }}>第2章 勘定科目と5要素</div>
              <div style={{ display: 'flex', flexDirection: 'column', borderLeft: `2px solid ${colors.border}`, marginLeft: '6px' }}>
                {menuItems.map((item) => (
                  <a key={item.id} href={`#${item.id}`} style={{
                    padding: '10px 0 10px 16px', fontSize: '13px', textDecoration: 'none',
                    color: activeSection === item.id ? colors.avocado : colors.textGray,
                    fontWeight: activeSection === item.id ? '700' : '500',
                    borderLeft: activeSection === item.id ? `2px solid ${colors.avocado}` : '2px solid transparent',
                    marginLeft: '-2px'
                  }}>{item.label}</a>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <main style={{ flex: 1, padding: '40px 60px' }}>
          <div style={{ marginBottom: '30px', borderBottom: `1px solid ${colors.border}`, paddingBottom: '16px' }}>
            <div style={{ fontSize: '13px', color: colors.textGray, fontWeight: '500' }}>第2章 勘定科目と5要素 <span style={{ margin: '0 8px' }}>&gt;</span> <span style={{ color: colors.avocado, fontWeight: '700' }}>{menuItems.find(i => i.id === activeSection)?.label}</span></div>
          </div>

          <section id="intro" style={{ marginBottom: '60px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: colors.textDark, marginBottom: '24px' }}>1. 勘定科目とは何か</h1>
            <p style={{ fontSize: '15px', lineHeight: '1.8', color: colors.textGray }}>勘定科目とは、企業の経済活動を記録するための「項目名」です。現金、建物、借入金など、取引の内容を分類して記録することで、後から経営状況を分析できるようになります。</p>
          </section>

          <section id="five-elements" style={{ marginBottom: '60px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: colors.textDark, marginBottom: '20px' }}>2. 簿記の5大要素とホームポジション</h2>
            <div style={{ background: colors.avocadoLight, padding: '24px', borderRadius: '8px'
