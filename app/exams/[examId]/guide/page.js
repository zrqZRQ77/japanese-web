"use client";
import React, { useState, useEffect } from 'react';
import { examDatabase } from "../../../../data/examTexts";

export default function UniversalGuideHubPage() {
  const [mounted, setMounted] = useState(false);
  const [examId, setExamId] = useState('boki3');

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const pathSegments = window.location.pathname.split('/');
      const examsIndex = pathSegments.indexOf('exams');
      if (examsIndex !== -1 && pathSegments[examsIndex + 1]) {
        setExamId(pathSegments[examsIndex + 1].toLowerCase());
      }
    }
  }, []);

  if (!mounted) return null;

  const currentExamData = examDatabase[examId] || {};
  const chaptersList = Object.keys(currentExamData).map((key) => ({ id: key, ...currentExamData[key] }));

  const examNameMapping = { boki3: "日商簿記3級", boki2: "日商簿記2級", fp3: "FP技能士3級", itpass: "ITパスポート", takken: "宅地建物取引士（宅建）" };
  const currentExamName = examNameMapping[examId] || examId.toUpperCase();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: '"Helvetica Neue", Arial, sans-serif' }}>
      <nav style={{ height: '60px', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
        <div onClick={() => { window.location.href = '/exams'; }} style={{ fontSize: '18px', fontWeight: '900', color: '#b93a26', cursor: 'pointer' }}>
          <span>読解・簿記ラボ</span>
        </div>
      </nav>

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 16px' }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#0f172a', margin: 0 }}>学習ガイド ➔ {currentExamName}</h1>
        </div>

        {chaptersList.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {chaptersList.map((chapter) => (
              <div key={chapter.id} style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: '800', color: '#b93a26' }}>第 {chapter.num} 章</span>
                  <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', margin: '4px 0 8px 0' }}>{chapter.title}</h3>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={() => window.location.href = `/exams/${examId}/guide/${chapter.id}`} style={{ height: '38px', padding: '0 16px', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '6px', fontWeight: '700', cursor: 'pointer' }}>解説テキスト</button>
                  <button onClick={() => window.location.href = `/exams/${examId}/exercises?ch=${chapter.num}`} style={{ height: '38px', padding: '0 16px', backgroundColor: '#fff5f5', border: '1px solid #fec2c2', borderRadius: '6px', fontWeight: '700', color: '#b93a26', cursor: 'pointer' }}>演社問題</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', backgroundColor: '#ffffff', borderRadius: '12px', color: '#64748b' }}>データがありません。</div>
        )}
      </main>
    </div>
  );
}
