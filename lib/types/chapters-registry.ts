// ============================================================
// 章节注册表 — 按考试ID管理章节结构
// 添加新考试时在此追加对应章节列表
// ============================================================
import { ChapterMeta } from './index'

export const CHAPTERS_REGISTRY: Record<string, ChapterMeta[]> = {
  boki3: [
    {
      id: 'ch1', number: 1, title: '簿記の基本',
      sections: [
        { id: 'ch1-s1', number: '1-1', title: '簿記とは' },
        { id: 'ch1-s2', number: '1-2', title: '資産・負債・純資産' },
        { id: 'ch1-s3', number: '1-3', title: '収益と費用' },
      ],
    },
    {
      id: 'ch2', number: 2, title: '勘定科目と5要素',
      sections: [
        { id: 'ch2-s1', number: '2-1', title: '勘定科目とは' },
        { id: 'ch2-s2', number: '2-2', title: '5要素の分類' },
      ],
    },
    {
      id: 'ch3', number: 3, title: '仕訳の基礎',
      sections: [
        { id: 'ch3-s1', number: '3-1', title: '仕訳のルール' },
        { id: 'ch3-s2', number: '3-2', title: '借方と貸方' },
      ],
    },
    {
      id: 'ch4', number: 4, title: '現金と預金',
      sections: [
        { id: 'ch4-s1', number: '4-1', title: '現金とは' },
        { id: 'ch4-s2', number: '4-2', title: '現金として扱うもの' },
        { id: 'ch4-s3', number: '4-3', title: '当座預金とは' },
        { id: 'ch4-s4', number: '4-4', title: '普通預金とは' },
        { id: 'ch4-s5', number: '4-5', title: '小口現金とは' },
      ],
    },
    {
      id: 'ch5', number: 5, title: '商品売買',
      sections: [
        { id: 'ch5-s1', number: '5-1', title: '商品の仕入れ' },
        { id: 'ch5-s2', number: '5-2', title: '商品の売上げ' },
        { id: 'ch5-s3', number: '5-3', title: '返品の処理' },
        { id: 'ch5-s4', number: '5-4', title: '諸掛り' },
      ],
    },
    {
      id: 'ch6', number: 6, title: '売掛金・買掛金',
      sections: [
        { id: 'ch6-s1', number: '6-1', title: '売掛金とは' },
        { id: 'ch6-s2', number: '6-2', title: '買掛金とは' },
      ],
    },
  ],
  fp3: [
    {
      id: 'ch1', number: 1, title: 'ライフプランニングと資金計画',
      sections: [
        { id: 'ch1-s1', number: '1-1', title: 'FPとは' },
        { id: 'ch1-s2', number: '1-2', title: 'ライフプランニング' },
      ],
    },
    {
      id: 'ch2', number: 2, title: 'リスク管理',
      sections: [
        { id: 'ch2-s1', number: '2-1', title: '保険の基礎知識' },
      ],
    },
  ],
}

export function getChaptersByExam(examId: string): ChapterMeta[] {
  return CHAPTERS_REGISTRY[examId] ?? []
}

export function getChapterById(examId: string, chapterId: string): ChapterMeta | undefined {
  return getChaptersByExam(examId).find(c => c.id === chapterId)
}
