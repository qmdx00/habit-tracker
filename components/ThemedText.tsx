import React from 'react';
import { StyleProp, TextStyle, Text as RNText } from 'react-native';
import { useTheme } from '@/components/ThemeContext';
import { getThemeColor, getTextColor, isDarkTheme } from '@/utils/theme/themeUtils';

type TextCategory = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 's1' | 's2' | 'p1' | 'p2' | 'c1' | 'c2';

interface ThemedTextProps {
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
  category?: TextCategory;
  color?: string;
  primary?: boolean;
}

export default function ThemedText({ children, style, category, color, primary, ...props }: ThemedTextProps) {
  const { actualTheme } = useTheme();
  const isDarkMode = isDarkTheme(actualTheme);

  let fontSize = 14;
  let fontWeight: 'normal' | 'bold' = 'normal';

  switch (category) {
    case 'h1':
      fontSize = 32;
      fontWeight = 'bold';
      break;
    case 'h2':
      fontSize = 28;
      fontWeight = 'bold';
      break;
    case 'h3':
      fontSize = 24;
      fontWeight = 'bold';
      break;
    case 'h4':
      fontSize = 20;
      fontWeight = 'bold';
      break;
    case 'h5':
      fontSize = 18;
      fontWeight = 'bold';
      break;
    case 'h6':
      fontSize = 16;
      fontWeight = 'bold';
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

  // 确定文本颜色
  let textColor;
  if (color) {
    textColor = color; // 如果提供了自定义颜色，则使用它
  } else if (primary) {
    textColor = getThemeColor('primaryColor', isDarkMode); // 如果是主要文本，使用主题主色
  } else {
    textColor = getTextColor(isDarkMode); // 默认文本颜色
  }

  return (
    <RNText
      {...props}
      style={[
        {
          color: textColor,
          fontSize: fontSize,
          fontWeight: fontWeight,
        },
        style
      ]}
    >
      {children}
    </RNText>
  );
}