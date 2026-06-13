import { getChapterData } from '../../../../data';

"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function DynamicChapterPage() {
  const params = useParams();
  
  // 1. 自动从网址捕捉当前的考试科目和章节
  // 例如网址是 /exams/boki3/guide/ch3
  const courseId = (params.courseId as string) || 'boki3';
  const chapterId = (params.chapterId as string) || 'ch1';

  // 2. 状态管理
  const [chapterData, setChapterData] = useState<any>(null);
  const [activeSection, setActiveSection] = useState('');
  const [error, setError] = useState(false);

  // 牛油果核心色系（模具统一管理）
  const colors = {
    avocado: '#7A9D54',       
    avocadoLight: '#F5F8F2',  
    textDark: '#111111',
    textGray: '#475569',
    textLightGray: '#94a3b8',
    border: '#e2e8f0',
    darkButton: '#2C3E20'     
  };

  // 3. 数据加载与状态更新
  useEffect(() => {
    // 确保参数存在
    if (!courseId || !chapterId) return;

    // 同步获取数据
    const data = getChapterData(courseId as string, chapterId as string);
    
    if (data) {
      setChapterData(data);
      // 默认选中第一个小节
      if (data.menuItems && data.menuItems.length > 0) {
        setActiveSection(data.menuItems[0].id);
      }
      setError(false);
    } else {
      console.error("找不到数据，请求的 key 是:", `${courseId}_${chapterId}`);
      setError(true);
    }
  }, [courseId, chapterId]);
  

  // 4. 滚动监听器 (负责右侧阅读时，左侧目录自动打高亮)
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

  // 如果找不到数据，显示优雅的加载或报错界面
  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">コンテンツの読み込みに失敗しました。URLを確認してください。</div>;
  }
  if (!chapterData) {
    return <div className="min-h-screen flex items-center justify-center text-[#7A9D54] font-bold">データを読み込み中...</div>;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: '"Helvetica Neue", Arial, sans-serif' }}>
      
      {/* 顶部通栏 */}
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

      {/* 页面主体：左侧动态导航 + 右侧动态内容 */}
      <div style={{ display: 'flex', maxWidth: '1200px', margin: '40px auto', background: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', overflow: 'hidden' }}>
        
        {/* 👈 左侧动态导航栏 */}
        <aside style={{ width: '280px', borderRight: `1px solid ${colors.border}`, padding: '30px 20px', flexShrink: 0 }}>
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: colors.textDark, marginBottom: '24px' }}>
            {chapterData.courseTitle}
          </h2>
          
          <div style={{ marginBottom: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '700', color: colors.avocado, marginBottom: '8px' }}>
              <span>進捗</span>
              <span>{chapterData.progress}%</span>
            </div>
            <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: `${chapterData.progress}%`, height: '100%', background: colors.avocado, borderRadius: '3px' }}></div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* 动态渲染所有章节列表 */}
            {chapterData.allChapters.map((ch: any) => {
            // idが数字ではない（例えば 'guide' など）場合はスキップ
              if (typeof ch.id !== 'number' && isNaN(Number(ch.id))) return null;
  
              if (ch.id < chapterData.chapterNum) {
                return (
                  <div key={ch.id} style={{ fontSize: '14px', fontWeight: '500', color: colors.textGray, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Link href={`/exams/${courseId}/guide/ch${ch.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>第{ch.id}章 {ch.title}</Link>
                    <span style={{ color: colors.avocado, fontWeight: 'bold' }}>✓ 完了</span>
                  </div>
                );
              } else if (ch.id === chapterData.chapterNum) {
                return (
                  <div key={ch.id}>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: colors.textDark, marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>第{ch.id}章 {ch.title}</span>
                      <span style={{ color: colors.avocado, fontSize: '18px' }}>•</span>
                    </div>
                    {/* 动态渲染本章的小节目录 */}
                    <div style={{ display: 'flex', flexDirection: 'column', borderLeft: `2px solid ${colors.border}`, marginLeft: '6px' }}>
                      {chapterData.menuItems.map((item: any) => {
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
                );
              } else {
                return (
                  <div key={ch.id} style={{ fontSize: '14px', fontWeight: '500', color: colors.textLightGray, padding: '8px 0' }}>
                    第{ch.id}章 {ch.title}
                  </div>
                );
              }
            })}
          </div>
        </aside>

        {/* 👉 右侧动态渲染内容区 */}
        <main style={{ flex: 1, padding: '40px 60px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', paddingBottom: '16px', borderBottom: `1px solid ${colors.border}` }}>
            <div style={{ fontSize: '13px', color: colors.textGray, fontWeight: '500' }}>
              第{chapterData.chapterNum}章 {chapterData.chapterTitle} <span style={{ margin: '0 8px' }}>&gt;</span> 
              <span style={{ color: colors.avocado, fontWeight: '700' }}>
                {chapterData.menuItems.find((item: any) => item.id === activeSection)?.label}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '12px', color: colors.textLightGray }}>
              <span style={{ cursor: 'pointer' }}>🔖</span>
              <span style={{ cursor: 'pointer' }}>⭐</span>
              <span style={{ cursor: 'pointer' }}>📤</span>
            </div>
          </div>

          {/* 🌟 【核心魔法】直接把 JSON 里的排版代码灌进来渲染 */}
          <div style={{ maxWidth: '680px' }}>
            {chapterData.sections.map((section: any) => (
              <section key={section.id} id={section.id} style={{ marginBottom: '60px', scrollMarginTop: '120px' }} dangerouslySetInnerHTML={{ __html: section.htmlContent }} />
            ))}
            
            {/* 底部动态翻页按钮 */}
            <div style={{ borderTop: `1px solid ${colors.border}`, paddingTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {chapterData.prevChapter ? (
                <Link href={`/exams/${courseId}/guide/${chapterData.prevChapter}`} style={{ textDecoration: 'none' }}>
                  <button style={{ backgroundColor: '#ffffff', color: colors.textDark, border: `1px solid ${colors.border}`, padding: '12px 20px', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    ← 前の項目
                  </button>
                </Link>
              ) : <div></div>}

              <Link href={`/exams/${courseId}`} style={{ textDecoration: 'none', color: colors.textGray, fontSize: '14px', fontWeight: '600' }}>
                章のトップに戻る
              </Link>

              {chapterData.nextChapter ? (
                <Link href={`/exams/${courseId}/guide/${chapterData.nextChapter}`} style={{ textDecoration: 'none' }}>
                  <button style={{ backgroundColor: colors.darkButton, color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    次の項目 →
                  </button>
                </Link>
              ) : (
                <Link href={`/exams/${courseId}`} style={{ textDecoration: 'none' }}>
                  <button style={{ backgroundColor: colors.darkButton, color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    🎉 コース修了
                  </button>
                </Link>
              )}
            </div>
          </div>
        </main>
      </div>
      <style jsx global>{` html { scroll-behavior: smooth; } `}</style>
    </div>
  );
}
