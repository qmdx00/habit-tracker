import { Suspense } from "react";
import { Stack } from "expo-router";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { SQLiteDatabase, SQLiteProvider } from 'expo-sqlite';
import initSQL from '@/data/init';

import FallbackLoading from "@/components/common/FallbackLoading";
import { ThemeProvider, useTheme } from "@/components/common/ThemeContext";
import { getThemeColorByTheme } from "@/utils/theme";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <ThemedApp />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const migrateDBIfNeeded = async (db: SQLiteDatabase) => {
  await db.execAsync(initSQL);
};

function ThemedApp() {
  const { actualTheme } = useTheme();
  const themedBackgroundColor = getThemeColorByTheme('backgroundColor', actualTheme);

  return (
    <View style={{ flex: 1, backgroundColor: themedBackgroundColor }}>
      <Suspense fallback={<FallbackLoading />}>
        <SQLiteProvider databaseName="habit-tracker" onInit={migrateDBIfNeeded} useSuspense>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="settings" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" options={{ title: "页面不存在" }} />
          </Stack>
        </SQLiteProvider>
      </Suspense>
    </View>
  );
}