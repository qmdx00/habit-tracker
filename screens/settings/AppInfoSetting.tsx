import React from 'react';
import { StyleSheet, View, Linking, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import ThemedText from '@/components/common/ThemedText';
import ThemedLayout from '@/components/common/ThemedLayout';
import { useTheme } from '@/components/common/ThemeContext';
import SettingGroup from '@/components/settings/SettingGroup';
import SettingItem from '@/components/settings/SettingItem';
import HapticButton from '@/components/common/HapticButton';
import { appInfo } from '@/config/app';
import { getThemeColorByTheme, isDarkTheme } from '@/utils/theme';

export default function AppInfoSetting() {
  const { actualTheme } = useTheme();
  const isDark = isDarkTheme(actualTheme);
  const themedPrimaryColor = getThemeColorByTheme('primaryColor', actualTheme);
  const themedCardBgColor = getThemeColorByTheme('cardBackgroundColor', actualTheme);

  return (
    <ThemedLayout>
      <Stack.Screen options={{ title: '关于应用' }} />

      <ScrollView contentContainerStyle={styles.container}>

        <View style={styles.nameContainer}>
          <View style={[
            styles.logoContainer,
            {
              backgroundColor: themedPrimaryColor,
              shadowOpacity: isDark ? 0.3 : 0.15,
            }
          ]}>
            <ThemedText style={styles.logoText}>习惯</ThemedText>
          </View>
          <ThemedText category="h5" style={styles.appName}>{appInfo.name}</ThemedText>
          <ThemedText style={styles.description}>{appInfo.description}</ThemedText>
        </View>

        <SettingGroup style={{
          borderRadius: 16,
          backgroundColor: themedCardBgColor,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: isDark ? 0.15 : 0.08,
          shadowRadius: 4,
          elevation: isDark ? 4 : 2,
          marginHorizontal: 16,
          overflow: 'hidden',
        }}>
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

        <HapticButton
          style={[
            styles.customButton,
            {
              backgroundColor: themedPrimaryColor,
              shadowOpacity: isDark ? 0.3 : 0.15,
            }
          ]}
          onPress={() => Linking.openURL(appInfo.repository)}
          activeOpacity={0.7}
          hapticType="medium"
          size="large"
        >
          <ThemedText style={styles.buttonText}>查看源代码</ThemedText>
        </HapticButton>

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
    width: 84,
    height: 84,
    borderRadius: 24,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 6,
  },
  logoText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  appName: {
    marginBottom: 8,
    fontWeight: '600',
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
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
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