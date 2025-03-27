import React from 'react';
import { StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import { Icon, Text } from '@ui-kitten/components';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Today',
          tabBarIcon: ({ color, focused }) => (
            <Icon name={focused ? 'sun' : 'sun-outline'} style={{ color: color }} />
          ),
          tabBarLabel: ({ color }) => (
            <Text style={[styles.tabBarLabel, { color: color }]}>Today</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color, focused }) => (
            <Icon name={focused ? 'calendar' : 'calendar-outline'} style={{ color: color }} />
          ),
          tabBarLabel: ({ color }) => (
            <Text style={[styles.tabBarLabel, { color: color }]}>History</Text>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarLabel: {
    fontSize: 10,
  },
});
