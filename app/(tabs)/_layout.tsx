import React from 'react';
import { StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import { Icon, Text } from '@ui-kitten/components';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

type TabsConfig = {
  screenOptions: BottomTabNavigationOptions;
  screens: {
    name: string;
    title: string;
    tabBarIcon: string;
    tabBarLabel: string;
  }[];
}

const TabsConfig: TabsConfig = {
  screenOptions: {
    tabBarActiveTintColor: "green",
    tabBarInactiveTintColor: "gray",
    tabBarStyle: {
      height: 60,
      paddingBottom: 10,
      backgroundColor: 'white',
      borderTopWidth: 1,
      borderTopColor: 'black',
    },
  },
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
  return (
    <Tabs screenOptions={TabsConfig.screenOptions} >
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
              <Text style={[styles.tabBarLabel, { color: color }]}>{screen.tabBarLabel}</Text>
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