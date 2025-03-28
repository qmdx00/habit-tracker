import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { Card, Divider } from '@ui-kitten/components';
import { useTheme } from './ThemeContext';
import ThemedText from './ThemedText';

interface SettingCardProps {
  title: string;
  children: ReactNode;
  style?: any;
}

export default function SettingCard({ title, children, style }: SettingCardProps) {
  const { actualTheme } = useTheme();
  const isDarkMode = actualTheme === 'dark';

  return (
    <Card style={[styles.card, { backgroundColor: isDarkMode ? '#1E1E1E' : 'white' }, style]}>
      <ThemedText category="h6" style={styles.sectionTitle}>{title}</ThemedText>
      <Divider style={[styles.divider, { backgroundColor: isDarkMode ? '#333333' : '#f0f0f0' }]} />
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