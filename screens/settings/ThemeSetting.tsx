import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { useTheme } from '@/components/common/ThemeContext';
import ThemedText from '@/components/common/ThemedText';
import ThemedLayout from '@/components/common/ThemedLayout';
import { getThemeColorByTheme } from '@/utils/theme';
import SettingGroup from '@/components/settings/SettingGroup';

type ThemeOption = 'light' | 'dark' | 'system';

const themeOptions: ThemeOption[] = ['system', 'light', 'dark'];
const themeLabels: Record<ThemeOption, string> = {
  system: '跟随系统',
  light: '浅色',
  dark: '深色',
}

export default function ThemeSetting() {
  const { theme, actualTheme, setTheme } = useTheme();
  const themedPrimaryColor = getThemeColorByTheme('primaryColor', actualTheme);
  const themedBorderColor = getThemeColorByTheme('borderColor', actualTheme);

  const handleSelectTheme = (selectedTheme: ThemeOption) => setTheme(selectedTheme);

  return (
    <ThemedLayout>
      <Stack.Screen options={{ title: '主题设置' }} />

      <View style={styles.container}>
        <SettingGroup title="主题模式">
          {themeOptions.map((option, index) => (
            <TouchableOpacity
              key={option}
              style={styles.optionContainer}
              onPress={() => handleSelectTheme(option)}
              activeOpacity={0.6}
            >
              <View style={[
                styles.optionContent,
                index === themeOptions.length - 1 ? null : { borderBottomWidth: 0.5, borderBottomColor: themedBorderColor }
              ]}>
                <ThemedText category='p1' style={styles.optionLabel}>
                  {themeLabels[option]}
                </ThemedText>

                <View style={[styles.radioOuter, { borderColor: theme === option ? themedPrimaryColor : themedBorderColor }]}>
                  {theme === option && (<View style={[styles.radioInner, { backgroundColor: themedPrimaryColor }]} />)}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </SettingGroup>

        <ThemedText style={styles.description}>
          选择您希望应用采用的外观样式，可以设置为跟随系统、浅色或深色模式。
        </ThemedText>
      </View>
    </ThemedLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingTop: 10,
  },
  optionContainer: {
    paddingHorizontal: 16,
    width: '100%',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    width: '100%',
  },
  optionLabel: {
    fontSize: 16,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  description: {
    marginTop: 12,
    marginHorizontal: 32,
    textAlign: 'center',
    opacity: 0.6,
    fontSize: 14,
    lineHeight: 20,
  },
});