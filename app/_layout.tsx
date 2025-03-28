import { Suspense, useEffect } from "react";
import { Stack } from "expo-router";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Platform, StatusBar, View } from 'react-native';

import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';

import FallbackLoading from "@/components/FallbackLoading";
import { ThemeProvider, useTheme } from "@/components/ThemeContext";
import { themeConfig } from "@/config/app";

function ThemedApp() {
  const { actualTheme } = useTheme();
  const isDarkMode = actualTheme === 'dark';
  const backgroundColor = isDarkMode ? themeConfig.backgroundColor.dark : themeConfig.backgroundColor.light;
  const theme = isDarkMode ? eva.dark : eva.light;

  // NOTE: 设置全局状态栏样式
  useEffect(() => {
    StatusBar.setBarStyle(isDarkMode ? 'light-content' : 'dark-content');
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(backgroundColor);
    }
  }, [isDarkMode, backgroundColor]);

  return (
    <View style={{ flex: 1, backgroundColor }}>
      <ApplicationProvider {...eva} theme={theme}>
        <Suspense fallback={<FallbackLoading />}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" options={{ title: "Not Found" }} />
          </Stack>
        </Suspense>
      </ApplicationProvider>
    </View>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <IconRegistry icons={EvaIconsPack} />
      <ThemeProvider>
        <ThemedApp />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
