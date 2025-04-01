import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Link, Stack } from 'expo-router';
import ThemedLayout from '@/components/common/ThemedLayout';

export default function NotFoundScreen() {
  return (
    <ThemedLayout>
      <Stack.Screen options={{ title: '页面未找到' }} />
      <View style={styles.container}>
        <Link href="/" style={styles.button}>
          返回首页
        </Link>
      </View>
    </ThemedLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});
