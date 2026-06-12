export default function HomePage() {
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-20 font-sans">
      <h1 className="text-6xl font-black mb-8">資格合格を、<span className="text-red-600">無料で。</span></h1>
      <p className="text-xl text-gray-500 mb-12">日本の主要資格に特化した学習プラットフォーム。</p>
      <div className="grid grid-cols-4 gap-6">
        {['学習ガイド', '練習問題', '知識カード', '模擬試験'].map(item => (
          <div key={item} className="p-8 border border-gray-200 rounded-2xl hover:border-black cursor-pointer">
            <h2 className="font-bold text-lg">{item}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
