import React from 'react';
import { View } from 'react-native';
import { Tabs } from 'expo-router';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { useTheme } from '@/components/ThemeContext';
import {
  getThemeColorByTheme,
  getInactiveTintColorByTheme,
  setupAndroidUIByTheme,
  getTabBarStyleByTheme,
  getHeaderStyleByTheme,
  getHeaderTitleStyleByTheme
} from '@/utils/theme/themeUtils';
import { getScreenOptions } from '@/components/ui/component';

type TabsConfig = {
  screens: {
    name: string;
    title: string;
    tabBarIcon: string;
    tabBarLabel: string;
  }[];
}

const TabsConfig: TabsConfig = {
  screens: [
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
  ],
}

export default function TabLayout() {
  const { actualTheme } = useTheme();

  const backgroundColor = getThemeColorByTheme('backgroundColor', actualTheme);

  // 为安卓设置状态栏和导航栏颜色
  React.useEffect(() => {
    setupAndroidUIByTheme(actualTheme, backgroundColor);
  }, [actualTheme, backgroundColor]);

  const screenOptions: BottomTabNavigationOptions = {
    tabBarActiveTintColor: getThemeColorByTheme('primaryColor', actualTheme),
    tabBarInactiveTintColor: getInactiveTintColorByTheme(actualTheme),
    tabBarStyle: getTabBarStyleByTheme(actualTheme, backgroundColor),
    headerStyle: getHeaderStyleByTheme(actualTheme, backgroundColor),
    headerTitleStyle: getHeaderTitleStyleByTheme(actualTheme),
    headerTitleAlign: 'center',
    headerShadowVisible: false,
    tabBarBackground: () => (
      <React.Fragment />
    ),
  };

  const screenItems = getScreenOptions(TabsConfig.screens);

  return (
    <View style={{ flex: 1, backgroundColor }}>
      <Tabs screenOptions={screenOptions}>
        {screenItems.map((screen) => (
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
