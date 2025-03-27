import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

export default function TabLayout() {
  const [fontsLoaded] = useFonts({
    'SpaceMono-Regular': require('@/assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <Text>Loading fonts ...</Text>;
  }

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
          tabBarLabel: ({ color }) => (
            <Text style={[styles.tabBarLabel, { color: color }]}>Today</Text>
          ),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'sunny-sharp' : 'sunny-outline'} color={color} size={20} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarLabel: ({ color }) => (
            <Text style={[styles.tabBarLabel, { color: color }]}>History</Text>
          ),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'calendar-sharp' : 'calendar-outline'} color={color} size={20} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarLabel: {
    fontFamily: 'SpaceMono-Regular',
    fontSize: 10,
  },
});
