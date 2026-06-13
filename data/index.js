// @ts-ignore
import boki3_ch1 from './boki3_ch1.json';

export const getChapterData = (courseId, chapterId) => {
  const key = `${courseId}_${chapterId}`;
  const dataMap = {
    'boki3_ch1': boki3_ch1,
  };
  return dataMap[key] || null;
};