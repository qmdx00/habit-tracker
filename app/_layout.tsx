import { Suspense } from "react";
import { Stack } from "expo-router";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { SQLiteDatabase, SQLiteProvider } from 'expo-sqlite';
import initSQL from '@/data/init';

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

const migrateDBIfNeeded = async (db: SQLiteDatabase) => {
  await db.execAsync(initSQL);
};

function ThemedApp() {
  const { actualTheme } = useTheme();
  const evaTheme = isDarkTheme(actualTheme) ? eva.dark : eva.light;
  const themedBackgroundColor = getThemeColorByTheme('backgroundColor', actualTheme);

  return (
    <View style={{ flex: 1, backgroundColor: themedBackgroundColor }}>
      <ApplicationProvider {...eva} theme={evaTheme}>
        <Suspense fallback={<FallbackLoading />}>
          <SQLiteProvider databaseName="habit-tracker" onInit={migrateDBIfNeeded} useSuspense>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="settings" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" options={{ title: "页面不存在" }} />
            </Stack>
          </SQLiteProvider>
        </Suspense>
      </ApplicationProvider>
    </View>
  );
}