import { Platform, StatusBar } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import { themeConfig } from '@/config/app';

/**
 * 判断主题类型是否为深色模式
 * @param actualTheme 当前实际主题
 * @returns 是否为深色模式的布尔值
 */
export const isDarkTheme = (actualTheme: 'light' | 'dark'): boolean => {
    return actualTheme === 'dark';
};

/**
 * 获取主题颜色的辅助函数
 * @param colorType 颜色类型
 * @param isDarkMode 是否为深色模式
 * @returns 对应的主题颜色
 */
export const getThemeColor = (colorType: 'backgroundColor' | 'primaryColor' | 'borderColor', isDarkMode: boolean) => {
    return isDarkMode ? themeConfig[colorType].dark : themeConfig[colorType].light;
};

/**
 * 根据主题直接获取主题颜色
 * @param colorType 颜色类型
 * @param actualTheme 当前主题
 * @returns 对应的主题颜色
 */
export const getThemeColorByTheme = (colorType: 'backgroundColor' | 'primaryColor' | 'borderColor', actualTheme: 'light' | 'dark') => {
    return getThemeColor(colorType, isDarkTheme(actualTheme));
};

/**
 * 获取文本颜色的辅助函数
 * @param isDarkMode 是否为深色模式
 * @returns 文本颜色
 */
export const getTextColor = (isDarkMode: boolean) => {
    return isDarkMode ? 'white' : 'black';
};

/**
 * 根据主题直接获取文本颜色
 * @param actualTheme 当前主题
 * @returns 文本颜色
 */
export const getTextColorByTheme = (actualTheme: 'light' | 'dark') => {
    return getTextColor(isDarkTheme(actualTheme));
};

/**
 * 获取非激活状态的颜色
 * @param isDarkMode 是否为深色模式
 * @returns 非激活状态颜色
 */
export const getInactiveTintColor = (isDarkMode: boolean) => {
    return isDarkMode ? "#9E9E9E" : "gray";
};

/**
 * 根据主题直接获取非激活状态的颜色
 * @param actualTheme 当前主题
 * @returns 非激活状态颜色
 */
export const getInactiveTintColorByTheme = (actualTheme: 'light' | 'dark') => {
    return getInactiveTintColor(isDarkTheme(actualTheme));
};

/**
 * 设置安卓平台特定UI元素的函数
 * @param isDarkMode 是否为深色模式
 * @param backgroundColor 背景颜色
 */
export const setupAndroidUI = async (isDarkMode: boolean, backgroundColor: string) => {
    if (Platform.OS !== 'android') return;

    // 设置状态栏
    StatusBar.setBackgroundColor(backgroundColor);
    StatusBar.setBarStyle(isDarkMode ? 'light-content' : 'dark-content');

    try {
        // 设置底部导航栏
        await NavigationBar.setBackgroundColorAsync(backgroundColor);
        await NavigationBar.setButtonStyleAsync(isDarkMode ? 'light' : 'dark');
        await NavigationBar.setVisibilityAsync('visible');

        // 防止深色模式下出现白色边缘
        if (isDarkMode) {
            StatusBar.setTranslucent(false);
        }
    } catch (error) {
        console.warn('设置导航栏颜色失败:', error);
    }
};

/**
 * 根据主题设置安卓平台特定UI元素
 * @param actualTheme 当前主题
 * @param backgroundColor 背景颜色
 */
export const setupAndroidUIByTheme = async (actualTheme: 'light' | 'dark', backgroundColor: string) => {
    return setupAndroidUI(isDarkTheme(actualTheme), backgroundColor);
};

/**
 * 获取标签栏样式的函数
 * @param isDarkMode 是否为深色模式
 * @param backgroundColor 背景颜色
 * @returns 标签栏样式对象
 */
export const getTabBarStyle = (isDarkMode: boolean, backgroundColor: string) => ({
    height: 60,
    paddingBottom: 10,
    backgroundColor,
    borderTopWidth: isDarkMode ? 0 : 1,
    borderTopColor: isDarkMode ? backgroundColor : getThemeColor('borderColor', false),
    boxShadow: isDarkMode ? '0 0 10px 0 rgba(0, 0, 0, 0.1)' : undefined,
    elevation: isDarkMode ? 5 : 0,
    // 添加额外样式以解决可能的白色区域问题
    ...(Platform.OS === 'android' && isDarkMode && {
        paddingVertical: 5,
        marginBottom: -5,
        borderColor: backgroundColor,
    }),
});

/**
 * 根据主题获取标签栏样式
 * @param actualTheme 当前主题
 * @param backgroundColor 背景颜色
 * @returns 标签栏样式对象
 */
export const getTabBarStyleByTheme = (actualTheme: 'light' | 'dark', backgroundColor: string) => {
    return getTabBarStyle(isDarkTheme(actualTheme), backgroundColor);
};

/**
 * 获取头部样式的函数
 * @param isDarkMode 是否为深色模式
 * @param backgroundColor 背景颜色
 * @returns 头部样式对象
 */
export const getHeaderStyle = (isDarkMode: boolean, backgroundColor: string) => ({
    backgroundColor,
    elevation: 0,
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
    borderBottomWidth: isDarkMode ? 0 : 1,
    borderBottomColor: isDarkMode ? backgroundColor : getThemeColor('borderColor', false),
});

/**
 * 根据主题获取头部样式
 * @param actualTheme 当前主题
 * @param backgroundColor 背景颜色
 * @returns 头部样式对象
 */
export const getHeaderStyleByTheme = (actualTheme: 'light' | 'dark', backgroundColor: string) => {
    return getHeaderStyle(isDarkTheme(actualTheme), backgroundColor);
};

/**
 * 获取标题样式的函数
 * @param isDarkMode 是否为深色模式
 * @returns 标题样式对象
 */
export const getHeaderTitleStyle = (isDarkMode: boolean) => ({
    color: getTextColor(isDarkMode),
    fontWeight: 'bold' as const,
    fontSize: 20,
    letterSpacing: 0.5,
});

/**
 * 根据主题获取标题样式
 * @param actualTheme 当前主题
 * @returns 标题样式对象
 */
export const getHeaderTitleStyleByTheme = (actualTheme: 'light' | 'dark') => {
    return getHeaderTitleStyle(isDarkTheme(actualTheme));
}; 