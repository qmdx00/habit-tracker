import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import ThemedText from '@/components/common/ThemedText';

interface SettingItemProps {
  label: string;
  children: ReactNode;
}

export default function SettingItem({ label, children }: SettingItemProps) {
  return (
    <View style={styles.settingItem}>
      <ThemedText category='p1'>{label}</ThemedText>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
});