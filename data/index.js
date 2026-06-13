// data/index.ts
import boki3_ch1 from './boki3_ch1.json';

// 所有课程章节的注册表
const dataMap: Record<string, any> = {
  'boki3_ch1': boki3_ch1,
  // 未来量产时，只需像这样继续 import 并在下面注册即可：
  // 'boki3_ch2': boki3_ch2,
};

/**
 * 根据动态路由参数同步获取对应的章节 JSON 数据
 */
export const getChapterData = (courseId: string, chapterId: string) => {
  const key = `${courseId}_${chapterId}`;
  return dataMap[key] || null;
};
