"use client";

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

// 模拟的深度阅读教材/文章数据（实际开发时可以抽离到 data 文件夹的 JSON 中）
const articlesData = {
  boki: [
    { id: 'boki-01', title: '【大白话拆解】借贷记账法的本质：为什么资产在借方，负债在贷方？', tag: '仕訳の基本', summary: '用商业第一性原理彻底搞懂簿记的核心逻辑，不再死记硬背。分清资金的来龙去脉。', readTime: '5 min' },
    { id: 'boki-02', title: '日商簿记3级必考：现金发过与不足的期末完美处理指南', tag: '現金・預金', summary: '账面和实际对不上？别慌。三步白话法则带你理清「現金過不足」的会计分录。', readTime: '7 min' }
  ],
  fp: [
    { id: 'fp-01', title: 'FP3级核心：六大板块复习权重与个人资产配置的基本模型', tag: 'ライフプラン', summary: '系统化梳理FP考试的底层逻辑。如何从年金、保险到税收，为客户构建健康的财务盾牌。', readTime: '6 min' },
    { id: 'fp-02', title: '复利的力量：如何用白话讲透公的年金与确定拠出年金(iDeCo)', tag: '年金社会保険', summary: '日本个人养老金制度全解。用最高的信息密度，拆解避税与资产增值的双重逻辑。', readTime: '8 min' }
  ]
};

export default function ReaderDashboard() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type') || 'fp';
  const level = searchParams.get('level') || '3';

  const isBoki = type === 'boki';
  const currentArticles = isBoki ? articlesData.boki : articlesData.fp;
  const courseTitle = isBoki ? `日商簿記${level}級` : `FP技能士${level}級`;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', fontFamily: '"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", Meiryo, sans-serif' }}>
      
      {/* 像素级还原：统一红棕色顶部导航栏 */}
      <header style={{ background: '#ffffff', padding: '16px 40px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ fontWeight: '900', fontSize: '22px', color: '#111111', textDecoration: 'none' }}>
          合格<span style={{ color: '#b93a26' }}>ナビ</span>
        </Link>
        <Link href={`/course?type=${type}&level=${level}`} style={{ color: '#666666', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>
          ← コースパネルに戻る
        </Link>
      </header>

      {/* 主体内容区 */}
      <main style={{ maxWidth: '760px', margin: '0 auto', padding: '50px 20px' }}>
        
        {/* 头部标题与定位 */}
        <div style={{ marginBottom: '40px', borderBottom: '2px solid #111111', paddingBottom: '16px' }}>
          <span style={{ fontSize: '13px', fontWeight: '700', color: '#b93a26', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Bilingual Knowledge Summary
          </span>
          <h1 style={{ fontSize: '28px', fontWeight: '900', color: '#111111', margin: '6px 0 0 0' }}>
            {courseTitle} 📘 講義テキスト一覧
          </h1>
        </div>

        {/* 高信息密度文章卡片列表 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {currentArticles.map((article) => (
            <article 
              key={article.id} 
              style={{ paddingBottom: '28px', borderBottom: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
            >
              {/* 分类标签 */}
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#b93a26', background: '#fdf2f0', padding: '3px 8px', borderRadius: '4px', marginBottom: '12px' }}>
                {article.tag}
              </span>
              
              {/* 文章标题 */}
              <h2 style={{ fontSize: '19px', fontWeight: '800', color: '#111111', margin: '0 0 ' + '10px 0', lineHeight: '1.4' }}>
                <Link href={`/reader/${article.id}?type=${type}&level=${level}`} style={{ color: '#111111', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#b93a26'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#111111'}>
                  {article.title}
                </Link>
              </h2>
              
              {/* 大白话引言摘要 */}
              <p style={{ fontSize: '14.5px', color: '#555555', lineHeight: '1.6', margin: '0 0 14px 0' }}>
                {article.summary}
              </p>
              
              {/* 轻量化底部小字 */}
              <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#94a3b8' }}>
                <span>⏱️ 精読時間: {article.readTime}</span>
                <span style={{ color: '#b93a26', fontWeight: '600', cursor: 'pointer' }}>阅读全文 →</span>
              </div>
            </article>
          ))}
        </div>

      </main>
    </div>
  );
}