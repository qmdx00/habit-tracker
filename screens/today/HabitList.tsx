import React from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from '@/components/common/ThemeContext';
import { getThemeColorByTheme, isDarkTheme } from '@/utils/theme';
import { Habit } from '@/data/types';
import EmptyState from '@/components/common/EmptyState';
import HabitCheckCard from '@/screens/today/HabitCheckCard';

interface HabitListProps {
  habits: Habit[];
  onPress?: (habit: Habit) => void;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

const HabitList: React.FC<HabitListProps> = ({ habits, onPress, onRefresh, isRefreshing = false }) => {
  const { actualTheme } = useTheme();
  const themedCardBgColor = getThemeColorByTheme('cardBackgroundColor', actualTheme);
  const themedBorderColor = getThemeColorByTheme('borderColor', actualTheme);
  const themedDividerColor = getThemeColorByTheme('dividerColor', actualTheme);
  const themedBackgroundColor = getThemeColorByTheme('backgroundColor', actualTheme);
  const isDark = isDarkTheme(actualTheme);

  if (habits.length === 0) {
    return (
      <EmptyState
        title="暂无打卡项"
        subtitle="点击右下角添加按钮来创建您的第一个习惯打卡项"
        icon="calendar-outline"
      />
    );
  }

  const getCardStyles = (index: number) => {
    return {
      backgroundColor: themedCardBgColor,
      shadowOpacity: isDark ? 0.2 : 0.05,
      borderColor: themedBorderColor,
      borderWidth: 0,
      borderLeftWidth: 0.5,
      borderRightWidth: 0.5,
      borderTopWidth: index === 0 ? 0.5 : 0,
      borderBottomWidth: index === habits.length - 1 ? 0.5 : 0,
      borderBottomColor: index === habits.length - 1 ? themedBorderColor : 'transparent',
      borderTopLeftRadius: index === 0 ? 14 : 0,
      borderTopRightRadius: index === 0 ? 14 : 0,
      borderBottomLeftRadius: index === habits.length - 1 ? 14 : 0,
      borderBottomRightRadius: index === habits.length - 1 ? 14 : 0,
      marginBottom: index === habits.length - 1 ? 12 : 0,
    };
  };

  const renderItem = ({ item, index }: { item: Habit, index: number }) => (
    <TouchableOpacity
      style={[
        styles.habitCard,
        getCardStyles(index)
      ]}
      onPress={() => onPress && onPress(item)}
      activeOpacity={0.7}
    >
      <HabitCheckCard
        habit={item}
        onCheckSuccess={onRefresh}
      />

      {index < habits.length - 1 && (
        <View
          style={[
            styles.separator,
            { backgroundColor: themedDividerColor }
          ]}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={habits}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={[
        styles.listContainer,
        { backgroundColor: themedBackgroundColor }
      ]}
      showsVerticalScrollIndicator={false}
      refreshing={isRefreshing}
      onRefresh={onRefresh}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 100,
    minHeight: '100%',
  },
  habitCard: {
    padding: 0,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },
  separator: {
    height: 0.5,
    marginLeft: 68,
    opacity: 0.4,
  },
  habitContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  habitInfo: {
    flex: 1,
    marginRight: 12,
  },
  habitName: {
    marginBottom: 4,
  },
  habitDescription: {
    opacity: 0.7,
  },
  checkButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HabitList;