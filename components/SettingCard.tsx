import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { Card, Divider } from '@ui-kitten/components';
import { useTheme } from '@/components/ThemeContext';
import ThemedText from '@/components/ThemedText';
import { getCardBackgroundColor, getDividerColor } from '@/components/ui/cardLoading';
import { isDarkTheme } from '@/utils/theme/themeUtils';

interface SettingCardProps {
  title: string;
  children: ReactNode;
  style?: any;
}

export default function SettingCard({ title, children, style }: SettingCardProps) {
  const { actualTheme } = useTheme();
  const isDarkMode = isDarkTheme(actualTheme);

  const backgroundColor = getCardBackgroundColor(isDarkMode);
  const dividerColor = getDividerColor(isDarkMode);

  return (
    <Card style={[styles.card, { backgroundColor }, style]}>
      <ThemedText category="h6" style={styles.sectionTitle}>{title}</ThemedText>
      <Divider style={[styles.divider, { backgroundColor: dividerColor }]} />
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