import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import ThemedText from './ThemedText';

interface SettingItemProps {
  label: string;
  children: ReactNode;
}

export default function SettingItem({ label, children }: SettingItemProps) {
  return (
    <View style={styles.settingItem}>
      <ThemedText>{label}</ThemedText>
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