"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// 📡 静态引入数据（后续可根据需要继续扩展 fp3_guide.json）
import bokiData from '../../../../data/boki3_guide.json';
import fpData from '../../../../data/fp3_guide.json';

export default function ModernExamGuide() {
  const params = useParams();
  const examId = params.examId || 'boki3'; 

  // 🎯 智能分流
  const currentData = examId.includes('fp') ? fpData : bokiData;

  // 状态：当前高亮激活的小节 ID（用于让用户知道自己在哪个位置）
  const [activeSection, setActiveSection] = useState('');

  // 🕵️ 监测滚动，实现左侧目录根据右侧阅读进度自动高亮
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[data-section-id]');
      let currentActive = '';
      
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        // 当小节距离顶部小于 120px 时，判定用户正在阅读这一节
        if (sectionTop < 120) {
          currentActive = section.getAttribute('data-section-id') || '';
        }
      });
      
      if (currentActive) {
        setActiveSection(currentActive);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', fontFamily: '"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", Meiryo, sans-serif', color: '#111111' }}>
      
      {/* 1. 统一的朱红色顶部导航 */}
      <header style={{ background: '#ffffff', padding: '16px 40px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href="/" style={{ fontWeight: '900', fontSize: '22px', color: '#111111', textDecoration: 'none' }}>
            合格<span style={{ color: '#b93a26' }}>ナビ</span>
          </Link>
          <span style={{ color: '#e2e8f0' }}>|</span>
          <span style={{ fontSize: '14px', fontWeight: '700', color: '#64748b' }}>{currentData.guideTitle}</span>
        </div>
        <Link href={`/exams/${examId}`} style={{ color: '#666666', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>
          ← ダッシュボードに戻る
        </Link>
      </header>

      {/* 2. 现代 Wiki 侧边栏双栏容器 */}
      <div style={{ display: 'flex', maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', gap: '40px' }}>
        
        {/* 👈 左侧固定目录 (Sticky Sidebar) */}
        <aside style={{ width: '280px', flexShrink: 0, position: 'sticky', top: '100px', height: 'calc(100vh - 140px)', overflowY: 'auto', borderRight: '1px solid #f1f5f9', paddingRight: '20px' }}>
          <div style={{ fontSize: '12px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
            目次 / COURSE OUTLINE
          </div>
          
          {currentData.chapters?.map((chapter) => (
            <div key={chapter.chapterId} style={{ marginBottom: '24px' }}>
              {/* 大章节标题 */}
              <div style={{ fontSize: '14px', fontWeight: '800', color: '#111111', marginBottom: '8px' }}>
                {chapter.chapterNum}: {chapter.chapterName}
              </div>
              
              {/* 小节可选列表 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', paddingLeft: '8px' }}>
                {chapter.sections.map((sec) => {
                  const isCurrent = activeSection === sec.sectionId;
                  return (
                    <a
                      key={sec.sectionId}
                      href={`#${sec.sectionId}`}
                      style={{
                        fontSize: '13.5px',
                        lineHeight: '1.5',
                        padding: '6px 10px',
                        borderRadius: '4px',
                        textDecoration: 'none',
                        fontWeight: isCurrent ? '700' : '500',
                        color: isCurrent ? '#b93a26' : '#475569',
                        backgroundColor: isCurrent ? '#fdf2f0' : 'transparent',
                        borderLeft: isCurrent ? '3px solid #b93a26' : '3px solid transparent',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {sec.sectionTitle}
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </aside>

        {/* 👉 右侧沉浸式内容区 (720px 黄金宽度限制) */}
        <main style={{ flex: 1, maxWidth: '720px' }}>
          
          <div style={{ marginBottom: '32px', borderBottom: '1px solid #f1f5f9', paddingBottom: '24px' }}>
            <span style={{ background: '#fdf2f0', color: '#b93a26', fontSize: '12px', fontWeight: '800', padding: '4px 8px', borderRadius: '4px' }}>
              {currentData.examTitle} 対策テキスト
            </span>
          </div>

          {/* 循环渲染章节下的内容小节 */}
          {currentData.chapters?.map((chapter) => (
            <div key={chapter.chapterId}>
              {chapter.sections.map((sec) => (
                <section 
                  id={sec.sectionId} 
                  key={sec.sectionId}
                  data-section-id={sec.sectionId}
                  style={{ 
                    marginBottom: '60px', 
                    scrollMarginTop: '120px' // 极其重要：防止点击跳转时被固定的 Header 挡住
                  }}
                >
                  {/* 小节主标题 */}
                  <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#111111', lineHeight: '1.4', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: '#c9a054' }}>{chapter.chapterNum} • {sec.sectionTitle}</span>
                    {sec.title}
                  </h2>
                  
                  {/* 正文大白话内容 */}
                  <p style={{ fontSize: '16.5px', lineHeight: '1.9', color: '#334155', marginBottom: '24px', whiteSpace: 'pre-line' }}>
                    {sec.content}
                  </p>

                  {/* 核心第一性原理提炼框（金黄色粗线暗示） */}
                  {sec.highlight && (
                    <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '8px', borderLeft: '4px solid #c9a054', margin: '28px 0' }}>
                      <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', fontWeight: '800', color: '#c9a054' }}>
                        {sec.highlight.title}
                      </h4>
                      <p style={{ margin: 0, fontSize: '14.5px', color: '#475569', lineHeight: '1.7', whiteSpace: 'pre-line' }}>
                        {sec.highlight.text}
                      </p>
                    </div>
                  )}
                </section>
              ))}
            </div>
          ))}

        </main>

      </div>

      {/* 在全局强制注入平滑滚动的极简垫片 */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>

    </div>
  );
}
