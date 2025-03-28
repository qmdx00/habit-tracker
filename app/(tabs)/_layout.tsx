import React from 'react';
import { StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import { Icon, Text } from '@ui-kitten/components';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { useTheme } from '@/components/ThemeContext';

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

  const screenOptions: BottomTabNavigationOptions = {
    tabBarActiveTintColor: isDarkMode ? "#4CAF50" : "green",
    tabBarInactiveTintColor: isDarkMode ? "#9E9E9E" : "gray",
    tabBarStyle: {
      height: 60,
      paddingBottom: 10,
      backgroundColor: isDarkMode ? '#121212' : 'white',
      borderTopWidth: isDarkMode ? 0 : 1,
      borderTopColor: isDarkMode ? '#121212' : '#f0f0f0',
      shadowColor: isDarkMode ? '#000' : undefined,
      shadowOffset: isDarkMode ? { width: 0, height: -1 } : undefined,
      shadowOpacity: isDarkMode ? 0.3 : undefined,
      shadowRadius: isDarkMode ? 2 : undefined,
      elevation: isDarkMode ? 5 : 0,
    },
    headerStyle: {
      backgroundColor: isDarkMode ? '#121212' : 'white',
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: isDarkMode ? 0 : 1,
      borderBottomColor: isDarkMode ? '#121212' : '#f0f0f0',
    },
    headerTitleStyle: {
      color: isDarkMode ? 'white' : 'black',
      fontWeight: 'bold',
    },
    headerShadowVisible: false,
  };

  return (
    <Tabs screenOptions={screenOptions}>
      {TabsConfig.screens.map((screen) => (
        <Tabs.Screen
          key={screen.name}
          name={screen.name}
          options={{
            title: screen.title,
            tabBarIcon: ({ color, focused }) => (
              <Icon name={focused ? screen.tabBarIcon : `${screen.tabBarIcon}-outline`} fill={color} />
            ),
            tabBarLabel: ({ color }) => (
              <Text style={[styles.tabBarLabel, { color: color }]}>
                {screen.tabBarLabel}
              </Text>
            ),
          }}
        />
      ))}
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarLabel: {
    fontSize: 14,
  },
});