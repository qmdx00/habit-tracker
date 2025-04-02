import React from 'react';
import { SafeAreaView, StyleSheet, ViewStyle, View } from 'react-native';
import { useTheme } from '@/components/common/ThemeContext';
import { getThemeColorByTheme } from '@/utils/theme';

interface ThemedLayoutProps {
  children: React.ReactNode;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
}

export default function ThemedLayout({ children, style, contentContainerStyle }: ThemedLayoutProps) {
  const { actualTheme } = useTheme();
  const themedBackgroundColor = getThemeColorByTheme('backgroundColor', actualTheme);

  return (
    <SafeAreaView style={[
      styles.container,
      { backgroundColor: themedBackgroundColor },
      style
    ]}>
      <View style={[
        styles.layout,
        { backgroundColor: themedBackgroundColor },
        contentContainerStyle
      ]}>
        {children}
      </View>
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