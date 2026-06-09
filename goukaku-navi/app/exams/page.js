"use client";

import React, { useState } from 'react';
import Link from 'next/link';
// 保留你原有的导航栏和页脚
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

import bokiData from '../../data/boki3.json';
import fpData from '../../data/fp3.json';

export default function ExamsPage() {
  const [currentExam, setCurrentExam] = useState('boki');
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showExplanations, setShowExplanations] = useState({});

  const questions = currentExam === 'boki' ? bokiData : fpData;

  const handleAnswerClick = (qIndex, optionLetter) => {
    if (selectedAnswers[qIndex]) return; // 答过之后不能重复点
    setSelectedAnswers(prev => ({ ...prev, [qIndex]: optionLetter }));
    setShowExplanations(prev => ({ ...prev, [qIndex]: true }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f5f7fa' }}>
      <Navbar />

      <main style={{ flex: 1, maxWidth: '800px', width: '100%', margin: '0 auto', padding: '40px 20px' }}>
        {/* 切换按钮 */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '30px' }}>
          <button 
            onClick={() => { setCurrentExam('boki'); setSelectedAnswers({}); setShowExplanations({}); }}
            style={{ padding: '12px 24px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer', backgroundColor: currentExam === 'boki' ? '#0070f3' : '#fff', color: currentExam === 'boki' ? '#fff' : '#333', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', transition: 'all 0.2s' }}
          >
            日商簿記3級 (仕訳)
          </button>
          <button 
            onClick={() => { setCurrentExam('fp'); setSelectedAnswers({}); setShowExplanations({}); }}
            style={{ padding: '12px 24px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer', backgroundColor: currentExam === 'fp' ? '#0070f3' : '#fff', color: currentExam === 'fp' ? '#fff' : '#333', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', transition: 'all 0.2s' }}
          >
            FP技能士3級 (2026年最新)
          </button>
        </div>

        <h1 style={{ fontSize: '24px', color: '#111', marginBottom: '25px', paddingBottom: '10px', borderBottom: '2px solid #e1e4e8' }}>
          {currentExam === 'boki' ? '日商簿記3級 模擬試験' : 'FP技能士3級 模擬試験'}
        </h1>

        {/* 题目循环 */}
        {questions.map((q, index) => {
          const userAnswer = selectedAnswers[index];
          const isCorrect = userAnswer === q.correct_answer;

          return (
            <div key={index} style={{ background: '#fff', padding: '25px', borderRadius: '12px', marginBottom: '25px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #e1e4e8' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                <span style={{ background: '#333', color: '#fff', padding: '4px 10px', fontSize: '12px', fontWeight: 'bold', borderRadius: '6px' }}>Q {index + 1}</span>
                <span style={{ color: '#666', fontSize: '13px', background: '#f0f2f5', padding: '4px 10px', borderRadius: '6px' }}>{q.category} · {q.difficulty}</span>
              </div>
              
              <p style={{ fontSize: '16px', lineHeight: '1.6', fontWeight: '600', color: '#222', whiteSpace: 'pre-wrap' }}>{q.question_text}</p>

              {/* 选项 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px' }}>
                {q.options.map((opt) => {
                  const letter = opt.charAt(0);
                  const isCurrentOptSelected = userAnswer === letter;
                  const isCurrentOptCorrect = letter === q.correct_answer;

                  let btnStyle = {
                    padding: '14px', textAlign: 'left', fontSize: '14px', borderRadius: '8px', border: '1px solid #d1d5db', backgroundColor: '#fff', cursor: 'pointer', transition: 'all 0.2s', width: '100%', fontWeight: '500'
                  };

                  if (userAnswer) {
                    if (isCurrentOptCorrect) {
                      btnStyle.backgroundColor = '#e6f4ea';
                      btnStyle.borderColor = '#34a853';
                      btnStyle.color = '#137333';
                    } else if (isCurrentOptSelected && !isCorrect) {
                      btnStyle.backgroundColor = '#fce8e6';
                      btnStyle.borderColor = '#ea4335';
                      btnStyle.color = '#c5221f';
                    }
                  }

                  return (
                    <button 
                      key={opt} 
                      onClick={() => handleAnswerClick(index, letter)}
                      disabled={!!userAnswer}
                      style={btnStyle}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {/* 答案与白话解析 */}
              {showExplanations[index] && (
                <div style={{ marginTop: '20px', padding: '15px 20px', background: '#f8f9fa', borderLeft: '4px solid #0070f3', borderRadius: '0 8px 8px 0' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '15px', color: isCorrect ? '#34a853' : '#ea4335', marginBottom: '8px' }}>
                    {isCorrect ? '⭕ 正解！' : `❌ 不正解（正解は ${q.correct_answer}）`}
                  </div>
                  <p style={{ fontSize: '14px', color: '#444', lineHeight: '1.6', margin: 0 }}>{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </main>

      <Footer />
    </div>
  );
}
