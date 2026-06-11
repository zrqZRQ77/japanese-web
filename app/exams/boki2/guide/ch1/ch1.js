"use client";

import React, { useState, useEffect } from 'react';
import Navbar from "../../../../../components/Navbar";
// 🚀 核心修复：直接从根目录的数据仓库引入文本数据
import { examDatabase } from "../../../../../data/examTexts";

export default function Boki2Chapter1Page() {
  const [mounted, setMounted] = useState(false);
  
  // 🎯 固定定位到簿记2级（boki2）的第1章（ch1）
  const examId = 'boki2';
  const chapterId = 'ch1';

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentExamTexts = examDatabase[examId] || {};
  const currentChapter = currentExamTexts[chapterId] || {
    num: "1",
    title: "株式会社の会計・純資産の部",
    content: ["教材データが読み込めませんでした。"]
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: '"Helvetica Neue", Arial, sans-serif' }}>
      <Navbar />
      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '50px 24px' }}>
        
        <div style={{ marginBottom: '20px' }}>
          <button 
            onClick={() => { if (typeof window !== 'undefined') window.location.href = `/exams/${examId}/guide`; }}
            style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '13px', fontWeight: '700', cursor: 'pointer', padding: 0 }}
          >
            戻る ➔ ダッシュボード
          </button>
        </div>

        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '40px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.01)' }}>
          
          <div style={{ marginBottom: '32px', borderBottom: '2px solid #f1f5f9', paddingBottom: '16px' }}>
            <span style={{ fontSize: '12px', fontWeight: '800', color: '#b93a26', letterSpacing: '1px' }}>
              第 {currentChapter.num} 章
            </span>
            <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#0f172a', margin: '6px 0 0 0', lineHeight: '1.4' }}>
              {currentChapter.title}
            </h1>
          </div>

          {/* 📖 智能解析数组，展示排版优化的教材内容 */}
          <div style={{ fontSize: '15px', color: '#334155', lineHeight: '1.85', letterSpacing: '0.2px' }}>
            {Array.isArray(currentChapter.content) ? (
              currentChapter.content.map((paragraph, index) => (
                <p key={index} style={{ marginBottom: '16px' }}>{paragraph}</p>
              ))
            ) : (
              <p style={{ whiteSpace: 'pre-line' }}>{currentChapter.content}</p>
            )}
          </div>

          <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '2px dashed #e2e8f0', textAlign: 'center' }}>
            <p style={{ fontSize: '13.5px', color: '#64748b', fontWeight: '700', marginBottom: '16px' }}>
              🎉 お疲れ様でした！第 {currentChapter.num} 章の解説を読み終えました。
            </p>
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.location.href = `/exams/${examId}/exercises?ch=${currentChapter.num}`;
                }
              }}
              style={{ padding: '0 32px', height: '48px', backgroundColor: '#b93a26', color: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 12px rgba(185, 58, 38, 0.15)' }}
            >
              この章の演習問題に進む ➔
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}