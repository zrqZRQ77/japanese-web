"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import styles from './Navbar.module.css'; // 维持你原有的样式引用

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header style={{ background: '#ffffff', padding: '16px 40px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
      
      {/* 左侧 Logo：永远回首页 */}
      <Link href="/" style={{ fontWeight: '900', fontSize: '22px', color: '#111111', textDecoration: 'none', letterSpacing: '-0.5px' }}>
        合格<span style={{ color: '#b93a26' }}>ナビ</span>
      </Link>

      {/* 中间核心导航链路 */}
      <nav style={{ display: 'flex', gap: '32px', fontSize: '15px', fontWeight: '600', alignItems: 'center' }}>
        
        {/* 🔗 試験一覧：采用悬浮下拉或直接分流，确保它们全部指向科目控制台大本营 */}
        <div 
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
          style={{ position: 'relative', cursor: 'pointer', color: '#111111' }}
        >
          試験一覧 ▼
          {isDropdownOpen && (
            <div style={{ position: 'absolute', top: '100%', left: 0, backgroundColor: '#ffffff', boxShadow: '0 8px 16px rgba(0,0,0,0.1)', padding: '12px', borderRadius: '6px', display: 'flex', flexDirection: 'column', gap: '10px', width: '160px', marginTop: '10px' }}>
              <Link href="/exams/boki3" style={{ color: '#111111', textDecoration: 'none', fontSize: '14px' }}>日商簿記3級</Link>
              <Link href="/exams/fp3" style={{ color: '#111111', textDecoration: 'none', fontSize: '14px' }}>FP技能士3級</Link>
            </div>
          )}
        </div>

        {/* 🔗 练习问题：统一分流到簿记3级大本营（或者你可根据需要调整） */}
        <Link href="/exams/boki3" style={{ color: '#111111', textDecoration: 'none' }}>
          練習問題
        </Link>

        {/* 🎯 关键修复：消除 404！将全局“学習ガイド”直接贴心地导向目前已经完工的簿记3级导学页 */}
        <Link href="/exams/boki3/guide" style={{ color: '#111111', textDecoration: 'none' }}>
          学習ガイド
        </Link>

        <span style={{ color: '#94a3b8', cursor: 'not-allowed' }}>AI質問（準備中）</span>
      </nav>

      {/* 右侧行动按钮 */}
      <div>
        <Link href="/exams/boki3" style={{ textDecoration: 'none' }}>
          <button style={{ backgroundColor: '#b93a26', color: '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '6px', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>
            無料で始める
          </button>
        </Link>
      </div>

    </header>
  );
}
