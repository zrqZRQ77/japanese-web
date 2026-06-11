"use client";

import React, { useState, useEffect } from 'react';
// 严格对齐你当前的根目录组件路径定义
import Navbar from "../components/Navbar";
import ExamGrid from "../components/ExamGrid";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  // 100% 阻断一切 Next.js 服务端/客户端水合不一致引发的编译报错
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div style={{ 
        width: '100vw', 
        height: '100vh', 
        backgroundColor: '#ffffff' 
      }} />
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8fafc',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* 1. 顶层全局导航栏 */}
      <Navbar />
      
      {/* 2. 主体核心多考种矩阵区域 */}
      <main style={{ flex: 1 }}>
        <ExamGrid />
      </main>
    </div>
  );
}
