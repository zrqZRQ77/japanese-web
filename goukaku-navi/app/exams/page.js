"use client";

import React, { useState } from 'react';
import Link from 'next/link';

// 引入本地题库数据
import bokiData from '../../data/boki3.json';
import fpData from '../../data/fp3.json';

export default function ExamsPage() {
  const [currentExam, setCurrentExam] = useState('fp'); // 默认选中FP技能士3級
  const [currentIndex, setCurrentIndex] = useState(0); // 当前题目的索引
  const [selectedAnswers, setSelectedAnswers] = useState({}); // 记录每题用户的选择
  const [showExplanations, setShowExplanations] = useState({}); // 记录每题是否显示解析

  const questions = currentExam === 'boki' ? bokiData : fpData;
  const currentQuestion = questions[currentIndex] || null;

  const handleAnswerClick = (optionLetter) => {
    if (selectedAnswers[currentIndex]) return; // 答过之后不能重复点
    setSelectedAnswers(prev => ({ ...prev, [currentIndex]: optionLetter }));
    setShowExplanations(prev => ({ ...prev, [currentIndex]: true }));
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      alert('すべての問題が完了しました！');
    }
  };

  const handleTabChange = (examType) => {
    setCurrentExam(examType);
    setCurrentIndex(0);
    setSelectedAnswers({});
    setShowExplanations({});
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', fontFamily: '"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif' }}>
      
      {/* 像素级还原：顶部导航栏 */}
      <header style={{ background: '#ffffff', padding: '12px 40px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          {/* Logo 区域 */}
          <span style={{ fontWeight: '900', fontSize: '22px', color: '#111111', letterSpacing: '-0.5px' }}>
            合格<span style={{ color: '#b93a26' }}>ナビ</span>
          </span>
          {/* 中央菜单 */}
          <nav style={{ display: 'flex', gap: '24px', fontSize: '14px', color: '#666666' }}>
            <span style={{ cursor: 'pointer' }}>試験一覧</span>
            <span style={{ cursor: 'pointer', color: '#111111', fontWeight: '600' }}>練習問題</span>
            <span style={{ cursor: 'pointer' }}>学習ガイド</span>
            <span style={{ cursor: 'pointer' }}>AI質問</span>
          </nav>
        </div>
        <Link href="/" style={{ background: '#b93a26', color: '#ffffff', textDecoration: 'none', padding: '8px 16px', borderRadius: '4px', fontSize: '13px', fontWeight: '600' }}>
          無料で始める
        </Link>
      </header>

      {/* 考试切换二级 Tab */}
      <div style={{ maxWidth: '800px', margin: '24px auto 0 auto', padding: '0 20px', display: 'flex', background: '#f1f5f9', padding: '4px', borderRadius: '8px', gap: '4px' }}>
        <button 
          onClick={() => handleTabChange('boki')}
          style={{ flex: 1, padding: '10px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', backgroundColor: currentExam === 'boki' ? '#ffffff' : 'transparent', color: currentExam === 'boki' ? '#111111' : '#64748b', border: 'none', borderRadius: '6px', boxShadow: currentExam === 'boki' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}
        >
          日商簿記3級 (仕訳)
        </button>
        <button 
          onClick={() => handleTabChange('fp')}
          style={{ flex: 1, padding: '10px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', backgroundColor: currentExam === 'fp' ? '#ffffff' : 'transparent', color: currentExam === 'fp' ? '#111111' : '#64748b', border: 'none', borderRadius: '6px', boxShadow: currentExam === 'fp' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}
        >
          FP技能士3級
        </button>
      </div>

      {/* 主体做题区域 */}
      {currentQuestion && (
        <main style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
          
          {/* 题目文本区 */}
          <div style={{ fontSize: '18px', fontWeight: '600', color: '#111111', lineHeight: '1.6', marginBottom: '30px' }}>
            問 {currentIndex + 1}. {currentQuestion.question_text}
          </div>

          {/* 像素级还原：选项列表样式 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '35px' }}>
            {currentQuestion.options.map((opt, optIndex) => {
              const letter = opt.charAt(0); // 获取 A, B, C... 等作为内部逻辑判断
              const isCurrentSelected = selectedAnswers[currentIndex] === letter;
              const isCorrectAnswer = letter === currentQuestion.correct_answer;
              const hasAnswered = !!selectedAnswers[currentIndex];

              // 样式定义
              let containerStyle = {
                display: 'flex', alignItems: 'stretch', width: '100%', border: '1px solid #e5e7eb', borderRadius: '8px', backgroundColor: '#ffffff', cursor: 'pointer', transition: 'all 0.2s', overflow: 'hidden', textAlign: 'left'
              };
              let numberBoxStyle = {
                padding: '14px 20px', borderRight: '1px solid #e5e7eb', backgroundColor: '#ffffff', color: '#b93a26', fontWeight: '700', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center'
              };
              let textBoxStyle = {
                padding: '14px 20px', color: '#333333', fontSize: '15px', display: 'flex', alignItems: 'center', flex: 1, lineHeight: '1.5'
              };

              // 用户点击后的精确染色逻辑
              if (hasAnswered) {
                if (isCorrectAnswer) {
                  // 正解选项：淡绿底、绿边
                  containerStyle.backgroundColor = '#e6f4ea';
                  containerStyle.borderColor = '#34a853';
                  numberBoxStyle.backgroundColor = '#e6f4ea';
                  numberBoxStyle.borderRightColor = '#34a853';
                  numberBoxStyle.color = '#137333';
                  textBoxStyle.color = '#137333';
                } else if (isCurrentSelected) {
                  // 选错选项：淡红底、红边
                  containerStyle.backgroundColor = '#fce8e6';
                  containerStyle.borderColor = '#ea4335';
                  numberBoxStyle.backgroundColor = '#fce8e6';
                  numberBoxStyle.borderRightColor = '#ea4335';
                  numberBoxStyle.color = '#c5221f';
                  textBoxStyle.color = '#c5221f';
                } else {
                  // 其它未选选项置淡
                  containerStyle.opacity = 0.6;
                  containerStyle.cursor = 'not-allowed';
                }
              }

              return (
                <button
                  key={opt}
                  disabled={hasAnswered}
                  onClick={() => handleAnswerClick(letter)}
                  style={containerStyle}
                  onMouseEnter={(e) => {
                    if (!hasAnswered) e.currentTarget.style.borderColor = '#b93a26';
                  }}
                  onMouseLeave={(e) => {
                    if (!hasAnswered) e.currentTarget.style.borderColor = '#e5e7eb';
                  }}
                >
                  <div style={numberBoxStyle}>{optIndex + 1}</div>
                  <div style={textBoxStyle}>{opt.substring(2)}</div> 
                </button>
              );
            })}
          </div>

          {/* 像素级还原：正误判定与白话详细解析 */}
          {showExplanations[currentIndex] && (
            <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '30px', animation: 'fadeIn 0.3s ease' }}>
              
              {/* 正误提示 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '16px', fontWeight: '700', color: selectedAnswers[currentIndex] === currentQuestion.correct_answer ? '#34a853' : '#ea4335', marginBottom: '16px' }}>
                {selectedAnswers[currentIndex] === currentQuestion.correct_answer ? (
                  <span>✓ 正解</span>
                ) : (
                  <span>✗ 不正解</span>
                )}
              </div>

              {/* 经典淡灰底、左侧金黄粗线解析框 */}
              <div style={{ background: '#f8f9fa', borderLeft: '4px solid #c9a054', padding: '20px', borderRadius: '4px', marginBottom: '24px' }}>
                <p style={{ fontSize: '14.5px', color: '#444444', lineHeight: '1.7', margin: 0, whiteSpace: 'pre-wrap' }}>
                  {currentQuestion.explanation}
                </p>
              </div>

              {/* 下方联动控制区 */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '20px' }}>
                {/* AI 提问辅助按钮 */}
                <button style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#ffffff', border: '1px solid #cbd5e1', padding: '8px 16px', borderRadius: '6px', fontSize: '14px', color: '#334155', cursor: 'pointer', fontWeight: '500' }}>
                  🍵 AIにもっと詳しく聞く
                </button>

                {/* 下一题流转按钮 */}
                <button 
                  onClick={handleNextQuestion}
                  style={{ background: '#b93a26', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '6px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 2px 4px rgba(185,58,38,0.15)' }}
                >
                  次の問題へ →
                </button>
              </div>

            </div>
          )}
        </main>
      )}
    </div>
  );
}
