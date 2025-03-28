import { Suspense } from "react";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';

import FallbackLoading from "@/components/FallbackLoading";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <SQLiteProvider databaseName="test.db" useSuspense={true} >
          <Suspense fallback={<FallbackLoading />}>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" options={{ title: "Not Found" }} />
            </Stack>
          </Suspense>
        </SQLiteProvider>
        <StatusBar style="auto" />
      </ApplicationProvider>
    </SafeAreaProvider>
  );
}
