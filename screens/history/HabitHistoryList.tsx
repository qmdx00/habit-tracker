import React from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import ThemedText from "@/components/common/ThemedText";
import EmptyState from "@/components/common/EmptyState";
import { useTheme } from '@/components/common/ThemeContext';
import { getThemeColorByTheme, isDarkTheme } from '@/utils/theme';
import { Habit } from '@/data/types';
import { formatDateToMonthDay } from '@/utils/date';

interface HabitHistoryListProps {
  habits: Habit[];
  selectedDate: Date;
  loading: boolean;
  onHabitPress: (habit: Habit) => void;
}

const HabitHistoryList: React.FC<HabitHistoryListProps> = ({
  habits,
  selectedDate,
  loading,
  onHabitPress
}) => {
  const { actualTheme } = useTheme();
  const themedCardBgColor = getThemeColorByTheme('cardBackgroundColor', actualTheme);
  const themedBorderColor = getThemeColorByTheme('borderColor', actualTheme);
  const themedPrimaryColor = getThemeColorByTheme('primaryColor', actualTheme);
  const themedSuccessColor = getThemeColorByTheme('successColor', actualTheme);
  const isDark = isDarkTheme(actualTheme);

  // 渲染习惯项
  const renderHabitItem = ({ item }: { item: Habit }) => (
    <TouchableOpacity
      style={[
        styles.habitItem,
        {
          backgroundColor: themedCardBgColor,
          borderColor: themedBorderColor,
          shadowColor: isDark ? themedPrimaryColor : '#000',
          shadowOpacity: isDark ? 0.1 : 0.05
        }
      ]}
      onPress={() => onHabitPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.habitIconContainer}>
        <View style={[
          styles.circleIcon,
          {
            backgroundColor: `${themedSuccessColor}15`,
            borderColor: `${themedSuccessColor}30`,
          }
        ]}>
          <Ionicons
            name="checkmark-sharp"
            size={22}
            color={themedSuccessColor}
          />
        </View>
      </View>
      <View style={styles.habitInfo}>
        <ThemedText category="h6" isBold style={styles.habitName}>
          {item.name}
        </ThemedText>
        {item.description ? (
          <ThemedText category="p2" style={styles.habitDescription} numberOfLines={2} ellipsizeMode="tail">
            {item.description}
          </ThemedText>
        ) : null}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.habitListContainer}>
      <ThemedText category="h5" isBold style={styles.sectionTitle}>
        {formatDateToMonthDay(selectedDate)} 打卡记录
      </ThemedText>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ThemedText>加载中...</ThemedText>
        </View>
      ) : habits.length > 0 ? (
        <FlatList
          data={habits}
          renderItem={renderHabitItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.habitList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <EmptyState
          title="暂无打卡记录"
          subtitle={`${formatDateToMonthDay(selectedDate)}没有打卡记录`}
          icon="calendar-outline"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  habitListContainer: {
    flex: 1,
  },
  sectionTitle: {
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  habitList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  habitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 16,
    marginBottom: 8,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  habitIconContainer: {
    marginRight: 12,
  },
  circleIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  habitInfo: {
    flex: 1,
  },
  habitName: {
    marginBottom: 4,
  },
  habitDescription: {
    marginTop: 0,
    opacity: 0.7,
    maxHeight: 40,
    lineHeight: 18,
  },
});

export default HabitHistoryList;