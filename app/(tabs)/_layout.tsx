import React from 'react';
import { StyleSheet, Platform, StatusBar, View } from 'react-native';
import { Tabs } from 'expo-router';
import { Icon, Text } from '@ui-kitten/components';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { useTheme } from '@/components/ThemeContext';
import { themeConfig } from '@/config/app';
import ThemedText from '@/components/ThemedText';
import * as NavigationBar from 'expo-navigation-bar';

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
  const isDarkMode = actualTheme === 'dark';

  const backgroundColor = isDarkMode ? themeConfig.backgroundColor.dark : themeConfig.backgroundColor.light;

  // 为安卓设置状态栏和导航栏颜色
  React.useEffect(() => {
    if (Platform.OS === 'android') {
      // 设置状态栏
      StatusBar.setBackgroundColor(backgroundColor);
      StatusBar.setBarStyle(isDarkMode ? 'light-content' : 'dark-content');

      // 使用expo-navigation-bar设置底部导航栏颜色
      const setupNavigationBar = async () => {
        try {
          // 设置底部导航栏的背景颜色
          await NavigationBar.setBackgroundColorAsync(backgroundColor);
          // 设置底部导航栏按钮的样式（深色模式下为浅色按钮，浅色模式下为深色按钮）
          await NavigationBar.setButtonStyleAsync(isDarkMode ? 'light' : 'dark');
          // 确保导航栏不透明
          await NavigationBar.setVisibilityAsync('visible');
          // 防止深色模式下出现白色边缘
          if (isDarkMode) {
            StatusBar.setTranslucent(false);
          }
        } catch (error) {
          console.warn('设置导航栏颜色失败:', error);
        }
      };

      setupNavigationBar();
    }
  }, [isDarkMode, backgroundColor]);

  const screenOptions: BottomTabNavigationOptions = {
    tabBarActiveTintColor: isDarkMode ? themeConfig.primaryColor.dark : themeConfig.primaryColor.light,
    tabBarInactiveTintColor: isDarkMode ? "#9E9E9E" : "gray",
    tabBarStyle: {
      height: 60,
      paddingBottom: 10,
      backgroundColor: backgroundColor,
      borderTopWidth: isDarkMode ? 0 : 1,
      borderTopColor: isDarkMode ? backgroundColor : themeConfig.borderColor.light,
      boxShadow: isDarkMode ? '0 0 10px 0 rgba(0, 0, 0, 0.1)' : undefined,
      elevation: isDarkMode ? 5 : 0,
      // 添加额外样式以解决可能的白色区域问题
      ...(Platform.OS === 'android' && isDarkMode && {
        paddingVertical: 5,
        marginBottom: -5,
        borderColor: backgroundColor,
      }),
    },
    headerStyle: {
      backgroundColor: backgroundColor,
      elevation: 0,
      boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
      borderBottomWidth: isDarkMode ? 0 : 1,
      borderBottomColor: isDarkMode ? backgroundColor : themeConfig.borderColor.light,
    },
    headerTitleStyle: {
      color: isDarkMode ? 'white' : 'black',
      fontWeight: 'bold',
      fontSize: 20,
      letterSpacing: 0.5,
    },
    headerTitleAlign: 'center',
    headerShadowVisible: false,
    tabBarBackground: () => (
      <React.Fragment />
    ),
  };

  return (
    <View style={{ flex: 1, backgroundColor }}>
      <Tabs screenOptions={screenOptions}>
        {TabsConfig.screens.map((screen) => (
          <Tabs.Screen
            key={screen.name}
            name={screen.name}
            options={{
              title: screen.title,
              tabBarIcon: ({ color, focused }) => (
                <Icon
                  style={styles.tabBarIcon}
                  fill={color}
                  name={focused ? screen.tabBarIcon : `${screen.tabBarIcon}-outline`}
                />
              ),
              tabBarLabel: ({ color }) => (
                <ThemedText
                  category="p1"
                  style={{ color: color }}>
                  {screen.tabBarLabel}
                </ThemedText>
              ),
            }}
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
});
