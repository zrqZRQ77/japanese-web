"use client";

import React from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container} style={{ fontFamily: '"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", Meiryo, sans-serif' }}>
      {/* 顶部导航栏 */}
      <Navbar />

      {/* 主视觉区 (Hero Section) */}
      <header className={styles.hero} style={{ textAlign: 'center', padding: '60px 20px', background: '#ffffff', borderBottom: '1px solid #f1f5f9' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '900', color: '#111111', marginBottom: '16px' }}>
          ゼロから始める資格対策。
        </h1>
        <p style={{ fontSize: '16px', color: '#666666', maxWidth: '600px', margin: '0 auto 24px auto', lineHeight: '1.6' }}>
          文字教材・知識カード・模擬試験をこれ一つで。あなたのペースで合格を掴み取りましょう。
        </p>
        <Link href="/course?type=fp&level=3" style={{ textDecoration: 'none' }}>
          <button style={{ backgroundColor: '#b93a26', color: '#ffffff', border: 'none', padding: '14px 28px', borderRadius: '4px', fontSize: '16px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 6px rgba(185,58,38,0.15)' }}>
            学習を始める →
          </button>
        </Link>
      </header>

      {/* 学科选择看板区 */}
      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '50px 20px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#111111', marginBottom: '24px', textAlign: 'center' }}>
          開講コース一覧
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
          
          {/* 日商簿記卡片 */}
          <div style={{ background: '#ffffff', padding: '30px', borderRadius: '8px', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#b93a26', background: '#fdf2f0', padding: '4px 8px', borderRadius: '4px' }}>ビジネス・会計</span>
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#111111', margin: '12px 0 8px 0' }}>日商簿記</h3>
              <p style={{ fontSize: '14px', color: '#666666', lineHeight: '1.6', margin: '0 0 24px 0' }}>
                ビジネスの共通言語を学ぶ。資金の流れを正しく把握し、実务に直結する仕訳と決算の基礎知識を身につけます。
              </p>
            </div>
            <Link href="/course?type=boki&level=3" style={{ textDecoration: 'none' }}>
              <button style={{ width: '100%', padding: '12px', background: '#ffffff', color: '#111111', border: '1px solid #111111', borderRadius: '4px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}>
                3級コースを始める →
              </button>
            </Link>
          </div>

          {/* FP技能士卡片 */}
          <div style={{ background: '#ffffff', padding: '30px', borderRadius: '8px', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#b93a26', background: '#fdf2f0', padding: '4px 8px', borderRadius: '4px' }}>資産運用・ライフプラン</span>
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#111111', margin: '12px 0 8px 0' }}>FP技能士</h3>
              <p style={{ fontSize: '14px', color: '#666666', lineHeight: '1.6', margin: '0 0 24px 0' }}>
                お金の教養を体系的に学ぶ。年金、保険、資産運用、税金、不動産、相続の6分野を網羅。
              </p>
            </div>
            <Link href="/course?type=fp&level=3" style={{ textDecoration: 'none' }}>
              <button style={{ width: '100%', padding: '12px', background: '#ffffff', color: '#111111', border: '1px solid #111111', borderRadius: '4px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}>
                3級コースを始める →
              </button>
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}
