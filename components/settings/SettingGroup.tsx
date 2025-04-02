import React, { ReactNode } from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '@/components/common/ThemeContext';
import ThemedText from '@/components/common/ThemedText';
import { getThemeColorByTheme, isDarkTheme } from '@/utils/theme';

interface SettingGroupProps {
  title?: string;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export default function SettingGroup({ title, children, style }: SettingGroupProps) {
  const { actualTheme } = useTheme();
  const isDark = isDarkTheme(actualTheme);
  const themedCardBgColor = getThemeColorByTheme('cardBackgroundColor', actualTheme);
  const themedDividerColor = getThemeColorByTheme('dividerColor', actualTheme);

  return (
    <View style={[styles.container, { marginTop: title ? 24 : 12 }]}>
      {title && (
        <ThemedText category="p2" style={styles.groupTitle}>
          {title}
        </ThemedText>
      )}
      <View style={[
        styles.card,
        {
          backgroundColor: themedCardBgColor,
          borderColor: themedDividerColor,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: isDark ? 0.15 : 0.08,
          shadowRadius: 4,
          elevation: isDark ? 3 : 1,
        },
        style
      ]}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 16,
    minHeight: 30,
  },
  groupTitle: {
    marginLeft: 16,
    marginBottom: 8,
    fontSize: 13,
    opacity: 0.6,
    height: 20,
    fontWeight: '500',
  },
  card: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 0,
  },
});