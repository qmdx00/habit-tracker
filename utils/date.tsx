/**
 * 获取今天日期字符串
 * @returns 今天日期字符串
 */
export const getTodayFormatted = () => {
  const today = new Date();
  const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
  const weekday = weekdays[today.getDay()];
  const month = today.getMonth() + 1;
  const day = today.getDate();
  return `星期${weekday}，${month}月${day}日`;
};

/**
 * 获取当前日期字符串
 * @returns 当前日期字符串 (YYYY-MM-DD 格式)
 */
export const getCurrentDateString = () => {
  const today = new Date();
  return today.toISOString().split('T')[0]; // 返回 YYYY-MM-DD 格式
};

/**
 * 格式化日期为中文月日格式
 * @param date 日期对象
 * @returns 中文月日格式的日期字符串
 */
export const formatDateToMonthDay = (date: Date) => {
  return `${date.getMonth() + 1}月${date.getDate()}日`;
};

/**
 * 格式化日期为YYYY-MM-DD格式
 * @param date 日期对象
 * @returns YYYY-MM-DD 格式的日期字符串
 */
export const formatToDateString = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * 规范化日期为新日期对象，同时设置时间为00:00:00
 * @param date 输入日期对象
 * @returns 新的规范化日期对象
 */
export const normalizeDate = (date: Date) => {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
};

/**
 * 获取周的起始日期（周一）和结束日期（周日）
 * @param weekOffset 周偏移量（0为本周，-1为上周，依此类推）
 * @returns 周的起始和结束日期
 */
export const getWeekRange = (weekOffset: number = 0) => {
  const now = new Date();
  const today = normalizeDate(now);
  const currentDay = today.getDay() || 7; // 转换为1-7，其中7代表周日

  // 计算本周一的日期
  const mondayOfThisWeek = new Date(today);
  mondayOfThisWeek.setDate(today.getDate() - (currentDay - 1) + weekOffset * 7);

  // 计算本周日的日期
  const sundayOfThisWeek = new Date(mondayOfThisWeek);
  sundayOfThisWeek.setDate(mondayOfThisWeek.getDate() + 6);

  return {
    start: normalizeDate(mondayOfThisWeek),
    end: normalizeDate(sundayOfThisWeek),
    today: weekOffset === 0 ? today : null
  };
};

/**
 * 生成指定周的日期数组
 * @param weekOffset 周偏移量（0为本周，-1为上周，依此类推）
 * @returns 周日期数组及相关信息
 */
export const generateWeekDays = (weekOffset: number = 0) => {
  const { start, today } = getWeekRange(weekOffset);
  const days: Date[] = [];

  // 生成从周一到周日的七天
  for (let i = 0; i < 7; i++) {
    const day = new Date(start);
    day.setDate(start.getDate() + i);
    days.push(normalizeDate(day));
  }

  return {
    days,
    isCurrentWeek: weekOffset === 0,
    today
  };
};

/**
 * 检查日期是否为今天
 * @param date 要检查的日期
 * @returns 是否为今天
 */
export const isToday = (date: Date) => {
  const today = new Date();
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
};

/**
 * 检查两个日期是否为同一天
 * @param date1 第一个日期
 * @param date2 第二个日期
 * @returns 是否为同一天
 */
export const isSameDay = (date1: Date, date2: Date) => {
  return date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear();
};

/**
 * 获取周范围的日期字符串
 * @param startDate 开始日期
 * @param endDate 结束日期
 * @returns 格式化的周范围字符串
 */
export const getWeekRangeString = (startDate: Date, endDate: Date) => {
  if (startDate.getMonth() === endDate.getMonth()) {
    // 同月份
    return `${startDate.getFullYear()}年${startDate.getMonth() + 1}月${startDate.getDate()}日-${endDate.getDate()}日`;
  } else {
    // 跨月份
    return `${startDate.getFullYear()}年${startDate.getMonth() + 1}月${startDate.getDate()}日-${endDate.getMonth() + 1}月${endDate.getDate()}日`;
  }
};
