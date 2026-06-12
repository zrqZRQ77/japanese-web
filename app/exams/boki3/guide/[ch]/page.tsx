'use client';
import React, { useState } from 'react';

export default function GuidePage() {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* 顶部固定导航区 */}
      <header className="h-16 border-b border-gray-200 px-6 flex items-center justify-between bg-white sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <a href="/exams/boki3" className="text-gray-400 hover:text-gray-900">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          </a>
          <span className="font-black text-gray-900 text-base">簿記3級 学習ガイド</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold text-gray-500">学習進捗率</span>
          <div className="w-32 bg-gray-100 h-2 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full w-[25%]" />
          </div>
          <span className="text-xs font-bold text-blue-600">25%</span>
        </div>
      </header>

      <div className="flex flex-1">
        {/* 左侧宽度: 300px 固定滚动目录 */}
        <aside className="w-[300px] border-r border-gray-200 fixed top-16 bottom-0 overflow-y-auto bg-gray-50 p-6 space-y-6">
          <div className="space-y-2">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">章リスト</div>
            
            {/* 第1-3章 */}
            <div className="p-2 text-xs font-bold text-gray-400">第1章 簿記の基本概念</div>
            <div className="p-2 text-xs font-bold text-gray-400">第2章 仕訳と転記の基礎</div>
            <div className="p-2 text-xs font-bold text-gray-400">第3章 残高試算表の作成</div>
            
            {/* 第4章 */}
            <div className="bg-white border border-gray-200 rounded-lg p-2 space-y-1">
              <div className="text-xs font-bold text-gray-900 px-2 py-1 border-b border-gray-100">第4章 現金と預金</div>
              <div className="space-y-0.5">
                <a href="#" className="block px-2 py-1.5 text-xs font-bold text-blue-600 bg-blue-50 rounded">4-1 現金とは</a>
                <div className="px-2 py-1.5 text-xs text-gray-500 cursor-not-allowed">4-2 現金過不足の処理</div>
                <div className="px-2 py-1.5 text-xs text-gray-500 cursor-not-allowed">4-3 当座預金と当座借越し</div>
                <div className="px-2 py-1.5 text-xs text-gray-500 cursor-not-allowed">4-4 小口現金の仕組み</div>
                <div className="px-2 py-1.5 text-xs text-gray-500 cursor-not-allowed">4-5 預金勘定の調整</div>
              </div>
            </div>
          </div>
        </aside>

        {/* 右侧教材内容 */}
        <main className="flex-1 pl-[300px] bg-white">
          <div className="max-w-[720px] mx-auto px-8 py-10 space-y-8">
            
            {/* Breadcrumb */}
            <nav className="text-xs font-bold text-gray-400 flex items-center gap-2">
              <span>第4章 現金と預金</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              <span className="text-gray-700">4-1 現金とは</span>
            </nav>

            {/* 正文区域 */}
            <article className="space-y-6">
              <h1 className="text-2xl font-black text-gray-900 border-b border-gray-100 pb-3">
                4-1 現金とは
              </h1>
              
              <p className="text-sm text-gray-600 leading-relaxed">
                簿記上の「現金」は、私たちが普段使っている紙幣や硬貨（通貨）だけでなく、通貨と同じようにすぐに支払いに使用できる<strong>「通貨代用証券」</strong>も含みます。この点が一般の感覚と異なるため、試験でも非常によく狙われるポイントです。
              </p>

              <h2 className="text-lg font-bold text-gray-900 pt-2">1. 通貨代用証券の具体例</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                銀行に行けばすぐに現金に換金してもらえる証券を指します。具体的には以下のようなものが簿記上で「現金」として処理されます。
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1.5">
                <li><strong>他人振出の小切手</strong>：他人が振り出した小切手を受け取ったときは現金勘定で処理します。</li>
                <li><strong>送金小切手・郵便為替証書</strong>：遠隔地への送金に用いられる証書です。</li>
                <li><strong>配当金領収証</strong>：株主配当金を受け取るための権利証書で、すぐに銀行で現金化できます。</li>
                <li><strong>期限の到来した公社債の利札</strong>：利息を受け取るための利札です。</li>
              </ul>

              {/* 重点框 浅蓝背景 */}
              <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-5 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-black text-blue-700">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  ポイント
                </div>
                <p className="text-xs text-gray-700 leading-relaxed font-medium">
                  「自分が振り出した小切手」が戻ってきた場合は現金ではなく<strong>当座預金</strong>の減少の取消（増加）になります。他人が振り出した小切手のみが「現金」となる点を完全にマスターしましょう。
                </p>
              </div>

              <h3 className="text-base font-bold text-gray-900 pt-2">2. 仕訳の基本パターン</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                売掛金10,000円の回収として、取引先（他人）が振り出した小切手を受け取った。
              </p>
              <div className="bg-gray-50 border border-gray-150 rounded-lg p-4 font-mono text-xs text-gray-800 space-y-1">
                <div className="flex justify-between"><span>（借方）現　　金</span><span>10,000</span><span>／</span><span>（貸方）売掛金</span><span>10,000</span></div>
              </div>
            </article>

            {/* 例题区域 白色卡片 */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
              <div className="inline-flex text-xs font-bold text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded">
                基本例題
              </div>
              <p className="text-sm font-bold text-gray-900 leading-normal">
                次のうち、日商簿記3級の帳簿上で「現金」として処理されないものはどれですか？
              </p>
              <div className="grid grid-cols-1 gap-2 text-xs">
                <div className="p-3 border border-gray-200 rounded-lg bg-gray-50">A. 他人振出の小切手</div>
                <div className="p-3 border border-gray-200 rounded-lg bg-gray-50">B. 配当金領収証</div>
                <div className="p-3 border border-gray-200 rounded-lg bg-gray-50 font-bold text-red-600 border-red-200">C. 店振出の小切手（自社振出）</div>
                <div className="p-3 border border-gray-200 rounded-lg bg-gray-50">D. 郵便為替証書</div>
              </div>
              <div className="pt-2">
                <button 
                  onClick={() => setShowAnswer(!showAnswer)}
                  className="w-full h-10 border border-gray-200 text-xs font-bold rounded-lg hover:bg-gray-50 text-gray-700 transition-colors"
                >
                  {showAnswer ? "解説を閉じる" : "解答を見る"}
                </button>
              </div>
              {showAnswer && (
                <div className="text-xs bg-gray-50 border border-gray-150 rounded-lg p-4 text-gray-600 leading-relaxed">
                  <strong>正解：C</strong><br />
                  自社（当店）が振り出した小切手は、発行時に「当座預金」勘定の減少として処理しているため、それが戻ってきた場合は当座預金勘定の増加として仕訳を行います。
                </div>
              )}
            </div>

            {/* 底部导航 3按钮横向排列 */}
            <div className="pt-6 border-t border-gray-100 flex items-center justify-between gap-4">
              <button disabled className="flex-1 h-11 border border-gray-200 rounded-lg text-xs font-bold text-gray-300 cursor-not-allowed bg-gray-50 text-center">
                前の項目
              </button>
              <a href="/exams/boki3" className="flex-1 h-11 border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-50 flex items-center justify-center text-center">
                本章のトップに戻る
              </a>
              <button disabled className="flex-1 h-11 border border-gray-200 rounded-lg text-xs font-bold text-gray-300 cursor-not-allowed bg-gray-50 text-center">
                次の項目
              </button>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}