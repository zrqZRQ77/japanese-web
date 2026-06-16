const fs = require('fs');
const path = require('path');

// 1. 定义生成路径
const basePath = path.join(__dirname, 'content/exams/fp3');
const dirs = {
  guide: path.join(basePath, 'guide/ch1'),
  questions: path.join(basePath, 'questions'),
  cards: path.join(basePath, 'cards')
};

// 自动创建目录
Object.values(dirs).forEach(dir => {
  fs.mkdirSync(dir, { recursive: true });
});

// 2. 准备 MDX 内容数据
const mdxData = [
  {
    fileName: 'ch1-s1.mdx',
    sectionNumber: '1-1',
    sectionTitle: 'FPの基礎と関連法規',
    content: `### 1. ファイナンシャル・プランナー（FP）の倫理
- **顧客利益の優先**: 常に顧客の利益を最優先に行動しなければなりません。
- **守秘義務の遵守**: 職務上知り得た顧客の秘密を漏らしてはなりません（資格喪失後も同様）。

### 2. 関連法規とFPの禁止行為
- **税理士法**: 一般的な税金計算の例示はOK。個別具体的な税務相談や申告書の作成は、有償・無償問わずNG。
- **弁護士法**: 一般的な遺言書の書き方の説明はOK。具体的な法律相談や紛争性のある書類作成はNG。`
  },
  {
    fileName: 'ch1-s2.mdx',
    sectionNumber: '1-2',
    sectionTitle: 'ライフプランニングの手法',
    content: `### 1. ライフプランニングの3大ツール
1. **ライフイベント表**: 家族のイベントと予想費用を時系列でまとめた表。
2. **キャッシュフロー表**: 現在の収支と将来の予測を一覧にした表。
3. **個人バランスシート**: ある時点における「資産」と「負債」の状況（※時価換算）。

### 2. 資金計画のための6つの係数
- **終価係数**: 現在の元本から「将来の金額」を求める。
- **現価係数**: 将来の目標額から「現在必要な元本」を求める。
- **減債基金係数**: 将来の目標額から「毎年の積立額」を求める。
- **資本回収係数**: 現在の元本から「毎年の受取額・返済額」を求める。`
  },
  {
    fileName: 'ch1-s3.mdx',
    sectionNumber: '1-3',
    sectionTitle: '社会保険の基礎',
    content: `### 1. 公的医療保険
- **健康保険**: 会社員が加入。高額療養費制度や傷病手当金（最長1年6ヶ月）がある。
- **後期高齢者医療制度**: 75歳以上のすべての人が加入。

### 2. 労働保険
- **労災保険**: 業務上や通勤途中の怪我に支給。保険料は「全額雇主負担」。
- **雇用保険**: 失業時の基本手当など。保険料は労使双方で負担。`
  },
  {
    fileName: 'ch1-s4.mdx',
    sectionNumber: '1-4',
    sectionTitle: '公的年金',
    content: `### 1. 国民年金の被保険者区分
- **第1号**: 自営業、学生など。保険料は定額。
- **第2号**: 会社員、公務員など。給与から天引き（労使折半）。
- **第3号**: 第2号に扶養されている配偶者。個別の保険料納付は不要。

### 2. 老齢基礎年金
受給資格期間が「10年以上」ある場合、原則65歳から受給可能。`
  },
  {
    fileName: 'ch1-s5.mdx',
    sectionNumber: '1-5',
    sectionTitle: '企業年金と個人年金',
    content: `### 1. 個人型確定拠出年金（iDeCo）
- **税制上の優遇**:
  1. 掛金は「全額が小規模企業共済等掛金控除」として所得控除される。
  2. 運用益は「すべて非課税」。
  3. 受取時は「退職所得控除」または「公的年金等控除」の対象。`
  },
  {
    fileName: 'ch1-s6.mdx',
    sectionNumber: '1-6',
    sectionTitle: '資金計画（住宅ローン）',
    content: `### 1. 住宅ローンの返済方法
- **元利均等返済**: 毎月の返済額が「一定」。総返済額は多くなる。
- **元金均等返済**: 当初が最も高く徐々に減少する。総返済額は少なくなる。

### 2. 住宅ローンの繰上返済
- **期間短縮型**: 返済額軽減型よりも利息軽減効果が大きい。`
  }
];

// 3. 准备 JSON 数据
const questionsData = {
  examId: "fp3", chapterId: "ch1", chapterTitle: "ライフプランニングと資金計画",
  questions: [
    {
      id: "fp3-ch1-q1", examId: "fp3", chapterId: "ch1", type: "single",
      text: "FP資格のみを持つ者が、無償で顧客の個別具体的な確定申告書を作成した。税理士法に抵触するか。",
      options: [
        { label: "A", text: "抵触する" },
        { label: "B", text: "無償なら抵触しない" },
        { label: "C", text: "時期による" }
      ],
      correctAnswer: "A", explanation: "有償無償を問わず、具体的な税務業務は税理士の独占業務です。", tags: ["関連法規"]
    }
  ]
}; // 脚本中保留一道题作为极简示例，可自行扩充

const cardsData = {
  examId: "fp3", chapterId: "ch1", chapterTitle: "ライフプランニングと資金計画",
  cards: [
    {
      id: "fp3-ch1-card1", examId: "fp3", chapterId: "ch1",
      front: "労災保険の保険料は誰が負担するか？",
      back: "事業主が全額負担する。", tags: ["社会保険"]
    }
  ]
};

// 4. 执行写入操作
mdxData.forEach(item => {
  const frontmatter = `---
examId: fp3
chapterId: ch1
chapterNumber: 1
chapterTitle: ライフプランニングと資金計画
sectionNumber: "${item.sectionNumber}"
sectionTitle: "${item.sectionTitle}"
updatedAt: "2026-06-15"
---

`;
  fs.writeFileSync(path.join(dirs.guide, item.fileName), frontmatter + item.content, 'utf8');
});

fs.writeFileSync(path.join(dirs.questions, 'ch1.json'), JSON.stringify(questionsData, null, 2), 'utf8');
fs.writeFileSync(path.join(dirs.cards, 'ch1.json'), JSON.stringify(cardsData, null, 2), 'utf8');

console.log('✅ FP3 第1章的所有文件生成完毕！');