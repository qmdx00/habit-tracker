import React, { ReactNode } from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  Platform,
  Text,
  View,
  StyleProp,
  ViewStyle,
  TextStyle
} from 'react-native';
import { triggerHaptic, HapticFeedbackType } from '@/utils/common';
import { useTheme } from '@/components/common/ThemeContext';
import { getThemeColorByTheme } from '@/utils/theme';

interface HapticButtonProps extends TouchableOpacityProps {
  onPress?: () => void;
  children?: ReactNode;
  title?: string;
  hapticType?: HapticFeedbackType;
  hapticEnabled?: boolean;
  variant?: 'filled' | 'outlined' | 'text';
  size?: 'small' | 'medium' | 'large';
  color?: string;
  textStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

const HapticButton: React.FC<HapticButtonProps> = ({
  onPress,
  children,
  title,
  hapticType = 'light',
  hapticEnabled = true,
  variant = 'filled',
  size = 'medium',
  color,
  style,
  textStyle,
  containerStyle,
  disabled = false,
  activeOpacity = 0.7,
  ...restProps
}) => {
  const { actualTheme } = useTheme();
  const themedPrimaryColor = getThemeColorByTheme('primaryColor', actualTheme);
  const themedTextColor = getThemeColorByTheme('textColor', actualTheme);
  const themedBackgroundColor = getThemeColorByTheme('backgroundColor', actualTheme);

  const buttonColor = color || themedPrimaryColor;

  const handlePress = () => {
    if (disabled) return;

    if (hapticEnabled && (Platform.OS === 'android' || Platform.OS === 'ios')) {
      triggerHaptic(hapticType);
    }

    if (onPress) {
      onPress();
    }
  };

  const getButtonStyle = (): StyleProp<ViewStyle> => {
    const sizeStyles = {
      small: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 4,
      },
      medium: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 6,
      },
      large: {
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 8,
      },
    };

    const baseStyle: ViewStyle = {
      ...sizeStyles[size],
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    };

    switch (variant) {
      case 'filled':
        return {
          ...baseStyle,
          backgroundColor: disabled ? `${buttonColor}80` : buttonColor,
        };
      case 'outlined':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: disabled ? `${buttonColor}80` : buttonColor,
        };
      case 'text':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
        };
      default:
        return baseStyle;
    }
  };

  const getTextStyle = (): StyleProp<TextStyle> => {
    const baseFontSize = {
      small: 12,
      medium: 14,
      large: 16,
    };

    const baseStyle: TextStyle = {
      fontSize: baseFontSize[size],
      fontWeight: '600',
    };

    switch (variant) {
      case 'filled':
        return {
          ...baseStyle,
          color: '#FFFFFF',
        };
      case 'outlined':
      case 'text':
        return {
          ...baseStyle,
          color: disabled ? `${buttonColor}80` : buttonColor,
        };
      default:
        return baseStyle;
    }
  };

  return (
    <View style={containerStyle}>
      <TouchableOpacity
        activeOpacity={activeOpacity}
        disabled={disabled}
        onPress={handlePress}
        style={[getButtonStyle(), style]}
        {...restProps}
      >
        {title ? (
          <Text style={[getTextStyle(), textStyle]}>{title}</Text>
        ) : (
          children
        )}
      </TouchableOpacity>
    </View>
  );
};

export default HapticButton;