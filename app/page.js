"use client";
import { useEffect } from 'react';

export default function RootPage() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.location.href = '/exams';
    }
  }, []);
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'sans-serif', color: '#64748b' }}>
      正に移動中...
    </div>
  );
}
