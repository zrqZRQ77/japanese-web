"use client";
import React, { useState, useEffect } from 'react';

export default function ExamsDashboardMainPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const examCards = [
    { id: 'boki3', name: '日商簿記3級', tags: ['会計', '初心者推奨'], desc: '簿記の基本原理、仕訳、試算表から決算整理まで、ビジネスの共通言語を学びます。' },
    { id: 'boki2', name: '日商簿記2級', tags: ['商業簿記', 'ステップアップ'], desc: '株式会社の会計、純資産の部など、より高度で実践的な商業簿記をマスターします。' },
    { id: 'fp3', name: 'FP技能士3級', tags: ['資産運用', 'ライフプラン'], desc: 'ライフプランニングと資金計画、リスク管理、税金などお金の知識を網羅します。' },
    { id: 'itpass', name: 'ITパスポート', tags: ['IT国家資格', 'ストラテジ'], desc: 'IT社会を生きるすべてのビジネスパーソンに必要な、企業活動と法務の基本。' },
    { id: 'takken', name: '宅地建物取引士', tags: ['不動産', '難関資格'], desc: '宅建業法の免許制度の基本から取引のルールまで、不動産プロへの登竜門。' }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: '"Helvetica Neue", Arial, sans-serif' }}>
      {/* 独立内嵌式 Navbar */}
      <nav style={{ height: '60px', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
        <div onClick={() => { window.location.href = '/exams'; }} style={{ fontSize: '18px', fontWeight: '900', color: '#b93a26', cursor: 'pointer' }}>
          <span>読解・簿記ラボ</span>
        </div>
      </nav>

      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '50px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '900', color: '#0f172a', margin: '0 0 12px 0' }}>
            マイ・ラーニング・ダッシュボード
          </h1>
          <p style={{ fontSize: '15px', color: '#64748b', margin: 0 }}>
            受講中の科目を選択して、解説テキストの確認や演習問題の学習を始めましょう。
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
          {examCards.map((exam) => (
            <div key={exam.id} style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
              <div>
                <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
                  {exam.tags.map((tag, i) => (
                    <span key={i} style={{ fontSize: '11px', fontWeight: '700', backgroundColor: '#f1f5f9', color: '#475569', padding: '3px 8px', borderRadius: '4px' }}>{tag}</span>
                  ))}
                </div>
                <h2 style={{ fontSize: '19px', fontWeight: '800', color: '#0f172a', margin: '0 0 10px 0' }}>{exam.name}</h2>
                <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: '1.6', margin: '0 0 24px 0' }}>{exam.desc}</p>
              </div>
              <button
                onClick={() => { window.location.href = `/exams/${exam.id}/guide`; }}
                style={{ width: '100%', height: '42px', backgroundColor: '#b93a26', color: '#ffffff', border: 'none', borderRadius: '6px', fontSize: '13.5px', fontWeight: '700', cursor: 'pointer' }}
              >
                学習を始める ➔
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
