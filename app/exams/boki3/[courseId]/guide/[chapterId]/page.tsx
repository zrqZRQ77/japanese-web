"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getChapterData } from '@/data';

interface MenuItem {
  id: string;
  label: string;
}

interface Section {
  id: string;
  title: string;
  content: string;
}

interface ChapterInfo {
  id: string;
  title: string;
}

interface ChapterData {
  chapterNum: number;
  chapterTitle: string;
  progress: number;
  menuItems: MenuItem[];
  sections: Section[];
  allChapters: ChapterInfo[];
  prevChapter: string | null;
  nextChapter: string | null;
}

export default function DynamicChapterPage() {
  const params = useParams();
  const courseId = params.courseId as string;
  const chapterId = params.chapterId as string;

  const [chapterData, setChapterData] = useState<ChapterData | null>(null);
  const [activeSection, setActiveSection] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  // 1. 根据动态路由，纯净加载对应数据
  useEffect(() => {
    if (!courseId || !chapterId) return;

    const data = getChapterData(courseId, chapterId);
    if (data) {
      setChapterData(data);
      if (data.menuItems && data.menuItems.length > 0) {
        setActiveSection(data.menuItems[0].id);
      }
      setError(false);
    } else {
      setError(true);
    }
  }, [courseId, chapterId]);

  // 2. 监听滚动自动点亮左侧小节导航
  useEffect(() => {
    if (!chapterData) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;
      for (const item of chapterData.menuItems) {
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
  }, [chapterData]);

  // 专属牛油果色系板式调色盘
  const colors = {
    avocado: '#7A9D54',
    avocadoLight: '#F5F8F2',
    textDark: '#111111',
    textGray: '#475569',
    textLightGray: '#94a3b8',
    border: '#e2e8f0',
    darkButton: '#2C3E20'
  };

  if (error) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
        <p style={{ color: '#ef4444', fontWeight: 'bold' }}>未找到相关的章节教程数据</p>
        <Link href="/" style={{ color: colors.avocado, textDecoration: 'none' }}>返回主页</Link>
      </div>
    );
  }

  if (!chapterData) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.avocado, fontWeight: 'bold' }}>
        データを読み込み中...
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: '"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", Meiryo, sans-serif' }}>
      
      {/* 顶部导航栏 */}
      <header style={{ background: '#ffffff', padding: '16px 40px', borderBottom: `1px solid ${colors.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href="/" style={{ fontWeight: '900', fontSize: '22px', color: colors.textDark, textDecoration: 'none' }}>
            合格<span style={{ color: colors.avocado }}>ナビ</span>
          </Link>
        </div>
        <Link href={`/exams/${courseId}`} style={{ color: colors.textGray, textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>
          ← ダッシュボードに戻る
        </Link>
      </header>

      {/* 主体两栏布局 */}
      <div style={{ display: 'flex', maxWidth: '1200px', margin: '40px auto', background: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        
        {/* 左侧大纲与小节联动侧边栏 */}
        <aside style={{ width: '280px', borderRight: `1px solid ${colors.border}`, padding: '30px 20px', flexShrink: 0, backgroundColor: '#ffffff' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '800', color: colors.textDark, marginBottom: '24px' }}>学習ガイド</h2>
          
          {/* 进度条 */}
          <div style={{ marginBottom: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '700', color: colors.avocado, marginBottom: '8px' }}>
              <span>章進捗</span>
              <span>{chapterData.progress}%</span>
            </div>
            <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: `${chapterData.progress}%`, height: '100%', background: colors.avocado, borderRadius: '3px' }}></div>
            </div>
          </div>

          {/* 动态章节目录结构 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {chapterData.allChapters.map((ch) => {
              const isCurrentChapter = ch.id === chapterId;
              return (
                <div key={ch.id}>
                  <div style={{ fontSize: '14px', fontWeight: isCurrentChapter ? '700' : '500', color: isCurrentChapter ? colors.textDark : colors.textLightGray, transition: 'color 0.2s' }}>
                    <Link href={`/exams/${courseId}/guide/${ch.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      {ch.title}
                    </Link>
                  </div>
                  
                  {/* 如果是当前活动章节，展开小节内描点 */}
                  {isCurrentChapter && (
                    <div style={{ display: 'flex', flexDirection: 'column', borderLeft: `2px solid ${colors.border}`, marginLeft: '6px', marginTop: '10px' }}>
                      {chapterData.menuItems.map((item) => {
                        const isCurrentSection = activeSection === item.id;
                        return (
                          <a
                            key={item.id}
                            href={`#${item.id}`}
                            style={{
                              padding: '10px 0 10px 16px',
                              fontSize: '13px',
                              textDecoration: 'none',
                              color: isCurrentSection ? colors.avocado : colors.textGray,
                              fontWeight: isCurrentSection ? '700' : '500',
                              borderLeft: isCurrentSection ? `2px solid ${colors.avocado}` : '2px solid transparent',
                              marginLeft: '-2px',
                              transition: 'all 0.2s',
                              scrollBehavior: 'smooth'
                            }}
                          >
                            {item.label}
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </aside>

        {/* 右侧核心正文渲染区 */}
        <main style={{ flex: 1, padding: '40px 60px' }}>
          
          {/* 面包屑导航 */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', paddingBottom: '16px', borderBottom: `1px solid ${colors.border}` }}>
            <div style={{ fontSize: '13px', color: colors.textGray, fontWeight: '500' }}>
              第{chapterData.chapterNum}章 {chapterData.chapterTitle} <span style={{ margin: '0 8px', color: colors.textLightGray }}>&gt;</span> 
              <span style={{ color: colors.avocado, fontWeight: '700' }}>
                {chapterData.menuItems.find(item => item.id === activeSection)?.label || ''}
              </span>
            </div>
          </div>

          {/* 循环渲染小节 */}
          <div style={{ maxWidth: '680px' }}>
            {chapterData.sections.map((sec) => (
              <section key={sec.id} id={sec.id} style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: '800', color: colors.textDark, marginBottom: '24px', letterSpacing: '-0.02em' }}>
                  {sec.title}
                </h1>
                <div dangerouslySetInnerHTML={{ __html: sec.content }} />
              </section>
            ))}
            
            {/* 底部前后章节翻页控制组件 */}
            <div style={{ borderTop: `1px solid ${colors.border}`, paddingTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '60px' }}>
              {chapterData.prevChapter ? (
                <Link href={`/exams/${courseId}/guide/${chapterData.prevChapter}`} style={{ textDecoration: 'none' }}>
                  <button style={{ backgroundColor: '#ffffff', color: colors.textDark, border: `1px solid ${colors.border}`, padding: '12px 20px', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}>
                    ← 前の項目
                  </button>
                </Link>
              ) : <div />}

              <Link href={`/exams/${courseId}/guide`} style={{ textDecoration: 'none', color: colors.textGray, fontSize: '14px', fontWeight: '600' }}>
                章のトップに戻る
              </Link>

              {chapterData.nextChapter ? (
                <Link href={`/exams/${courseId}/guide/${chapterData.nextChapter}`} style={{ textDecoration: 'none' }}>
                  <button style={{ backgroundColor: colors.darkButton, color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}>
                    次の項目 →
                  </button>
                </Link>
              ) : (
                <span style={{ color: colors.textLightGray, fontSize: '14px', fontWeight: '600' }}>これが最終章です 🎉</span>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
