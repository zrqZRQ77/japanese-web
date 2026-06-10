"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const params = useParams();

  // 📡 动态感知：抓取当前 URL 里的 examId（比如 boki3 或 fp3）
  // 如果当前在首页，则默认指向 boki3
  const currentExamId = params.examId || 'boki3';

  return (
    <header style={{ background: '#ffffff', padding: '16px 40px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100, fontFamily: '"Helvetica Neue", Arial, sans-serif' }}>
      
      {/* 左侧 Logo */}
      <Link href="/" style={{ fontWeight: '900', fontSize: '22px', color: '#111111', textDecoration: 'none', letterSpacing: '-0.5px' }}>
        合格<span style={{ color: '#b93a26' }}>ナビ</span>
      </Link>

      {/* 中间核心智能导航 */}
      <nav style={{ display: 'flex', gap: '32px', fontSize: '15px', fontWeight: '600', alignItems: 'center' }}>
        
        {/* 試験一覧 下拉菜单 */}
        <div 
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
          style={{ position: 'relative', cursor: 'pointer', color: '#111111', padding: '8px 0' }}
        >
          試験一覧 ▼
          {isDropdownOpen && (
            <div style={{ position: 'absolute', top: '100%', left: 0, backgroundColor: '#ffffff', boxShadow: '0 8px 16px rgba(0,0,0,0.08)', padding: '12px', borderRadius: '6px', display: 'flex', flexDirection: 'column', gap: '10px', width: '160px', marginTop: '0px', border: '1px solid #e2e8f0' }}>
              <Link href="/exams/boki3" style={{ color: '#111111', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>日商簿記3級</Link>
              <Link href="/exams/fp3" style={{ color: '#111111', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>FP技能士3級</Link>
            </div>
          )}
        </div>

        {/* 📝 练习问题：聪明地留在当前选中的科目大本营 */}
        <Link href={`/exams/${currentExamId}`} style={{ color: '#111111', textDecoration: 'none' }}>
          練習問題
        </Link>

        {/* 🎯 智能修复：用户在 FP 就看 FP 指南，在簿记就看簿记指南，再也不会发生跳台和 404！ */}
        <Link href={`/exams/${currentExamId}/guide`} style={{ color: '#111111', textDecoration: 'none' }}>
          学習ガイド
        </Link>

        <span style={{ color: '#94a3b8', cursor: 'not-allowed', fontSize: '14px' }}>AI質問（準備中）</span>
      </nav>

      {/* 右侧智能行动按钮 */}
      <div>
        <Link href={`/exams/${currentExamId}`} style={{ textDecoration: 'none' }}>
          <button style={{ backgroundColor: '#b93a26', color: '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '6px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', transition: 'background 0.2s' }}>
            無料で始める
          </button>
        </Link>
      </div>

    </header>
  );
}
