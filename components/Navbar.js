"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isAiHovered, setIsAiHovered] = useState(false);

  // 1. 扩容后的日本核心国家资格、公的资格考试列表（完美加入2级）
  const examList = [
    { id: 'boki3', name: '簿記3級', category: 'ビジネス・会計' },
    { id: 'boki2', name: '簿記2級', category: 'ビジネス・総合会計' },
    { id: 'fp3', name: 'FP3級', category: '金融・資産運用' },
    { id: 'fp2', name: 'FP2級', category: '金融・上級資産設計' },
    { id: 'itpass', name: 'ITパスポート', category: 'IT・情報処理' },
    { id: 'takken', name: '宅建', category: '不動産・法律' }
  ];

  // 2. 完美的顶部导航排列顺序（AI質問压轴）
  const navItems = [
    { id: 'exams', label: '試験一覧', hasDropdown: true, basePath: '/exams' },
    { id: 'guide', label: '学習ガイド', hasDropdown: true, subPath: '/guide' },
    { id: 'exercises', label: '練習問題', hasDropdown: true, subPath: '/exercises' },
    { id: 'cards', label: '知識カード', hasDropdown: true, subPath: '/cards' },
    { id: 'mock', label: '模擬試験', hasDropdown: true, subPath: '/mock' },
    { id: 'ai', label: 'AI質問', hasDropdown: false }
  ];

  const handleMenuClick = (itemId, examId, subPath) => {
    setActiveDropdown(null);
    if (itemId === 'exams') {
      // 统一跳转到对应考种的综合管理大本营（Hub页）
      router.push(`/exams/${examId}/guide`);
    } else {
      // 直达对应的刷题、卡片或模拟考场模块
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
                // 🔥 AI質問压轴高亮按钮（用纯 React State 控制 Hover 缩放，零错误隐患）
                <button
                  onClick={() => alert('AI質問アシスタント（サイドパネル）を起動します。')}
                  onMouseEnter={() => setIsAiHovered(true)}
                  onMouseLeave={() => setIsAiHovered(false)}
                  style={{
                    padding: '0 20px',
                    height: '42px',
                    borderRadius: '20px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #4f46e5 0%, #b93a26 100%)',
                    color: '#ffffff',
                    fontSize: '14px',
                    fontWeight: '800',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: isAiHovered ? '0 6px 16px rgba(185, 58, 38, 0.35)' : '0 4px 12px rgba(185, 58, 38, 0.2)',
                    transform: isAiHovered ? 'scale(1.03)' : 'scale(1)',
                    transition: 'transform 0.2s ease, boxShadow 0.2s ease',
                    marginLeft: '8px'
                  }}
                >
                  <span style={{ fontSize: '13px' }}>✨</span>
                  {item.label}
                </button>
              ) : (
                // 通常のドロップダウン付きテキストメニュー
                <button
                  style={{
                    padding: '0 16px',
                    height: '100%',
                    background: 'none',
                    border: 'none',
                    color: activeDropdown === item.id ? '#b93a26' : '#334155',
                    fontSize: '14.5px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    transition: 'color 0.15s ease'
                  }}
                >
                  {item.label}
                  {item.hasDropdown && (
                    <span style={{ 
                      fontSize: '10px', 
                      transform: activeDropdown === item.id ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.15s ease',
                      color: '#94a3b8'
                    }}>▼</span>
                  )}
                </button>
              )}

              {/* 🎰 完全隔离式 React 內联样式下拉
