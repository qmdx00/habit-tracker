import React from 'react';
import { StyleSheet } from 'react-native';
import { Toggle, Radio, RadioGroup } from '@ui-kitten/components';
import { useTheme } from './ThemeContext';
import ThemedText from './ThemedText';
import SettingItem from './SettingItem';
import SettingCard from './SettingCard';

interface ThemeToggleProps {
  cardStyle?: any;
}

export default function ThemeToggle({ cardStyle }: ThemeToggleProps) {
  const { theme, actualTheme, toggleTheme, setTheme } = useTheme();

  return (
    <SettingCard title="主题设置" style={cardStyle}>
      <SettingItem label="暗色模式">
        <Toggle
          checked={actualTheme === 'dark'}
          onChange={toggleTheme}
        />
      </SettingItem>

      <ThemedText style={styles.labelText}>主题选择</ThemedText>

      <RadioGroup
        selectedIndex={theme === 'light' ? 0 : theme === 'dark' ? 1 : 2}
        onChange={index => {
          const themeValues: ['light', 'dark', 'system'] = ['light', 'dark', 'system'];
          setTheme(themeValues[index]);
        }}
      >
        <Radio style={styles.radioButton}>
          <ThemedText>浅色</ThemedText>
        </Radio>
        <Radio style={styles.radioButton}>
          <ThemedText>深色</ThemedText>
        </Radio>
        <Radio style={styles.radioButton}>
          <ThemedText>跟随系统</ThemedText>
        </Radio>
      </RadioGroup>
    </SettingCard>
  );
}

const styles = StyleSheet.create({
  labelText: {
    marginBottom: 8,
  },
  radioButton: {
    marginVertical: 8,
  },
});