"use client";

import React, { useState, useEffect } from 'react';
import Navbar from "../../../../components/Navbar";
// 🚀 核心改动：引入独立的数据仓库
import { quizDatabase } from "../../../../data/examQuizzes";

export default function ExercisesPage() {
  const [mounted, setMounted] = useState(false);
  const [examId, setExamId] = useState('boki3');
  const [targetChapter, setTargetChapter] = useState(null);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const pathSegments = window.location.pathname.split('/');
      const examsIndex = pathSegments.indexOf('exams');
      if (examsIndex !== -1 && pathSegments[examsIndex + 1]) {
        setExamId(pathSegments[examsIndex + 1].toLowerCase());
      }
      const searchParams = new URLSearchParams(window.location.search);
      const chParam = searchParams.get('ch');
      if (chParam) setTargetChapter(chParam);
    }
  }, []);

  // 🎯 从统一仓库里读取对应科目的题目
  const allExamQuestions = quizDatabase[examId] || quizDatabase['boki3'];

  const filteredQuestions = targetChapter 
    ? allExamQuestions.filter(q => q.ch === targetChapter)
    : allExamQuestions;

  if (!mounted) return null;

  if (filteredQuestions.length === 0) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
        <Navbar />
        <div style={{ maxWidth: '600px', margin: '80px auto', textAlign: 'center', padding: '24px' }}>
          <p style={{ color: '#64748b', fontSize: '16px', fontWeight: '700' }}>現在、指定された章の演習問題は準備中です。</p>
          <button onClick={() => window.history.back()} style={{ marginTop: '20px', padding: '8px 16px', backgroundColor: '#b93a26', color: '#ffffff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '700' }}>戻る</button>
        </div>
      </div>
    );
  }

  const currentQuestion = filteredQuestions[currentQuestionIndex];

  const handleOptionClick = (optionIndex) => {
    if (isAnswered) return;
    setSelectedAnswer(optionIndex);
    setIsAnswered(true);
    if (optionIndex === currentQuestion.ans) setScore(score + 1);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: '"Helvetica Neue", Arial, sans-serif' }}>
      <Navbar />
      <main style={{ maxWidth: '700px', margin: '0 auto', padding: '40px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
          <div>
            <span style={{ fontSize: '12px', fontWeight: '800', color: '#b93a26', backgroundColor: '#fff5f5', padding: '3px 8px', borderRadius: '4px' }}>
              {targetChapter ? `第 ${targetChapter} 章 限定演習` : '総合演習モード'}
            </span>
            <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', margin: '6px 0 0 0' }}>一問一答・スピード演習</h2>
          </div>
          {currentQuestionIndex < filteredQuestions.length && (
            <div style={{ fontSize: '14px', fontWeight: '700', color: '#475569' }}>
              <span style={{ fontSize: '20px', color: '#b93a26', fontWeight: '900' }}>{currentQuestionIndex + 1}</span> / {filteredQuestions.length} 問目
            </div>
          )}
        </div>

        {currentQuestionIndex < filteredQuestions.length ? (
          <div>
            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '28px', marginBottom: '20px' }}>
              <p style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b', margin: 0, lineHeight: '1.6' }}>{currentQuestion.q}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {currentQuestion.options.map((option, idx) => {
                let btnBgColor = '#ffffff'; let btnBorderColor = '#e2e8f0'; let btnTextColor = '#334155';
                if (isAnswered) {
                  if (idx === currentQuestion.ans) { btnBgColor = '#ecfdf5'; btnBorderColor = '#10b981'; btnTextColor = '#065f46'; }
                  else if (selectedAnswer === idx) { btnBgColor = '#fef2f2'; btnBorderColor = '#ef4444'; btnTextColor = '#991b1b'; }
                  else { btnBgColor = '#ffffff'; btnBorderColor = '#f1f5f9'; btnTextColor = '#94a3b8'; }
                }
                return (
                  <button key={idx} onClick={() => handleOptionClick(idx)} disabled={isAnswered} style={{ width: '100%', padding: '18px 24px', backgroundColor: btnBgColor, border: `1px solid ${btnBorderColor}`, borderRadius: '8px', fontSize: '15px', fontWeight: '700', color: btnTextColor, textAlign: 'left', cursor: isAnswered ? 'default' : 'pointer', transition: 'all 0.15s ease', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>{idx + 1}. &nbsp; {option}</span>
                    {isAnswered && idx === currentQuestion.ans && <span style={{ color: '#10b981', fontSize: '16px' }}>✓ 正解</span>}
                    {isAnswered && selectedAnswer === idx && selectedAnswer !== currentQuestion.ans && <span style={{ color: '#ef4444', fontSize: '16px' }}>✗ 不正解</span>}
                  </button>
                );
              })}
            </div>
            {isAnswered && (
              <div style={{ marginTop: '24px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderLeft: '4px solid #b93a26', borderRadius: '8px', padding: '24px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: '900', color: '#b93a26', margin: '0 0 8px 0' }}>📝 解説</h4>
                <p style={{ fontSize: '13.5px', color: '#475569', margin: '0 0 20px 0', lineHeight: '1.6' }}>{currentQuestion.hint}</p>
                <button onClick={handleNextQuestion} style={{ width: '100%', height: '46px', backgroundColor: '#0f172a', color: '#ffffff', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>
                  {currentQuestionIndex + 1 === filteredQuestions.length ? '結果を確認する' : '次の問題へ ➔'}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '40px 32px', textAlign: 'center' }}>
            <span style={{ fontSize: '48px' }}>🏆</span>
            <h3 style={{ fontSize: '22px', fontWeight: '900', color: '#0f172a', margin: '16px 0 8px 0' }}>演習終了</h3>
            <div style={{ width: '160px', height: '160px', borderRadius: '50%', backgroundColor: '#fff5f5', margin: '0 auto 32px auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '2px dashed #fee2e2' }}>
              <span style={{ fontSize: '12px', fontWeight: '800', color: '#64748b' }}>正解率</span>
              <span style={{ fontSize: '32px', fontWeight: '900', color: '#b93a26', margin: '4px 0' }}>{score} / {filteredQuestions.length}</span>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => { if (typeof window !== 'undefined') window.location.href = `/exams/${examId}/guide`; }} style={{ flex: 1, height: '46px', backgroundColor: '#f1f5f9', color: '#334155', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>ダッシュボードに戻る</button>
              <button onClick={handleReset} style={{ flex: 1, height: '46px', backgroundColor: '#b93a26', color: '#ffffff', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>もう一度挑戦する</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
