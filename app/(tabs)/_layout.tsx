import React from 'react';
import { Platform, StatusBar, StyleSheet, View, TouchableOpacity, Pressable } from 'react-native';
import { BottomTabNavigationOptions, BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { Tabs } from 'expo-router';
import * as NavigationBar from 'expo-navigation-bar';
import { Ionicons } from '@expo/vector-icons';

import ThemedText from '@/components/common/ThemedText';
import { useTheme } from '@/components/common/ThemeContext';
import { getThemeColorByTheme, isDarkTheme, ActualThemeType, getFontStyleByCategory } from '@/utils/theme';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

type TabScreenConfig = {
  name: string;
  title: string;
  tabBarIcon: {
    focused: IoniconName;
    unfocused: IoniconName;
  };
  tabBarLabel: string;
}

const TabScreens: TabScreenConfig[] = [
  {
    name: "index",
    title: "今日",
    tabBarIcon: {
      focused: "sunny",
      unfocused: "sunny-outline"
    },
    tabBarLabel: "今日",
  },
  {
    name: "history",
    title: "历史",
    tabBarIcon: {
      focused: "calendar",
      unfocused: "calendar-outline"
    },
    tabBarLabel: "历史",
  },
  {
    name: "settings",
    title: "设置",
    tabBarIcon: {
      focused: "settings",
      unfocused: "settings-outline"
    },
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
        <Ionicons
          name={focused ? screen.tabBarIcon.focused : screen.tabBarIcon.unfocused}
          size={24}
          color={color}
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
  const themedDividerColor = getThemeColorByTheme('dividerColor', actualTheme);
  const themedInactiveTextColor = getThemeColorByTheme('inactiveTextColor', actualTheme);
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
    tabBarInactiveTintColor: themedInactiveTextColor,
    tabBarButton: (props: BottomTabBarButtonProps) => (
      <Pressable
        {...props}
        android_ripple={{ color: 'transparent', borderless: true }}
        style={(state) => [
          props.style,
          { opacity: 1 }
        ]}
      />
    ),
    tabBarStyle: {
      height: 65,
      paddingBottom: 10,
      backgroundColor: themedBackgroundColor,
      borderTopWidth: 1,
      borderTopColor: themedDividerColor,
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
      borderBottomColor: themedDividerColor,
      shadowColor: 'transparent',
    },
    headerTitleStyle: {
      color: themedTextColor,
      fontSize: fontStyle.size,
      fontWeight: fontStyle.weight,
      letterSpacing: 0.5,
    },
    headerTitleAlign: 'center',
    headerShadowVisible: false,
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
