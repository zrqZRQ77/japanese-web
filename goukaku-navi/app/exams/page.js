"use client";

import React, { useState } from 'react';
import Link from 'next/link';

// 引入本地题库数据，确保路径在 Vercel 锁定根目录下绝对安全
import bokiData from '../../data/boki3.json';
import fpData from '../../data/fp3.json';

export default function ExamsPage() {
  const [currentExam, setCurrentExam] = useState('boki');
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showExplanations, setShowExplanations] = useState({});

  const questions = currentExam === 'boki' ? bokiData : fpData;

  const handleAnswerClick = (qIndex, optionLetter) => {
    if (selectedAnswers[qIndex]) return; 
    setSelectedAnswers(prev => ({ ...prev, [qIndex]: optionLetter }));
    setShowExplanations(prev => ({ ...prev, [qIndex]: true }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: '"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif' }}>
      
      {/* 原生风格顶部导航栏 */}
      <header style={{ background: '#ffffff', padding: '16px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', sticky: 'top', zIndex: 50, boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ display: 'inline-block', width: '4px', height: '18px', backgroundColor: '#0070f3', borderRadius: '2px' }}></span>
          <span style={{ fontWeight: '700', fontSize: '18px', color: '#0f172a', letterSpacing: '-0.025em' }}>資格試験ナビ</span>
        </div>
        <Link href="/" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px', fontWeight: '500', transition: 'color 0.2s' }}>
          トップページへ戻る
        </Link>
      </header>

      {/* 主体内容区 */}
      <main style={{ flex: 1, maxWidth: '720px', width: '100%', margin: '0 auto', padding: '40px 24px' }}>
        
        {/* 考试切换 Tab 选项卡 */}
        <div style={{ display: 'flex', background: '#e2e8f0', padding: '4px', borderRadius: '8px', marginBottom: '32px', gap: '4px' }}>
          <button 
            onClick={() => { setCurrentExam('boki'); setSelectedAnswers({}); setShowExplanations({}); }}
            style={{ flex: 1, padding: '10px 16px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', backgroundColor: currentExam === 'boki' ? '#ffffff' : 'transparent', color: currentExam === 'boki' ? '#0f172a' : '#64748b', border: 'none', borderRadius: '6px', boxShadow: currentExam === 'boki' ? '0 1px 3px 0 rgba(0, 0, 0, 0.1)' : 'none', transition: 'all 0.2s' }}
          >
            日商簿記3級 (仕訳)
          </button>
          <button 
            onClick={() => { setCurrentExam('fp'); setSelectedAnswers({}); setShowExplanations({}); }}
            style={{ flex: 1, padding: '10px 16px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', backgroundColor: currentExam === 'fp' ? '#ffffff' : 'transparent', color: currentExam === 'fp' ? '#0f172a' : '#64748b', border: 'none', borderRadius: '6px', boxShadow: currentExam === 'fp' ? '0 1px 3px 0 rgba(0, 0, 0, 0.1)' : 'none', transition: 'all 0.2s' }}
          >
            FP技能士3級
          </button>
        </div>

        {/* 页面大标题 */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', margin: '0 0 8px 0' }}>
            {currentExam === 'boki' ? '日商簿記3級 模擬試験' : 'FP技能士3級 模擬試験'}
          </h1>
          <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>選択肢をクリックすると、即座に正誤判定と詳細な解説が表示されます。</p>
        </div>

        {/* 题目卡片循环 */}
        {questions.map((q, index) => {
          const userAnswer = selectedAnswers[index];
          const isCorrect = userAnswer === q.correct_answer;

          return (
            <div key={index} style={{ background: '#ffffff', padding: '28px', borderRadius: '12px', marginBottom: '28px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)', border: '1px solid #e2e8f0', transition: 'transform 0.2s' }}>
              
              {/* 题号与分类标签 */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                <span style={{ background: '#0f172a', color: '#ffffff', padding: '4px 12px', fontSize: '12px', fontWeight: '700', borderRadius: '6px', letterSpacing: '0.05em' }}>
                  QUESTION {index + 1}
                </span>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <span style={{ color: '#475569', fontSize: '12px', fontWeight: '500', background: '#f1f5f9', padding: '4px 10px', borderRadius: '6px' }}>{q.category}</span>
                  <span style={{ color: '#0284c7', fontSize: '12px', fontWeight: '500', background: '#e0f2fe', padding: '4px 10px', borderRadius: '6px' }}>{q.difficulty}</span>
                </div>
              </div>
              
              {/* 题目文本 */}
              <p style={{ fontSize: '16px', lineHeight: '1.7', fontWeight: '600', color: '#1e293b', whiteSpace: 'pre-wrap', margin: '0 0 24px 0' }}>
                {q.question_text}
              </p>

              {/* 选项区域 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {q.options.map((opt) => {
                  const letter = opt.charAt(0); // 获取 A, B, C, D
                  const isCurrentOptSelected = userAnswer === letter;
                  const isCurrentOptCorrect = letter === q.correct_answer;

                  // 默认选项按钮样式
                  let btnStyle = {
                    padding: '14px 18px', textAlign: 'left', fontSize: '14.5px', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', cursor: 'pointer', width: '100%', fontWeight: '500', color: '#334155', transition: 'all 0.2s', outline: 'none'
                  };

                  // 用户点击后的状态染色逻辑
                  if (userAnswer) {
                    if (isCurrentOptCorrect) {
                      // 正确答案样式（优雅绿）
                      btnStyle.backgroundColor = '#f0fdf4';
                      btnStyle.borderColor = '#22c55e';
                      btnStyle.color = '#15803d';
                      btnStyle.fontWeight = '600';
                    } else if (isCurrentOptSelected && !isCorrect) {
                      // 用户选错的样式（警示红）
                      btnStyle.backgroundColor = '#fef2f2';
                      btnStyle.borderColor = '#ef4444';
                      btnStyle.color = '#b91c1c';
                      btnStyle.fontWeight = '600';
                    } else {
                      // 未选中的其他错误选项（淡化处理）
                      btnStyle.backgroundColor = '#ffffff';
                      btnStyle.borderColor = '#f1f5f9';
                      btnStyle.color = '#94a3b8';
                      btnStyle.cursor = 'not-allowed';
                    }
                  }

                  return (
                    <button 
                      key={opt} 
                      onClick={() => handleAnswerClick(index, letter)}
                      disabled={!!userAnswer}
                      style={btnStyle}
                      onMouseEnter={(e) => {
                        if (!userAnswer) {
                          e.currentTarget.style.borderColor = '#0070f3';
                          e.currentTarget.style.backgroundColor = '#f8fafc';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!userAnswer) {
                          e.currentTarget.style.borderColor = '#cbd5e1';
                          e.currentTarget.style.backgroundColor = '#ffffff';
                        }
                      }}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {/* 答案与白话详细解析 */}
              {showExplanations[index] && (
                <div style={{ marginTop: '24px', padding: '20px', background: '#f8fafc', borderLeft: '4px solid #0070f3', borderRadius: '0 8px 8px 0', borderTop: '1px solid #f1f5f9', borderRight: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9' }}>
                  <div style={{ fontWeight: '700', fontSize: '15px', color: isCorrect ? '#16a34a' : '#dc2626', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {isCorrect ? '⭕ 正解' : `❌ 不正解（正解は ${q.correct_answer}）`}
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>【解説】</div>
                  <p style={{ fontSize: '14px', color: '#334155', lineHeight: '1.7', margin: 0, whiteSpace: 'pre-wrap' }}>
                    {q.explanation}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </main>

      {/* 原生高质感页脚 */}
      <footer style={{ textAlign: 'center', padding: '24px', color: '#94a3b8', fontSize: '13px', borderTop: '1px solid #e2e8f0', background: '#ffffff', fontWeight: '500' }}>
        © 2026 資格試験ナビ. All Rights Reserved.
      </footer>
    </div>
  );
}
