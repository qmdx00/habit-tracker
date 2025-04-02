import { themeConfig } from '@/config/app';

/**
 * 实际主题类型
 */
export type ActualThemeType =
  | 'light'
  | 'dark';

/**
 * 主题颜色类型
 */
export type ThemeColorType =
  | 'textColor'
  | 'backgroundColor'
  | 'primaryColor'
  | 'borderColor'
  | 'inactiveTextColor'
  | 'secondaryColor'
  | 'successColor'
  | 'warningColor'
  | 'cardBackgroundColor'
  | 'dividerColor';

/**
 * 字体类型
 */
export type FontCategoryType =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 's1'
  | 's2'
  | 'p1'
  | 'p2'
  | 'c1'
  | 'c2';

/**
 * 判断主题类型是否为深色模式
 * @param actualTheme 当前实际主题
 * @returns 是否为深色模式的布尔值
 */
export const isDarkTheme = (actualTheme: ActualThemeType): boolean => {
  return actualTheme === 'dark';
};

/**
 * 获取主题颜色的辅助函数
 * @param colorType 颜色类型
 * @param isDarkMode 是否为深色模式
 * @returns 对应的主题颜色
 */
export const getThemeColor = (colorType: ThemeColorType, isDarkMode: boolean) => {
  return isDarkMode ? themeConfig[colorType].dark : themeConfig[colorType].light;
};

/**
 * 根据主题直接获取主题颜色
 * @param colorType 颜色类型
 * @param actualTheme 当前主题
 * @returns 对应的主题颜色
 */
export const getThemeColorByTheme = (colorType: ThemeColorType, actualTheme: ActualThemeType) => {
  return getThemeColor(colorType, isDarkTheme(actualTheme));
};

/**
 * 根据字体类型获取字体大小和字体权重
 * @param category 字体类型
 * @param isBold 是否加粗
 * @returns 字体大小和字体权重
 */
export const getFontStyleByCategory = (category: FontCategoryType, isBold?: boolean) => {
  let fontSize = 14;
  let fontWeight: 'normal' | 'bold' = isBold ?? false ? 'bold' : 'normal';

  switch (category) {
    case 'h1':
      fontSize = 32;
      break;
    case 'h2':
      fontSize = 28;
      break;
    case 'h3':
      fontSize = 24;
      break;
    case 'h4':
      fontSize = 20;
      break;
    case 'h5':
      fontSize = 18;
      break;
    case 'h6':
      fontSize = 16;
      break;
    case 's1':
      fontSize = 15;
      break;
    case 's2':
      fontSize = 13;
      break;
    case 'p1':
      fontSize = 14;
      break;
    case 'p2':
      fontSize = 12;
      break;
    case 'c1':
      fontSize = 11;
      break;
    case 'c2':
      fontSize = 10;
      break;
    default:
      fontSize = 14;
      break;
  }

  return { size: fontSize, weight: fontWeight };
};
