"use client";

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function CourseDashboard() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type') || 'fp';
  const level = searchParams.get('level') || '3';

  const isBoki = type === 'boki';
  const title = isBoki ? `日商簿記${level}級` : `FP技能士${level}級`;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: '"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", Meiryo, sans-serif' }}>
      
      {/* 顶部导航 */}
      <header style={{ background: '#ffffff', padding: '16px 40px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ fontWeight: '900', fontSize: '22px', color: '#111111', textDecoration: 'none' }}>
          合格<span style={{ color: '#b93a26' }}>ナビ</span>
        </Link>
        <Link href="/" style={{ color: '#666666', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>トップページへ戻る</Link>
      </header>

      {/* 主体学习面板 */}
      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px' }}>
        
        {/* 面包屑与学科大标题 */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '8px' }}>コース選択 / {title}</div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#111111', margin: 0 }}>{title} 総合学習センター</h1>
        </div>

        {/* 功能矩阵 (提前布置未来新模块) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
          
          {/* 1. 文字教材入口 */}
          <div style={{ background: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '24px', marginBottom: '12px' }}>📘</div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', margin: '0 0 8px 0' }}>講義テキスト</h3>
              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.5', margin: '0 0 20px 0' }}>高信息密度的双语图文教材，白话拆解核心考点与商业逻辑。</p>
            </div>
            <button disabled style={{ width: '100%', padding: '10px', background: '#f1f5f9', color: '#94a3b8', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'not-allowed' }}>
              準備中
            </button>
          </div>

          {/* 2. 知识卡片入口 */}
          <div style={{ background: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '24px', marginBottom: '12px' }}>🃏</div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', margin: '0 0 8px 0' }}>知識カード</h3>
              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.5', margin: '0 0 20px 0' }}>碎片化时间快速记忆利器，利用一分钟卡片高效攻克高频考点。</p>
            </div>
            <button disabled style={{ width: '100%', padding: '10px', background: '#f1f5f9', color: '#94a3b8', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'not-allowed' }}>
              準備中
            </button>
          </div>

          {/* 3. 模拟试题入口 */}
          <div style={{ background: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid #b93a26', boxShadow: '0 4px 12px rgba(185,58,38,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '24px', marginBottom: '12px' }}>✍️</div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', margin: '0 0 8px 0' }}>模擬試験 (単問流)</h3>
              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.5', margin: '0 0 20px 0' }}>本番の出題傾向に合わせた模擬演習。白話解説で即座に正誤判定。</p>
            </div>
            <Link href={`/exams?type=${type}&level=${level}`} style={{ textDecoration: 'none' }}>
              <button style={{ width: '100%', padding: '10px', background: '#b93a26', color: '#ffffff', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
                演習を開始する →
              </button>
            </Link>
          </div>

        </div>

      </main>
    </div>
  );
}