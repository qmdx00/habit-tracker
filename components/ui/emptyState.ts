import { isDarkTheme } from '@/utils/theme/themeUtils';

/**
 * 获取空状态颜色的工具函数
 * @param isDarkMode 是否为深色模式
 * @returns 空状态相关的颜色对象
 */
export const getEmptyStateColors = (isDarkMode: boolean) => ({
    iconColor: isDarkMode ? '#555555' : '#cccccc',
    textColor: isDarkMode ? '#bbbbbb' : '#999999',
});

/**
 * 根据主题获取空状态颜色的工具函数
 * @param actualTheme 当前主题
 * @returns 空状态相关的颜色对象
 */
export const getEmptyStateColorsByTheme = (actualTheme: 'light' | 'dark') => {
    return getEmptyStateColors(isDarkTheme(actualTheme));
}; 