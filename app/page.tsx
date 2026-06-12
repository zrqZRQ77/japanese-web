'use client';
import React, { useState } from 'react';

export default function HomePage() {
  const [examMenuOpen, setExamMenuOpen] = useState(false);

  // 优雅的锚点平滑滚动函数
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      
      {/* 1 & 2. 顶部导航栏 (按钮、菜单在右侧，加设点击空白收回功能，替换搜索框) */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* 左侧：Logo */}
          <div className="text-xl font-black text-gray-900 tracking-tight">
            資格合格ナビ
          </div>

          {/* 右侧：功能组件区 */}
          <div className="flex items-center gap-8 relative">
            
            {/* 試験一覧 下拉菜单 */}
            <div className="relative">
              <button 
                onClick={() => setExamMenuOpen(!examMenuOpen)}
                className="text-sm font-semibold text-gray-700 hover:text-gray-900 flex items-center gap-1 py-2 transition-colors"
              >
                試験一覧
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {examMenuOpen && (
                <>
                  {/* 功能2：全屏隐形遮罩，点击任意空白处收回菜单 */}
                  <div 
                    className="fixed inset-0 z-40 bg-transparent cursor-default" 
                    onClick={() => setExamMenuOpen(false)} 
                  />
                  {/* 下拉菜单主体 */}
                  <div className="absolute top-full right-0 mt-1 w-52 bg-white border border-gray-200 rounded-xl shadow-xl py-2 z-50">
                    <a href="/exams/boki3" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#F5F8F2] hover:text-[#7A9D54] font-bold transition-colors">
                      日商簿記3級
                    </a>
                    <div className="px-4 py-2.5 text-sm text-gray-400 font-medium">
                      FP技能士3級（準備中）
                    </div>
                    <div className="px-4 py-2.5 text-sm text-gray-400 font-medium">
                      宅地建物取引士（準備中）
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* AI質問 */}
            <span className="text-sm font-semibold text-gray-700 hover:text-gray-900 cursor-pointer transition-colors">
              AI質問
            </span>

            {/* 功能1：完美的圆角搜索框 (彻底替换原本红色的“免费开始”按钮) */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input 
                type="text" 
                placeholder="目指す資格を検索..." 
                className="pl-9 pr-4 py-2 text-sm text-gray-900 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#7A9D54] focus:border-transparent transition-all w-44 lg:w-56"
              />
            </div>

          </div>
        </div>
      </nav>

      {/* Hero 视觉核心区 */}
      <section className="max-w-[1200px] mx-auto px-6 pt-16 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* 左侧文字引导 */}
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F5F8F2] text-[#7A9D54] text-xs font-bold rounded-full border border-[#7A9D54]/20">
              完全無料・AI搭載・登録不要
            </span>
            <h1 className="text-5xl lg:text-6xl font-black text-gray-900 leading-[1.15] tracking-tight">
              資格合格を、<br />
              <span className="text-[#7A9D54]">無料でスムーズに。</span>
            </h1>
            <p className="text-gray-600 text-base lg:text-lg leading-relaxed max-w-xl font-medium">
              FP技能士・日商簿記・宅建士など、日本の主要資格に特化した学習プラットフォーム。
              学習ガイド・練習問題・知識カード・模擬試験がすべて無料。
            </p>
            <div className="pt-2">
              {/* 功能4：点击后平滑滚动到下方的各个考试大致介绍板块 */}
              <button 
                onClick={() => scrollToSection('exam-hall')}
                className="inline-flex items-center justify-center bg-[#7A9D54] text-white text-base font-bold h-14 px-8 rounded-xl hover:bg-[#688a44] shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                試験を選ぶ
              </button>
            </div>
          </div>

          {/* 3. 数据与特点展示区 (摒弃散落割裂感，重构为高内聚细网格一体化面板) */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-gray-200/80 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] p-8 grid grid-cols-2 gap-y-10 gap-x-6 relative overflow-hidden before:absolute before:top-0 before:left-0 before:w-full before:h-1.5 before:bg-[#7A9D54]">
              
              {/* 核心卖点 1 */}
              <div className="space-y-1.5 text-center lg:text-left">
                <div className="text-3xl font-black text-[#7A9D54] tracking-tight flex items-center justify-center lg:justify-start gap-1">
                  <span>100+</span><span className="text-xl font-normal text-gray-400">📝</span>
                </div>
                <div className="text-sm font-bold text-gray-900">練習問題</div>
                <div className="text-xs text-gray-500 font-medium leading-relaxed">厳選された過去問と予想模試</div>
              </div>
              
              {/* 核心卖点 2 */}
              <div className="space-y-1.5 text-center lg:text-left border-l border-gray-100 pl-4 lg:pl-6">
                <div className="text-3xl font-black text-[#7A9D54] tracking-tight flex items-center justify-center lg:justify-start gap-1">
                  <span>5種</span><span className="text-xl font-normal text-gray-400">🛠️</span>
                </div>
                <div className="text-sm font-bold text-gray-900">学習ツール</div>
                <div className="text-xs text-gray-500 font-medium leading-relaxed">単語帳や模擬テストなど</div>
              </div>
              
              {/* 核心卖点 3 */}
              <div className="space-y-1.5 text-center lg:text-left border-t border-gray-100 pt-8">
                <div className="text-3xl font-black text-[#7A9D54] tracking-tight flex items-center justify-center lg:justify-start gap-1">
                  <span>無料</span><span className="text-xl font-normal text-gray-400">✨</span>
                </div>
                <div className="text-sm font-bold text-gray-900">全コンテンツ</div>
                <div className="text-xs text-gray-500 font-medium leading-relaxed">追加の隠し課金一切なし</div>
              </div>
              
              {/* 核心卖点 4 */}
              <div className="space-y-1.5 text-center lg:text-left border-t border-l border-gray-100 pt-8 pl-4 lg:pl-6">
                <div className="text-3xl font-black text-[#7A9D54] tracking-tight flex items-center justify-center lg:justify-start gap-1">
                  <span>AI</span><span className="text-xl font-normal text-gray-400">🤖</span>
                </div>
                <div className="text-sm font-bold text-gray-900">即時解説</div>
                <div className="text-xs text-gray-500 font-medium leading-relaxed">24時間いつでも質問可能</div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 功能3：全新的各个考试大致介绍大厅 (彻底消灭原本跳转后的空页面) */}
      <section id="exam-hall" className="max-w-[1200px] mx-auto px-6 py-20 border-t border-gray-200 scroll-mt-16">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl font-black text-gray-900 mb-4">対応試験一覧と概要介绍</h2>
          <p className="text-gray-500 text-sm font-medium">現在対応している、および近日公開予定の国家資格・公的資格のコア概要です。自分に合った試験から学習を始めましょう。</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* 考试1：日商簿记3级 */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="px-2.5 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-md">人気 No.1</span>
                <span className="text-xs text-gray-400 font-semibold">合格率：约 35%</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">日商簿記3級</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4 font-medium">
                ビジネスパーソンに必須の「会計の基本」をマスター。企業の財務状態や経営成績を読み解く力が身につき、就職・転職活動でも高く評価される王道資格です。
              </p>
              <div className="border-t border-gray-100 pt-3 mb-6">
                <span className="text-xs font-bold text-gray-400 block mb-1">【主な試験範囲】</span>
                <p className="text-xs text-gray-500 font-medium">商品売買・現金預金・固定資産の減価償却・決算整理仕訳・財務諸表の作成</p>
              </div>
            </div>
            <a href="/exams/boki3" className="w-full h-11 bg-[#7A9D54] hover:bg-[#688a44] text-white font-bold text-sm rounded-xl flex items-center justify-center transition-colors">
              学習を開始する
            </a>
          </div>

          {/* 考试2：FP技能士3级 */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between opacity-90">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-md">近日公開</span>
                <span className="text-xs text-gray-400 font-semibold">合格率：约 70%</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">FP技能士3級</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4 font-medium">
                新NISA、保険、年金、税金、相続など、人生設計に直結する「お金の教养」を網羅。自分や家族の資産形成・ライフプラン構築に即座に役立つ実用性の高い資格です。
              </p>
              <div className="border-t border-gray-100 pt-3 mb-6">
                <span className="text-xs font-bold text-gray-400 block mb-1">【主な試験範囲】</span>
                <p className="text-xs text-gray-500 font-medium">ライフプランニング・リスク管理・金融資産運用・タックスプランニング・不動産・相続</p>
              </div>
            </div>
            <button className="w-full h-11 bg-gray-100 text-gray-400 font-bold text-sm rounded-xl cursor-not-allowed">
              コンテンツ準備中
            </button>
          </div>

          {/* 考试3：宅地建物取引士 */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between opacity-90">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="px-2.5 py-1 bg-purple-50 text-purple-700 text-xs font-bold rounded-md">順次公開</span>
                <span className="text-xs text-gray-400 font-semibold">合格率：约 15%</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">宅地建物取引士 (宅建)</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4 font-medium">
                不動産取引の専門家として、重要事項の説明を行うための国家資格。不動产业界への就職はもちろん、金融機関の融資部門や一般企業の総務・法務でも重宝されます。
              </p>
              <div className="border-t border-gray-100 pt-3 mb-6">
                <span className="text-xs font-bold text-gray-400 block mb-1">【主な試験範囲】</span>
                <p className="text-xs text-gray-500 font-medium">宅建業法・権利関係（民法）・法令上の制限・税その他ビジネス実務</p>
              </div>
            </div>
            <button className="w-full h-11 bg-gray-100 text-gray-400 font-bold text-sm rounded-xl cursor-not-allowed">
              コンテンツ準備中
            </button>
          </div>

        </div>
      </section>

      {/* 下面工具区 (完全保留你原始的稳定代码，仅微调间距样式保持美观) */}
      <section className="max-w-[1200px] mx-auto px-6 py-20 border-t border-gray-200">
        <h2 className="text-2xl lg:text-3xl font-black text-gray-900 mb-12 text-center lg:text-left">
          5つの学習ツール、すべて無料
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {/* 1 */}
          <div className="bg-white p-6 border border-gray-200 rounded-xl hover:border-gray-300 transition-all">
            <div className="w-10 h-10 bg-[#F5F8F2] rounded-lg flex items-center justify-center text-[#7A9D54] mb-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 text-base mb-1">学習ガイド</h3>
            <p className="text-xs text-gray-500 leading-relaxed font-medium">体系化された完全オリジナルのオンライン教材。</p>
          </div>
          {/* 2 */}
          <div className="bg-white p-6 border border-gray-200 rounded-xl hover:border-gray-300 transition-all">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 text-base mb-1">練習問題</h3>
            <p className="text-xs text-gray-500 leading-relaxed font-medium">章ごとの定着度を测るハイクオリティ問題集。</p>
          </div>
          {/* 3 */}
          <div className="bg-white p-6 border border-gray-200 rounded-xl hover:border-gray-300 transition-all">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-green-600 mb-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 text-base mb-1">模擬試験</h3>
            <p className="text-xs text-gray-500 leading-relaxed font-medium">本番の出题傾向を完全に再現した模擬テスト。</p>
          </div>
          {/* 4 */}
          <div className="bg-white p-6 border border-gray-200 rounded-xl hover:border-gray-300 transition-all">
            <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600 mb-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 text-base mb-1">知識カード</h3>
            <p className="text-xs text-gray-500 leading-relaxed font-medium">隙間時間で重要語句を暗記できるフラッシュカード。</p>
          </div>
          {/* 5 */}
          <div className="bg-white p-6 border border-gray-200 rounded-xl hover:border-gray-300 transition-all opacity-75">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 mb-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 text-base mb-1">AI質問</h3>
            <p className="text-xs text-gray-500 leading-relaxed font-medium">専属のAIチューターが即時に疑問を解決。</p>
          </div>
        </div>
      </section>

    </div>
  );
}
