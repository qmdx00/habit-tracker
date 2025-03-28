import React from 'react';
import { StyleProp, TextStyle, Text as RNText } from 'react-native';
import { useTheme } from './ThemeContext';

type TextCategory = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 's1' | 's2' | 'p1' | 'p2' | 'c1' | 'c2';

interface ThemedTextProps {
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
  category?: TextCategory;
}

export default function ThemedText({ children, style, category, ...props }: ThemedTextProps) {
  const { actualTheme } = useTheme();
  const isDarkMode = actualTheme === 'dark';

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

  return (
    <RNText
      {...props}
      style={[
        {
          color: isDarkMode ? 'white' : 'black',
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