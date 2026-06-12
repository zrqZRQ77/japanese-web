"use client";
import { useParams } from 'next/navigation';
import { boki3Data } from '@/data/boki3';

export default function GuidePage() {
  const { ch } = useParams();
  const data = boki3Data.chapters[ch as string];
  
  if (!data) return <div>Loading...</div>;

  return (
    <div className="flex max-w-[1200px] mx-auto bg-white min-h-screen">
      {/* 左侧固定目录 */}
      <aside className="w-[300px] border-r p-8 sticky top-0 h-screen">
        <h2 className="font-bold text-lg mb-6">{data.title}</h2>
        {data.sections.map(s => <div key={s.id} className="py-2 text-sm">{s.title}</div>)}
      </aside>

      {/* 右侧教材正文 */}
      <main className="flex-1 p-12">
        <h1 className="text-3xl font-black mb-8">{data.title}</h1>
        {data.sections.map(s => (
          <section key={s.id} className="mb-12">
            <h2 className="text-xl font-bold mb-4">{s.title}</h2>
            <p className="leading-8 text-gray-700">{s.body}</p>
          </section>
        ))}
      </main>
    </div>
  );
}