import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { useTheme } from '@/components/common/ThemeContext';
import { getFontStyleByCategory, getThemeColorByTheme } from '@/utils/theme';

export default function SettingsLayout() {
  const { actualTheme } = useTheme();
  const themedBackgroundColor = getThemeColorByTheme('backgroundColor', actualTheme);
  const themedTextColor = getThemeColorByTheme('textColor', actualTheme);
  const themedDividerColor = getThemeColorByTheme('dividerColor', actualTheme);
  const fontStyle = getFontStyleByCategory('h4', true);

  const headerStyle = StyleSheet.create({
    header: {
      backgroundColor: themedBackgroundColor,
      elevation: 0,
      borderBottomWidth: 1,
      borderBottomColor: themedDividerColor,
      shadowColor: 'transparent',
    }
  });

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: headerStyle.header,
        headerTitleStyle: {
          color: themedTextColor,
          fontSize: fontStyle.size,
          fontWeight: fontStyle.weight,
        },
        headerTintColor: themedTextColor,
        headerTitleAlign: 'center',
        contentStyle: {
          backgroundColor: themedBackgroundColor,
        },
        headerShadowVisible: false,
        animation: 'slide_from_right',
      }}
    />
  );
}