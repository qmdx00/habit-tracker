import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, TouchableOpacity, Modal, Animated, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/components/common/ThemeContext';
import { getThemeColorByTheme, isDarkTheme } from '@/utils/theme';
import ThemedText from '@/components/common/ThemedText';
import { useSQLiteContext } from 'expo-sqlite';
import { habitRecordSQLiteRepository } from '@/data/sqlite';
import { Habit } from '@/data/types';
import { triggerHaptic, getCurrentDateString } from '@/utils/common';

interface HabitCheckCardProps {
  habit: Habit;
  onCheckSuccess?: () => void;
}

const HabitCheckCard: React.FC<HabitCheckCardProps> = ({ habit, onCheckSuccess }) => {
  const db = useSQLiteContext();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isCheckedToday, setIsCheckedToday] = useState(false);
  const { actualTheme } = useTheme();

  const themedPrimaryColor = getThemeColorByTheme('primaryColor', actualTheme);
  const themedSuccessColor = getThemeColorByTheme('successColor', actualTheme);
  const themedCardBgColor = getThemeColorByTheme('cardBackgroundColor', actualTheme);
  const themedBorderColor = getThemeColorByTheme('borderColor', actualTheme);
  const isDark = isDarkTheme(actualTheme);

  // 检查今日打卡状态函数
  const checkTodayRecord = useCallback(async () => {
    try {
      const today = getCurrentDateString();
      const exists = await habitRecordSQLiteRepository.checkRecordExists(db, habit.id, today);
      setIsCheckedToday(exists);
    } catch (error) {
      console.error('检查打卡记录失败:', error);
    }
  }, [db, habit.id]);

  // 每次组件挂载时检查打卡状态
  useEffect(() => {
    checkTodayRecord();
  }, [checkTodayRecord]);

  const handleCheck = async () => {
    if (isCheckedToday) {
      triggerHaptic('warning');
      alert('今天已经完成打卡了');
      return;
    }

    try {
      setLoading(true);
      const today = getCurrentDateString();

      // 创建打卡记录
      await habitRecordSQLiteRepository.create(db, {
        habit_id: habit.id,
        record_date: today
      });

      // 更新本地状态
      setIsCheckedToday(true);

      // 触发成功反馈
      triggerHaptic('success');

      // 显示成功提示
      setShowSuccess(true);

      // 3秒后自动关闭提示
      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);

      // 调用回调
      if (onCheckSuccess) {
        onCheckSuccess();
        // 在回调执行后重新检查打卡状态
        setTimeout(() => {
          checkTodayRecord();
        }, 500);
      }
    } catch (error) {
      console.error('打卡失败:', error);
      triggerHaptic('error');
      alert('打卡失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  // 获取标签背景色
  const getBadgeStyles = () => {
    return {
      backgroundColor: `${themedSuccessColor}15`,
      borderColor: `${themedSuccessColor}30`,
      borderWidth: 1,
    };
  };

  // 获取已完成项的图标背景色
  const getIconBackgroundStyles = () => {
    return {
      backgroundColor: isCheckedToday
        ? `${themedSuccessColor}12`
        : `${themedPrimaryColor}12`,
      borderColor: isCheckedToday
        ? `${themedSuccessColor}25`
        : `${themedPrimaryColor}25`,
      borderWidth: 1,
    };
  };

  // 获取按钮样式
  const getButtonStyles = () => {
    if (isCheckedToday) {
      return {
        backgroundColor: isDark ? `${themedCardBgColor}` : `${themedCardBgColor}`,
        borderColor: `${themedSuccessColor}30`,
        borderWidth: 1.5,
      };
    } else {
      return {
        backgroundColor: themedPrimaryColor,
        borderColor: isDark ? `${themedPrimaryColor}80` : `${themedPrimaryColor}30`,
        borderWidth: 1,
        shadowColor: themedPrimaryColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
      };
    }
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.iconContainer}>
        <View style={[
          styles.iconBackground,
          getIconBackgroundStyles()
        ]}>
          <Ionicons
            name={isCheckedToday ? "checkmark-circle" : "star-outline"}
            size={20}
            color={isCheckedToday ? themedSuccessColor : themedPrimaryColor}
          />
        </View>
      </View>

      <View style={styles.habitInfo}>
        <ThemedText
          category="h6"
          isBold
          style={[
            styles.habitName,
            isCheckedToday && {
              opacity: 0.75,
              color: isCheckedToday ? themedSuccessColor : undefined
            }
          ]}
        >
          {habit.name}
        </ThemedText>
        {habit.description ? (
          <ThemedText
            category="p2"
            style={[
              styles.habitDescription,
              isCheckedToday && { opacity: 0.5 }
            ]}
          >
            {habit.description}
          </ThemedText>
        ) : null}

        {isCheckedToday && (
          <View style={[styles.checkedBadge, getBadgeStyles()]}>
            <ThemedText
              category="p2"
              style={[styles.checkedBadgeText, { color: themedSuccessColor }]}
            >
              今日已完成
            </ThemedText>
          </View>
        )}
      </View>

      <TouchableOpacity
        style={[
          styles.checkButton,
          getButtonStyles()
        ]}
        onPress={handleCheck}
        disabled={loading || isCheckedToday}
        activeOpacity={isCheckedToday ? 1 : 0.6}
      >
        <Ionicons
          name={isCheckedToday ? "checkmark-circle" : loading ? "time-outline" : "checkmark-outline"}
          size={20}
          color={isCheckedToday ? themedSuccessColor : "white"}
        />
      </TouchableOpacity>

      {/* 打卡成功弹窗 */}
      <Modal
        transparent={true}
        visible={showSuccess}
        animationType="fade"
      >
        <View style={styles.successModalContainer}>
          <View
            style={[
              styles.successModal,
              {
                backgroundColor: themedCardBgColor,
                shadowOpacity: isDark ? 0.3 : 0.1,
                borderColor: isDark ? `${themedBorderColor}` : `${themedSuccessColor}20`,
                borderWidth: 1,
              }
            ]}
          >
            <View style={[
              styles.successIconContainer,
              {
                backgroundColor: `${themedSuccessColor}15`,
                borderRadius: 50,
                padding: 12,
              }
            ]}>
              <Ionicons
                name="checkmark-circle"
                size={64}
                color={themedSuccessColor}
              />
            </View>
            <ThemedText
              category="h5"
              isBold
              style={[
                styles.successTitle,
                { color: themedSuccessColor }
              ]}
            >
              打卡成功！
            </ThemedText>
            <ThemedText category="p1" style={styles.successText}>
              今日"{habit.name}"习惯已完成
            </ThemedText>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  iconContainer: {
    marginRight: 14,
  },
  iconBackground: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  habitInfo: {
    flex: 1,
    marginRight: 8,
  },
  habitName: {
    marginBottom: 2,
  },
  habitDescription: {
    opacity: 0.7,
    fontSize: 13,
  },
  checkedText: {
    opacity: 0.75,
  },
  checkedDescriptionText: {
    opacity: 0.5,
  },
  checkedBadge: {
    marginTop: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  checkedBadgeText: {
    fontSize: 11,
    fontWeight: '500',
  },
  checkButton: {
    width: 38,
    height: 38,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  successModal: {
    width: '80%',
    padding: 28,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 8,
  },
  successIconContainer: {
    marginBottom: 20,
  },
  successTitle: {
    marginBottom: 12,
  },
  successText: {
    textAlign: 'center',
    opacity: 0.8,
    lineHeight: 22,
  }
});

export default HabitCheckCard;