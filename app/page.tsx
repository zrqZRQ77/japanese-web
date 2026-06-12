'use client';
import React, { useState } from 'react';

export default function HomePage() {
  const [examMenuOpen, setExamMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* 固定顶部导航栏 */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
          {/* 左侧 */}
          <div className="text-xl font-black text-gray-900 tracking-tight">
            資格合格ナビ
          </div>

          {/* 中间 */}
          <div className="flex items-center gap-8 relative">
            <div className="relative">
              <button 
                onClick={() => setExamMenuOpen(!examMenuOpen)}
                className="text-sm font-medium text-gray-700 hover:text-gray-900 flex items-center gap-1 py-2"
              >
                試験一覧
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </button>
              {examMenuOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-50">
                  <a href="/exams/boki3" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 font-medium">日商簿記3級</a>
                  <div className="px-4 py-2 text-sm text-gray-400">FP技能士（準備中）</div>
                  <div className="px-4 py-2 text-sm text-gray-400">宅地建物取引士（準備中）</div>
                </div>
              )}
            </div>
            <span className="text-sm font-medium text-gray-400 bg-gray-100 px-2.5 py-1 rounded-md cursor-not-allowed">
              AI質問（準備中）
            </span>
          </div>

          {/* 右侧 */}
          <div>
            <a 
              href="/exams/boki3" 
              className="inline-flex items-center justify-center bg-[#b93a26] text-white text-sm font-bold h-10 px-5 rounded-lg hover:bg-[#a23220] transition-colors"
            >
              無料で始める
            </a>
          </div>
        </div>
      </nav>

      {/* Hero区域 */}
      <section className="max-w-[1200px] mx-auto px-6 pt-16 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* 左侧文字与按钮 */}
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full">
              完全無料・AI搭載・登録不要
            </span>
            <h1 className="text-5xl lg:text-6xl font-black text-gray-900 leading-[1.15]">
              資格合格を、<br />
              <span className="text-[#e0533c]">無料で。</span>
            </h1>
            <p className="text-gray-600 text-base lg:text-lg leading-relaxed max-w-xl">
              FP技能士・日商簿記・宅建士など、日本の主要資格に特化した学習プラットフォーム。
              学習ガイド・練習問題・知識カード・模擬試験がすべて無料。
            </p>
            <div className="pt-2">
              <a 
                href="/exams/boki3" 
                className="inline-flex items-center justify-center bg-[#b93a26] text-white text-base font-bold h-14 px-8 rounded-xl hover:bg-[#a23220] transition-colors"
              >
                試験を選ぶ
              </a>
            </div>
          </div>

          {/* 右侧统计卡片 2x2布局 */}
          <div className="lg:col-span-5 bg-[#111827] p-8 rounded-[20px] grid grid-cols-2 gap-6 text-white border border-gray-800">
            <div className="space-y-1 p-2">
              <div className="text-3xl font-black tracking-tight text-white">100+</div>
              <div className="text-xs font-medium text-gray-400">練習問題</div>
            </div>
            <div className="space-y-1 p-2">
              <div className="text-3xl font-black tracking-tight text-white">5種</div>
              <div className="text-xs font-medium text-gray-400">学習ツール</div>
            </div>
            <div className="space-y-1 p-2">
              <div className="text-3xl font-black tracking-tight text-white">無料</div>
              <div className="text-xs font-medium text-gray-400">全コンテンツ</div>
            </div>
            <div className="space-y-1 p-2">
              <div className="text-3xl font-black tracking-tight text-white">AI</div>
              <div className="text-xs font-medium text-gray-400">即時解説</div>
            </div>
          </div>
        </div>
      </section>

      {/* 下面工具区 */}
      <section className="max-w-[1200px] mx-auto px-6 py-16 border-t border-gray-200">
        <h2 className="text-2xl lg:text-3xl font-black text-gray-900 mb-10 text-center lg:text-left">
          5つの学習ツール、すべて無料
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {/* 1 */}
          <div className="bg-white p-6 border border-gray-200 rounded-xl hover:border-gray-300 transition-all">
            <div className="w-10 h-10 bg-[#b93a26]/10 rounded-lg flex items-center justify-center text-[#b93a26] mb-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            </div>
            <h3 className="font-bold text-gray-900 text-base mb-1">学習ガイド</h3>
            <p className="text-xs text-gray-500 leading-relaxed">体系化された完全オリジナルのオンライン教材。</p>
          </div>
          {/* 2 */}
          <div className="bg-white p-6 border border-gray-200 rounded-xl hover:border-gray-300 transition-all">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
            </div>
            <h3 className="font-bold text-gray-900 text-base mb-1">練習問題</h3>
            <p className="text-xs text-gray-500 leading-relaxed">章ごとの定着度を測るハイクオリティ問題集。</p>
          </div>
          {/* 3 */}
          <div className="bg-white p-6 border border-gray-200 rounded-xl hover:border-gray-300 transition-all">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-green-600 mb-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="font-bold text-gray-900 text-base mb-1">模擬試験</h3>
            <p className="text-xs text-gray-500 leading-relaxed">本番の出題傾向を完全に再現した模擬テスト。</p>
          </div>
          {/* 4 */}
          <div className="bg-white p-6 border border-gray-200 rounded-xl hover:border-gray-300 transition-all">
            <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600 mb-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            </div>
            <h3 className="font-bold text-gray-900 text-base mb-1">知識カード</h3>
            <p className="text-xs text-gray-500 leading-relaxed">隙間時間で重要語句を暗記できるフラッシュカード。</p>
          </div>
          {/* 5 */}
          <div className="bg-white p-6 border border-gray-200 rounded-xl hover:border-gray-300 transition-all opacity-75">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 mb-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            </div>
            <h3 className="font-bold text-gray-900 text-base mb-1">AI質問</h3>
            <p className="text-xs text-gray-500 leading-relaxed">専属のAIチューターが即時に疑問を解決。</p>
          </div>
        </div>
      </section>
    </div>
  );
}
