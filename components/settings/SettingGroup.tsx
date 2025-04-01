import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@/components/common/ThemeContext';
import ThemedText from '@/components/common/ThemedText';
import { getThemeColorByTheme, isDarkTheme } from '@/utils/theme';

interface SettingGroupProps {
  title?: string;
  children: ReactNode;
  style?: any;
}

export default function SettingGroup({ title, children, style }: SettingGroupProps) {
  const { actualTheme } = useTheme();
  const themedBackgroundColor = getThemeColorByTheme('backgroundColor', actualTheme);
  const themedBorderColor = getThemeColorByTheme('borderColor', actualTheme);

  return (
    <View style={[styles.container, { marginTop: title ? 24 : 12 }, style]}>
      {title && (
        <ThemedText category="p2" style={styles.groupTitle}>
          {title}
        </ThemedText>
      )}
      <View style={[
        styles.card,
        {
          backgroundColor: themedBackgroundColor,
          borderColor: themedBorderColor,
          boxShadow: isDarkTheme(actualTheme) ? '0 0 10px rgba(0, 0, 0, 0.1)' : '0 0 10px rgba(0, 0, 0, 0.05)',
        }
      ]}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 10,
    minHeight: 30,
  },
  groupTitle: {
    marginLeft: 16,
    marginBottom: 8,
    fontSize: 13,
    opacity: 0.6,
    height: 20,
  },
  card: {
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 0.5,
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    elevation: 1,
  },
});