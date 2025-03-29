import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useTheme } from '@/components/ThemeContext';
import ThemedText from '@/components/ThemedText';
import SettingCard from '@/components/SettingCard';
import { getThemeColor, isDarkTheme } from '@/utils/theme/themeUtils';
import { getThemeOptionLabels, getThemeOptions } from '@/components/ui/themeToggle';

interface ThemeToggleProps {
  cardStyle?: any;
}

type ThemeOption = 'light' | 'dark' | 'system';

export default function ThemeToggle({ cardStyle }: ThemeToggleProps) {
  const { theme, actualTheme, setTheme } = useTheme();
  const isDarkMode = isDarkTheme(actualTheme);

  const activeColor = getThemeColor('primaryColor', isDarkMode);
  const inactiveColor = getThemeColor('borderColor', isDarkMode);

  const options = getThemeOptions();
  const labels = getThemeOptionLabels();

  const handleSelectTheme = (selectedTheme: ThemeOption) => {
    setTheme(selectedTheme);
  };

  return (
    <SettingCard title="主题设置" style={cardStyle}>
      <ThemedText style={styles.labelText}>选择外观模式</ThemedText>

      <View style={styles.radioContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={styles.optionContainer}
            onPress={() => handleSelectTheme(option)}
            activeOpacity={0.7}
          >
            <View style={[
              styles.radioOuter,
              { borderColor: theme === option ? activeColor : inactiveColor }
            ]}>
              {theme === option && (
                <View style={[styles.radioInner, { backgroundColor: activeColor }]} />
              )}
            </View>
            <ThemedText style={styles.radioText}>
              {labels[option]}
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
    fontSize: 15,
    marginLeft: 10,
  }
});