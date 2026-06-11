"use client";

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function GuideHubPage() {
  const params = useParams();
  const examId = params.examId || 'boki3';

  // 1. 模拟全科目动态数据。如果你未来加了 fp3，这里会动态读取
  const isBoki = examId.includes('boki');
  const examTitle = isBoki ? '日商簿記3級' : 'FP技能士3級';
  const subtitle = isBoki 
    ? '丸暗記をゼロへ。ビジネスのファーストプリンシプルで学ぶ会計論理。'
    : '日本のマネーリテラシー。ライフプランから税金、投資までを網羅。';

  // 2. 章节卡片数据配置（高信息密度）
  const chapters = isBoki ? [
    {
      id: 'ch1',
      num: '第1章',
      title: '簿記の根本原理と借贷の本质',
      description: 'なぜ資産は左で、負債は右なのか？お金の「来歴」と「現在地」という第一性原理から、複式簿記の本質をすっきりと解き明かします。',
      badges: ['ホームポジション', '5大要素'],
      status: 'available'
    },
    {
      id: 'ch2',
      num: '第2章',
      title: '仕訳のルールと取引の二面性',
      description: 'あらゆる経済活動を左右の等式に分解するパズルゲーム。ルール違反（貸借不一致）にならないための仕訳の絶対法則マトリクス。',
      badges: ['仕訳の法則', '等式のバランス'],
      status: 'available'
    },
    {
      id: 'ch3',
      num: '第3章',
      title: '主要勘定科目の実務（現金・預金・商品売買）',
      description: 'ビジネスの現場で最も動く「お金」と「モノ」の記録方法。売掛金、買掛金、手形のやり取りなど、現場感覚で学ぶ勘定科目。',
      badges: ['商品売買', '売掛・買掛'],
      status: 'soon'
    },
    {
      id: 'ch4',
      num: '第4章',
      title: '決算整理と財務諸表の完成',
      description: '1年間の活動記録を締めくくり、B/SとP/Lを完成させる簿記のクライマックス。なぜ減価償却が必要なのか、その本質に迫る。',
      badges: ['決算整理', 'B/S・P/L'],
      status: 'soon'
    }
  ] : [
    // 如果是 FP3 级，未来预留的章节
    { id: 'ch1', num: '第1章', title: 'ライフプランニングと資金計画', description: '人生の3大資金と社会保険の仕組み。', badges: ['年金', '社会保険'], status: 'available' }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fafafa', fontFamily: '"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", Meiryo, sans-serif', color: '#111111', paddingBottom: '80px' }}>
      
      {/* 顶部通栏 */}
      <header style={{ background: '#ffffff', padding: '16px 40px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 2px rgba(0,0,0,0.01)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href="/" style={{ fontWeight: '900', fontSize: '22px', color: '#111111', textDecoration: 'none' }}>
            合格<span style={{ color: '#b93a26' }}>ナビ</span>
          </Link>
          <span style={{ color: '#e2e8f0' }}>|</span>
          <span style={{ fontSize: '14px', fontWeight: '700', color: '#64748b' }}>学習ガイド一覧</span>
        </div>
        <Link href={`/exams/${examId}`} style={{ color: '#666666', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>
          ← ダッシュボードに戻る
        </Link>
      </header>

      {/* 头部大横幅 */}
      <div style={{ maxWidth: '900px', margin: '40px auto 0 auto', padding: '0 20px' }}>
        <div style={{ marginBottom: '32px' }}>
          <span style={{ background: '#fdf2f0', color: '#b93a26', fontSize: '12px', fontWeight: '800', padding: '4px 8px', borderRadius: '4px' }}>
            TEXTBOOK HUB
          </span>
          <h1 style={{ fontSize: '32px', fontWeight: '900', color: '#111111', marginTop: '8px', marginBottom: '12px' }}>
            {examTitle} 超わかりやすい合格テキスト
          </h1>
          <p style={{ fontSize: '16px', color: '#475569', margin: 0, lineHeight: '1.6' }}>
            {subtitle}
          </p>
        </div>

        {/* 章节卡片垂直流（采用日本教材最习惯的纵向流，高质感呈现） */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {chapters.map((ch) => {
            const isAvailable = ch.status === 'available';
            
            return (
              <div 
                key={ch.id} 
                style={{ 
                  background: '#ffffff', 
                  borderRadius: '12px', 
                  border: '1px solid #e5e7eb', 
                  padding: '28px',
                  boxShadow: isAvailable ? '0 4px 6px -1px rgba(0,0,0,0.02), 0 2px 4px -1px rgba(0,0,0,0.01)' : 'none',
                  opacity: isAvailable ? 1 : 0.65,
                  position: 'relative',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: isAvailable ? 'pointer' : 'not-allowed'
                }}
              >
                {/* 卡片头部：章数与状态标签 */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '13px', fontWeight: '800', color: '#c9a054', letterSpacing: '0.5px' }}>
                    {ch.num}
                  </span>
                  {isAvailable ? (
                    <span style={{ fontSize: '12px', fontWeight: '700', color: '#10b981', backgroundColor: '#ecfdf5', padding: '2px 8px', borderRadius: '4px' }}>
                      受講可能
                    </span>
                  ) : (
                    <span style={{ fontSize: '12px', fontWeight: '700', color: '#94a3b8', backgroundColor: '#f1f5f9', padding: '2px 8px', borderRadius: '4px' }}>
                      近日公開
                    </span>
                  )}
                </div>

                {/* 章节核心标题 */}
                <h3 style={{ fontSize: '20px', fontWeight: '800', margin: '0 0 12px 0', color: '#111111' }}>
                  {ch.title}
                </h3>

                {/* 章节简介（大白话核心看点提炼） */}
                <p style={{ fontSize: '14.5px', color: '#475569', lineHeight: '1.65', margin: '0 0 20px 0' }}>
                  {ch.description}
                </p>

                {/* 底部知识标签流 */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {ch.badges.map(b => (
                      <span key={b} style={{ fontSize: '12px', color: '#64748b', background: '#f8fafc', padding: '4px 8px', borderRadius: '4px', border: '1px solid #e2e8f0' }}>
                        #{b}
                      </span>
                    ))}
                  </div>
                  
                  {/* 点击行动链接 */}
                  {isAvailable ? (
                    <Link href={`/exams/${examId}/guide/${ch.id}`} style={{ textDecoration: 'none' }}>
                      <span style={{ fontSize: '14px', fontWeight: '700', color: '#b93a26', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        この章を学習する →
                      </span>
                    </Link>
                  ) : (
                    <span style={{ fontSize: '14px', fontWeight: '700', color: '#94a3b8' }}>
                      コンテンツ準備中
                    </span>
                  )}
                </div>

                {/* 满屏可点击包裹（增强移动端体验） */}
                {isAvailable && (
                  <Link 
                    href={`/exams/${examId}/guide/${ch.id}`} 
                    style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1, borderRadius: '12px' }}
                    title={ch.title}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}