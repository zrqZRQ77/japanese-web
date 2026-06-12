export interface MenuItem {
  id: string;
  label: string;
}

export interface Section {
  id: string;
  title?: string;
  paragraphs: string[];
  highlightBox?: {
    title: string;
    content: string;
    type: 'info' | 'warning';
  };
  bullets?: string[];
}

export interface Chapter {
  subTitle: string;
  title: string;
  menuItems: MenuItem[];
  sections: Section[];
}

export const chaptersData: Record<string, Chapter> = {
  ch1: {
    subTitle: "第1章 • 簿記の根本原理",
    title: "【超わかりやすい】複式簿記の本質：なぜ資産は左側、負債は右側なのか？",
    menuItems: [
      { id: 'intro', label: '1. 丸暗記からの解放' },
      { id: 'core-logic', label: '2. 借方・貸方の本質' },
      { id: 'five-boxes', label: '3. 簿記の5大要素' },
      { id: 'shiwake', label: '4. 取引の二面性と仕訳' },
    ],
    sections: [
      {
        id: 'intro',
        paragraphs: [
          "多くの人が日商簿記3級の学習を始める際、聞き慣れない勘定科目と複雑な「借方・貸方」の配置に圧倒されてしまいます。一般的な参考書では、「資産の増加は借方、負債の増加は貸方…」と丸暗記を強要されがちですが、これではパズルを解いているようでビジネスの本質が見えてきません。",
          "ここでは難しい専門用語を一切使わず、お金の「調達源泉（どこから来たか）」と「運用形態（今どこにあるか）」という第一性原理から、このルールの本质をすっきりと解き明かします。"
        ]
      },
      {
        id: 'core-logic',
        title: "お金の「来歴」と「現在地」：借方・貸方の真の正体",
        paragraphs: [
          "あなたが小さなカフェを開業すると想像してください。まず最初にお金が必要です。自分の貯金から500万円、銀行から300万円を借りて、合計800万円を集めたとします。簿記の世界では、この出来事を「お金をどこから持ってきたか」と「そのお金が今何に形を変えているか」という2つの側面から同時に記録します。"
        ],
        highlightBox: {
          title: "💡 商業の絶対的なルール（ファーストプリンシプル）：",
          content: "右側（貸方）：お金をどこから持ってきたか？【資金の調達源泉】\n左侧（借方）：そのお金が今何に化けているか？【資金の運用形態】",
          type: 'info'
        }
      },
      {
        id: 'five-boxes',
        title: "簿記を構成する「5大要素」のホームポジション",
        paragraphs: [
          "簿記に登場するあらゆる勘定科目は、すべて以下の5つの箱のどれかに分類されます。この5大要素にも、先ほどの左右の論理がそのまま適用されます。"
        ],
        bullets: [
          "資産（左側）： お金が化けている現在の姿（現金、店舗、備品、商品など）。",
          "負債（右側）： 他人から調達した、いずれ返さなければならないお金（借入金、買掛金など）。",
          "純資産（右側）： 誰にも返す必要のない、本当の自分のお金（資本金など）。"
        ]
      },
      {
        id: 'shiwake',
        title: "取引の二面性と仕訳の黄金ルール",
        paragraphs: [
          "集めたお金の中から 200万円を使って、イタリア製の高級エスプレッソマシンを購入したとします。この時、あなたの手元から「現金（資産）」という姿が200万円分減り、代わりに「備品（資産）」という姿が200万円分増えます。"
        ],
        highlightBox: {
          title: "✍️ 仕訳のパズルルール：",
          content: "• その要素を増やしたいなら：本来の定位置（ホームポジション）の側に書く！\n• その要素を减らしたいなら：本来の定位置とは逆の側に書く！",
          type: 'warning'
        }
      }
    ]
  }
  // 以后新增 ch2, ch3 只需要按照上面的格式往这里继续添加即可！
};
