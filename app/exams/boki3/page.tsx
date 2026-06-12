'use client';
import React from 'react';

export default function Boki3Dashboard() {
  return (
    <div className="min-h-screen flex bg-[#f8fafc]">
      {/* 左侧固定侧边栏 */}
      <aside className="w-[280px] bg-white border-r border-gray-200 fixed h-screen flex flex-col justify-between">
        <div className="p-6">
          <div className="text-lg font-black text-gray-900 tracking-tight border-b border-gray-100 pb-4 mb-6">
            簿記3級
          </div>
          <nav className="space-y-1">
            <a href="/exams/boki3" className="flex items-center px-4 h-11 text-sm font-bold bg-blue-50 text-blue-600 rounded-lg">
              ダッシュボード
            </a>
            <a href="/exams/boki3/guide/ch4" className="flex items-center px-4 h-11 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg">
              学習ガイド
            </a>
            <a href="/exams/boki3/exercises" className="flex items-center px-4 h-11 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg">
              練習問題
            </a>
            <div className="flex items-center px-4 h-11 text-sm font-medium text-gray-400 cursor-not-allowed">
              知識カード
            </div>
            <div className="flex items-center px-4 h-11 text-sm font-medium text-gray-400 cursor-not-allowed">
              模擬試験
            </div>
            <div className="flex items-center px-4 h-11 text-sm font-medium text-gray-400 cursor-not-allowed">
              AI質問
            </div>
          </nav>
        </div>
        <div className="p-4 border-t border-gray-100">
          <a href="/" className="flex items-center justify-center w-full h-10 text-xs font-medium text-gray-500 hover:text-gray-900 bg-gray-50 rounded-lg">
            ← トップページへ戻る
          </a>
        </div>
      </aside>

      {/* 右侧内容区域 */}
      <div className="flex-1 pl-[280px]">
        <main className="max-w-[920px] mx-auto px-8 py-10 space-y-8">
          
          {/* 右侧顶部：学习进度卡片 */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 flex items-center justify-between">
            <div className="flex items-center gap-6">
              {/* 圆形进度条 */}
              <div className="relative w-20 h-20 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path className="text-gray-100" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-blue-500" strokeWidth="3" strokeDasharray="25, 100" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <span className="absolute text-base font-black text-gray-900">25%</span>
              </div>
              <div>
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">前回学習</span>
                <h2 className="text-lg font-bold text-gray-900 mt-1">第4章 現金と預金</h2>
                <p className="text-xs text-gray-500">4-1 現金とは</p>
              </div>
            </div>
            <a 
              href="/exams/boki3/guide/ch4"
              className="inline-flex items-center justify-center bg-blue-600 text-white text-sm font-bold h-11 px-5 rounded-lg hover:bg-blue-700 transition-colors"
            >
              続きから学習する
            </a>
          </div>

          {/* 右侧统计区：4个数据 */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="text-xs font-bold text-gray-400 mb-1">学習時間</div>
              <div className="text-2xl font-black text-gray-900">12.5 <span className="text-xs font-normal text-gray-500">時間</span></div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="text-xs font-bold text-gray-400 mb-1">解いた問題数</div>
              <div className="text-2xl font-black text-gray-900">48 <span className="text-xs font-normal text-gray-500">問</span></div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="text-xs font-bold text-gray-400 mb-1">正答率</div>
              <div className="text-2xl font-black text-gray-900">78.2 <span className="text-xs font-normal text-gray-500">%</span></div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="text-xs font-bold text-gray-400 mb-1">連続学習日数</div>
              <div className="text-2xl font-black text-gray-900">5 <span className="text-xs font-normal text-gray-500">日</span></div>
            </div>
          </div>

          {/* 学习工具区：4列布局 */}
          <div className="space-y-4">
            <h3 className="text-base font-black text-gray-900">学習ツール</h3>
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col justify-between h-[160px]">
                <div>
                  <div className="font-bold text-sm text-gray-900 mb-1">学習ガイド</div>
                  <p className="text-xs text-gray-500 leading-normal">各章の分かりやすい解説テキストを網羅。</p>
                </div>
                <a href="/exams/boki3/guide/ch4" className="w-full h-8 text-xs font-bold border border-gray-200 hover:bg-gray-50 rounded-md flex items-center justify-center text-gray-700">開く</a>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col justify-between h-[160px]">
                <div>
                  <div className="font-bold text-sm text-gray-900 mb-1">練習問題</div>
                  <p className="text-xs text-gray-500 leading-normal">一問一答形式で重要論点をしっかり確認。</p>
                </div>
                <a href="/exams/boki3/exercises" className="w-full h-8 text-xs font-bold border border-gray-200 hover:bg-gray-50 rounded-md flex items-center justify-center text-gray-700">開く</a>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-5 opacity-60 flex flex-col justify-between h-[160px]">
                <div>
                  <div className="font-bold text-sm text-gray-400 mb-1">知識カード</div>
                  <p className="text-xs text-gray-400 leading-normal">仕訳や勘定科目を効率的にスピード暗記。</p>
                </div>
                <button disabled className="w-full h-8 text-xs font-bold bg-gray-50 border border-gray-100 rounded-md flex items-center justify-center text-gray-400 cursor-not-allowed">準備中</button>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-5 opacity-60 flex flex-col justify-between h-[160px]">
                <div>
                  <div className="font-bold text-sm text-gray-400 mb-1">模擬試験</div>
                  <p className="text-xs text-gray-400 leading-normal">本試験形式に準拠した予想模試に挑戦。</p>
                </div>
                <button disabled className="w-full h-8 text-xs font-bold bg-gray-50 border border-gray-100 rounded-md flex items-center justify-center text-gray-400 cursor-not-allowed">準備中</button>
              </div>
            </div>
          </div>

          {/* 下面：章一覧 カ片形式 */}
          <div className="space-y-4">
            <h3 className="text-base font-black text-gray-900">章一覧</h3>
            <div className="space-y-2">
              <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-gray-400 w-12">第1章</span>
                  <span className="text-sm font-bold text-gray-800">簿記の基本概念と仕組み</span>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 bg-green-50 text-green-600 rounded">完了</span>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-gray-400 w-12">第2章</span>
                  <span className="text-sm font-bold text-gray-800">仕訳と転記の基礎</span>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 bg-green-50 text-green-600 rounded">完了</span>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-gray-400 w-12">第3章</span>
                  <span className="text-sm font-bold text-gray-800">決算整理前残高試算表</span>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 bg-green-50 text-green-600 rounded">完了</span>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between border-l-4 border-l-blue-500">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-blue-600 w-12">第4章</span>
                  <span className="text-sm font-bold text-gray-900">現金と預金</span>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 bg-blue-50 text-blue-600 rounded">学習中</span>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}