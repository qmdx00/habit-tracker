import React, { ReactNode } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ThemedText from '@/components/common/ThemedText';
import { useTheme } from '@/components/common/ThemeContext';
import { getThemeColorByTheme } from '@/utils/theme';

interface SettingItemProps {
  label: string;
  children?: ReactNode;
  onPress?: () => void;
  showArrow?: boolean;
  isLast?: boolean;
}

export default function SettingItem({
  label,
  children,
  onPress,
  showArrow = false,
  isLast = false
}: SettingItemProps) {
  const { actualTheme } = useTheme();
  const themedTextColor = getThemeColorByTheme('textColor', actualTheme);
  const themedDividerColor = getThemeColorByTheme('dividerColor', actualTheme);

  const content = (
    <View style={[
      styles.container,
      !isLast && { borderBottomWidth: 0.5, borderBottomColor: themedDividerColor }
    ]}>
      <View style={styles.settingItem}>
        <ThemedText category='p1' style={styles.label}>{label}</ThemedText>
        <View style={styles.rightContainer}>
          {children}
          {showArrow && (
            <Ionicons
              name="chevron-forward-outline"
              size={20}
              color={themedTextColor}
              style={styles.arrowIcon}
            />
          )}
        </View>
      </View>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={onPress}
        style={styles.touchable}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  touchable: {
    backgroundColor: 'transparent',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  label: {
    fontSize: 16,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowIcon: {
    width: 20,
    height: 20,
    marginLeft: 6,
    opacity: 0.5,
  }
});