"use client";

import React, { useState, useEffect } from 'react';
import Navbar from "../../../../components/Navbar";

export default function ExamHubPage() {
  const [mounted, setMounted] = useState(false);
  const [examId, setExamId] = useState('boki3'); // 默认兜底为 boki3

  useEffect(() => {
    setMounted(true);
    
    // 🚀 终极稳定：直接从浏览器地址栏的 URL 路径中精准剥离出真实的考试 ID
    // 比如路径是 /exams/boki2/guide，下面的逻辑能 100% 稳妥地抓取到 "boki2"
    if (typeof window !== 'undefined') {
      const pathSegments = window.location.pathname.split('/');
      const examsIndex = pathSegments.indexOf('exams');
      if (examsIndex !== -1 && pathSegments[examsIndex + 1]) {
        setExamId(pathSegments[examsIndex + 1].toLowerCase());
      }
    }
  }, []);

  // 🎰 日本核心资格考试专属全日语数据库
  const examDatabase = {
    boki3: {
      name: '簿記3級',
      title: '日商簿記3級 合格総合ダッシュボード',
      subtitle: 'ビジネスパーソンの必須教養。決算書の仕組みと仕訳の根本原理をマスターします。',
      chapters: [
        { ch: '1', title: '簿記の基本原理と5大要素', desc: '資産・負債・純資産・費用・収益の概念と、複式簿記の基本構造を理解します。' },
        { ch: '2', title: '現金預金と現金過不足', desc: '実際の現金残高と帳簿残高の一致、および不一致が生じた際の実務処理を攻略します。' },
        { ch: '3', title: '売掛金と買掛金（債権債務）', desc: 'ビジネスの基本となる信用取引（ツケ）の発生から回収・支払いまでのルール。' },
        { ch: '4', title: '試算表の作成と決算の全体像', desc: '仕訳データを集計し、財務諸表を作成する決算一連の手続きを体系的に学びます。' }
      ]
    },
    boki2: {
      name: '簿記2級',
      title: '日商簿記2級 上級総合ダッシュボード',
      subtitle: '実務で強く求められる上級会計。商業簿記に加え、工業簿記（原価計算）の壁を突破。',
      chapters: [
        { ch: '1', title: '株式会社の会計・純資産の部', desc: '資本金、準備金、剰余金の配当など、株式会社特有の高度な会計処理を学びます。' },
        { ch: '2', title: '固定資産の割賦購入と減価償却', desc: '2級レベルの複雑な減価償却計算、リース取引、固定資産の売却処理。' },
        { ch: '3', title: '工業簿記の本質と原価計算の流れ', desc: 'モノづくりにおける材料費・労務費・経費の集計から製品原価の計算まで。' }
      ]
    },
    fp3: {
      name: 'FP3級',
      title: 'FP3級 資産設計総合ダッシュボード',
      subtitle: 'ライフプランニングから税金、相続まで、生活に直信するマネーリテラシーの集大成。',
      chapters: [
        { ch: '1', title: 'ライフプランニングと資金計画', desc: '社会保険、公的年金の仕組みと、資産設計に用いる6つの係数の使い方。' },
        { ch: '2', title: 'リスク管理（生命保険・損害保険）', desc: '各種保険商品の仕組み、保障内容、および最適な保険設計の選択基準。' },
        { ch: '3', title: 'タックスプランニング（所得税の基本）', desc: '日本の所得税の仕組み、各種所得の計算方法と確定申告の基础知识。' }
      ]
    },
    fp2: {
      name: 'FP2級',
      title: 'FP2級 上級資産設計ダッシュボード',
      subtitle: 'より高度な資産運用・相続・事業承継のコンサルティング能力を身につけ、実務に活かす。',
      chapters: [
        { ch: '1', title: '金融資産運用とポートフォリオ理論', desc: '債券利回り計算、株式指標の分析、高度なポートフォリオ運用理論。' },
        { ch: '2', title: '不動産の取引と法令上の制限', desc: '都市計画法、建築基準法など、不動産取引において必須となる強力な法律知識。' },
        { ch: '3', title: '相続・事業承継の税務実務', desc: '法定相続分、遺留分、相続税・贈与税の評価基準と具体的な節税対策。' }
      ]
    },
    itpass: {
      name: 'ITパスポート',
      title: 'ITパスポート 試験総合ダッシュボード',
      subtitle: 'DX時代に求められるITの基礎知識、経営戦略、セキュリティ技術を網羅。',
      chapters: [
        { ch: '1', title: 'ストラテジ系（企業と法務・経営戦略）', desc: '知的財産権、コンプライアンス、マーケティング手法、財務諸表の基礎。' },
        { ch: '2', title: 'マネジメント系（開発技術・プロジェクト管理）', desc: 'アジャイル開発、システム要件定義、プロジェクトの工程管理手法の理解。' },
        { ch: '3', title: 'テクノロジ系（基礎理論・セキュリティ）', desc: '2進数、ネットワークの仕組み、サイバー攻撃手法と最新の暗号化技術。' }
      ]
    },
    takken: {
      name: '宅建士 国家資格総合ダッシュボード',
      subtitle: '不動産取引の最高峰資格。宅建業法、権利関係など、強力な法律知識を習得。',
      chapters: [
        { ch: '1', title: '宅建業法（最重要科目）', desc: '免許制度、宅地建物取引士の業務、営業保証金、および35条・37条書面の実務。' },
        { ch: '2', title: '権利関係（民法・借地借家法）', desc: '意思表示、制限行為能力者、不法行為、借地借家法など、難関の法律解釈。' },
        { ch: '3', title: '法令上の制限（都市計画・農地法）', desc: '国土利用計画法、都市計画法、建築基準法など、公法上の厳しい建築規制。' }
      ]
    }
  };

  const currentExam = examDatabase[examId] || examDatabase['boki3'];

  if (!mounted) return null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: '"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", Meiryo, sans-serif' }}>
      <Navbar />

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '50px 24px' }}>
        
        <div style={{ marginBottom: '40px', borderLeft: `6px solid #b93a26`, paddingLeft: '16px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '900', color: '#0f172a', margin: '0 0 8px 0' }}>{currentExam.title}</h1>
          <p style={{ fontSize: '14.5px', color: '#64748b', margin: 0, fontWeight: '500' }}>{currentExam.subtitle}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '50px' }}>
          {[
            { id: 'guide', title: '📘 学習ガイド', count: 'テキスト', desc: '試験範囲を分かりやすく解説したオリジナル教材。', btn: 'テキストを読む' },
            { id: 'exercises', title: '✍️ 一問一答・演習', count: '問題集', desc: '詳細な解説と自動正誤判定機能を備えた実践問題。', btn: '練習問題に挑戦' },
            { id: 'cards', title: '🃏 暗記カード', count: '要点効率', desc: '隙間時間を活用して、重要用語を効率的にインプット。', btn: 'カードを開く' },
            { id: 'mock', title: '🏆 模擬試験', count: '本番想定', desc: '本試験と同じ形式で、現在の実力を測定します。', btn: '模擬試験場へ' }
          ].map((feat) => (
            <div key={feat.id} style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '185px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '10px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', margin: 0 }}>{feat.title}</h3>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: '#b93a26', backgroundColor: '#fff5f5', padding: '2px 8px', borderRadius: '4px' }}>{feat.count}</span>
                </div>
                <p style={{ fontSize: '12.5px', color: '#64748b', margin: 0, lineHeight: '1.6' }}>{feat.desc}</p>
              </div>
              <button 
                onClick={() => {
                  if (typeof window !== 'undefined') window.location.href = `/exams/${examId}/${feat.id}`;
                }}
                style={{ width: '100%', height: '36px', backgroundColor: '#f1f5f9', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: '700', color: '#334155', cursor: 'pointer', transition: 'background-color 0.15s ease', marginTop: 'auto' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e2e8f0'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
              >
                {feat.btn} ➔
              </button>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '32px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.01)' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', margin: '0 0 24px 0', borderBottom: '2px solid #f1f5f9', paddingBottom: '12px' }}>
            カリキュラム一覧
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {currentExam.chapters.map((chapter) => (
              <div 
                key={chapter.ch} 
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px', border: '1px solid #f1f5f9', borderRadius: '8px', backgroundColor: '#f8fafc' }}
              >
                <div style={{ flex: 1, paddingRight: '24px' }}>
                  <div style={{ fontSize: '11px', fontWeight: '800', color: '#b93a26', marginBottom: '4px', letterSpacing: '0.5px' }}>第 {chapter.ch} 章</div>
                  <h4 style={{ fontSize: '15.5px', fontWeight: '800', color: '#1e293b', margin: '0 0 6px 0' }}>{chapter.title}</h4>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: '1.5' }}>{chapter.desc}</p>
                </div>
                
                <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
                  <button 
                    onClick={() => { if (typeof window !== 'undefined') window.location.href = `/exams/${examId}/guide/ch${chapter.ch}`; }}
                    style={{ padding: '0 16px', height: '38px', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', fontWeight: '700', color: '#475569', cursor: 'pointer', transition: 'all 0.15s ease' }}
                  >
                    解説テキスト
                  </button>
                  <button 
                    onClick={() => { if (typeof window !== 'undefined') window.location.href = `/exams/${examId}/exercises?ch=${chapter.ch}`; }}
                    style={{ 
                      padding: '0 16px', 
                      height: '38px', 
                      backgroundColor: '#fff5f5', 
                      border: '1px solid #fee2e2', 
                      borderRadius: '6px', 
                      fontSize: '13px', 
                      fontWeight: '700', 
                      color: '#b93a26', 
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#b93a26';
                      e.currentTarget.style.color = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#fff5f5';
                      e.currentTarget.style.color = '#b93a26';
                    }}
                  >
                    演習問題
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
