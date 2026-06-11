"use client";

import React, { useState, useEffect } from 'react';
import Navbar from "../../../../components/Navbar";

export default function ExercisesPage() {
  const [mounted, setMounted] = useState(false);
  const [examId, setExamId] = useState('boki3');
  const [targetChapter, setTargetChapter] = useState(null); // URLの ?ch= を格納
  
  // クイズ回答用の各種状態管理
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null); // ユーザーが選んだ選択肢
  const [isAnswered, setIsAnswered] = useState(false); // 解答済みかどうか
  const [score, setScore] = useState(0); // 正解数

  // 🎰 日本の試験に100%適した一問一答クイズデータベース
  const quizDatabase = {
    boki3: [
      { ch: "1", q: "現金10,000円を元入れして営業を開始した。この場合、借方（左側）に計上される勘定科目はどれか？", options: ["現金", "資本金", "売掛金", "当座預金"], ans: 0, hint: "元入れにより、資産である「現金」が増加するため、借方に「現金」を計上します。貸方（右側）は「資本金」となります。" },
      { ch: "1", q: "商品の発送運賃5,000円を現金で支払った。当店（発送元）が負担する契約である場合、借方の勘定科目は？", options: ["仕入", "発送費", "売上", "立替金"], ans: 1, hint: "当店負担の発送運賃は「発送費（または支払運賃）」という費用の発生として処理します。" },
      { ch: "2", q: "金庫を調査したところ、実際の現金が帳簿残高より2,000円多かった。この時点で処理する勘定科目はどれか？", options: ["現金過不足", "雑収入", "雑損失", "売上"], ans: 0, hint: "実際の現金が多い（帳簿が少ない）場合、まず帳簿の現金を増やし、相手勘定に「現金過不足」を計上して原因を調査します。" },
      { ch: "3", q: "商品50,000円を売り上げ、代金は掛けとした。この際の借方（左側）の適切な勘定科目はどれか？", options: ["買掛金", "売掛金", "受取手形", "現金"], ans: 1, hint: "後で代金を受け取る権利（資産）が発生したため、借方に「売掛金」を計上します。" }
    ],
    boki2: [
      { ch: "1", q: "株主総会において、繰越利益剰余金から1,000,000円の配当を行うことが決議された。この際に計上する負債の科目はどれか？", options: ["未払配当金", "利益準備金", "資本準備金", "未払金"], ans: 0, hint: "決議時点ではまだ配当金は支払われていないため、確定債務として「未払配当金（負債）」を計上します。" },
      { ch: "3", q: "製品の製造のために、素材である鉄板500,000円分を消費した。このコストは原価計算上、どの分類に属するか？", options: ["直接材料費", "間接材料費", "直接労務費", "製造間接費"], ans: 0, hint: "製品に直接追跡できる主要な材料の消費なので「直接材料費」に分類されます。" }
    ],
    fp3: [
      { ch: "1", q: "日本の公的年金制度において、日本国内に住所を有する20歳以上60歳未満のすべての人が加入する年金は何というか？", options: ["国民年金", "厚生年金", "確定拠出年金", "企業年金"], ans: 0, hint: "日本は国民皆年金であり、20歳以上60歳未満の全員が「国民年金（基礎年金）」の被保険者となります。" },
      { ch: "3", q: "日本の所得税において、1年間の総所得金額から一律で差し引くことができる最も基本的な「所得控除」はどれか？", options: ["基礎控除", "配偶者控除", "医療費控除", "生命保険料控除"], ans: 0, hint: "納税者全員に無条件で適用されるのが「基礎控除（合計所得2,400万円以下で48万円）」です。" }
    ]
  };

  useEffect(() => {
    setMounted(true);
    
    if (typeof window !== 'undefined') {
      // 1. URLパスから examId を抽出
      const pathSegments = window.location.pathname.split('/');
      const examsIndex = pathSegments.indexOf('exams');
      let currentId = 'boki3';
      if (examsIndex !== -1 && pathSegments[examsIndex + 1]) {
        currentId = pathSegments[examsIndex + 1].toLowerCase();
        setExamId(currentId);
      }

      // 2. URLパラメータから ?ch= を抽出
      const searchParams = new URLSearchParams(window.location.search);
      const chParam = searchParams.get('ch');
      if (chParam) {
        setTargetChapter(chParam);
      }
    }
  }, []);

  // 該当する試験の全問題を取得（データがない場合は簿記3級で兜底保護）
  const allExamQuestions = quizDatabase[examId] || quizDatabase['boki3'];

  // 章（Chapter）のパラメータがある場合はフィルタリング、ない場合は全章表示
  const filteredQuestions = targetChapter 
    ? allExamQuestions.filter(q => q.ch === targetChapter)
    : allExamQuestions;

  if (!mounted) return null;

  // 万が一問題が1問も存在しない場合の処理
  if (filteredQuestions.length === 0) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
        <Navbar />
        <div style={{ maxWidth: '600px', margin: '80px auto', textAlign: 'center', padding: '24px' }}>
          <p style={{ color: '#64748b', fontSize: '16px', fontWeight: '700' }}>現在、指定された章の演習問題は準備中です。</p>
          <button onClick={() => window.history.back()} style={{ marginTop: '20px', padding: '8px 16px', backgroundColor: '#b93a26', color: '#ffffff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '700' }}>戻る</button>
        </div>
      </div>
    );
  }

  const currentQuestion = filteredQuestions[currentQuestionIndex];

  // ユーザーが選択肢をクリックしたときの信号機判定処理
  const handleOptionClick = (optionIndex) => {
    if (isAnswered) return; // 回答済みなら何もしない
    
    setSelectedAnswer(optionIndex);
    setIsAnswered(true);
    
    if (optionIndex === currentQuestion.ans) {
      setScore(score + 1);
    }
  };

  // 次の問題へ進む処理
  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  // 終了画面のリセット処理
  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: '"Helvetica Neue", Arial, sans-serif' }}>
      <Navbar />

      <main style={{ maxWidth: '700px', margin: '0 auto', padding: '40px 16px' }}>
        
        {/* 上部タイトルエリア */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
          <div>
            <span style={{ fontSize: '12px', fontWeight: '800', color: '#b93a26', backgroundColor: '#fff5f5', padding: '3px 8px', borderRadius: '4px' }}>
              {targetChapter ? `第 ${targetChapter} 章 限定演習` : '総合演習モード'}
            </span>
            <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', margin: '6px 0 0 0' }}>一問一答・スピード演習</h2>
          </div>
          
          {/* 進捗カウンター */}
          {currentQuestionIndex < filteredQuestions.length && (
            <div style={{ fontSize: '14px', fontWeight: '700', color: '#475569' }}>
              <span style={{ fontSize: '20px', color: '#b93a26', fontWeight: '900' }}>{currentQuestionIndex + 1}</span> / {filteredQuestions.length} 問目
            </div>
          )}
        </div>

        {currentQuestionIndex < filteredQuestions.length ? (
          /* ✍️ クイズ進行中の画面 */
          <div>
            {/* 問題文ボックス */}
            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '28px', marginBottom: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
              <p style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b', margin: 0, lineHeight: '1.6' }}>
                {currentQuestion.q}
              </p>
            </div>

            {/* 選択肢リスト（信号機判定インタラクション搭載） */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {currentQuestion.options.map((option, idx) => {
                // ボタンの動的カラーリング決定
                let btnBgColor = '#ffffff';
                let btnBorderColor = '#e2e8f0';
                let btnTextColor = '#334155';

                if (isAnswered) {
                  if (idx === currentQuestion.ans) {
                    // 正解の選択肢は常に「緑色」に光る
                    btnBgColor = '#ecfdf5';
                    btnBorderColor = '#10b981';
                    btnTextColor = '#065f46';
                  } else if (selectedAnswer === idx && selectedAnswer !== currentQuestion.ans) {
                    // ユーザーが選んで間違えた選択肢は「赤色」に光る
                    btnBgColor = '#fef2f2';
                    btnBorderColor = '#ef4444';
                    btnTextColor = '#991b1b';
                  } else {
                    // それ以外の選択肢は薄くなって沈む
                    btnBgColor = '#ffffff';
                    btnBorderColor = '#f1f5f9';
                    btnTextColor = '#94a3b8';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(idx)}
                    disabled={isAnswered}
                    style={{
                      width: '100%',
                      padding: '18px 24px',
                      backgroundColor: btnBgColor,
                      border: `1px solid ${btnBorderColor}`,
                      borderRadius: '8px',
                      fontSize: '15px',
                      fontWeight: '700',
                      color: btnTextColor,
                      textAlign: 'left',
                      cursor: isAnswered ? 'default' : 'pointer',
                      transition: 'all 0.15s ease',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.01)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span>{idx + 1}. &nbsp; {option}</span>
                    {isAnswered && idx === currentQuestion.ans && <span style={{ color: '#10b981', fontSize: '18px' }}>✓ 正解</span>}
                    {isAnswered && selectedAnswer === idx && selectedAnswer !== currentQuestion.ans && <span style={{ color: '#ef4444', fontSize: '18px' }}>✗ 不正解</span>}
                  </button>
                );
              })}
            </div>

            {/* 📖 原位解説パネル（解答後に滑らかに出現） */}
            {isAnswered && (
              <div style={{ marginTop: '24px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderLeft: '4px solid #b93a26', borderRadius: '8px', padding: '24px', animation: 'fadeIn 0.3s ease' }}>
                <h4 style={{ fontSize: '14px', fontWeight: '900', color: '#b93a26', margin: '0 0 8px 0', letterSpacing: '0.5px' }}>📝 解説</h4>
                <p style={{ fontSize: '13.5px', color: '#475569', margin: '0 0 20px 0', lineHeight: '1.6', fontWeight: '500' }}>
                  {currentQuestion.hint}
                </p>
                
                {/* 次へ進むボタン */}
                <button
                  onClick={handleNextQuestion}
                  style={{ width: '100%', height: '46px', backgroundColor: '#0f172a', color: '#ffffff', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', transition: 'background-color 0.15s ease' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1e293b'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0f172a'}
                >
                  {currentQuestionIndex + 1 === filteredQuestions.length ? '結果を確認する' : '次の問題へ ➔'}
                </button>
              </div>
            )}
          </div>
        ) : (
          /* 🏆 クイズ終了後のリザルト画面 */
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '40px 32px', textAlign: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.01)' }}>
            <span style={{ fontSize: '48px' }}>🏆</span>
            <h3 style={{ fontSize: '22px', fontWeight: '900', color: '#0f172a', margin: '16px 0 8px 0' }}>演習終了</h3>
            <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 24px 0', fontWeight: '500' }}>お疲れ様でした！今回の結果は以下の通りです。</p>
            
            {/* スコア表示サークル */}
            <div style={{ width: '160px', height: '160px', borderRadius: '50%', backgroundColor: '#fff5f5', margin: '0 auto 32px auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '2px dashed #fee2e2' }}>
              <span style={{ fontSize: '12px', fontWeight: '800', color: '#64748b' }}>正解率</span>
              <span style={{ fontSize: '32px', fontWeight: '900', color: '#b93a26', margin: '4px 0' }}>
                {score} / {filteredQuestions.length}
              </span>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8' }}>（問中）</span>
            </div>

            {/* アクションボタン（2翼配置） */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => { if (typeof window !== 'undefined') window.location.href = `/exams/${examId}/guide`; }}
                style={{ flex: 1, height: '46px', backgroundColor: '#f1f5f9', color: '#334155', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}
              >
                ダッシュボードに戻る
              </button>
              <button
                onClick={handleReset}
                style={{ flex: 1, height: '46px', backgroundColor: '#b93a26', color: '#ffffff', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}
              >
                もう一度挑戦する
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}