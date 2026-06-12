"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
// 👇 1. 恢复正确的上一级路径
import { chaptersData } from '../chaptersData'; 

export default function UniversalExamGuide() {
  const params = useParams();
  
  // 👇 2. 核心修复：加上 as string，安抚 TypeScript 的类型审查
  const examId = (params.examId as string) || 'boki3';
  const ch = (params.ch as string) || 'ch1'; 

  // 👇 3. 加上 as any，防止 TypeScript 报错找不到索引
  const currentChapter = (chaptersData as any)[ch];

  if (!currentChapter) {
    return (
      <div style={{ padding: '60px 20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
        <h2 style={{ color: '#b93a26' }}>⚠️ 該当する章が見つかりません</h2>
        <p style={{ color: '#666666', marginTop: '10px' }}>章ID「{ch}」のコンテンツはまだ登録されていないか、準備中です。</p>
        <Link href={`/exams/${examId}/guide`} style={{ color: '#b93a26', fontWeight: 'bold' }}>章一覧に戻る</Link>
      </div>
    );
  }

  const menuItems = currentChapter.menuItems || [];
  const [activeSection, setActiveSection] = useState(menuItems[0]?.id || '');

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
  }, [menuItems]);

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
            章内の目次
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', borderLeft: '1px solid #e2e8f0' }}>
            {/* 👇 4. 给遍历项加上明确的类型 any */}
            {menuItems.map((item: any) => {
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
            <span style={{ color: '#b93a26', fontSize: '13px', fontWeight: '800', letterSpacing: '0.5px' }}>{currentChapter.chapterTag}</span>
            <h1 style={{ fontSize: '28px', fontWeight: '900', lineHeight: '1.4', margin: '6px 0 0 0', color: '#111111' }}>
              {currentChapter.chapterTitle}
            </h1>
          </div>

          {currentChapter.sections?.map((section: any) => (
            <section key={section.id} id={section.id} style={{ marginBottom: '50px', scrollMarginTop: '120px' }}>
              {section.title && (
                <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#111111', marginBottom: '16px', borderLeft: '4px solid #b93a26', paddingLeft: '12px' }}>
                  {section.title}
                </h2>
              )}
              
              {section.blocks?.map((block: any, index: number) => {
                if (block.type === 'text') {
                  return (
                    <p key={index} style={{ fontSize: '16.5px', lineHeight: '1.85', color: '#334155', marginBottom: '20px', fontWeight: block.bold ? '700' : '400' }}>
                      {block.content}
                    </p>
                  );
                }
                
                if (block.type === 'callout') {
                  const isRed = block.color === 'red';
                  return (
                    <div key={index} style={{ 
                      background: isRed ? '#fdf2f0' : '#f8fafc', 
                      padding: '24px', 
                      borderRadius: '8px', 
                      borderLeft: isRed ? '4px solid #b93a26' : '4px solid #c9a054', 
                      border: isRed ? '1px solid #fca5a5' : 'none',
                      margin: '24px 0' 
                    }}>
                      <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', fontWeight: '800', color: isRed ? '#b93a26' : '#c9a054' }}>
                        {block.title}
                      </h4>
                      <p style={{ margin: 0, fontSize: '14.5px', color: isRed ? '#334155' : '#475569', lineHeight: '1.75', whiteSpace: 'pre-line' }}>
                        {block.content}
                      </p>
                    </div>
                  );
                }

                if (block.type === 'list') {
                  return (
                    <ul key={index} style={{ paddingLeft: '20px', fontSize: '16px', lineHeight: '1.8', color: '#334155', marginBottom: '20px' }}>
                      {block.items?.map((item: string, i: number) => (
                        <li key={i} style={{ marginBottom: '8px' }} dangerouslySetInnerHTML={{ __html: item }} />
                      ))}
                    </ul>
                  );
                }

                return null;
              })}
            </section>
          ))}

          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '30px' }}>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: '800', color: '#111111' }}>🎯 知識の定着チェック</h4>
                <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>基礎知識を定着させるために、実際の仕訳問題に挑戦してみましょう。</p>
              </div>
              <Link href={`/exams/${examId}/exercises`} style={{ textDecoration: 'none' }}>
                <button style={{ backgroundColor: '#111111', color: '#ffffff', border: 'none', padding: '10px 18px', borderRadius: '6px', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>
                  練習問題を解く
                </button>
              </Link>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link href={`/exams/${examId}/guide`} style={{ textDecoration: 'none', color: '#64748b', fontSize: '14.5px', fontWeight: '600' }}>
                ← 章一覧（目次）に戻る
              </Link>
              {currentChapter.nextChapterId ? (
                <Link href={`/exams/${examId}/guide/${currentChapter.nextChapterId}`} style={{ textDecoration: 'none' }}>
                  <button style={{ backgroundColor: '#b93a26', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '6px', fontSize: '15px', fontWeight: '700', cursor: 'pointer' }}>
                    {currentChapter.nextChapterTitle} →
                  </button>
                </Link>
              ) : (
                <span style={{ color: '#94a3b8', fontSize: '14.5px' }}>これが最終章です</span>
              )}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
