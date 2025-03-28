import React from 'react';
import { SafeAreaView, StyleSheet, ViewStyle } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { useTheme } from '@/components/ThemeContext';
import { themeConfig } from '@/config/app';

interface ThemedLayoutProps {
  children: React.ReactNode;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
}

export default function ThemedLayout({ children, style, contentContainerStyle }: ThemedLayoutProps) {
  const { actualTheme } = useTheme();
  const isDarkMode = actualTheme === 'dark';
  const backgroundColor = isDarkMode ? themeConfig.backgroundColor.dark : themeConfig.backgroundColor.light;

  return (
    <SafeAreaView style={[
      styles.container,
      { backgroundColor },
      style
    ]}>
      <Layout style={[
        styles.layout,
        { backgroundColor },
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