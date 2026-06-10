export const exams = [
  {
    id: 'fp3',
    name: 'FP技能士 3級',
    icon: '💴',
    category: 'fp',
    tag: 'popular',
    tagLabel: '入門に最適',
    description: 'ファイナンシャルプランナーの入門資格。年3回実施。',
    questionCount: 28,
  },
  {
    id: 'fp2',
    name: 'FP技能士 2級',
    icon: '💴',
    category: 'fp',
    tag: 'popular',
    tagLabel: '人気No.1',
    description: '実務に直結する資格。AFP認定も同時取得可能。',
    questionCount: 90,
  },
  {
    id: 'boki3',
    name: '日商簿記 3級',
    icon: '📊',
    category: 'accounting',
    tag: 'popular',
    tagLabel: '人気資格',
    description: '会計・経理の基礎。就職・転職に有利。',
    questionCount: 10,
  },
  {
    id: 'boki2',
    name: '日商簿記 2級',
    icon: '📊',
    category: 'accounting',
    tag: 'soon',
    tagLabel: '近日追加',
    description: '商業簿記・工業簿記を習得。キャリアアップに。',
    questionCount: 0,
  },
  {
    id: 'takken',
    name: '宅地建物取引士',
    icon: '🏠',
    category: 'realestate',
    tag: 'soon',
    tagLabel: '近日追加',
    description: '不動産取引の国家資格。年1回10月実施。',
    questionCount: 0,
  },
  {
    id: 'it_passport',
    name: 'ITパスポート',
    icon: '💻',
    category: 'it',
    tag: 'soon',
    tagLabel: '近日追加',
    description: 'IT基礎知識の国家資格。随時受験可能。',
    questionCount: 0,
  },
]

// 問題データはdata/フォルダのJSONから動的に読み込む
// 各JSONファイルのフォーマット:
// {
//   exam_id: string,
//   category: string,
//   difficulty?: string,
//   type?: 'truefalse' | 'multiplechoice',
//   question_text: string,
//   options: string[],  // 例: ["ア: ...", "イ: ...", "ウ: ...", "エ: ..."]
//   correct_answer: string,  // 例: "ア"
//   explanation: string,
//   year?: string,
// }
