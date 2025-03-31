import React from 'react';
import { StyleSheet, View, Linking, TouchableOpacity } from 'react-native';
import { useTheme } from '@/components/common/ThemeContext';
import ThemedText from '@/components/common/ThemedText';
import SettingCard from '@/components/settings/SettingCard';
import SettingItem from '@/components/settings/SettingItem';
import { appInfo } from '@/config/app';
import { getThemeColorByTheme } from '@/utils/theme/themeUtils';

interface AppInfoCardProps {
  style?: any;
}

export default function AppInfoCard({ style }: AppInfoCardProps) {
  const { actualTheme } = useTheme();
  const themedPrimaryColor = getThemeColorByTheme('primaryColor', actualTheme);

  return (
    <SettingCard title="关于应用" style={style}>
      <View style={styles.nameContainer}>
        <ThemedText category="h5">{appInfo.name}</ThemedText>
        <ThemedText style={styles.description}>{appInfo.description}</ThemedText>
      </View>

      <SettingItem label="版本">
        <ThemedText>{appInfo.version}</ThemedText>
      </SettingItem>

      <SettingItem label="构建号">
        <ThemedText>{appInfo.buildNumber}</ThemedText>
      </SettingItem>

      <SettingItem label="构建日期">
        <ThemedText>{appInfo.buildDate}</ThemedText>
      </SettingItem>

      <SettingItem label="作者">
        <ThemedText>{appInfo.author}</ThemedText>
      </SettingItem>

      <TouchableOpacity
        style={[styles.customButton, { backgroundColor: themedPrimaryColor }]}
        onPress={() => Linking.openURL(appInfo.repository)}
        activeOpacity={0.8}
      >
        <ThemedText style={styles.buttonText}>查看源代码</ThemedText>
      </TouchableOpacity>

      <ThemedText style={styles.copyright}>{appInfo.copyright}</ThemedText>
    </SettingCard>
  );
}

const styles = StyleSheet.create({
  nameContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  description: {
    marginTop: 5,
    opacity: 0.7,
    textAlign: 'center',
  },
  customButton: {
    marginTop: 10,
    marginBottom: 15,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  copyright: {
    textAlign: 'center',
    opacity: 0.5,
    fontSize: 12,
  },
});