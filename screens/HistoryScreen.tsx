import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View } from "react-native";
import { useSQLiteContext } from 'expo-sqlite';
import { Habit } from '@/data/types';
import { triggerHaptic } from '@/utils/haptic';
import { calculateStreakDays } from '@/utils/habit';
import { habitSQLiteRepository, habitRecordSQLiteRepository } from '@/data/sqlite';
import { formatToDateString, normalizeDate, generateWeekDays, isSameDay } from '@/utils/date';
import ThemedText from "@/components/common/ThemedText";
import ThemedLayout from "@/components/common/ThemedLayout";
import { handleModalOpen, handleModalClose } from '@/utils/modal';
import CalendarView from '@/screens/history/CalendarView';
import HabitHistoryList from '@/screens/history/HabitHistoryList';
import HabitDetailModal from '@/screens/history/HabitDetailModal';

export default function HistoryScreen() {
  const db = useSQLiteContext();
  const [selectedDate, setSelectedDate] = useState(normalizeDate(new Date()));
  const [calendarDays, setCalendarDays] = useState<Date[]>([]);
  const [currentWeek, setCurrentWeek] = useState(0); // 0 = 本周, -1 = 上周, -2 = 上上周...
  const [habits, setHabits] = useState<Habit[]>([]);
  const [completedHabits, setCompletedHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
  const [streakCount, setStreakCount] = useState(0);
  const [showHabitDetails, setShowHabitDetails] = useState(false);

  const goToPreviousWeek = () => {
    triggerHaptic('light');
    setCurrentWeek(prev => prev - 1);
  };

  const goToNextWeek = () => {
    if (currentWeek < 0) {
      triggerHaptic('light');
      setCurrentWeek(prev => prev + 1);
    }
  };

  const loadHabits = useCallback(async () => {
    try {
      const allHabits = await habitSQLiteRepository.getAll(db);
      setHabits(allHabits);
    } catch (error) {
      console.error('获取习惯列表失败:', error);
    }
  }, [db]);

  const loadCompletedHabits = useCallback(async (date: Date) => {
    if (habits.length === 0) {
      setCompletedHabits([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const dateString = formatToDateString(date);
      const completedHabitsList = await habitRecordSQLiteRepository.getCompletedHabitsByDate(db, dateString);
      setCompletedHabits(completedHabitsList);
    } catch (error) {
      console.error('获取已完成习惯失败:', error);
      setCompletedHabits([]);
    } finally {
      setLoading(false);
    }
  }, [db, habits]);

  // 日期选择处理函数
  const handleSelectDate = (date: Date) => {
    setSelectedDate(normalizeDate(date));
  };

  // 习惯点击处理函数
  const handleHabitPress = async (habit: Habit) => {
    try {
      triggerHaptic('medium');
      setSelectedHabit(habit);
      // 获取习惯记录
      const records = await habitRecordSQLiteRepository.getByHabitId(db, habit.id);

      // 计算连续打卡天数
      let count = 0;
      if (records.length > 0) {
        count = calculateStreakDays(records);
      }

      setStreakCount(count);
      handleModalOpen(setShowHabitDetails);
    } catch (error) {
      console.error('获取习惯详情失败:', error);
    }
  };

  // 关闭习惯详情弹窗
  const handleCloseHabitDetails = () => {
    handleModalClose(setShowHabitDetails);
    setSelectedHabit(null);
  };

  // 监听当前周的变化，生成对应的日期
  useEffect(() => {
    const { days, isCurrentWeek, today } = generateWeekDays(currentWeek);
    setCalendarDays(days);
  }, [currentWeek]);

  // 处理日期选择逻辑
  useEffect(() => {
    if (calendarDays.length === 0) return;

    const isCurrentWeek = currentWeek === 0;
    const today = isCurrentWeek ? normalizeDate(new Date()) : null;

    // 如果是本周，默认选中今天
    if (isCurrentWeek && today) {
      const isSelectedDateVisible = calendarDays.some(day => isSameDay(day, selectedDate));
      if (!isSelectedDateVisible) {
        setSelectedDate(today);
      }
    } else {
      // 如果选中的日期不在当前显示的周内，则选择该周的第一天
      const isSelectedDateVisible = calendarDays.some(day => isSameDay(day, selectedDate));
      if (!isSelectedDateVisible) {
        setSelectedDate(calendarDays[0]);
      }
    }
  }, [calendarDays, currentWeek]);

  // 初始加载
  useEffect(() => {
    loadHabits();
  }, [loadHabits]);

  // 当选中日期变化时，加载已完成习惯
  useEffect(() => {
    if (selectedDate) {
      loadCompletedHabits(selectedDate);
    }
  }, [selectedDate, loadCompletedHabits]);

  return (
    <ThemedLayout>
      <View style={styles.container}>
        <View style={styles.header}>
          <ThemedText category="h1" isBold style={styles.title}>
            历史记录
          </ThemedText>
          <ThemedText category="p2" style={styles.subtitle}>
            查看您的习惯打卡历史
          </ThemedText>
        </View>

        {/* 日历部分 */}
        <CalendarView
          calendarDays={calendarDays}
          selectedDate={selectedDate}
          currentWeek={currentWeek}
          onDateSelect={handleSelectDate}
          onPreviousWeek={goToPreviousWeek}
          onNextWeek={goToNextWeek}
        />

        {/* 已打卡习惯列表 */}
        <HabitHistoryList
          habits={completedHabits}
          selectedDate={selectedDate}
          loading={loading}
          onHabitPress={handleHabitPress}
        />

        {/* 习惯详情弹窗 */}
        <HabitDetailModal
          visible={showHabitDetails}
          habit={selectedHabit}
          streakCount={streakCount}
          onClose={handleCloseHabitDetails}
        />
      </View>
    </ThemedLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    marginBottom: 4,
  },
  subtitle: {
    opacity: 0.7,
  },
});