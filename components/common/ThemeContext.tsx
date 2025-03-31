import React, { createContext, useState, useEffect, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Appearance, useColorScheme } from 'react-native';
import { themeConfig } from '@/config/app';

type ThemeType = 'light' | 'dark' | 'system';

interface ThemeContextProps {
  theme: ThemeType;
  actualTheme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: themeConfig.defaultTheme,
  actualTheme: 'light',
  toggleTheme: () => { },
  setTheme: () => { },
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeValue] = useState<ThemeType>(themeConfig.defaultTheme);
  const systemTheme = useColorScheme() as 'light' | 'dark';
  const actualTheme = theme === 'system' ? systemTheme : theme;

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      // NOTE: 只有在系统模式下才自动更新
      if (theme === 'system') {
        setThemeValue('system');
      }
    });
    return () => subscription.remove();
  }, [theme]);

  const toggleTheme = () => {
    setThemeValue(actualTheme);
  };

  const setTheme = (newTheme: ThemeType) => {
    setThemeValue(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, actualTheme, toggleTheme, setTheme }}>
      {children}
      <StatusBar style={actualTheme} />
    </ThemeContext.Provider>
  );
};

export default ThemeContext;