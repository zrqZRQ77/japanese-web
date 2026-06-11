// 1. 引入刚才写好的两个零件（Navbar 和 ExamGrid）
import Navbar from "@/components/Navbar";
import ExamGrid from "@/components/ExamGrid";

// 2. 把它们排好队放进主页里
export default function HomePage() {
  return (
    <>
      {/* 顶栏放在最上面 */}
      <Navbar />
      
      <main>
        {/* 考试网格列表放在顶栏下面 */}
        <ExamGrid />
      </main>
    </>
  );
}
