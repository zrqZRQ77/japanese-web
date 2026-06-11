"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Navbar from "../../../../components/Navbar";

export default function ExamHubPage() {
  const params = useParams();
  const examId = params?.examId || 'boki3'; // 动态获取当前是哪个考试
  const [mounted, setMounted] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState('hub'); // 内部专属导航状态

  useEffect(() => {
    setMounted(true);
  }, []);

  // 1. 各个考试的底层专属数据知识库（支持横向无限扩展）
  const examDatabase = {
    boki3: {
      name: '簿記3級',
      title: '日商簿記3級 合格総合ダッシュボード',
      subtitle: '基本要素から仕訳の根本原理まで、合格に必要なコンテンツがここに集約。',
      chapters: [
        { ch: '1', title: '簿記の根本原理と5大要素', desc: '資産・負債・純資産・費用・収益の箱型パズルを脳内に構築します。' },
        { ch: '2', title: '現金預金と現金過不足', desc: '実際の現金と帳簿のズレをピタッと合わせる実务仕訳を攻略。' },
        { ch: '3', title: '売掛金と買掛金（債権債務）', desc: 'ビジネスの基本である「ツケ（信用取引）」の発生と回収のルール。' },
        { ch: '4', title: '試算表の作成と決算の全体像', desc: '全仕訳データを1つの大きな表に集計する決算パズルのマクロマップ。' }
      ]
    },
    boki2: {
      name: '簿記2級',
      title: '日商簿記2級 上級総合ダッシュボード',
      subtitle: '高度な商業簿記に加え、製造業の原価計算（工業簿記）の壁を完全突破。',
      chapters: [
        { ch: '1', title: '株式会社の会計・純資産の部', desc: '資本金、準備金、剰余金の配当など、株式会社特有の高度な処理。' },
        { ch: '2', title: '固定資産の割賦購入と減価償却', desc: '2級レベルの複雑な減価償却計算とリース取引の根本。' },
        { ch: '3', title: '工業簿記の本質と原価計算の流れ', desc: 'モノづくりにおける材料費・労務費・経費の集計マスター。' }
      ]
    },
    fp3: {
      name: 'FP3級',
      title: 'FP3級 資産設計総合ダッシュボード',
      subtitle: 'ライフプランニングから税金、相続まで、人生のマネーリテラシーの集大成。',
      chapters: [
        { ch: '1', title: 'ライフプランニングと資金計画', desc: '社会保険、公的年金、資金計画の 6 つの係数の使い方。' },
        { ch: '2', title: 'リスク管理（生命保険・損害保険）', desc: '各種保険商品の仕組みと、最適な保障設計の選択基準。' }
      ]
    }
  };

  // 兜底保护：如果用户乱敲了一个未定义的考试 ID，默认显示簿记 3 级
  const currentExam = examDatabase[examId] || examDatabase['boki3'];

  // 2. 内部功能专属导航栏条目（严格对齐指示 5 的独立功能要求）
  const subNavItems = [
    { id: 'hub', label: '総合トップ' },
    { id: 'guide', label: '学習ガイド（テキスト）' },
    { id: 'exercises', label: '練習問題（仕訳）' },
    { id: 'cards', label: '知識カード' },
    { id: 'mock', label: '模擬試験' }
  ];

  const handleFeatureRedirect = (featureId) => {
    if (featureId === 'hub') {
      setActiveSubMenu('hub');
    } else {
      // 跨模块直接跳转到对应的独立系统页面
      if (typeof window !== 'undefined') {
        window.location.href = `/exams/${examId}/${featureId}`;
      }
    }
  };

  if (!mounted) return null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'Arial, sans-serif' }}>
      {/* 👑 全局顶层主导航栏 */}
      <Navbar />

      {/* 🎯 考试专属内部导航栏（Sub Navigation Bar） */}
      <div style={{
        width: '100%',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        position: 'sticky',
        top: '71px',
        zIndex: 900
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          gap: '8px',
          height: '50px',
          alignItems: 'center'
        }}>
          {/* 当前考试面包屑提示 */}
          <div style={{ fontSize: '13px', fontWeight: '800', color: '#64748b', marginRight: '16px', backgroundColor: '#f1f5f9', padding: '4px 10px', borderRadius: '4px' }}>
            {currentExam.name} 专属考区
          </div>
          {subNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleFeatureRedirect(item.id)}
              style={{
                padding: '0 16px',
                height: '100%',
                background: 'none',
                border: 'none',
                color: activeSubMenu === item.id ? '#b93a26' : '#475569',
                fontSize: '14px',
                fontWeight: '700',
                cursor: 'pointer',
                position: 'relative',
                borderBottom: activeSubMenu === item.id ? '3px solid #b93a26' : '3px solid transparent',
                transition: 'all 0.15s ease'
              }}
            >
              {item.label}
            </button>
          ))}
          {/* AI快捷提问挂件按钮 */}
          <button 
            onClick={() => alert('AI質問アシスタントを起動します')}
            style={{ marginLeft: 'auto', background: 'linear-gradient(135deg, #4f46e5 0%, #b93a26 100%)', color: '#ffffff', border: 'none', padding: '6px 14px', borderRadius: '15px', fontSize: '12px', fontWeight: '800', cursor: 'pointer' }}
          >
            🤖 AIに質問
          </button>
        </div>
      </div>

      {/* 📊 大本营主体内容区域 */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
        
        {/* 头部大标题文案 */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '900', color: '#0f172a', margin: '0 0 8px 0' }}>{currentExam.title}</h1>
          <p style={{ fontSize: '15px', color: '#64748b', margin: 0, fontWeight: '500' }}>{currentExam.subtitle}</p>
        </div>

        {/* 4大核心功能模块一览（用户可自由选择去哪，不再强制刷题） */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '50px' }}>
          {[
            { id: 'guide', title: '📘 学習ガイド', count: `${currentExam.chapters.length} 章分`, desc: '大白话彻底嚼碎的专业地道日语教材。', btn: 'テキストを読む' },
            { id: 'exercises', title: '✍️ スピード仕訳演習', count: '全章大通铺', desc: '带红绿灯正误判定和详细原位解析的题库。', btn: '練習問題に挑戦' },
            { id: 'cards', title: '🃏 効率暗記カード', count: '核心切片', desc: '利用碎片化时间快速斩断知识盲点。', btn: 'カードを開く' },
            { id: 'mock', title: '🏆 全真模擬試験', count: '本番レベル', desc: '模拟全真考场环境，进行高分通关测验。', btn: '模擬試験場へ' }
          ].map((feat) => (
            <div key={feat.id} style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '180px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', margin: 0 }}>{feat.title}</h3>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: '#b93a26', backgroundColor: '#fff5f5', padding: '2px 8px', borderRadius: '4px' }}>{feat.count}</span>
                </div>
                <p style={{ fontSize: '12.5px', color: '#64748b', margin: 0, lineHeight: '1.5' }}>{feat.desc}</p>
              </div>
              <button 
                onClick={() => handleFeatureRedirect(feat.id)}
                style={{ width: '100%', height: '36px', backgroundColor: '#f1f5f9', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: '700', color: '#334155', cursor: 'pointer', transition: 'background-color 0.15s ease' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e2e8f0'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
              >
                {feat.btn} ➔
              </button>
            </div>
          ))}
        </div>

        {/* 📑 章节目录切片纯内容展示区（带各自直接练习交互） */}
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', margin: '0 0 24px 0', borderBottom: '2px solid #f1f5f9', paddingBottom: '12px' }}>
            📜 配信中のカリキュラム一覧（课纲章节详情）
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {currentExam.chapters.map((chapter) => (
              <div 
                key={chapter.ch} 
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px', border: '1px solid #f1f5f9', borderRadius: '8px', backgroundColor: '#f8fafc' }}
              >
                <div style={{ flex: 1, paddingRight: '24px' }}>
                  <div style={{ fontSize: '12px', fontWeight: '800', color: '#b93a26', marginBottom: '4px' }}>第 {chapter.ch} 章</div>
                  <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#1e293b', margin: '0 0 6px 0' }}>{chapter.title}</h4>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>{chapter.desc}</p>
                </div>
                
                {/* 章节两翼齐飞按钮：看书 / 针对性刷题 */}
                <div style={{ display: 'flex', gap: '10px', shrink: 0 }}>
                  <button 
                    onClick={() => window.location.href = `/exams/${examId}/guide/ch${chapter.ch}`}
                    style={{ padding: '0 16px', height: '38px', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', fontWeight: '700', color: '#475569', cursor: 'pointer' }}
                  >
                    📖 解説テキスト
                  </button>
                  <button 
                    onClick={() => window.location.href = `/exams/${examId}/exercises?ch=${chapter.ch}`}
                    style={{ padding: '0 16px', height: '38px', backgroundColor: '#b93a26', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: '700', color: '#ffffff', cursor: 'pointer', boxShadow: '0 2px 4px rgba(185,58,38,0.1)' }}
                  >
                    📝 演習問題 (第{chapter.ch}章)
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