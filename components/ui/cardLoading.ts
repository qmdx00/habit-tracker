import { themeConfig } from '@/config/app';
import { isDarkTheme } from '@/utils/theme/themeUtils';

/**
 * 获取卡片背景颜色
 * @param isDarkMode 是否为深色模式
 * @returns 卡片背景颜色
 */
export const getCardBackgroundColor = (isDarkMode: boolean) => {
    return isDarkMode ? themeConfig.cardColor.dark : themeConfig.cardColor.light;
};

// 为了保持API一致性，我们也提供直接接收actualTheme的版本
export const getCardBackgroundColorByTheme = (actualTheme: 'light' | 'dark') => {
    return getCardBackgroundColor(isDarkTheme(actualTheme));
};

/**
 * 获取分隔线颜色
 * @param isDarkMode 是否为深色模式
 * @returns 分隔线颜色
 */
export const getDividerColor = (isDarkMode: boolean) => {
    return isDarkMode ? themeConfig.borderColor.dark : themeConfig.borderColor.light;
};

// 为了保持API一致性，我们也提供直接接收actualTheme的版本
export const getDividerColorByTheme = (actualTheme: 'light' | 'dark') => {
    return getDividerColor(isDarkTheme(actualTheme));
};

/**
 * 获取加载组件背景颜色
 * @param isDarkMode 是否为深色模式
 * @returns 加载组件背景颜色
 */
export const getLoadingBackgroundColor = (isDarkMode: boolean) => {
    return isDarkMode ? '#121212' : 'white';
};

// 为了保持API一致性，我们也提供直接接收actualTheme的版本
export const getLoadingBackgroundColorByTheme = (actualTheme: 'light' | 'dark') => {
    return getLoadingBackgroundColor(isDarkTheme(actualTheme));
};

/**
 * 获取加载指示器颜色
 * @param isDarkMode 是否为深色模式
 * @returns 加载指示器颜色
 */
export const getLoadingIndicatorColor = (isDarkMode: boolean) => {
    return isDarkMode ? "#4CAF50" : "green";
};

// 为了保持API一致性，我们也提供直接接收actualTheme的版本
export const getLoadingIndicatorColorByTheme = (actualTheme: 'light' | 'dark') => {
    return getLoadingIndicatorColor(isDarkTheme(actualTheme));
}; 