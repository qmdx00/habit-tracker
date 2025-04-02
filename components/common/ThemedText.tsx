import React from 'react';
import { StyleProp, TextStyle, Text as RNText } from 'react-native';
import { useTheme } from '@/components/common/ThemeContext';
import { getThemeColorByTheme, getFontStyleByCategory, FontCategoryType } from '@/utils/theme';

interface ThemedTextProps {
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
  category?: FontCategoryType;
  isBold?: boolean;
  color?: string;
  primary?: boolean;
}

export default function ThemedText({ children, style, category, color, primary, isBold, ...props }: ThemedTextProps) {
  const { actualTheme } = useTheme();
  return (
    <RNText
      {...props}
      style={[
        {
          color: color ?? getThemeColorByTheme('textColor', actualTheme),
          ...getFontStyleByCategory(category ?? 'p1', isBold),
        },
        style
      ]}
    >
      {children}
    </RNText>
  );
}