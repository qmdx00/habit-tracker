import React from 'react';
import { SafeAreaView, StyleSheet, ViewStyle } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { useTheme } from './ThemeContext';

interface ThemedLayoutProps {
  children: React.ReactNode;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
}

export default function ThemedLayout({ children, style, contentContainerStyle }: ThemedLayoutProps) {
  const { actualTheme } = useTheme();
  const isDarkMode = actualTheme === 'dark';

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#121212' : 'white' },
        style
      ]}>
      <Layout
        style={[
          styles.layout,
          { backgroundColor: isDarkMode ? '#121212' : 'white' },
          contentContainerStyle
        ]}>
        {children}
      </Layout>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  layout: {
    flex: 1,
    width: '100%',
  },
});