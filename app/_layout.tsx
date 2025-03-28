import { Suspense } from "react";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { SafeAreaProvider } from 'react-native-safe-area-context';

import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';

import FallbackLoading from "@/components/FallbackLoading";
import { ThemeProvider, useTheme } from "@/components/ThemeContext";

function ThemedApp() {
  const { actualTheme } = useTheme();

  const theme = actualTheme === 'light' ? eva.light : eva.dark;

  return (
    <ApplicationProvider {...eva} theme={theme}>
      <SQLiteProvider databaseName="test.db" useSuspense={true} >
        <Suspense fallback={<FallbackLoading />}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" options={{ title: "Not Found" }} />
          </Stack>
        </Suspense>
      </SQLiteProvider>
    </ApplicationProvider>
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
