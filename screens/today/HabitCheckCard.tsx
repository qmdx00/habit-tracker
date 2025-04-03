import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, TouchableOpacity, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/components/common/ThemeContext';
import { getThemeColorByTheme, isDarkTheme } from '@/utils/theme';
import ThemedText from '@/components/common/ThemedText';
import { useSQLiteContext } from 'expo-sqlite';
import { habitRecordSQLiteRepository } from '@/data/sqlite';
import { Habit } from '@/data/types';
import { getCurrentDateString } from '@/utils/date';
import { triggerHaptic } from '@/utils/haptic';

interface HabitCheckCardProps {
  habit: Habit;
  onCheckSuccess?: () => void;
  fullCardClickable?: boolean;
}

const HabitCheckCard: React.FC<HabitCheckCardProps> = ({
  habit,
  onCheckSuccess,
  fullCardClickable = false
}) => {
  const db = useSQLiteContext();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
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

  const showCheckConfirmation = () => {
    if (isCheckedToday) {
      triggerHaptic('warning');
      Alert.alert('提示', '今天已经完成打卡了');
      return;
    }

    triggerHaptic('light');
    setShowConfirm(true);
  };

  const handleConfirmCheck = async () => {
    setShowConfirm(false);

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

      // 延时关闭提示
      setTimeout(() => {
        setShowSuccess(false);
      }, 1000);

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
      Alert.alert('错误', '打卡失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelCheck = () => {
    setShowConfirm(false);
    triggerHaptic('none');
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

  // 渲染主卡片内容
  const renderCardContent = () => (
    <>
      <View style={styles.iconContainer}>
        <View style={[
          styles.iconBackground,
          getIconBackgroundStyles()
        ]}>
          <Ionicons
            name={isCheckedToday ? "checkmark-sharp" : "calendar-outline"}
            size={22}
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
            numberOfLines={2}
            ellipsizeMode="tail"
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
    </>
  );

  return (
    <>
      {fullCardClickable ? (
        <TouchableOpacity
          style={styles.cardContainer}
          onPress={showCheckConfirmation}
          disabled={isCheckedToday || loading}
          activeOpacity={0.7}
        >
          {renderCardContent()}
        </TouchableOpacity>
      ) : (
        <View style={styles.cardContainer}>
          {renderCardContent()}

          <TouchableOpacity
            style={[
              styles.checkButton,
              isCheckedToday ? {
                backgroundColor: isDark ? `${themedCardBgColor}` : `${themedCardBgColor}`,
                borderColor: `${themedSuccessColor}30`,
                borderWidth: 1.5,
              } : {
                backgroundColor: themedPrimaryColor,
                borderColor: isDark ? `${themedPrimaryColor}80` : `${themedPrimaryColor}30`,
                borderWidth: 1,
                shadowColor: themedPrimaryColor,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 3,
                elevation: 3,
              }
            ]}
            onPress={showCheckConfirmation}
            disabled={loading || isCheckedToday}
            activeOpacity={isCheckedToday ? 1 : 0.6}
          >
            <Ionicons
              name={isCheckedToday ? "checkmark-circle" : loading ? "time-outline" : "checkmark-outline"}
              size={20}
              color={isCheckedToday ? themedSuccessColor : "white"}
            />
          </TouchableOpacity>
        </View>
      )}

      {/* 确认打卡弹窗 */}
      <Modal
        transparent={true}
        visible={showConfirm}
        animationType="fade"
        onRequestClose={handleCancelCheck}
      >
        <View style={styles.modalOverlay}>
          <View style={[
            styles.confirmModal,
            {
              backgroundColor: themedCardBgColor,
              borderColor: themedBorderColor
            }
          ]}>
            <View style={styles.confirmHeader}>
              <ThemedText category="h5" isBold style={styles.confirmTitle}>
                确认打卡
              </ThemedText>
            </View>

            <View style={styles.confirmContent}>
              <View style={[
                styles.confirmIconContainer,
                { backgroundColor: `${themedPrimaryColor}15` }
              ]}>
                <Ionicons
                  name="star"
                  size={32}
                  color={themedPrimaryColor}
                />
              </View>

              <ThemedText category="p1" style={styles.confirmText}>
                是否确认为 "{habit.name}" 打卡？
              </ThemedText>

              <View style={styles.confirmButtons}>
                <TouchableOpacity
                  style={[
                    styles.confirmButton,
                    styles.cancelButton,
                    { borderColor: themedBorderColor }
                  ]}
                  onPress={handleCancelCheck}
                >
                  <ThemedText category="p1">
                    取消
                  </ThemedText>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.confirmButton,
                    { backgroundColor: themedPrimaryColor }
                  ]}
                  onPress={handleConfirmCheck}
                >
                  <ThemedText category="p1" style={{ color: '#FFF' }} isBold>
                    确认打卡
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

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
    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    position: 'relative',
  },
  iconContainer: {
    marginRight: 12,
  },
  iconBackground: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  habitInfo: {
    flex: 1,
    marginRight: 48,
  },
  habitName: {
    marginBottom: 4,
  },
  habitDescription: {
    opacity: 0.7,
    maxHeight: 40,
    lineHeight: 18,
  },
  checkedBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    marginTop: 8,
  },
  checkedBadgeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  checkButton: {
    position: 'absolute',
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
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
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 5,
    maxWidth: '80%',
  },
  successIconContainer: {
    marginBottom: 16,
  },
  successTitle: {
    marginBottom: 8,
  },
  successText: {
    textAlign: 'center',
    opacity: 0.8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  confirmModal: {
    borderRadius: 16,
    width: '80%',
    maxWidth: 320,
    overflow: 'hidden',
    borderWidth: 1,
  },
  confirmHeader: {
    padding: 16,
    alignItems: 'center',
  },
  confirmTitle: {
    textAlign: 'center',
  },
  confirmContent: {
    padding: 20,
    alignItems: 'center',
  },
  confirmIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  confirmText: {
    textAlign: 'center',
    marginBottom: 24,
  },
  confirmButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  confirmButton: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
});

export default HabitCheckCard;