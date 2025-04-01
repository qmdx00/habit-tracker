import { Suspense } from "react";
import { Stack } from "expo-router";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from 'react-native';

import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';

import FallbackLoading from "@/components/common/FallbackLoading";
import { ThemeProvider, useTheme } from "@/components/common/ThemeContext";
import { getThemeColorByTheme, isDarkTheme } from "@/utils/theme";

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

function ThemedApp() {
  const { actualTheme } = useTheme();
  const theme = isDarkTheme(actualTheme) ? eva.dark : eva.light;
  const themedBackgroundColor = getThemeColorByTheme('backgroundColor', actualTheme);

  return (
    <View style={{ flex: 1, backgroundColor: themedBackgroundColor }}>
      <ApplicationProvider {...eva} theme={theme}>
        <Suspense fallback={<FallbackLoading />}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="settings" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" options={{ title: "Not Found" }} />
          </Stack>
        </Suspense>
      </ApplicationProvider>
    </View>
  );
}