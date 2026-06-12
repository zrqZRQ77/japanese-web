export default function ExercisePage() {
  return (
    <div className="max-w-[700px] mx-auto py-12 px-6">
      <div className="bg-white p-8 rounded-2xl border shadow-sm">
        <span className="text-blue-600 bg-blue-50 px-3 py-1 rounded-md text-xs font-bold">第2章 商品売買</span>
        <h2 className="text-lg font-bold my-6 leading-relaxed">商品売買の仕訳として適切なものはどれか？</h2>
        <div className="space-y-3">
          {['A. 借方：仕入 / 貸方：現金', 'B. 借方：売上 / 貸方：現金', 'C. 借方：現金 / 貸方：仕入', 'D. 借方：現金 / 貸方：売上'].map((opt, i) => (
            <div key={i} className="p-4 border rounded-xl hover:bg-gray-50 cursor-pointer">{opt}</div>
          ))}
        </div>
      </div>
    </div>
  );
}