// data/index.ts
import boki3_ch1 from './boki3_ch1.json';
// 未来每加一章，就在这里 import 一下

export const getChapterData = (courseId: string, chapterId: string) => {
  const key = `${courseId}_${chapterId}`;
  
  const dataMap: Record<string, any> = {
    'boki3_ch1': boki3_ch1,
    // 'boki3_ch2': boki3_ch2, (未来添加)
  };
  
  return dataMap[key] || null;
};