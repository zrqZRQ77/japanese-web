"use client";

import React from 'react';

export default function Navbar() {
  return (
    <nav style={{
      height: '60px',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      fontFamily: '"Helvetica Neue", Arial, sans-serif'
    }}>
      <div 
        onClick={() => { if (typeof window !== 'undefined') window.location.href = '/exams'; }}
        style={{ fontSize: '18px', fontWeight: '900', color: '#b93a26', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
      >
        <span>周周 & 叶子 ➔ 読解・簿記ラボ</span>
      </div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <span 
          onClick={() => { if (typeof window !== 'undefined') window.location.href = '/exams'; }}
          style={{ fontSize: '14px', fontWeight: '700', color: '#334155', cursor: 'pointer' }}
        >
          ダッシュボード
        </span>
      </div>
    </nav>
  );
}
