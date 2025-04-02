import React from 'react';
import { StyleSheet, TouchableOpacity, StyleProp, ViewStyle, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/components/common/ThemeContext';
import { getFloatingButtonPositionStyle, FloatingButtonPosition, triggerHaptic, HapticFeedbackType } from '@/utils/common';
import { getThemeColorByTheme, isDarkTheme } from '@/utils/theme';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

interface FloatingButtonProps {
  onPress: () => void;
  icon?: IoniconName;
  color?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
  position?: FloatingButtonPosition;
  hapticType?: HapticFeedbackType;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({
  onPress,
  icon = 'add-outline',
  color = 'white',
  size = 30,
  style,
  position = 'bottomRight',
  hapticType = 'medium'
}) => {
  const { actualTheme } = useTheme();
  const positionStyle = getFloatingButtonPositionStyle(position);
  const themedPrimaryColor = getThemeColorByTheme('primaryColor', actualTheme);
  const isDark = isDarkTheme(actualTheme);

  const handlePress = () => {
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      triggerHaptic(hapticType);
    }
    if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.floatingButton,
        {
          backgroundColor: themedPrimaryColor,
          shadowOpacity: isDark ? 0.4 : 0.2,
          ...(Platform.OS === 'android' && {
            elevation: isDark ? 8 : 6,
          }),
        },
        positionStyle,
        style
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Ionicons name={icon} size={size} color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    zIndex: 999,
    ...Platform.select({
      ios: {
        overflow: 'visible',
      },
    }),
  },
});

export default FloatingButton;