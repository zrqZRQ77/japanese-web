"use client";

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ExamDashboard() {
  const params = useParams();
  const examId = params.examId || 'boki3';

  // 簡略的な科目名の判定
  const isBoki = examId.includes('boki');
  const examName = isBoki ? '日商簿記3級' : 'FP技能士3級';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: '"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", Meiryo, sans-serif' }}>
      
      {/* ナビゲーションヘッダー */}
      <header style={{ backgroundColor: '#ffffff', padding: '16px 40px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ fontWeight: '900', fontSize: '22px', color: '#111111', textDecoration: 'none' }}>
          合格<span style={{ color: '#b93a26' }}>ナビ</span>
        </Link>
        <Link href="/" style={{ color: '#666666', textDecoration: 'none', fontSize: '14px' }}>
          トップページに戻る
        </Link>
      </header>

      {/* メインコンテンツ */}
      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
        
        {/* 科目タイトル */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '900', color: '#111111', margin: '0 0 8px 0' }}>
            {examName} ダッシュボード
          </h1>
          <p style={{ color: '#64748b', margin: 0, fontSize: '15px' }}>
            学習ツールを選択して、試験対策を開始しましょう。
          </p>
        </div>

        {/* 機能選択グリッド */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          
          {/* 🎯 学習ガイド（ここから先ほど作ったguide/page.jsへ繋がります） */}
          <div style={{ backgroundColor: '#ffffff', padding: '28px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '12px' }}>📖</div>
              <h3 style={{ fontSize: '18px', fontWeight: '800', margin: '0 0 12px 0', color: '#111111' }}>学習ガイド（講義テキスト）</h3>
              <p style={{ fontSize: '14px', color: '#475569', lineHeight: '1.6', margin: '0 0 24px 0' }}>
                丸暗記ではなく、ビジネスの根本的な論理から「大白話（噛み砕いた表現）」で核心の本質を理解するWikiテキスト。
              </p>
            </div>
            <Link href={`/exams/${examId}/guide`} style={{ textDecoration: 'none' }}>
              <button style={{ width: '100%', padding: '12px', backgroundColor: '#b93a26', color: '#ffffff', border: 'none', borderRadius: '6px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}>
                テキストを読む →
              </button>
            </Link>
          </div>

          {/* 練習問題（プレースホルダー） */}
          <div style={{ backgroundColor: '#ffffff', padding: '28px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', opacity: 0.7 }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '12px' }}>📝</div>
              <h3 style={{ fontSize: '18px', fontWeight: '800', margin: '0 0 12px 0', color: '#111111' }}>練習問題一覧</h3>
              <p style={{ fontSize: '14px', color: '#475569', lineHeight: '1.6', margin: '0 0 24px 0' }}>
                過去問をベースにした単問流の演習システム。詳細な解説とAI質問機能を搭載。
              </p>
            </div>
            <button disabled style={{ width: '100%', padding: '12px', backgroundColor: '#94a3b8', color: '#ffffff', border: 'none', borderRadius: '6px', fontWeight: '700', fontSize: '14px', cursor: 'not-allowed' }}>
              近日公開
            </button>
          </div>

          {/* 模擬試験（プレースホルダー） */}
          <div style={{ backgroundColor: '#ffffff', padding: '28px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', opacity: 0.7 }}>
            <div>
              <div style={{ fontSize: '28px', marginBottom: '12px' }}>⏱️</div>
              <h3 style={{ fontSize: '18px', fontWeight: '800', margin: '0 0 12px 0', color: '#111111' }}>本番形式 模擬試験</h3>
              <p style={{ fontSize: '14px', color: '#475569', lineHeight: '1.6', margin: '0 0 24px 0' }}>
                本番と同じ制限時間と出題バランスで実力をシミュレーション測定。
              </p>
            </div>
            <button disabled style={{ width: '100%', padding: '12px', backgroundColor: '#94a3b8', color: '#ffffff', border: 'none', borderRadius: '6px', fontWeight: '700', fontSize: '14px', cursor: 'not-allowed' }}>
              近日公開
            </button>
          </div>

        </div>

      </main>
    </div>
  );
}
