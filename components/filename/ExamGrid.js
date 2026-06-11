"use client";

import React, { useState } from 'react';

export default function ExamGrid() {
  const [hoveredCard, setHoveredCard] = useState(null);

  // 6大資格のデータ一元管理（2級・3級のバリエーションを網羅）
  const exams = [
    {
      id: 'boki3',
      name: '簿記3級',
      english: 'BOKI Level 3',
      tags: ['ビジネス基礎', '会計・財務'],
      desc: 'すべてのビジネスパーソンの必須教養。決算書の仕組みと仕訳の根本原理をマスターします。',
      color: '#b93a26' // エンジ色
    },
    {
      id: 'boki2',
      name: '簿記2級',
      english: 'BOKI Level 2',
      tags: ['商業簿記', '工業簿記'],
      desc: '実務で強く求められる上級会計。製造業の原価計算（工業簿記）と経営分析スキルを習得。',
      color: '#9a2e1d' // 深いエンジ色
    },
    {
      id: 'fp3',
      name: 'FP3級',
      english: 'Financial Planner 3',
      tags: ['資産運用', 'ライフプラン'],
      desc: '税金、保険、年金、不動産、投資信託など、人生のお金に関する知識を体系的に学びます。',
      color: '#1e3a8a' // ネイビー
    },
    {
      id: 'fp2',
      name: 'FP2級',
      english: 'Financial Planner 2',
      tags: ['上級資産設計', '実務対応'],
      desc: 'より高度な資産運用・相続・事業承継のコンサルティング能力を身につけ、実務に活かします。',
      color: '#1d4ed8' // 明るめのネイビー
    },
    {
      id: 'itpass',
      name: 'ITパスポート',
      english: 'IT Passport',
      tags: ['国家資格', 'ITリテラシー'],
      desc: 'DX時代のIT基礎知識、経営戦略、セキュリティ、ネットワークを網羅した国家試験。',
      color: '#0d9488' // ティール（青緑）
    },
    {
      id: 'takken',
      name: '宅建',
      english: 'Real Estate Broker',
      tags: ['国家資格', '不動産・法律'],
      desc: '不動産取引の最高峰・国家資格。宅建業法や権利関係（民法）など、強力な法律知識を習得。',
      color: '#d97706' // アンバー（琥珀色）
    }
  ];

  const handleCardClick = (examId) => {
    if (typeof window !== 'undefined') {
      // 指示の「4番」に基づき、直接問題ページに行くのではなく、その資格の総合大本营メニュー（Hub）へ誘導
      window.location.href = `/exams/${examId}/guide`;
    }
  };

  return (
    <section style={{
      width: '100%',
      backgroundColor: '#f8fafc', // 清潔感のあるライトグレー背景
      padding: '80px 24px',
      fontFamily: '"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", Meiryo, sans-serif'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        
        {/* セクションタイトルエリア（試験を選ぶ） */}
        <div style={{
          textAlign: 'center',
          marginBottom: '50px'
        }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '900',
            color: '#0f172a',
            margin: '0 0 12px 0',
            letterSpacing: '-0.5px'
          }}>
            試験を選ぶ
          </h2>
          <p style={{
            fontSize: '15px',
            color: '#64748b',
            margin: 0,
            fontWeight: '500'
          }}>
            目的に合わせた資格を選択し、最短ルートで合格を目指しましょう。
          </p>
        </div>

        {/* 🎰 3列 grid センター配置カードコンテナ */}
        <div style={{
          display: 'grid',
          // 画面幅に応じて1列、2列、3列に自動変化するレスポンシブ・マジック（ピュアCSS対応）
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '30px',
          justifyContent: 'center', // 隙間が空いた場合も全体を美しく中央寄せ
          width: '100%'
        }}>
          {exams.map((exam) => {
            const isHovered = hoveredCard === exam.id;

            return (
              <div
                key={exam.id}
                onMouseEnter={() => setHoveredCard(exam.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handleCardClick(exam.id)}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  border: isHovered ? `1px solid ${exam.color}` : '1px solid #e2e8f0',
                  padding: '32px',
                  cursor: 'pointer',
                  boxShadow: isHovered 
                    ? '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' 
                    : '0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.01)',
                  transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '320px',
                  boxSizing: 'border-box',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* 装飾用のトップカラーバー */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '5px',
                  backgroundColor: exam.color
                }} />

                {/* 上部：情報エリア */}
                <div>
                  {/* タグリスト */}
                  <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
                    {exam.tags.map((tag, i) => (
                      <span key={i} style={{
                        fontSize: '11px',
                        fontWeight: '700',
                        color: exam.color,
                        backgroundColor: `${exam.color}10`, // カラーコードに10%の透明度をプラス
                        padding: '3px 10px',
                        borderRadius: '4px'
                      }}>{tag}</span>
                    ))}
                  </div>

                  {/* 資格名・タイトル */}
                  <h3 style={{
                    fontSize: '22px',
                    fontWeight: '800',
                    color: '#0f172a',
                    margin: '0 0 4px 0',
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '8px'
                  }}>
                    {exam.name}
                    <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '500' }}>
                      {exam.english}
                    </span>
                  </h3>

                  {/* 説明文（純内容展示） */}
                  <p style={{
                    fontSize: '13.5px',
                    color: '#475569',
                    lineHeight: '1.6',
                    margin: '12px 0 0 0',
                    fontWeight: '500'
                  }}>
                    {exam.desc}
                  </p>
                </div>

                {/* 下部：インタラクションボタンエリア（中立化され美しく統一されたボタン） */}
                <div style={{
                  width: '100%',
                  marginTop: '20px'
                }}>
                  <div style={{
                    width: '100%',
                    height: '46px',
                    borderRadius: '8px',
                    backgroundColor: isHovered ? exam.color : '#f1f5f9',
                    color: isHovered ? '#ffffff' : '#334155',
                    fontSize: '14px',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    transition: 'all 0.2s ease',
                    border: 'none'
                  }}>
                    学習を開始する
                    <span style={{ 
                      fontSize: '12px',
                      transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
                      transition: 'transform 0.2s ease'
                    }}>➔</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}