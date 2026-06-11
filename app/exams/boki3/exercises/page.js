"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ExamExercisesPage() {
  const params = useParams();
  const examId = params.examId || 'boki3';

  // 簿記3級の厳選リアル問題データベース（1章〜4章の論点を完全網羅）
  const exercisesData = [
    // --- 第1章：簿記の根本原理 ---
    {
      id: 1,
      chapter: 'ch1',
      chapterTitle: '第1章 • 簿記の根本原理',
      question: '現金 5,000,000円を出資して、新しくカフェを開業し、営業を開始した。',
      correct: { drSubject: '現金', drAmount: '5000000', crSubject: '資本金', crAmount: '5000000' },
      hint: '左側は手元に増えた資産、右側は元手となる自分のお金（純資産）です。',
      explanation: '出資によって手元の「現金（資産）」が5,000,000円増加するため、借方に記録します。同時に、これは元手となる自分のお金なので「資本金（純資産）」の増加として貸方に記録します。'
    },
    {
      id: 2,
      chapter: 'ch1',
      chapterTitle: '第1章 • 簿記の根本原理',
      question: '店舗の家賃 120,000円を現金で支払った。',
      correct: { drSubject: '支払家賃', drAmount: '120000', crSubject: '現金', crAmount: '120000' },
      hint: '家賃の支払いはサービスの消費。お金が出ていった原因（費用）を左に書きます。',
      explanation: '家賃の支払いは「支払家賃（費用）」の発生として借方（左）に記録します。同時に、手元の「現金（資産）」が減少するため、資産の減少として貸方（右）に記録します。'
    },
    {
      id: 3,
      chapter: 'ch1',
      chapterTitle: '第1章 • 簿記の根本原理',
      question: '顧客にコンサルティングサービスを提供し、報酬 150,000円を現金で受け取った。',
      correct: { drSubject: '現金', drAmount: '150000', crSubject: '受取手数料', crAmount: '150000' },
      hint: '現金が増えた理由は何ですか？稼いだ会社の成果（収益）を右に記録します。',
      explanation: '「現金（資産）」が150,000円増加したため借方に記録します。その原因はサービス提供による稼ぎなので、「受取手数料（収益）」の発生として貸方に記録します。'
    },

    // --- 第2章：仕訳のルール ---
    {
      id: 4,
      chapter: 'ch2',
      chapterTitle: '第2章 • 仕訳のルール',
      question: '銀行から現金 1,000,000円を借り入れ、直ちに手元に引き取った。',
      correct: { drSubject: '現金', drAmount: '1000000', crSubject: '借入金', crAmount: '1000000' },
      hint: 'お金が増えると同時に、将来返さなければならない義務（負債）も増えています。',
      explanation: '現金（資産）が1,000,000円増加したため借方に書きます。後で返済する義務は「借入金（負債）」という箱になり、負債の増加（ホームポジション）として貸方に記録します。'
    },
    {
      id: 5,
      chapter: 'ch2',
      chapterTitle: '第2章 • 仕訳のルール',
      question: '上記の借入金のうち、200,000円を現金で銀行に返済した。',
      correct: { drSubject: '借入金', drAmount: '200000', crSubject: '現金', crAmount: '200000' },
      hint: '義務を果たして借金が減りました。負債の減少はどちら側でしたか？',
      explanation: '借金を返済したことで「借入金（負債）」という義務が減少するため、ホームポジションとは逆の借方（左）に書いて消去します。同時に「現金（資産）」が減少するため貸方に記録します。'
    },

    // --- 第3章：主要勘定科目の実務 ---
    {
      id: 6,
      chapter: 'ch3',
      chapterTitle: '第3章 • 主要勘定科目の実務',
      question: 'A商店から商品 200,000円を仕入れ、代金は掛け（ツケ）とした。',
      correct: { drSubject: '仕入', drAmount: '200000', crSubject: '買掛金', crAmount: '200000' },
      hint: '仕入は費用の発生。商品売買における後払いの義務（ツケ）の科目は？',
      explanation: '商品の仕入れは「仕入（費用）」の発生として借方に記録します。商品売買のツケで、後でお金を支払う義務は「買掛金（負債）」の増加として貸方に記録します。'
    },
    {
      id: 7,
      chapter: 'ch3',
      chapterTitle: '第3章 • 主要勘定科目の実務',
      question: 'B商店に商品 350,000円を売り上げ、代金は掛け（ツケ）とした。',
      correct: { drSubject: '売掛金', drAmount: '350000', crSubject: '売上', crAmount: '350000' },
      hint: '売上は収益の発生。後でお金をもらえる権利（ツケ）の科目は？',
      explanation: '商品を売り上げたので「売上（収益）」の発生として貸方に記録します。後でお金をもらう権利は「売掛金（資産）」の増加として借方に記録します。'
    },
    {
      id: 8,
      chapter: 'ch3',
      chapterTitle: '第3章 • 主要勘定科目の実務',
      question: '取引先から受け取った小切手 80,000円を、直ちに当座預金口座へ預け入れた。',
      correct: { drSubject: '当座預金', drAmount: '80000', crSubject: '現金', crAmount: '80000' },
      hint: '【超重要】他人振出小切手は手元にある時は「現金」扱い。それを預金口座に入れたという動きです。',
      explanation: '他人が振り出した小切手は簿記上「現金（資産）」として扱われています。これを当座預金に預け入れたため、「当座預金（資産）」が借方に増加し、手元の「現金（資産）」が貸方に減少します。'
    },
    {
      id: 9,
      chapter: 'ch3',
      chapterTitle: '第3章 • 主要勘定科目の実務',
      question: 'C商店から仕入れた商品に欠陥があったため 30,000円分を返品し、買掛金から差し引くこととした。',
      correct: { drSubject: '買掛金', drAmount: '30000', crSubject: '仕入', crAmount: '30000' },
      hint: '返品（逆仕訳）の処理です。支払うはずだった義務と、仕入れた費用を同時に減らします。',
      explanation: '返品によって支払う義務が減るため、借方に「買掛金（負債の減少）」を記録します。同時に、仕入れた費用も取り消すため、貸方に「仕入（費用の減少）」を記録します。'
    },
    {
      id: 10,
      chapter: 'ch3',
      chapterTitle: '第3章 • 主要勘定科目の実務',
      question: 'D商店に対する買掛金 150,000円の決済のため、約束手形を振り出して渡した。',
      correct: { drSubject: '買掛金', drAmount: '150000', crSubject: '支払手形', crAmount: '150000' },
      hint: 'ツケ（買掛金）という義務が消滅し、新しく手形による強力な義務が発生しました。',
      explanation: '買掛金という義務が消滅するため借方に「買掛金（負債の減少）」を記録します。代わりに手形を発行したことで新たな支払義務が生じるため、貸方に「支払手形（負債の増加）」を記録します。'
    },
    {
      id: 11,
      chapter: 'ch3',
      chapterTitle: '第3章 • 主要勘定科目の実務',
      question: '商品 50,000円を注文し、内金（手付金）として現金 10,000円を先に支払った。',
      correct: { drSubject: '前払金', drAmount: '10000', crSubject: '現金', crAmount: '10000' },
      hint: '先にお金を払ったことで、「後で商品を受け取る権利」が生まれました。',
      explanation: '先に支払った手付金は、後で商品を受け取る権利であるため「前払金（資産）」の増加として借方に記録します。同時に「現金（資産）」が減少します。'
    },

    // --- 第4章：試算表と決算の全体像 ---
    {
      id: 12,
      chapter: 'ch4',
      chapterTitle: '第4章 • 試算表と決算の全体像',
      question: 'かねてよりツケていた売掛金 300,000円が、当座預金口座に振り込まれた。',
      correct: { drSubject: '当座預金', drAmount: '30000', crSubject: '売掛金', crAmount: '30000' },
      hint: '預金という新しい資産が増えた代わりに、回収する権利（資産）が役目を終えて消滅します。',
      explanation: '当座預金（資産）が増加したため借方に記録します。これまで持っていた「売掛金（資産）」という権利はお金を回収できたことで消滅するため、資産の減少として逆側の貸方に書いて消去します。'
    },
    {
      id: 13,
      chapter: 'ch4',
      chapterTitle: '第4章 • 試算表と決算の全体像',
      question: '期末になり、本日までの仕訳データを集計した結果、合計残高試算表の「売上」の合計が 850,000円であった。この金額が最終的に集計される報告書はどれか。（※金額は850,000を入力してください）',
      correct: { drSubject: '損益計算書', drAmount: '850000', crSubject: '売上', crAmount: '850000' },
      hint: '売上は「収益」です。収益と費用が集まるのは、B/SとP/Lのどちらでしたか？',
      explanation: '売上は収益の属するため、1年間の営業成績を表す「損益計算書（P/L）」へと自動的に振り分けられます。試算表（右側）からP/L（右側）への引っ越しです。'
    }
  ];

  // 選択可能な日本の簿記3級標準の勘定科目・報告書一覧
  const subjects = [
    '選択してください', 
    '現金', '当座預金', '売掛金', '仕入', '買掛金', 
    '借入金', '資本金', '売上', '支払家賃', '受取手数料', 
    '支払手形', '受取手形', '前払金', '前受金',
    '損益計算書', '貸借対照表'
  ];

  // 状態管理
  const [activeTab, setActiveTab] = useState('all');
  const [userAnswers, setUserAnswers] = useState({});
  const [results, setResults] = useState({});

  const handleInputChange = (id, field, value) => {
    setUserAnswers(prev => ({
      ...prev,
      [id]: { ...prev[id], [field]: value }
    }));
  };

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

  const filteredExercises = activeTab === 'all' 
    ? exercisesData 
    : exercisesData.filter(ex => ex.chapter === activeTab);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: '"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", Meiryo, sans-serif', color: '#111111' }}>
      
      {/* ヘッダー */}
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

      {/* メインコンテナ */}
      <div style={{ maxWidth: '840px', margin: '0 auto', padding: '40px 20px' }}>
        
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '900', color: '#111111', margin: '0 0 8px 0' }}>仕訳マスター特訓モード</h1>
          <p style={{ margin: 0, color: '#64748b', fontSize: '15px' }}>勘定科目と金額を選んで「解答する」を押してください。ミスの原因を即座に分解判定します。</p>
        </div>

        {/* タブ */}
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

        {/* 問題リスト */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {filteredExercises.map((ex, index) => {
            const ans = userAnswers[ex.id] || { drSubject: '', drAmount: '', crSubject: '', crAmount: '' };
            const res = results[ex.id] || { checked: false, isCorrect: false, details: {} };

            return (
              <div key={ex.id} style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '28px' }}>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span style={{ color: '#b93a26', fontSize: '12px', fontWeight: '800' }}>{ex.chapterTitle}</span>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#94a3b8' }}>Q.{index + 1}</span>
                </div>

                <div style={{ fontSize: '17px', fontWeight: '700', lineHeight: '1.6', color: '#111111', marginBottom: '24px', background: '#f8fafc', padding: '16px 20px', borderRadius: '8px', borderLeft: '4px solid #111111' }}>
                  {ex.question}
                </div>

                {/* 入力欄 */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                  
                  {/* 借方 */}
                  <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', backgroundColor: '#fafafa' }}>
                    <div style={{ fontSize: '11px', fontWeight: '800', color: '#64748b', marginBottom: '10px' }}>借方 (左側)</div>
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

                  {/* 貸方 */}
                  <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', backgroundColor: '#fafafa' }}>
                    <div style={{ fontSize: '11px', fontWeight: '800', color: '#64748b', marginBottom: '10px' }}>貸方 (右側)</div>
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

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', color: '#64748b', maxWidth: '60%' }}>💡 <strong>ヒント:</strong> {ex.hint}</span>
                  <button
                    onClick={() => checkAnswer(ex.id, ex.correct)}
                    style={{ backgroundColor: '#111111', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '6px', fontSize: '14.5px', fontWeight: '700', cursor: 'pointer' }}
                  >
                    解答する
                  </button>
                </div>

                {/* 解説エリア */}
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
