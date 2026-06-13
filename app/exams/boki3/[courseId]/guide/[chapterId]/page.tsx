"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
// 使用最稳妥的路径引入数据，规避一切类型检查
// @ts-ignore
import { getChapterData } from '@/data/index.js';

export default function DynamicChapterPage() {
  const params = useParams();
  const courseId = params.courseId as string;
  const chapterId = params.chapterId as string;

  const [chapterData, setChapterData] = useState<any>(null);
  const [activeSection, setActiveSection] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  // 1. 获取解耦后的纯数据
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

  // 2. 滚动监听
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
        <p style={{ color: '#ef4444', fontWeight: 'bold' }}>データが見つかりません。({courseId} / {chapterId})</p>
        <Link href="/" style={{ color: colors.avocado, textDecoration: 'none' }}>ホームに戻る</Link>
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
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: '"Helvetica Neue", Arial, sans-serif' }}>
      
      {/* 顶栏 */}
      <header style={{ background: '#ffffff', padding: '16px 40px', borderBottom: `1px solid ${colors.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href="/" style={{ fontWeight: '900', fontSize: '22px', color: colors.textDark, textDecoration: 'none' }}>
            合格<span style={{ color: colors.avocado }}>ナビ</span>
          </Link>
        </div>
        <Link href="/" style={{ color: colors.textGray, textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>
          ← ダッシュボードに戻る
        </Link>
      </header>

      {/* 主体架构 */}
      <div style={{ display: 'flex', maxWidth: '1200px', margin: '40px auto', background: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', overflow: 'hidden', alignItems: 'flex-start' }}>
        
        {/* 左侧大纲导航 */}
        <aside style={{ width: '280px', borderRight: `1px solid ${colors.border}`, padding: '30px 20px', flexShrink: 0, position: 'sticky', top: '70px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '800', color: colors.textDark, marginBottom: '24px' }}>学習ガイド</h2>
          
          <div style={{ marginBottom: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '700', color: colors.avocado, marginBottom: '8px' }}>
              <span>全体進捗</span><span>{chapterData.progress}%</span>
            </div>
            <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: `${chapterData.progress}%`, height: '100%', background: colors.avocado, borderRadius: '3px' }}></div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {chapterData.allChapters.map((ch: any) => {
              const isCurrentChapter = ch.id === chapterId;
              return (
                <div key={ch.id}>
                  <div style={{ fontSize: '14px', fontWeight: isCurrentChapter ? '700' : '500', color: isCurrentChapter ? colors.textDark : colors.textLightGray, transition: 'color 0.2s' }}>
                    <Link href={`/exams/boki3/${courseId}/guide/${ch.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      {ch.title}
                    </Link>
                  </div>
                  {isCurrentChapter && (
                    <div style={{ display: 'flex', flexDirection: 'column', borderLeft: `2px solid ${colors.border}`, marginLeft: '6px', marginTop: '10px' }}>
                      {chapterData.menuItems.map((item: any) => {
                        const isCurrentSection = activeSection === item.id;
                        return (
                          <a key={item.id} href={`#${item.id}`} style={{ padding: '10px 0 10px 16px', fontSize: '13px', textDecoration: 'none', color: isCurrentSection ? colors.avocado : colors.textGray, fontWeight: isCurrentSection ? '700' : '500', borderLeft: isCurrentSection ? `2px solid ${colors.avocado}` : '2px solid transparent', marginLeft: '-2px', transition: 'all 0.2s' }}>
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

        {/* 右侧内容渲染区 */}
        <main style={{ flex: 1, padding: '40px 60px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', paddingBottom: '16px', borderBottom: `1px solid ${colors.border}` }}>
            <div style={{ fontSize: '13px', color: colors.textGray, fontWeight: '500' }}>
              第{chapterData.chapterNum}章 {chapterData.chapterTitle} <span style={{ margin: '0 8px', color: colors.textLightGray }}>&gt;</span> 
              <span style={{ color: colors.avocado, fontWeight: '700' }}>
                {chapterData.menuItems.find((item: any) => item.id === activeSection)?.label || ''}
              </span>
            </div>
          </div>

          <div style={{ maxWidth: '680px' }}>
            {chapterData.sections.map((sec: any) => (
              <section key={sec.id} id={sec.id} style={{ marginBottom: '60px', scrollMarginTop: '120px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: '800', color: colors.textDark, marginBottom: '24px', letterSpacing: '-0.02em' }}>{sec.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: sec.content }} />
              </section>
            ))}
            
            <div style={{ borderTop: `1px solid ${colors.border}`, paddingTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '60px' }}>
              {chapterData.prevChapter ? (
                <Link href={`/exams/boki3/${courseId}/guide/${chapterData.prevChapter}`} style={{ textDecoration: 'none' }}>
                  <button style={{ backgroundColor: '#ffffff', color: colors.textDark, border: `1px solid ${colors.border}`, padding: '12px 20px', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
                    ← 前の項目
                  </button>
                </Link>
              ) : <div />}
              {chapterData.nextChapter ? (
                <Link href={`/exams/boki3/${courseId}/guide/${chapterData.nextChapter}`} style={{ textDecoration: 'none' }}>
                  <button style={{ backgroundColor: colors.darkButton, color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
                    次の項目 →
                  </button>
                </Link>
              ) : <span style={{ color: colors.textLightGray, fontSize: '14px', fontWeight: '600' }}>これが最終章です 🎉</span>}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
