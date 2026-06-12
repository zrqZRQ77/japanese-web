"use client";

import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  // 核心牛油果色系
  const colors = {
    avocado: '#7A9D54',
    avocadoLight: '#F5F8F2',
    textDark: '#111111',
    textGray: '#475569',
    border: '#e2e8f0',
    darkButton: '#2C3E20'
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: '"Helvetica Neue", Arial, sans-serif' }}>
      
      {/* 1. 顶部导航栏 (按钮移至右侧) */}
      <header style={{ background: '#ffffff', padding: '16px 40px', borderBottom: `1px solid ${colors.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
        {/* 左侧 Logo */}
        <Link href="/" style={{ fontWeight: '900', fontSize: '24px', color: colors.textDark, textDecoration: 'none', letterSpacing: '1px' }}>
          合格<span style={{ color: colors.avocado }}>ナビ</span>
        </Link>

        {/* 右侧 功能按钮 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          <Link href="/exams" style={{ color: colors.textGray, textDecoration: 'none', fontSize: '15px', fontWeight: '600' }}>
            試験一覧
          </Link>
          <Link href="/ai-chat" style={{ color: colors.textGray, textDecoration: 'none', fontSize: '15px', fontWeight: '600' }}>
            AI質問
          </Link>
          <div style={{ height: '20px', width: '1px', backgroundColor: colors.border }}></div>
          <Link href="/login" style={{ color: colors.textDark, textDecoration: 'none', fontSize: '14px', fontWeight: '700' }}>
            ログイン
          </Link>
        </div>
      </header>

      {/* 核心标语与搜索区 */}
      <section style={{ padding: '90px 20px 100px', textAlign: 'center', background: 'linear-gradient(135deg, #ffffff 0%, #F5F8F2 100%)' }}>
        <h1 style={{ fontSize: '46px', fontWeight: '900', color: colors.textDark, marginBottom: '24px', letterSpacing: '-1px' }}>
          あなたのペースで、<span style={{ color: colors.avocado }}>確実な合格</span>を。
        </h1>
        <p style={{ fontSize: '17px', color: colors.textGray, marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px auto', lineHeight: '1.8' }}>
          最新の試験傾向に対応した学習ガイドとAIサポートで、<br/>独学での資格取得を強力にバックアップします。
        </p>

        {/* 2. 搜索框 (替换原有的無料で始める) */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
          <div style={{ 
            display: 'flex', 
            width: '100%', 
            maxWidth: '560px', 
            boxShadow: '0 10px 25px -5px rgba(122, 157, 84, 0.15)', 
            borderRadius: '40px', 
            overflow: 'hidden', 
            border: `2px solid ${colors.avocado}`, 
            backgroundColor: '#ffffff' 
          }}>
            <input
              type="text"
              placeholder="目指す資格を検索（例：簿記3級、FP）"
              style={{ flex: 1, padding: '18px 24px', fontSize: '16px', border: 'none', outline: 'none', color: colors.textDark }}
            />
            <button style={{ backgroundColor: colors.avocado, color: '#ffffff', border: 'none', padding: '0 32px', fontSize: '16px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
              検索
            </button>
          </div>
        </div>

        {/* 4. 修改为跳转到所有考试的列表页 */}
        <Link href="/exams" style={{ textDecoration: 'none' }}>
          <span style={{ fontSize: '14px', color: colors.textGray, fontWeight: '600', cursor: 'pointer', borderBottom: `1px solid ${colors.textLightGray}`, paddingBottom: '2px' }}>
            すべての試験一覧を見る →
          </span>
        </Link>
      </section>

      {/* 3. 数据与特点展示区 (高颜值悬浮卡片排版) */}
      <section style={{ maxWidth: '1050px', margin: '-50px auto 80px auto', position: 'relative', zIndex: 10, padding: '0 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
          
          {[
            { label: '練習問題', value: '100+', desc: '厳選された過去問・予想問', icon: '📝' },
            { label: '学習ツール', value: '5種', desc: '単語帳や模擬テストなど', icon: '🛠️' },
            { label: '全コンテンツ', value: '無料', desc: '隠し課金一切なし', icon: '✨' },
            { label: '即時解説', value: 'AI', desc: '24時間いつでも質問可能', icon: '🤖' }
          ].map((stat, idx) => (
            <div key={idx} style={{
              backgroundColor: '#ffffff',
              padding: '30px 20px',
              borderRadius: '20px',
              boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.08)',
              border: `1px solid ${colors.border}`,
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '16px', background: colors.avocadoLight, width: '64px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>
                {stat.icon}
              </div>
              <div style={{ fontSize: '36px', fontWeight: '900', color: colors.avocado, marginBottom: '4px', letterSpacing: '-1px' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '16px', fontWeight: '800', color: colors.textDark, marginBottom: '8px' }}>
                {stat.label}
              </div>
              <div style={{ fontSize: '13px', color: colors.textGray, fontWeight: '500', lineHeight: '1.5' }}>
                {stat.desc}
              </div>
            </div>
          ))}
          
        </div>
      </section>

      {/* 预留：推荐考试卡片展示区 */}
      <section style={{ maxWidth: '1050px', margin: '0 auto 80px auto', padding: '0 20px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '800', color: colors.textDark, marginBottom: '30px', textAlign: 'center' }}>
          人気の資格から始める
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {/* 这里可以放几个默认的入口卡片，例如直接进入簿记3级 */}
          <Link href="/exams/boki3" style={{ textDecoration: 'none' }}>
            <div style={{ border: `1px solid ${colors.border}`, borderRadius: '16px', padding: '24px', backgroundColor: '#ffffff', transition: 'all 0.2s', cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <span style={{ backgroundColor: '#fef3c7', color: '#d97706', fontSize: '12px', fontWeight: '700', padding: '4px 10px', borderRadius: '20px' }}>人気 No.1</span>
                <span style={{ color: colors.textLightGray }}>→</span>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '800', color: colors.textDark, marginBottom: '8px' }}>日商簿記3級</h3>
              <p style={{ fontSize: '14px', color: colors.textGray, margin: 0, lineHeight: '1.6' }}>ビジネスの基本となる会計知識を身につける。初めての資格学習に最適です。</p>
            </div>
          </Link>
          
          {/* 其他考试的占位卡片 */}
          <Link href="/exams/fp3" style={{ textDecoration: 'none' }}>
            <div style={{ border: `1px solid ${colors.border}`, borderRadius: '16px', padding: '24px', backgroundColor: '#ffffff', transition: 'all 0.2s', cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <span style={{ backgroundColor: '#e0e7ff', color: '#2563eb', fontSize: '12px', fontWeight: '700', padding: '4px 10px', borderRadius: '20px' }}>おすすめ</span>
                <span style={{ color: colors.textLightGray }}>→</span>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '800', color: colors.textDark, marginBottom: '8px' }}>FP3級 (準備中)</h3>
              <p style={{ fontSize: '14px', color: colors.textGray, margin: 0, lineHeight: '1.6' }}>お金の教養を身につける。新NISAや税金の基礎知識を網羅しています。</p>
            </div>
          </Link>
        </div>
      </section>

    </div>
  );
}
