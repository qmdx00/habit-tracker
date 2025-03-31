import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { Card, Divider } from '@ui-kitten/components';
import { useTheme } from '@/components/common/ThemeContext';
import ThemedText from '@/components/common/ThemedText';
import { getThemeColorByTheme } from '@/utils/theme/themeUtils';

interface SettingCardProps {
  title: string;
  children: ReactNode;
  style?: any;
}

export default function SettingCard({ title, children, style }: SettingCardProps) {
  const { actualTheme } = useTheme();
  const themedBackgroundColor = getThemeColorByTheme('backgroundColor', actualTheme);
  const themedBorderColor = getThemeColorByTheme('borderColor', actualTheme);

  return (
    <Card style={[styles.card, { backgroundColor: themedBackgroundColor }, style]}>
      <ThemedText category="h6" style={styles.sectionTitle}>{title}</ThemedText>
      <Divider style={[styles.divider, { backgroundColor: themedBorderColor }]} />
      {children}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
  },
  sectionTitle: {
    marginBottom: 10,
  },
  divider: {
    marginBottom: 15,
  },
});