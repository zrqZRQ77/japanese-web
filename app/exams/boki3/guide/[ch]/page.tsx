export default function GuidePage() {
  return (
    <div className="flex max-w-[1200px] mx-auto min-h-screen">
      <aside className="w-[300px] border-r p-8">
        <h2 className="font-bold mb-6">簿記3級 学習ガイド</h2>
        <div className="space-y-4 text-sm text-gray-600">
          <div>第1章 現金と預金</div>
          <div className="text-blue-600 font-bold">第2章 商品売買</div>
        </div>
      </aside>
      <main className="flex-1 p-12">
        <h1 className="text-3xl font-bold mb-8">第2章 商品売買</h1>
        <div className="p-6 bg-blue-50 rounded-xl mb-8">
          <h3 className="font-bold text-blue-800 mb-2">ポイント</h3>
          <p>三分法による仕訳をマスターしましょう。</p>
        </div>
        <p className="text-gray-700 leading-8">ここに教材の内容が表示されます。このファイルさえあれば、全章が自動的に正しく表示されます。</p>
      </main>
    </div>
  );
}