"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();
  const [activeDropdown, setActiveDropdown] = useState(null);

  // 1. 対応する日本の国家資格・公的資格の一覧データ
  const examList = [
    { id: 'boki3', name: '簿記3級', category: 'ビジネス・会計' },
    { id: 'fp3', name: 'FP3級', category: '金融・資産運用' },
    { id: 'itpass', name: 'ITパスポート', category: 'IT・情報処理' },
    { id: 'takken', name: '宅建', category: '不動産・法律' }
  ];

  // 2. 指示通りの完璧な並び順（AI質問を最後に配置）
  const navItems = [
    { id: 'exams', label: '試験一覧', hasDropdown: true, basePath: '/exams' },
    { id: 'guide', label: '学習ガイド', hasDropdown: true, subPath: '/guide' },
    { id: 'exercises', label: '練習問題', hasDropdown: true, subPath: '/exercises' },
    { id: 'cards', label: '知識カード', hasDropdown: true, subPath: '/cards' },
    { id: 'mock', label: '模擬試験', hasDropdown: true, subPath: '/mock' },
    { id: 'ai', label: 'AI質問', hasDropdown: false } // 压轴高亮按钮
  ];

  const handleMenuClick = (itemId, examId, subPath) => {
    setActiveDropdown(null);
    if (itemId === 'exams') {
      router.push(`/exams/${examId}/guide`);
    } else {
      router.push(`/exams/${examId}${subPath}`);
    }
  };

  return (
    <header style={{
      width: '100%',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
      fontFamily: '"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", Meiryo, sans-serif'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
        height: '70px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        
        {/* ロゴエリア */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Link href="/" style={{
            fontSize: '24px',
            fontWeight: '900',
            color: '#111111',
            textDecoration: 'none',
            letterSpacing: '-0.5px'
          }}>
            合格<span style={{ color: '#b93a26' }}>ナビ</span>
          </Link>
          <span style={{
            fontSize: '11px',
            fontWeight: '700',
            backgroundColor: '#f1f5f9',
            color: '#64748b',
            padding: '2px 8px',
            borderRadius: '4px',
            marginLeft: '6px'
          }}>ONLINE</span>
        </div>

        {/* ナビゲーションメニュー */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          gap: '6px'
        }}>
          {navItems.map((item) => (
            <div
              key={item.id}
              style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center' }}
              onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.id)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {item.id === 'ai' ? (
                // 🔥 最右侧压轴：全站最亮眼的 AI 智能黑科技按钮（渐变科技风）
                <button
                  onClick={() => alert('AI質問アシスタント（サイドパネル）を起動します。')}
                  style={{
                    padding: '0 20px',
                    height: '42px',
                    borderRadius: '20px',
                    border: 'none',
                    // 高級感のあるインテリジェント・グラデーション（ディープパープルからエンジへの美しい階調）
                    background: 'linear-gradient(135deg, #4f46e5 0%, #b93a26 100%)',
                    color: '#ffffff',
                    fontSize: '14px',
                    fontWeight: '800',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
