"use client";

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// 📡 静态引入两个学科的 JSON 数据
import bokiData from '../../../../data/boki3_guide.json';
import fpData from '../../../../data/fp3_guide.json';

export default function ExamGuide() {
  const params = useParams();
  const examId = params.examId || 'boki3'; 

  // 🎯 动态感知与分流读取：根据 URL 是 boki3 还是 fp3，自动换血
  const currentData = examId.includes('fp') ? fpData : bokiData;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', fontFamily: '"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", Meiryo, sans-serif', color: '#111111' }}>
      
      {/* 統一感のあるナビゲーションバー */}
      <header style={{ background: '#ffffff', padding: '16px 40px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ fontWeight: '900', fontSize: '22px', color: '#111111', textDecoration: 'none' }}>
          合格<span style={{ color: '#b93a26' }}>ナビ</span>
        </Link>
        <Link href={`/exams/${examId}`} style={{ color: '#666666', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>
          ← ダッシュボードに戻る
        </Link>
      </header>

      {/* 没入型読書のための黄金幅：最大720px */}
      <main style={{ maxWidth: '720px', margin: '0 auto', padding: '60px 20px' }}>
        
        {/* 記事ヘッダー（动态数据注入） */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ fontSize: '14px', fontWeight: '700', color: '#b93a26', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            {currentData.examTitle} / {currentData.chapterTitle}
          </div>
          <h1 style={{ fontSize: '30px', fontWeight: '900', lineHeight: '1.4', margin: '0 0 16px 0', color: '#111111' }}>
            {currentData.articleTitle}
          </h1>
          <div style={{ fontSize: '14px', color: '#64748b' }}>
            更新日: 2026年6月 • 精読時間: 約 5 分
          </div>
        </div>

        {/* 記事本文 */}
        <section style={{ fontSize: '16.5px', lineHeight: '1.8', color: '#334155' }}>
          <p style={{ marginBottom: '24px' }}>
            {currentData.intro}
          </p>
          
          <p style={{ marginBottom: '24px', fontWeight: '700', color: '#111111' }}>
            {currentData.leadText}
          </p>

          <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#111111', marginTop: '40px', marginBottom: '16px', borderLeft: '4px solid #b93a26', paddingLeft: '12px' }}>
            {currentData.sectionTitle1}
          </h2>
          <p style={{ marginBottom: '24px' }}>
            {currentData.sectionContent1}
          </p>

          {/* 大白話（噛み砕き）ビジネス論理ボックス */}
          <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '8px', borderLeft: '4px solid #c9a054', marginBottom: '28px' }}>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '700', color: '#c9a054' }}>{currentData.highlightTitle}</h4>
            <p style={{ margin: 0, fontSize: '15px', color: '#475569', lineHeight: '1.7', whiteSpace: 'pre-line' }}>
              {currentData.highlightContent}
            </p>
          </div>

          <p style={{ marginBottom: '24px' }}>
            {currentData.listIntro}
          </p>

          {/* 🔗 动态渲染可点击的超链接词汇 */}
          <ul style={{ paddingLeft: '20px', marginBottom: '24px' }}>
            {currentData.wikiConcepts.map((concept) => (
              <li key={concept.conceptId} style={{ marginBottom: '12px' }}>
                精読キーワード：
                <Link href={`#${concept.conceptId}`} style={{ color: '#b93a26', fontWeight: '700', textDecoration: 'underline', margin: '0 4px' }}>
                  {concept.conceptName}
                </Link>
              </li>
            ))}
          </ul>

          <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#111111', marginTop: '48px', marginBottom: '16px', borderLeft: '4px solid #b93a26', paddingLeft: '12px' }}>
            {currentData.sectionTitle2}
          </h2>
          <p style={{ marginBottom: '24px' }}>
            {currentData.sectionContent2}
          </p>

          {/* 📚 动态渲染底部对应的名词解释锚点卡片 */}
          <div style={{ marginTop: '48px', borderTop: '2px dashed #e2e8f0', paddingTop: '24px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#111111', marginBottom: '24px' }}>{currentData.conceptsTitle}</h3>
            
            {currentData.wikiConcepts.map((concept) => (
              <div id={concept.conceptId} key={concept.conceptId} style={{ marginTop: '24px', padding: '24px', background: '#fdf2f0', borderRadius: '8px', border: '1px solid #fca5a5', scrollMarginTop: '100px' }}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '17px', fontWeight: '800', color: '#b93a26' }}>{concept.conceptName}</h4>
                <p style={{ margin: 0, fontSize: '15px', color: '#334155', lineHeight: '1.6' }}>
                  {concept.description}
                </p>
              </div>
            ))}
          </div>

        </section>

      </main>
    </div>
  );
}
