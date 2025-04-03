import { HabitRecord } from '@/data/types';
import { normalizeDate } from '@/utils/date';

/**
 * 计算连续打卡天数
 * @param records 习惯记录列表
 * @returns 连续打卡天数
 */
export const calculateStreakDays = (records: HabitRecord[]): number => {
  if (records.length === 0) return 0;

  // 按日期排序
  const sortedRecords = [...records].sort((a, b) =>
    new Date(b.record_date).getTime() - new Date(a.record_date).getTime()
  );

  let streak = 1;
  const today = normalizeDate(new Date());

  const latestRecord = normalizeDate(new Date(sortedRecords[0].record_date));

  // 检查最近的记录是否是今天或昨天
  if (latestRecord.getTime() !== today.getTime() &&
    latestRecord.getTime() !== today.getTime() - 86400000) {
    return 0;
  }

  // 计算连续天数
  for (let i = 0; i < sortedRecords.length - 1; i++) {
    const currentDate = normalizeDate(new Date(sortedRecords[i].record_date));
    const nextDate = normalizeDate(new Date(sortedRecords[i + 1].record_date));

    // 检查是否连续
    if (currentDate.getTime() - nextDate.getTime() === 86400000) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
};