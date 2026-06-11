"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isAiHovered, setIsAiHovered] = useState(false);

  // 1. 完美扩容的 6 大考种数据库
  const examList = [
    { id: 'boki3', name: '簿記3級', category: 'ビジネス・会計' },
    { id: 'boki2', name: '簿記2級', category: 'ビジネス・総合会計' },
    { id: 'fp3', name: 'FP3級', category: '金融・資産運用' },
    { id: 'fp2', name: 'FP2級', category: '金融・上級資産設計' },
    { id: 'itpass', name: 'ITパスポート', category: 'IT・情報処理' },
    { id: 'takken', name: '宅建', category: '不動産・法律' }
  ];

  // 2. 指示通りの完璧な並び順（AI質問が最後）
  const navItems = [
    { id: 'exams', label: '試験一覧', hasDropdown: true, basePath: '/exams', subPath: '/guide' },
    { id: 'guide', label: '学習ガイド', hasDropdown: true, basePath: '/exams', subPath: '/guide' },
    { id: 'exercises', label: '練習問題', hasDropdown: true, basePath: '/exams', subPath: '/exercises' },
    { id: 'cards', label: '知識カード', hasDropdown: true, basePath: '/exams', subPath: '/cards' },
    { id: 'mock', label: '模擬試験', hasDropdown: true, basePath: '/exams', subPath: '/mock' },
    { id: 'ai', label: 'AI質問', hasDropdown: false }
  ];

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
                // 🔥 AI質問压轴高亮按钮
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

              {/* 下拉菜单：改用 Link 标签包裹，原生底层机制，绝不报错 */}
              {item.hasDropdown && activeDropdown === item.id && (
                <div style={{
                  position: 'absolute',
                  top: '68px',
                  left: item.id === 'exams' ? '0' : '50%',
                  transform: item.id === 'exams' ? 'none' : 'translateX(-50%)',
                  backgroundColor: '#ffffff',
                  minWidth: '280px',
                  borderRadius: '8px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #e2e8f0',
                  padding: '8px 0',
                  zIndex: 2000
                }}>
                  <div style={{
                    padding: '6px 16px 10px 16px',
                    fontSize: '11px',
                    fontWeight: '800',
                    color: '#94a3b8',
                    borderBottom: '1px solid #f1f5f9',
                    marginBottom: '6px',
                    letterSpacing: '0.5px'
                  }}>
                    {item.label}の対象資格を選択
                  </div>

                  {examList.map((exam) => {
                    // 原生拼接标准 Next.js 路由路径，保障 100% 兼容跳转
                    const targetPath = `${item.basePath}/${exam.id}${item.subPath}`;

                    return (
                      <Link
                        key={exam.id}
                        href={targetPath}
                        onClick={() => setActiveDropdown(null)}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '2px',
                          padding: '10px 16px',
                          textDecoration: 'none',
                          backgroundColor: 'transparent',
                          transition: 'background-color 0.15s ease',
                          textAlign: 'left',
                          border: 'none',
                          width: '100%',
                          boxSizing: 'border-box'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                        onMouseLeave={(e) => e.
