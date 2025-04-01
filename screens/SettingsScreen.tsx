import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import ThemedLayout from '@/components/common/ThemedLayout';
import SettingGroup from '@/components/settings/SettingGroup';
import SettingItem from '@/components/settings/SettingItem';

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <ThemedLayout>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <SettingGroup>
          <SettingItem
            label="主题设置"
            showArrow={true}
            isLast={true}
            onPress={() => router.push("../settings/theme")}
          />
        </SettingGroup>

        <SettingGroup title="关于">
          <SettingItem
            label="关于应用"
            showArrow={true}
            isLast={true}
            onPress={() => router.push("../settings/about")}
          />
        </SettingGroup>
      </ScrollView>
    </ThemedLayout>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingTop: 20,
    paddingBottom: 40,
  },
});
