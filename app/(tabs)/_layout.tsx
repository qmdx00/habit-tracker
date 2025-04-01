import React from 'react';
import { Tabs } from 'expo-router';
import * as NavigationBar from 'expo-navigation-bar';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

import { Icon, IconProps } from '@ui-kitten/components';
import ThemedText from '@/components/common/ThemedText';
import { useTheme } from '@/components/common/ThemeContext';
import { getThemeColorByTheme, isDarkTheme, ActualThemeType, getFontStyleByCategory } from '@/utils/theme';

type TabScreenConfig = {
  name: string;
  title: string;
  tabBarIcon: IconProps;
  tabBarLabel: string;
}

const TabScreens: TabScreenConfig[] = [
  {
    name: "index",
    title: "今日",
    tabBarIcon: "sun",
    tabBarLabel: "今日",
  },
  {
    name: "history",
    title: "历史",
    tabBarIcon: "calendar",
    tabBarLabel: "历史",
  },
  {
    name: "settings",
    title: "设置",
    tabBarIcon: "settings",
    tabBarLabel: "设置",
  },
]

export const setupAndroidUIByTheme = async (actualTheme: ActualThemeType, backgroundColor: string) => {
  const isDark = isDarkTheme(actualTheme);

  try {
    StatusBar.setTranslucent(true);
    StatusBar.setBackgroundColor('transparent');
    StatusBar.setBarStyle(isDark ? 'light-content' : 'dark-content', true);

    await NavigationBar.setVisibilityAsync('visible');
    await NavigationBar.setBackgroundColorAsync(backgroundColor);
    await NavigationBar.setButtonStyleAsync(isDark ? 'light' : 'dark');
  } catch (error) {
    console.warn(error);
  }
}

const getScreenOptions = (config: TabScreenConfig[]) => {
  return config.map(screen => ({
    key: screen.name,
    name: screen.name,
    options: {
      title: screen.title,
      tabBarIcon: ({ color, focused }: { color: string, focused: boolean }) => (
        <Icon
          fill={color}
          style={styles.tabBarIcon}
          name={focused ? screen.tabBarIcon : `${screen.tabBarIcon}-outline`}
        />
      ),
      tabBarLabel: ({ color }: { color: string }) => (
        <ThemedText category="p1" style={{ color }}>{screen.tabBarLabel}</ThemedText>
      ),
    }
  }));
}

export default function TabLayout() {
  const { actualTheme } = useTheme();
  const themedBackgroundColor = getThemeColorByTheme('backgroundColor', actualTheme);
  const themedPrimaryColor = getThemeColorByTheme('primaryColor', actualTheme);
  const themedBorderColor = getThemeColorByTheme('borderColor', actualTheme);
  const themedTextColor = getThemeColorByTheme('textColor', actualTheme);
  const fontStyle = getFontStyleByCategory('h4');
  const isDark = isDarkTheme(actualTheme);

  const StatusBarComponent = () => (
    <StatusBar
      translucent={Platform.OS === 'android'}
      backgroundColor="transparent"
      barStyle={isDark ? 'light-content' : 'dark-content'}
    />
  );

  const screenOptions: BottomTabNavigationOptions = {
    tabBarActiveTintColor: themedPrimaryColor,
    tabBarInactiveTintColor: themedTextColor,
    tabBarStyle: {
      height: 60,
      paddingBottom: 10,
      backgroundColor: themedBackgroundColor,
      borderTopWidth: 1,
      borderTopColor: themedBorderColor,
      elevation: isDark ? 5 : 0,
      ...(Platform.OS === 'android' && isDark && {
        paddingVertical: 5,
        marginBottom: -5,
        borderColor: themedBackgroundColor,
      }),
    },
    headerStyle: {
      backgroundColor: themedBackgroundColor,
      elevation: 0,
      borderBottomWidth: 1,
      borderBottomColor: themedBorderColor,
    },
    headerTitleStyle: {
      color: themedTextColor,
      fontSize: fontStyle.size,
      fontWeight: fontStyle.weight,
      letterSpacing: 0.5,
    },
    headerTitleAlign: 'center',
    headerShadowVisible: false,
    tabBarBackground: () => <React.Fragment />,
  };

  React.useEffect(() => {
    setupAndroidUIByTheme(actualTheme, themedBackgroundColor);
  }, [actualTheme, themedBackgroundColor]);

  return (
    <View style={{ flex: 1, backgroundColor: themedBackgroundColor }}>
      <StatusBarComponent />
      <Tabs screenOptions={screenOptions}>
        {getScreenOptions(TabScreens).map((screen) => (
          <Tabs.Screen
            key={screen.key}
            name={screen.name}
            options={screen.options}
          />
        ))}
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarIcon: {
    width: 24,
    height: 24,
  },
})