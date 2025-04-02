import { useState, useEffect, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import ThemedLayout from "@/components/common/ThemedLayout";
import FloatingButton from "@/components/common/FloatingButton";
import ThemedText from "@/components/common/ThemedText";
import { useTheme } from "@/components/common/ThemeContext";
import AddHabitForm from "@/screens/today/AddHabitForm";
import HabitList from "@/screens/today/HabitList";
import { getThemeColorByTheme } from "@/utils/theme";
import { getTodayFormatted } from "@/utils/common";
import { habitSQLiteRepository } from "@/data/sqlite";
import { Habit } from "@/data/types";

export default function TodayScreen() {
  const db = useSQLiteContext();
  const [showAddForm, setShowAddForm] = useState(false);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { actualTheme } = useTheme();
  const themedPrimaryColor = getThemeColorByTheme('primaryColor', actualTheme);

  const loadHabits = useCallback(async () => {
    try {
      const habitsList = await habitSQLiteRepository.getAll(db);
      setHabits(habitsList);
    } catch (error) {
      console.error('加载习惯列表失败:', error);
    }
  }, [db]);

  // 页面获得焦点时重新加载习惯列表
  useFocusEffect(
    useCallback(() => {
      loadHabits();
      return () => {
        // 清理函数（可选）
      };
    }, [loadHabits])
  );

  // 初始挂载时加载习惯列表
  useEffect(() => {
    loadHabits();
  }, [loadHabits]);

  const handleOpenAddForm = () => {
    setShowAddForm(true);
  };

  const handleCloseAddForm = () => {
    setShowAddForm(false);
  };

  const handleAddSuccess = () => {
    loadHabits();
  };

  const handlePressHabit = (habit: Habit) => {
    console.log('handlePressHabit', habit);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadHabits();
    setIsRefreshing(false);
  };

  return (
    <ThemedLayout>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <ThemedText category="h1" isBold style={styles.title}>
              今日打卡
            </ThemedText>
            <View style={[
              styles.dateContainer,
              { backgroundColor: `${themedPrimaryColor}12` }
            ]}>
              <Ionicons
                name="calendar"
                size={16}
                color={themedPrimaryColor}
                style={{ marginRight: 4 }}
              />
              <ThemedText
                category="p2"
                style={[
                  styles.subtitle,
                  { color: themedPrimaryColor }
                ]}
              >
                {getTodayFormatted()}
              </ThemedText>
            </View>
          </View>

          <View style={styles.headerInfo}>
            <ThemedText category="p2" style={{ opacity: 0.7 }}>
              共 {habits.length} 个习惯，完成打卡有助于养成好习惯
            </ThemedText>
          </View>

        </View>

        <HabitList
          habits={habits}
          onPress={handlePressHabit}
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
        />

        <FloatingButton
          onPress={handleOpenAddForm}
          style={styles.floatingButton}
          icon="add-outline"
          size={26}
        />

        <AddHabitForm
          visible={showAddForm}
          onClose={handleCloseAddForm}
          onSuccess={handleAddSuccess}
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
    paddingBottom: 0,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '500',
  },
  headerInfo: {
    marginBottom: 12,
  },
  floatingButton: {
    bottom: 32,
    right: 24,
  }
});