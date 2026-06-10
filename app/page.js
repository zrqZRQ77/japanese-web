"use client";

import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: '"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", Meiryo, sans-serif' }}>
      
      {/* 极简清爽导航栏 */}
      <header style={{ background: '#ffffff', padding: '16px 40px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontWeight: '900', fontSize: '22px', color: '#111111' }}>
          合格<span style={{ color: '#b93a26' }}>ナビ</span>
        </div>
        <div style={{ display: 'flex', gap: '24px', fontSize: '14px', fontWeight: '600' }}>
          <span style={{ color: '#111111', cursor: 'pointer' }}>試験一覧</span>
          <span style={{ color: '#111111', cursor: 'pointer' }}>学習ガイド</span>
        </div>
      </header>

      {/* 主视觉区 (Hero Section) */}
      <section style={{ textAlign: 'center', padding: '80px 20px', background: '#ffffff', borderBottom: '1px solid #f1f5f9' }}>
        <h1 style={{ fontSize: '36px', fontWeight: '900', color: '#111111', marginBottom: '16px', letterSpacing: '-0.5px' }}>
          ゼロから始める資格対策。
        </h1>
        <p style={{ fontSize: '16px', color: '#666666', maxWidth: '600px', margin: '0 auto 32px auto', lineHeight: '1.6' }}>
          文字教材・知識カード・模擬試験をこれ一つで。あなたのペースで効率的に合格を掴み取りましょう。
        </p>
        <Link href="/course?type=fp&level=3" style={{ textDecoration: 'none' }}>
          <button style={{ backgroundColor: '#b93a26', color: '#ffffff', border: 'none', padding: '14px 32px', borderRadius: '6px', fontSize: '16px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 12px rgba(185,58,38,0.15)' }}>
            学習を開始する →
          </button>
        </Link>
      </section>

      {/* 学科大入口看板 */}
      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 20px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#111111', marginBottom: '32px', textAlign: 'center' }}>
          開講コース一覧
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '32px' }}>
          
          {/* 日商簿記卡片 */}
          <div style={{ background: '#ffffff', padding: '32px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
            <div>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#b93a26', background: '#fdf2f0', padding: '4px 8px', borderRadius: '4px' }}>ビジネス・会计</span>
              <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#111111', margin: '16px 0 10px 0' }}>日商簿記</h3>
              <p style={{ fontSize: '14.5px', color: '#666666', lineHeight: '1.6', margin: '0 0 28px 0' }}>
                ビジネスの共通言語を学ぶ。资金の流れを正しく把握し、実务に直结する仕訳と决算の基础知识を身につけます。
              </p>
            </div>
            <Link href="/course?type=boki&level=3" style={{ textDecoration: 'none' }}>
              <button style={{ width: '100%', padding: '12px', background: '#ffffff', color: '#111111', border: '1px solid #111111', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
                3級コースを始める →
              </button>
            </Link>
          </div>

          {/* FP技能士卡片 */}
          <div style={{ background: '#ffffff', padding: '32px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
            <div>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#b93a26', background: '#fdf2f0', padding: '4px 8px', borderRadius: '4px' }}>资产运用・ライフプラン</span>
              <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#111111', margin: '16px 0 10px 0' }}>FP技能士</h3>
              <p style={{ fontSize: '14.5px', color: '#666666', lineHeight: '1.6', margin: '0 0 28px 0' }}>
                お金の教養を体系的に学ぶ。年金、保険、資産運用、税金、不動産、相続の6分野を完全網羅。
              </p>
            </div>
            <Link href="/course?type=fp&level=3" style={{ textDecoration: 'none' }}>
              <button style={{ width: '100%', padding: '12px', background: '#ffffff', color: '#111111', border: '1px solid #111111', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
                3級コースを始める →
              </button>
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}
