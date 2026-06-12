'use client';
import React, { useState } from 'react';

export default function ExercisePage() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [markedForReview, setMarkedForReview] = useState(false);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans py-12 px-4">
      <div className="max-w-[700px] mx-auto space-y-6">
        
        {/* 顶部返回链接 */}
        <div className="flex items-center">
          <a href="/exams/boki3" className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            日商簿記3級
          </a>
        </div>

        {/* 主卡片 */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 space-y-6">
          {/* 顶部章节标签徽章 */}
          <div>
            <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-md">
              第4章 現金と預金
            </span>
          </div>

          {/* 题目文字 */}
          <p className="text-[17px] font-bold text-gray-900 leading-[1.8]">
            取引先から売掛金の回収として「他人振出の小切手」50,000円を受け取り、直ちに当座預金に預け入れた。この時の正しい仕訳を選びなさい。
          </p>

          {/* 4个选项垂直排列 */}
          <div className="space-y-2.5">
            {/* 选项 A (错误答案) */}
            <button 
              onClick={() => handleOptionClick('A')}
              className={`w-full text-left p-4 border rounded-xl flex items-center justify-between transition-colors text-sm font-medium ${
                selectedOption === 'A' 
                  ? 'bg-red-50 border-red-500 text-red-700' 
                  : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-6 h-6 text-xs font-bold rounded-full border flex items-center justify-center shrink-0 ${
                  selectedOption === 'A' ? 'bg-red-500 border-red-500 text-white' : 'border-gray-300 text-gray-500'
                }`}>
                  A
                </span>
                <span>（借方）当座預金 50,000 ／ （貸方）売上高 50,000</span>
              </div>
              {selectedOption === 'A' && (
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              )}
            </button>

            {/* 选项 B (正确答案) */}
            <button 
              onClick={() => handleOptionClick('B')}
              className={`w-full text-left p-4 border rounded-xl flex items-center justify-between transition-colors text-sm font-medium ${
                selectedOption === 'B' 
                  ? 'bg-green-50 border-green-500 text-green-700' 
                  : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-6 h-6 text-xs font-bold rounded-full border flex items-center justify-center shrink-0 ${
                  selectedOption === 'B' ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 text-gray-500'
                }`}>
                  B
                </span>
                <span>（借方）当座預金 50,000 ／ （貸方）売掛金 50,000</span>
              </div>
              {selectedOption === 'B' && (
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
              )}
            </button>

            {/* 选项 C (未选示范) */}
            <button 
              onClick={() => handleOptionClick('C')}
              className={`w-full text-left p-4 border rounded-xl flex items-center justify-between transition-colors text-sm font-medium ${
                selectedOption === 'C' 
                  ? 'bg-red-50 border-red-500 text-red-700' 
                  : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-6 h-6 text-xs font-bold rounded-full border flex items-center justify-center shrink-0 ${
                  selectedOption === 'C' ? 'bg-red-500 border-red-500 text-white' : 'border-gray-300 text-gray-500'
                }`}>
                  C
                </span>
                <span>（借方）現　　金 50,000 ／ （貸方）売掛金 50,000</span>
              </div>
              {selectedOption === 'C' && (
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              )}
            </button>

            {/* 选项 D (未选示范) */}
            <button 
              onClick={() => handleOptionClick('D')}
              className={`w-full text-left p-4 border rounded-xl flex items-center justify-between transition-colors text-sm font-medium ${
                selectedOption === 'D' 
                  ? 'bg-red-50 border-red-500 text-red-700' 
                  : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-6 h-6 text-xs font-bold rounded-full border flex items-center justify-center shrink-0 ${
                  selectedOption === 'D' ? 'bg-red-500 border-red-500 text-white' : 'border-gray-300 text-gray-500'
                }`}>
                  D
                </span>
                <span>（借方）当座預金 50,000 ／ （貸方）現金過不足 50,000</span>
              </div>
              {selectedOption === 'D' && (
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              )}
            </button>
          </div>

          {/* 解析区域 (选中答案后显现) */}
          {selectedOption && (
            <div className="bg-gray-50 border border-gray-150 rounded-xl p-5 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700">
                <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                解説
              </div>
              <p className="text-xs text-gray-600 leading-[1.8]">
                他人振出の小切手を受け取った場合は、通常は「現金」勘定の増加となりますが、本問では<strong>「直ちに当座預金に預け入れた」</strong>と記載されているため、直接<strong>「当座預金」</strong>の増加として処理します。また、原因は売掛金の回収であるため、貸方は売掛金の減少となります。
              </p>
            </div>
          )}

          {/* 底部一行 */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            <label className="inline-flex items-center gap-2 text-xs font-medium text-gray-600 cursor-pointer select-none">
              <input 
                type="checkbox" 
                checked={markedForReview}
                onChange={(e) => setMarkedForReview(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" 
              />
              後で見直す
            </label>
            <button className="inline-flex items-center justify-center bg-blue-600 text-white text-xs font-bold h-10 px-5 rounded-lg hover:bg-blue-700 transition-colors gap-1">
              次の問題
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>

        {/* 底部问题列表 */}
        <div className="flex justify-center items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-green-500 text-white text-xs font-bold flex items-center justify-center">1</div>
          <div className="w-8 h-8 rounded-full bg-green-500 text-white text-xs font-bold flex items-center justify-center">2</div>
          <div className="w-8 h-8 rounded-full bg-green-500 text-white text-xs font-bold flex items-center justify-center">3</div>
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white text-xs font-black flex items-center justify-center border-2 border-blue-200">4</div>
          <div className={`w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center border ${markedForReview ? 'border-amber-500 text-amber-600 bg-amber-50' : 'border-gray-300 text-gray-500'}`}>5</div>
          <div className="w-8 h-8 rounded-full border border-gray-200 text-gray-300 text-xs font-medium flex items-center justify-center">6</div>
          <div className="w-8 h-8 rounded-full border border-gray-200 text-gray-300 text-xs font-medium flex items-center justify-center">7</div>
          <div className="w-8 h-8 rounded-full border border-gray-200 text-gray-300 text-xs font-medium flex items-center justify-center">8</div>
          <div className="w-8 h-8 rounded-full border border-gray-200 text-gray-300 text-xs font-medium flex items-center justify-center">9</div>
          <div className="w-8 h-8 rounded-full border border-gray-200 text-gray-300 text-xs font-medium flex items-center justify-center">10</div>
        </div>

      </div>
    </div>
  );
}