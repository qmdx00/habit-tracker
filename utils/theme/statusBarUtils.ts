import { StatusBarStyle } from 'expo-status-bar';

/**
 * 获取状态栏样式
 * @param actualTheme 当前主题
 * @returns 状态栏样式
 */
export const getStatusBarStyle = (actualTheme: 'light' | 'dark'): StatusBarStyle => {
    return actualTheme === 'light' ? 'dark' : 'light';
}; 