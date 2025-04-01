import React from 'react';
import { StyleSheet, View, Linking, TouchableOpacity, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import ThemedText from '@/components/common/ThemedText';
import ThemedLayout from '@/components/common/ThemedLayout';
import { useTheme } from '@/components/common/ThemeContext';
import SettingGroup from '@/components/settings/SettingGroup';
import SettingItem from '@/components/settings/SettingItem';
import { appInfo } from '@/config/app';
import { getThemeColorByTheme } from '@/utils/theme';

export default function AppInfoSetting() {
  const { actualTheme } = useTheme();
  const themedPrimaryColor = getThemeColorByTheme('primaryColor', actualTheme);

  return (
    <ThemedLayout>
      <Stack.Screen options={{ title: '关于应用' }} />

      <ScrollView contentContainerStyle={styles.container}>

        <View style={styles.nameContainer}>
          <View style={[styles.logoContainer, { backgroundColor: themedPrimaryColor }]}>
            <ThemedText style={styles.logoText}>习惯</ThemedText>
          </View>
          <ThemedText category="h5" style={styles.appName}>{appInfo.name}</ThemedText>
          <ThemedText style={styles.description}>{appInfo.description}</ThemedText>
        </View>

        <SettingGroup>
          <SettingItem label="版本" isLast={false}>
            <ThemedText>{appInfo.version}</ThemedText>
          </SettingItem>
          <SettingItem label="构建号" isLast={false}>
            <ThemedText>{appInfo.buildNumber}</ThemedText>
          </SettingItem>
          <SettingItem label="构建日期" isLast={false}>
            <ThemedText>{appInfo.buildDate}</ThemedText>
          </SettingItem>
          <SettingItem label="作者" isLast={true}>
            <ThemedText>{appInfo.author}</ThemedText>
          </SettingItem>
        </SettingGroup>

        <TouchableOpacity
          style={[styles.customButton, { backgroundColor: themedPrimaryColor }]}
          onPress={() => Linking.openURL(appInfo.repository)}
          activeOpacity={0.7}
        >
          <ThemedText style={styles.buttonText}>查看源代码</ThemedText>
        </TouchableOpacity>

        <ThemedText style={styles.copyright}>{appInfo.copyright}</ThemedText>
      </ScrollView>
    </ThemedLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 30,
    paddingTop: 10,
  },
  nameContainer: {
    marginTop: 20,
    marginBottom: 35,
    alignItems: 'center',
    width: '100%',
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  logoText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  appName: {
    marginBottom: 8,
  },
  description: {
    marginTop: 4,
    opacity: 0.7,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  customButton: {
    marginTop: 35,
    marginHorizontal: 40,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  copyright: {
    marginTop: 40,
    textAlign: 'center',
    opacity: 0.5,
    fontSize: 12,
  },
});