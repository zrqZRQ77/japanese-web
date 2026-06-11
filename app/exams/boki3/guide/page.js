"use client";

import React, { useState, useEffect } from 'react';
import Navbar from "../../../../components/Navbar";

// 🎯 直接在内部定义簿记3级（前5章）的纯正日语教材数据，彻底避免路径报错
const localExamDatabase = {
  ch1: {
    num: "1",
    title: "簿記の基本原理と5大要素",
    content: [
      "簿記（ぼき）とは、企業の経営活動を記録・計算・整理し、最終的に財務諸表（決算書）を作成するための技術です。",
      "すべての取引は、「資産」「負債」「純資産」「費用」「収益」の5つのグループのいずれかに分類されます。",
      "簿記では、1つの取引を左側（借方・かりかた）と右側（貸方・かしかた）の2つに分けて記録します。常に「借方の合計金額」と「貸方の合計金額」は一致するという絶対ルール（貸借平均の原理）があります。"
    ]
  },
  ch2: {
    num: "2",
    title: "現金預金と現金過不足",
    content: [
      "帳簿上の現金残高と、金庫にある実際の現金手許有高は、常に一致している必要があります。",
      "ズレを発見した際は、原因が判明するまで一時的に「現金過不足」勘定を使って、帳簿残高を実際の有高に合わせる処理を行います。"
    ]
  },
  ch3: {
    num: "3",
    title: "商品売買（三分法と売掛金・買掛金）",
    content: [
      "日本の簿記で最も一般的な「三分法（さんぶんぽう）」では、商品の売買を「仕入（費用）」「売上（収益）」「繰越商品（資産）」の3つの勘定科目で処理します。",
      "また、代金を後日受け取る権利を「売掛金（うりかけきん）」、後日支払う義務を「買掛金（かいかけきん）」と呼びます。"
    ]
  },
  ch4: {
    num: "4",
    title: "試算表の作成と決算の全体像",
    content: [
      "日々の仕訳が正しく行われているかを検証するため、期末にすべての勘定科目の残高を集計した「試算表（しさんひょう）」を作成します。",
      "試算表の借方合計と貸方合計が一致すれば、ここまでの記帳はおおむね正しいと判定できます。"
    ]
  },
  ch5: {
    num: "5",
    title: "決算整理仕訳（売上原価の計算・減価償却）",
    content: [
      "決算において、帳簿の数字を正しい状態に修正する作業を「決算整理（けっさんせいり）」と呼びます。",
      "特に重要なのが、当期の正しい売上原価を算出する「し・くり・くり・し（仕入／繰越商品・繰越商品／仕入）」の処理です。",
      "また、建物や備品などの固定資産の価値の減少を計算し、費用として計上する「減価償却（げんかしょうきゃく）」の手続きもここで学びます。"
    ]
  }
};

export default function GuideHubPage() {
  const [mounted, setMounted] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState(null); // 控制是否打开详情弹窗或内嵌视图
  const examId = 'boki3';

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const chaptersList = Object.keys(localExamDatabase).map((key) => ({
    id: key,
    ...localExamDatabase[key]
  }));

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: '"Helvetica Neue", Arial, sans-serif' }}>
      <Navbar />
      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 16px' }}>
        
        {/* 头部标题 */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#0f172a', margin: 0 }}>
            学習ガイド ➔ 日商簿記3級
          </h1>
          <p style={{ fontSize: '14px', color: '#64748b', margin: '6px 0 0 0' }}>
            各章の解説テキストを読み、演習問題に挑戦して理解を深めましょう。
          </p>
        </div>

        {/* 详情阅读区域：如果点击了某个章节，直接在上方展开阅读，无需复杂跳转 */}
        {selectedChapter && (
          <div style={{ backgroundColor: '#ffffff', border: '2px solid #b93a26', borderRadius: '16px', padding: '32px', marginBottom: '32px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
              <div>
                <span style={{ fontSize: '12px', fontWeight: '800', color: '#b93a26' }}>第 {selectedChapter.num} 章 解説テキスト</span>
                <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#0f172a', margin: '4px 0 0 0' }}>{selectedChapter.title}</h2>
              </div>
              <button 
                onClick={() => setSelectedChapter(null)}
                style={{ backgroundColor: '#f1f5f9', border: 'none', color: '#64748b', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '700' }}
              >
                ✕ 閉じる
              </button>
            </div>
            
            <div style={{ fontSize: '15px', color: '#334155', lineHeight: '1.85', letterSpacing: '0.2px' }}>
              {selectedChapter.content.map((paragraph, idx) => (
                <p key={idx} style={{ marginBottom: '16px' }}>{paragraph}</p>
              ))}
            </div>

            <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px dashed #e2e8f0', textAlign: 'right' }}>
              <button
                onClick={() => window.location.href = `/exams/${examId}/exercises?ch=${selectedChapter.num}`}
                style={{ padding: '10px 20px', backgroundColor: '#b93a26', color: '#ffffff', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}
              >
                この章の演習問題に進む ➔
              </button>
            </div>
          </div>
        )}

        {/* 章节列表 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {chaptersList.map((chapter) => (
            <div 
              key={chapter.id} 
              style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <div>
                <span style={{ fontSize: '11px', fontWeight: '800', color: '#b93a26', letterSpacing: '0.5px' }}>
                  第 {chapter.num} 章
                </span>
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', margin: '4px 0 8px 0' }}>
                  {chapter.title}
                </h3>
                <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
                  {chapter.content[0].substring(0, 35)}...
                </p>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginLeft: '24px' }}>
                <button 
                  onClick={() => setSelectedChapter(chapter)}
                  style={{ height: '38px', padding: '0 16px', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', fontWeight: '700', color: '#334155', cursor: 'pointer' }}
                >
                  解説テキスト
                </button>
                <button 
                  onClick={() => window.location.href = `/exams/${examId}/exercises?ch=${chapter.num}`}
                  style={{ height: '38px', padding: '0 16px', backgroundColor: '#fff5f5', border: '1px solid #fec2c2', borderRadius: '6px', fontSize: '13px', fontWeight: '700', color: '#b93a26', cursor: 'pointer' }}
                >
                  演習問題
                </button>
              </div>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}
