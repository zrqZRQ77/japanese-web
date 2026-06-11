"use client";

import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isAiHovered, setIsAiHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  // 确保组件在客户端完全挂载后再渲染，彻底杜绝 SSR 导致的 Hydration 报错
  useEffect(() => {
    setMounted(true);
  }, []);

  const examList = [
    { id: 'boki3', name: '簿記3級', category: 'ビジネス・会計' },
    { id: 'boki2', name: '簿記2級', category: 'ビジネス・総合会計' },
    { id: 'fp3', name: 'FP3級', category: '金融・資産運用' },
    { id: 'fp2', name: 'FP2級', category: '金融・上級資産設計' },
    { id: 'itpass', name: 'ITパスポート', category: 'IT・情報処理' },
    { id: 'takken', name: '宅建', category: '不動産・法律' }
  ];

  const navItems = [
    { id: 'exams', label: '試験一覧', hasDropdown: true, subPath: '/guide' },
    { id: 'guide', label: '学習ガイド', hasDropdown: true, subPath: '/guide' },
    { id: 'exercises', label: '練習問題', hasDropdown: true, subPath: '/exercises' },
    { id: 'cards', label: '知識カード', hasDropdown: true, subPath: '/cards' },
    { id: 'mock', label: '模擬試験', hasDropdown: true, subPath: '/mock' },
    { id: 'ai', label: 'AI質問', hasDropdown: false }
  ];

  const handleMenuClick = (itemId, examId, subPath) => {
    setActiveDropdown(null);
    if (typeof window !== 'undefined') {
      // 使用最纯粹的 Web 原生跳转，不经过任何框架路由拦截
      window.location.href = `/exams/${examId}${subPath}`;
    }
  };

  if (!mounted) return null; // 客户端未挂载前返回空，保障 SSR 安全

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
          <a href="/" style={{
            fontSize: '24px',
            fontWeight: '900',
            color: '#111111',
            textDecoration: 'none',
            letterSpacing: '-0.5px'
          }}>
            合格<span style={{ color: '#b93a26' }}>ナビ</span>
          </a>
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
                <button
                  onClick={() => alert('AI質問アシスタントを起動します。')}
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

              {/* 下拉菜单结构 */}
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

                  {examList.map((exam) => (
                    <button
                      key={exam.id}
                      onClick={() => handleMenuClick(item.id, exam.id, item.subPath)}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2px',
                        padding: '10px 16px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        textAlign: 'left',
                        cursor: 'pointer',
                        width: '100%',
                        boxSizing: 'border-box',
                        transition: 'background-color 0.15s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <span style={{ fontSize: '14px', fontWeight: '700', color: '#111111' }}>
                        {exam.name}
                      </span>
                      <span style={{ fontSize: '11px', color: '#64748b', fontWeight: '500' }}>
                        {exam.category}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

      </div>
    </header>
  );
}
