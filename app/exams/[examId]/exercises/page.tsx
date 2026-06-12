"use client";
export default function ExercisePage() {
  return (
    <div className="max-w-[700px] mx-auto py-12 px-6">
      <div className="bg-white p-8 rounded-[16px] border border-gray-200 shadow-sm">
        <div className="text-blue-600 bg-blue-50 px-3 py-1 rounded-md text-xs inline-block mb-4">第4章 現金と預金</div>
        <h2 className="text-[17px] font-bold leading-relaxed mb-8">現金過不足が発生した場合の仕訳として適切なものはどれか？</h2>
        <div className="space-y-3">
          {['A. 借方：現金過不足', 'B. 貸方：現金過不足', 'C. 借方：雑損', 'D. 貸方：雑益'].map((opt, i) => (
            <div key={i} className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer flex items-center gap-4">
              <div className="w-8 h-8 rounded-full border flex items-center justify-center">{String.fromCharCode(65+i)}</div>
              {opt}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}