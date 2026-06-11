"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ExamExercisesPage() {
  const params = useParams();
  const examId = params.examId || 'boki3';

  // 簿記3級の厳選リアル問題データベース（1章〜4章に対応）
  const exercisesData = [
    {
      id: 1,
      chapter: 'ch1',
      chapterTitle: '第1章 • 簿記の根本原理',
      question: '現金 5,000,000円を出資して、新しくカフェを開業し、営業を開始した。',
      correct: {
        drSubject: '現金', drAmount: '5000000',
        crSubject: '資本金', crAmount: '5000000'
      },
      hint: '左側（借方）は手元に増えた「運用の姿（資産）」、右側（貸方）は返す必要のない「調達の源泉（純資産）」が入ります。',
      explanation: '出資によって手元の「現金（資産）」が5,000,000円増加するため、借方に記録します。同時に、これは元手となる自分のお金なので「資本金（純資産）」の増加として貸方に記録します。'
    },
    {
      id: 2,
      chapter: 'ch2',
      chapterTitle: '第2章 • 仕訳のルール',
      question: '銀行から現金 1,000,000円を借り入れ、直ちに手元に引き取った。',
      correct: {
        drSubject: '現金', drAmount: '1000000',
        crSubject: '借入金', crAmount: '1000000'
      },
      hint: 'お金を借りたことで、手元の「現金」が増えるのと同時に、将来返さなければならない「義務」も増えています。',
      explanation: '現金（資産）が1,000,000円増加したため借方に書きます。後で返済する義務は「借入金（負債）」という箱になり、負債の増加（ホームポジション）として貸方に記録します。'
    },
    {
      id: 3,
      chapter: 'ch3',
      chapterTitle: '第3章 • 主要勘定科目の実務',
      question: 'A商店から商品 200,000円を仕入れ、代金は掛け（ツケ）とした。',
      correct: {
        drSubject: '仕入', drAmount: '2000000',
        crSubject: '買掛金', crAmount: '2000000'
      },
      hint: '商品を仕入れたということは「費用」が発生したということ。ツケで買った義務はどの箱でしょう？',
      explanation: '商品の仕入れは「仕入（費用）」の発生として借方に記録します。商品売買のツケで、後でお金を支払う義務は「買掛金（負債）」の増加として貸方に記録します。'
    },
    {
      id: 4,
      chapter: 'ch4',
      chapterTitle: '第4章 • 試算表と決算の全体像',
      question: 'かねてよりツケていた売掛金 300,000円が、当座預金口座に振り込まれた。',
      correct: {
        drSubject: '当座預金', drAmount: '300000',
        crSubject: '売掛金', crAmount: '300000'
      },
      hint: '預金という「新しい資産」が増えた代わりに、後でお金を回収できるはずだった「権利（資産）」が役目を終えて消滅します。',
      explanation: '当座預金（資産）が増加したため借方に記録します。これまで持っていた「売掛金（資産）」という権利はお金を回収できたことで消滅するため、資産の減少として逆側の貸方に書いて消去します。'
    }
  ];

  // 選択可能な日本の簿記3級標準の勘定科目一覧
  const subjects = ['選択してください', '現金', '当座預金', '売掛金', '仕入', '買掛金', '借入金', '資本金', '売上'];

  // 状態管理（タブ、入力値、判定結果）
  const [activeTab, setActiveTab] = useState('all');
  const [userAnswers, setUserAnswers] = useState({});
  const [results, setResults] = useState({});

  // 入力変更ハンドラー
  const handleInputChange = (id, field, value) => {
    setUserAnswers(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value
      }
    }));
  };

  // 答え合わせロジック（厳格な左右一致チェック）
  const checkAnswer = (id, correct) => {
    const ans = userAnswers[id] || {};
    
    const isDrSubjectCorrect = ans.drSubject === correct.drSubject;
    const isDrAmountCorrect = ans.drAmount === correct.drAmount;
    const isCrSubjectCorrect = ans.crSubject === correct.crSubject;
    const isCrAmountCorrect = ans.crAmount === correct.crAmount;

    const isAllCorrect = isDrSubjectCorrect && isDrAmountCorrect && isCrSubjectCorrect && isCrAmountCorrect;

    setResults(prev => ({
      ...prev,
      [id]: {
        checked: true,
        isCorrect: isAllCorrect,
        details: { isDrSubjectCorrect, isDrAmountCorrect, isCrSubjectCorrect, isCrAmountCorrect }
      }
    }));
  };

  // タブによる問題のフィルタリング
  const filteredExercises = activeTab === 'all' 
    ? exercisesData 
    : exercisesData.filter(ex => ex.chapter === activeTab);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: '"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", Meiryo, sans-serif', color: '#111111' }}>
      
      {/* 🚀 共通ヘッダー */}
      <header style={{ background: '#ffffff', padding: '16px 40px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href="/" style={{ fontWeight: '900', fontSize: '22px', color: '#111111', textDecoration: 'none' }}>
            合格<span style={{ color: '#b93a26' }}>ナビ</span>
          </Link>
          <span style={{ color: '#e2e8f0' }}>|</span>
          <span style={{ fontSize: '14px', fontWeight: '700', color: '#64748b' }}>日商簿記3級 スピード仕訳演習</span>
        </div>
        <Link href={`/exams/${examId}/guide`} style={{ color: '#666666', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>
          ← テキスト目次に戻る
        </Link>
      </header>

      {/* 🎰 メインコンテナ */}
      <div style={{ maxWidth: '840px', margin: '0 auto', padding: '40px 20px' }}>
        
        {/* タイトルエリア */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '900', color: '#111111', margin: '0 0 8px 0' }}>仕訳マスター特訓モード</h1>
          <p style={{ margin: 0, color: '#64748b', fontSize: '15px' }}>勘定科目と金額を選んで「解答する」を押してください。ミスの原因を即座に分解判定します。</p>
        </div>

        {/* 🗂️ 絞り込みカテゴリータブ */}
        <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginBottom: '32px', overflowX: 'auto' }}>
          {[
            { id: 'all', label: 'すべての問題' },
            { id: 'ch1', label: '第1章 根本原理' },
            { id: 'ch2', label: '第2章 ルール基礎' },
            { id: 'ch3', label: '第3章 主要科目' },
            { id: 'ch4', label: '第4章 決算全体像' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: 'none',
                backgroundColor: activeTab === tab.id ? '#111111' : '#ffffff',
                color: activeTab === tab.id ? '#ffffff' : '#475569',
                fontSize: '13.5px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: activeTab === tab.id ? 'none' : '0 1px 2px rgba(0,0,0,0.05)',
                whiteSpace: 'nowrap'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 📋 問題カード群リスト */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {filteredExercises.map((ex, index) => {
            const ans = userAnswers[ex.id] || { drSubject: '', drAmount: '', crSubject: '', crAmount: '' };
            const res = results[ex.id] || { checked: false, isCorrect: false, details: {} };

            return (
              <div key={ex.id} style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', padding: '28px', position: 'relative' }}>
                
                {/* 章バッジ */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span style={{ color: '#b93a26', fontSize: '12px', fontWeight: '800', letterSpacing: '0.5px' }}>{ex.chapterTitle}</span>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#94a3b8' }}>Q.{index + 1}</span>
                </div>

                {/* 問題文 */}
                <div style={{ fontSize: '17px', fontWeight: '700', lineHeight: '1.6', color: '#111111', marginBottom: '24px', background: '#f8fafc', padding: '16px 20px', borderRadius: '8px', borderLeft: '4px solid #111111' }}>
                  {ex.question}
                </div>

                {/* ✍️ 仕訳入力エリア（借方・貸方双欄） */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px', position: 'relative' }}>
                  
                  {/* 左側：借方 (Debit) */}
                  <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', backgroundColor: '#fafafa' }}>
                    <div style={{ fontSize: '11px', fontWeight: '800', color: '#64748b', marginBottom: '10px', letterSpacing: '0.5px' }}>借方 (左側)</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <select
                        value={ans.drSubject}
                        onChange={(e) => handleInputChange(ex.id, 'drSubject', e.target.value)}
                        style={{ padding: '10px', borderRadius: '6px', border: res.checked && !res.details.isDrSubjectCorrect ? '2px solid #ef4444' : '1px solid #cbd5e1', fontSize: '14.5px', fontWeight: '600', backgroundColor: '#ffffff' }}
                      >
                        {subjects.map(s => <option key={s} value={s === '選択してください' ? '' : s}>{s}</option>)}
                      </select>
                      <input
                        type="number"
                        placeholder="金額を入力"
                        value={ans.drAmount}
                        onChange={(e) => handleInputChange(ex.id, 'drAmount', e.target.value)}
                        style={{ padding: '10px', borderRadius: '6px', border: res.checked && !res.details.isDrAmountCorrect ? '2px solid #ef4444' : '1px solid #cbd5e1', fontSize: '14.5px' }}
                      />
                    </div>
                  </div>

                  {/* 右側：貸方 (Credit) */}
                  <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', backgroundColor: '#fafafa' }}>
                    <div style={{ fontSize: '11px', fontWeight: '800', color: '#64748b', marginBottom: '10px', letterSpacing: '0.5px' }}>貸方 (右側)</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <select
                        value={ans.crSubject}
                        onChange={(e) => handleInputChange(ex.id, 'crSubject', e.target.value)}
                        style={{ padding: '10px', borderRadius: '6px', border: res.checked && !res.details.isCrSubjectCorrect ? '2px solid #ef4444' : '1px solid #cbd5e1', fontSize: '14.5px', fontWeight: '600', backgroundColor: '#ffffff' }}
                      >
                        {subjects.map(s => <option key={s} value={s === '選択してください' ? '' : s}>{s}</option>)}
                      </select>
                      <input
                        type="number"
                        placeholder="金額を入力"
                        value={ans.crAmount}
                        onChange={(e) => handleInputChange(ex.id, 'crAmount', e.target.value)}
                        style={{ padding: '10px', borderRadius: '6px', border: res.checked && !res.details.isCrAmountCorrect ? '2px solid #ef4444' : '1px solid #cbd5e1', fontSize: '14.5px' }}
                      />
                    </div>
                  </div>

                </div>

                {/* 🔘 アクション・判定判定 */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', color: '#64748b', maxWidth: '60%' }}>💡 <strong>ヒント:</strong> {ex.hint}</span>
                  <button
                    onClick={() => checkAnswer(ex.id, ex.correct)}
                    style={{
                      backgroundColor: '#111111',
                      color: '#ffffff',
                      border: 'none',
                      padding: '12px 24px',
                      borderRadius: '6px',
                      fontSize: '14.5px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s'
                    }}
                  >
                    解答する
                  </button>
                </div>

                {/* 📢 解答後のインタラクティブフィードバック（正解・不正解エリア） */}
                {res.checked && (
                  <div style={{ marginTop: '24px', padding: '20px', borderRadius: '8px', backgroundColor: res.isCorrect ? '#f0fdf4' : '#fef2f2', border: res.isCorrect ? '1px solid #bbf7d0' : '1px solid #fecaca' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                      {res.isCorrect ? (
                        <span style={{ color: '#16a34a', fontWeight: '900', fontSize: '18px' }}>🎉 正解（素晴らしい！）</span>
                      ) : (
                        <span style={{ color: '#dc2626', fontWeight: '900', fontSize: '18px' }}>❌ 不正解（赤マスの部分を見直そう）</span>
                      )}
                    </div>
                    <div style={{ fontSize: '14.5px', lineHeight: '1.7', color: '#334155' }}>
                      <strong style={{ color: '#111111', display: 'block', marginBottom: '4px' }}>【超わかりやすい解説】</strong>
                      {ex.explanation}
                    </div>
                    {!res.isCorrect && (
                      <div style={{ marginTop: '12px', paddingLeft: '12px', borderLeft: '3px solid #dc2626', fontSize: '13px', color: '#7f1d1d' }}>
                        正解の組み合わせ： 借方：<strong>{ex.correct.drSubject}</strong> ({Number(ex.correct.drAmount).toLocaleString()}円) ／ 貸方：<strong>{ex.correct.crSubject}</strong> ({Number(ex.correct.crAmount).toLocaleString()}円)
                      </div>
                    )}
                  </div>
                )}

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}