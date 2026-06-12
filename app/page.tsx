"use client";

import React from 'react';
import Link from 'next/link';

// 数据层：后续只需修改这里，无需动 HTML 结构
const heroData = {
  title: "資格合格を、",
  highlight: "無料で。",
  desc: "FP技能士・日商簿記・宅建士など、日本の主要資格に特化した学習プラットフォーム。",
  stats: [
    { num: "100+", label: "練習問題" },
    { num: "5種", label: "学習ツール" },
    { num: "無料", label: "全コンテンツ" },
    { num: "AI", label: "即時解説" }
  ]
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 顶部导航 */}
      <nav className="sticky top-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-xl font-black">資格合格ナビ</div>
          <div className="flex gap-8 items-center text-sm font-bold text-gray-600">
            <select className="bg-transparent cursor-pointer hover:text-black">
              <option>試験一覧</option>
            </select>
            <span className="text-gray-300">AI質問 (準備中)</span>
            <Link href="/exams" className="bg-black text-white px-6 py-2.5 rounded-lg text-sm hover:bg-gray-800 transition">
              無料で始める
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero 区域 */}
      <main className="max-w-[1200px] mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div>
            <span className="bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold tracking-wide">
              完全無料・AI搭載・登録不要
            </span>
            <h1 className="text-7xl font-black mt-8 leading-[1.1] tracking-tighter">
              {heroData.title}<br />
              <span className="text-red-600">{heroData.highlight}</span>
            </h1>
            <p className="text-xl text-gray-500 mt-8 leading-relaxed max-w-md">{heroData.desc}</p>
            <div className="mt-12 flex gap-4">
              <Link href="/exams" className="bg-red-600 text-white px-10 py-5 rounded-2xl font-bold hover:bg-red-700 transition">
                試験を選ぶ
              </Link>
            </div>
          </div>

          {/* 右侧统计卡片 */}
          <div className="grid grid-cols-2 gap-4 bg-gray-950 p-8 rounded-[32px] text-white">
            {heroData.stats.map((stat, i) => (
              <div key={i} className="p-8 border border-gray-800 rounded-2xl">
                <div className="text-4xl font-black mb-2">{stat.num}</div>
                <div className="text-sm text-gray-400 font-bold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* 下方学习工具卡片区域 */}
      <section className="max-w-[1200px] mx-auto px-6 py-20 border-t">
        <h2 className="text-3xl font-black mb-12">5つの学習ツール、すべて無料</h2>
        <div className="grid grid-cols-5 gap-6">
          {['学習ガイド', '練習問題', '模擬試験', '知識カード', 'AI質問'].map((tool, i) => (
            <div key={i} className="p-8 border border-gray-100 rounded-3xl hover:border-gray-200 transition group cursor-pointer">
              <div className="w-12 h-12 bg-gray-50 rounded-2xl mb-6 group-hover:bg-red-50 transition" />
              <h3 className="font-bold text-lg">{tool}</h3>
              <p className="text-sm text-gray-400 mt-2">詳細な説明文がここに入ります。</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}