import React from 'react';
import { StyleSheet, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import ThemedText from "@/components/common/ThemedText";
import { useTheme } from '@/components/common/ThemeContext';
import { getThemeColorByTheme } from '@/utils/theme';
import { Habit } from '@/data/types';
import DetailModal, { DetailItem } from '@/components/common/modal/DetailModal';

interface HabitDetailModalProps {
  visible: boolean;
  habit: Habit | null;
  streakCount: number;
  onClose: () => void;
}

const HabitDetailModal: React.FC<HabitDetailModalProps> = ({
  visible,
  habit,
  streakCount,
  onClose
}) => {
  const { actualTheme } = useTheme();
  const themedSecondaryColor = getThemeColorByTheme('secondaryColor', actualTheme);
  const themedSuccessColor = getThemeColorByTheme('successColor', actualTheme);

  if (!habit) return null;

  // 构建详情项
  const detailItems: DetailItem[] = [
    {
      title: '习惯名称',
      value: habit.name,
      icon: 'bookmark-outline',
      iconColor: themedSuccessColor
    }
  ];

  // 如果有描述，添加描述项
  if (habit.description) {
    detailItems.push({
      title: '描述',
      value: habit.description,
      icon: 'document-text-outline',
      iconColor: themedSuccessColor
    });
  }

  return (
    <DetailModal
      visible={visible}
      onClose={onClose}
      title="习惯详情"
      icon="ribbon-outline"
      iconColor={themedSuccessColor}
      items={detailItems}
      actionButton={{
        text: '确认',
        onPress: onClose
      }}
    >
      <View style={[
        styles.streakContainer,
        {
          backgroundColor: `${themedSecondaryColor}10`,
          borderColor: `${themedSecondaryColor}20`
        }
      ]}>
        <View style={styles.streakIcon}>
          <Ionicons
            name="trending-up-sharp"
            size={30}
            color={themedSecondaryColor}
          />
        </View>
        <View style={styles.streakInfo}>
          <ThemedText category="h3" isBold style={[styles.streakCount, { color: themedSecondaryColor }]}>
            {streakCount}
          </ThemedText>
          <ThemedText category="p1">
            连续打卡天数
          </ThemedText>
        </View>
      </View>
    </DetailModal>
  );
};

const styles = StyleSheet.create({
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
    marginTop: 8,
  },
  streakIcon: {
    marginRight: 16,
  },
  streakInfo: {
    flex: 1,
  },
  streakCount: {
    marginBottom: 2,
  }
});

export default HabitDetailModal;