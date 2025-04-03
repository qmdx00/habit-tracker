import React from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import ThemedText from "@/components/common/ThemedText";
import { useTheme } from '@/components/common/ThemeContext';
import { getThemeColorByTheme, isDarkTheme } from '@/utils/theme';
import { isToday, isSameDay } from '@/utils/date';
import { triggerHaptic } from '@/utils/haptic';

interface CalendarViewProps {
  calendarDays: Date[];
  selectedDate: Date;
  currentWeek: number;
  onDateSelect: (date: Date) => void;
  onPreviousWeek: () => void;
  onNextWeek: () => void;
}

const WEEKDAYS = ['一', '二', '三', '四', '五', '六', '日'];
const screenWidth = Dimensions.get('window').width;

const CalendarView: React.FC<CalendarViewProps> = ({
  calendarDays,
  selectedDate,
  currentWeek,
  onDateSelect,
  onPreviousWeek,
  onNextWeek
}) => {
  const { actualTheme } = useTheme();
  const themedPrimaryColor = getThemeColorByTheme('primaryColor', actualTheme);
  const themedCardBgColor = getThemeColorByTheme('cardBackgroundColor', actualTheme);
  const themedBorderColor = getThemeColorByTheme('borderColor', actualTheme);
  const themedSecondaryColor = getThemeColorByTheme('secondaryColor', actualTheme);
  const isDark = isDarkTheme(actualTheme);

  // 获取当前周范围的日期字符串 (如：4月1日-4月7日)
  const getWeekRangeString = () => {
    if (calendarDays.length < 7) return '';

    const startDate = calendarDays[0];
    const endDate = calendarDays[6];

    if (startDate.getMonth() === endDate.getMonth()) {
      // 同月份
      return `${startDate.getMonth() + 1}月${startDate.getDate()}日-${endDate.getDate()}日`;
    } else {
      // 跨月份
      return `${startDate.getMonth() + 1}月${startDate.getDate()}日-${endDate.getMonth() + 1}月${endDate.getDate()}日`;
    }
  };

  // 处理日期选择
  const handleSelectDate = (date: Date) => {
    triggerHaptic('light');
    onDateSelect(date);
  };

  // 检查日期是否为选中日期
  const isSelectedDate = (date: Date) => {
    return isSameDay(date, selectedDate);
  };

  // 渲染日历日期项
  const renderCalendarDay = (date: Date, index: number) => {
    const isCurrentDay = isToday(date);
    const isSelected = isSelectedDate(date);

    return (
      <TouchableOpacity
        key={index}
        style={[
          styles.calendarDay,
          isSelected && { backgroundColor: `${themedSecondaryColor}08` }
        ]}
        onPress={() => handleSelectDate(date)}
        activeOpacity={0.7}
      >
        <ThemedText
          category="p2"
          style={[
            styles.weekday,
            isCurrentDay && { color: themedPrimaryColor, fontWeight: 'bold' },
            isSelected && !isCurrentDay && { color: themedSecondaryColor, fontWeight: '500' }
          ]}
        >
          {WEEKDAYS[index]}
        </ThemedText>

        {isCurrentDay ? (
          // 今天日期 - 主色圆形背景
          <View style={[styles.dateCircle, { backgroundColor: themedPrimaryColor }]}>
            <ThemedText category="p1" isBold style={{ color: '#FFFFFF' }}>
              {date.getDate()}
            </ThemedText>
          </View>
        ) : isSelected ? (
          // 选中日期 - 二级色圆形背景
          <View style={[styles.dateCircle, { backgroundColor: `${themedSecondaryColor}15` }]}>
            <ThemedText category="p1" isBold style={{ color: themedSecondaryColor }}>
              {date.getDate()}
            </ThemedText>
          </View>
        ) : (
          // 普通日期 - 无背景
          <View style={styles.dateCircle}>
            <ThemedText category="p1" isBold>
              {date.getDate()}
            </ThemedText>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={[
      styles.calendarContainer,
      {
        backgroundColor: themedCardBgColor,
        borderColor: isDark
          ? `${themedBorderColor}60`
          : themedBorderColor,
        shadowColor: isDark ? themedPrimaryColor : '#000',
        shadowOpacity: isDark ? 0.1 : 0.05
      }
    ]}>
      {/* 添加手动切换周的按钮 */}
      <View style={styles.weekNavigator}>
        <TouchableOpacity
          style={[
            styles.weekNavigatorButton,
            { backgroundColor: isDark ? `${themedPrimaryColor}15` : 'rgba(0,0,0,0.05)' }
          ]}
          onPress={onPreviousWeek}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={20} color={themedSecondaryColor} />
        </TouchableOpacity>

        <ThemedText
          category="p1"
          style={styles.weekRangeText}
        >
          {getWeekRangeString()}
        </ThemedText>

        <TouchableOpacity
          style={[
            styles.weekNavigatorButton,
            { backgroundColor: isDark ? `${themedPrimaryColor}15` : 'rgba(0,0,0,0.05)' },
            currentWeek === 0 && { opacity: 0.3 }
          ]}
          onPress={onNextWeek}
          disabled={currentWeek === 0}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-forward" size={20} color={themedSecondaryColor} />
        </TouchableOpacity>
      </View>

      {/* 日历日期部分 */}
      <View style={styles.calendarDaysContainer}>
        {calendarDays.map((date, index) => renderCalendarDay(date, index))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    marginHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  weekNavigator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  weekNavigatorButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  weekRangeText: {
    fontSize: 14,
    textAlign: 'center',
  },
  calendarDaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 12,
  },
  calendarDay: {
    width: (screenWidth - 64) / 7,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 1,
  },
  weekday: {
    marginBottom: 4,
    fontSize: 13,
  },
  dateCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
});

export default CalendarView;