"use client";

import React, { useState, useEffect } from 'react';
import Navbar from "../../../../components/Navbar";
// 🚀 核心改动：引入我们全新的独立文本数据库
import { examDatabase } from "../../../../data/examTexts";

export default function GuideHubPage() {
  const [mounted, setMounted] = useState(false);
  const examId = 'boki3'; // 固定的科目ID

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // 🎯 动态获取数据仓库中该科目下存在的所有章节
  const currentExamData = examDatabase[examId] || {};
  const chaptersList = Object.keys(currentExamData).map((key) => ({
    id: key,
    ...currentExamData[key]
  }));

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: '"Helvetica Neue", Arial, sans-serif' }}>
      <Navbar />
      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 16px' }}>
        
        {/* 头部标题区域 */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#0f172a', margin: 0 }}>
            学習ガイド ➔ 日商簿記3級
          </h1>
          <p style={{ fontSize: '14px', color: '#64748b', margin: '6px 0 0 0' }}>
            各章の解説テキストを読み、演習問題に挑戦して理解を深めましょう。
          </p>
        </div>

        {/* 章节列表 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {chaptersList.map((chapter) => (
            <div 
              key={chapter.id} 
              style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <div>
                <span style={{ fontSize: '11px', fontWeight: '800', color: '#b93a26', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  第 {chapter.num} 章
                </span>
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', margin: '4px 0 8px 0' }}>
                  {chapter.title}
                </h3>
                <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: '1.5' }}>
                  {/* 自动截取正文前40个字作为简介展示 */}
                  {Array.isArray(chapter.content) ? chapter.content[0].substring(0, 40) : chapter.content.substring(0, 40)}...
                </p>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginLeft: '24px' }}>
                <button 
                  onClick={() => window.location.href = `/exams/${examId}/guide/${chapter.id}`}
                  style={{ height: '38px', padding: '0 16px', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', fontWeight: '700', color: '#334155', cursor: 'pointer' }}
                >
                  解説テキスト
                </button>
                <button 
                  onClick={() => window.location.href = `/exams/${examId}/exercises?ch=${chapter.num}`}
                  style={{ height: '38px', padding: '0 16px', backgroundColor: '#fff5f5', border: '1px solid #fec2c2', borderRadius: '6px', fontSize: '13px', fontWeight: '700', color: '#b93a26', cursor: 'pointer' }}
                >
                  演習問題
                </button>
              </div>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}
