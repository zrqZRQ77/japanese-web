// ============================================================
// 考试注册表 — 添加新考试只需在此追加一条记录
// ============================================================
import { ExamMeta } from './index'

export const EXAMS_REGISTRY: ExamMeta[] = [
  {
    id: 'boki3',
    name: '日商簿記3級',
    shortName: '簿記3級',
    category: '会計・経理',
    description: '日商簿記検定3級。商業簿記の基礎を学ぶ入門資格。',
    totalChapters: 6,
    color: 'blue',
    icon: 'BookOpen',
  },
  {
    id: 'fp3',
    name: 'FP技能士3級',
    shortName: 'FP3級',
    category: 'ファイナンシャル',
    description: 'ファイナンシャルプランナー3級。お金の知識を幅広く学ぶ。',
    totalChapters: 6,
    color: 'green',
    icon: 'TrendingUp',
  },
  {
    id: 'itp',
    name: 'ITパスポート',
    shortName: 'ITパスポート',
    category: 'IT',
    description: 'ITの基礎知識を幅広く学ぶ国家資格。テクノロジ・経営・法務を体系的に学習できます。',
    totalChapters: 6,
    color: 'blue',
    icon: 'Monitor',
  },
  // ↓ 新しい試験を追加するときはここに1行追記するだけ
  // { id: 'takken', name: '宅地建物取引士', ... },
]

export function getExamById(id: string): ExamMeta | undefined {
  return EXAMS_REGISTRY.find(e => e.id === id)
}
