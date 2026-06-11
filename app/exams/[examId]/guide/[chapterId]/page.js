"use client";
import React, { useState, useEffect } from 'react';
import { examDatabase } from "../../../../../data/examTexts";

export default function UniversalChapterDetailPage() {
  const [mounted, setMounted] = useState(false);
  const [examId, setExamId] = useState('boki3');
  const [chapterId, setChapterId] = useState('ch1');

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const pathSegments = window.location.pathname.split('/');
      const examsIndex = pathSegments.indexOf('exams');
      if (examsIndex !== -1) {
        if (pathSegments[examsIndex + 1]) setExamId(pathSegments[examsIndex + 1].toLowerCase());
        if (pathSegments[examsIndex + 3]) setChapterId(pathSegments[examsIndex + 3].toLowerCase());
      }
    }
  }, []);

  if (!mounted) return null;

  const currentExamTexts = examDatabase[examId] || {};
  const currentChapter = currentExamTexts[chapterId] || { num: "1", title: "データなし", content: ["該当データがありません。"] };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: '"Helvetica Neue", Arial, sans-serif' }}>
      <nav style={{ height: '60px', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
        <div onClick={() => { window.location.href = '/exams'; }} style={{ fontSize: '18px', fontWeight: '900', color: '#b93a26', cursor: 'pointer' }}>
          <span>読解・簿記ラボ</span>
        </div>
      </nav>

      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '50px 24px' }}>
        <div style={{ marginBottom: '20px' }}>
          <button onClick={() => { window.location.href = `/exams/${examId}/guide`; }} style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>戻る ➔ ダッシュボード</button>
        </div>

        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '40px' }}>
          <div style={{ marginBottom: '32px', borderBottom: '2px solid #f1f5f9', paddingBottom: '16px' }}>
            <span style={{ fontSize: '12px', fontWeight: '800', color: '#b93a26' }}>第 {currentChapter.num} 章</span>
            <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#0f172a', margin: '6px 0 0 0' }}>{currentChapter.title}</h1>
          </div>

          <div style={{ fontSize: '15px', color: '#334155', lineHeight: '1.85' }}>
            {Array.isArray(currentChapter.content) ? (
              currentChapter.content.map((p, i) => <p key={i} style={{ marginBottom: '16px' }}>{p}</p>)
            ) : (
              <p style={{ whiteSpace: 'pre-line' }}>{currentChapter.content}</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
