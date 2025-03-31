import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useTheme } from '@/components/common/ThemeContext';
import ThemedText from '@/components/common/ThemedText';
import SettingCard from '@/components/settings/SettingCard';
import { getThemeColorByTheme } from '@/utils/theme/themeUtils';

interface ThemeToggleProps {
  cardStyle?: any;
}

type ThemeOption = 'light' | 'dark' | 'system';

const themeOptions: ThemeOption[] = ['system', 'light', 'dark'];
const themeLabels: Record<ThemeOption, string> = {
  system: '跟随系统',
  light: '浅色',
  dark: '深色',
}

export default function ThemeToggle({ cardStyle }: ThemeToggleProps) {
  const { theme, actualTheme, setTheme } = useTheme();
  const themedPrimaryColor = getThemeColorByTheme('primaryColor', actualTheme);
  const themedBorderColor = getThemeColorByTheme('borderColor', actualTheme);
  const handleSelectTheme = (selectedTheme: ThemeOption) => setTheme(selectedTheme);

  return (
    <SettingCard title="主题设置" style={cardStyle}>
      <ThemedText category='p1' style={styles.labelText}>选择外观模式</ThemedText>

      <View style={styles.radioContainer}>
        {themeOptions.map((option) => (
          <TouchableOpacity
            key={option}
            style={styles.optionContainer}
            onPress={() => handleSelectTheme(option)}
            activeOpacity={0.7}
          >
            <View style={[
              styles.radioOuter,
              { borderColor: theme === option ? themedPrimaryColor : themedBorderColor }
            ]}>
              {theme === option && (
                <View style={[styles.radioInner, { backgroundColor: themedPrimaryColor }]} />
              )}
            </View>
            <ThemedText category='p1' style={styles.radioText}>
              {themeLabels[option]}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </View>
    </SettingCard>
  );
}

const styles = StyleSheet.create({
  labelText: {
    marginBottom: 15,
  },
  radioContainer: {
    padding: 5,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  radioText: {
    marginLeft: 10,
  }
});