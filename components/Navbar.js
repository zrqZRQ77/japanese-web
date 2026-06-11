"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();
  const [activeDropdown, setActiveDropdown] = useState(null);

  // 対応する日本の国家資格・公的資格の一覧データ
  const examList = [
    { id: 'boki3', name: '簿記3級', category: 'ビジネス・会計' },
    { id: 'fp3', name: 'FP3級', category: '金融・資産運用' },
    { id: 'itpass', name: 'ITパスポート', category: 'IT・情報処理' },
    { id: 'takken', name: '宅建', category: '不動産・法律' }
  ];

  // 各トップナビゲーション項目の設定
  const navItems = [
    { id: 'exams', label: '試験一覧', hasDropdown: true, basePath: '/exams' },
    { id: 'guide', label: '学習ガイド', hasDropdown: true, subPath: '/guide' },
    { id: 'exercises', label: '練習問題', hasDropdown: true, subPath: '/exercises' },
    { id: 'cards', label: '知識カード', hasDropdown: true, subPath: '/cards' },
    { id: 'ai', label: 'AI質問', hasDropdown: false }, // AI質問はドロップダウンなし（側滑トリガー用）
    { id: 'mock', label: '模擬試験', hasDropdown: true, subPath: '/mock' }
  ];

  // ドロップダウン内のリンククリック時のハンドラー
  const handleMenuClick = (itemId, examId, subPath) => {
    setActiveDropdown(null); // メニューを閉じる
    
    if (itemId === 'exams') {
      // 試験一覧からの場合は、その資格の「総合メニュー（Hub）」へ遷移
      router.push(`/exams/${examId}/guide`);
    } else {
      // それ以外（学習ガイド、練習問題など）は、各資格の該当システムへダイレクトにジャンプ
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
        
        {/* 🚀 ロゴ・ブランドエリア */}
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

        {/* 🗺️ 指示通りの新順序ナビゲーションメニュー */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          gap: '4px'
        }}>
          {navItems.map((item) => (
            <div
              key={item.id}
              style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center' }}
              onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.id)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {/* メインメニューボタン */}
              {item.id === 'ai' ? (
                // AI質問ボタン（ダイレクトアクション用、未来の側滑トリガーに即連動可能）
                <button
                  onClick={() => alert('AI質問アシスタント（サイドパネル）を起動します。')}
                  style={{
                    padding: '0 16px',
                    height: '42px',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: '#111111',
                    color: '#ffffff',
                    fontSize: '14.5px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                  }}
                >
                  <span style={{ fontSize: '12px' }}>✨</span> {item.label}
                </button>
              ) : (
                // 通常のドロップダウン付きテキストメニュー
                <button
                  style={{
                    padding: '0 18px',
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

              {/* 🎰 ホバー時に極上の質感で展開するドロップダウンメニュー */}
              {item.hasDropdown && activeDropdown === item.id && (
                <div style={{
                  position: 'absolute',
                  top: '68px',
                  left: item.id === 'exams' ? '0' : '50%',
                  transform: item.id === 'exams' ? 'none' : 'translateX(-50%)',
                  backgroundColor: '#ffffff',
                  minWidth: '260px',
                  borderRadius: '8px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #e2e8f0',
                  padding: '8px 0',
                  animation: 'fadeIn 0.15s ease-out'
                }}>
                  {/* メニューのインフォヘッダー */}
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

                  {/* 試験一覧の選択肢リスト */}
                  {examList.map((exam) => (
                    <button
                      key={exam.id}
                      onClick={() => handleMenuClick(item.id, exam.id, item.subPath)}
                      style={{
                        width: '100%',
                        padding: '10px 16px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2px',
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

      {/* ドロップダウンフェードイン用のアニメーションCSS（Next.jsのインライン対応） */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translate(-50%, -4px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
      `}</style>
    </header>
  );
}
