"use client";

import React, { useState, useEffect } from 'react';
import Navbar from "../../../../../components/Navbar";
// 🚀 核心逻辑：直接去根目录的数据大仓库提取纯净的教材日语文本
import { examDatabase } from "../../../../../data/examTexts";

export default function UniversalChapterDetailPage() {
  const [mounted, setMounted] = useState(false);
  const [examId, setExamId] = useState('boki3'); // 默认兜底科目
  const [chapterId, setChapterId] = useState('ch1'); // 默认兜底章节

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      // 🎯 智能解析：自动切分网址路径，提取科目代码和章节代码
      // 例如路径为 /exams/boki3/guide/ch5 时：
      const pathSegments = window.location.pathname.split('/');
      const examsIndex = pathSegments.indexOf('exams');
      
      if (examsIndex !== -1) {
        if (pathSegments[examsIndex + 1]) {
          setExamId(pathSegments[examsIndex + 1].toLowerCase());
        }
        if (pathSegments[examsIndex + 3]) {
          setChapterId(pathSegments[examsIndex + 3].toLowerCase());
        }
      }
    }
  }, []);

  if (!mounted) return null;

  // 根据当前动态解析出的科目和章节，去数据仓库精准捞取文本
  const currentExamTexts = examDatabase[examId] || {};
  const currentChapter = currentExamTexts[chapterId] || {
    num: "1",
    title: "教材データが見つかりません",
    content: ["該当する章の教材テキストがデータベースに登録されていないか、パスが正しくありません。"]
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: '"Helvetica Neue", Arial, sans-serif' }}>
      <Navbar />
      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '50px 24px' }}>
        
        {/* 返回按钮：动态返回当前科目的列表大本营 */}
        <div style={{ marginBottom: '20px' }}>
          <button 
            onClick={() => { if (typeof window !== 'undefined') window.location.href = `/exams/${examId}/guide`; }}
            style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '13px', fontWeight: '700', cursor: 'pointer', padding: 0 }}
          >
            戻る ➔ ダッシュボード
          </button>
        </div>

        {/* 精美白底卡片容器 */}
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '40px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.01)' }}>
          
          {/* 章节标题区域 */}
          <div style={{ marginBottom: '32px', borderBottom: '2px solid #f1f5f9', paddingBottom: '16px' }}>
            <span style={{ fontSize: '12px', fontWeight: '800', color: '#b93a26', letterSpacing: '1px' }}>
              第 {currentChapter.num} 章
            </span>
            <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#0f172a', margin: '6px 0 0 0', lineHeight: '1.4' }}>
              {currentChapter.title}
            </h1>
          </div>

          {/* 教材正文：智能兼容单条字符串或数组多段落，提供最舒适的日语排版阅读间距 */}
          <div style={{ fontSize: '15px', color: '#334155', lineHeight: '1.85', letterSpacing: '0.2px' }}>
            {Array.isArray(currentChapter.content) ? (
              currentChapter.content.map((paragraph, index) => (
                <p key={index} style={{ marginBottom: '16px' }}>{paragraph}</p>
              ))
            ) : (
              <p style={{ whiteSpace: 'pre-line' }}>{currentChapter.content}</p>
            )}
          </div>

          {/* 底部引导做题区域 */}
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