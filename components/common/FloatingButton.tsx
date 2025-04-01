import React from 'react';
import { StyleSheet, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { Icon, IconProps } from '@ui-kitten/components';
import { useTheme } from '@/components/common/ThemeContext';
import { getFloatingButtonPositionStyle, FloatingButtonPosition } from '@/utils/common';
import { getThemeColorByTheme } from '@/utils/theme';

interface FloatingButtonProps {
  onPress: () => void;
  icon?: IconProps;
  color?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
  position?: FloatingButtonPosition;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({
  onPress,
  icon = 'plus-outline',
  color = 'white',
  size = 30,
  style,
  position = 'bottomRight'
}) => {
  const { actualTheme } = useTheme();
  const positionStyle = getFloatingButtonPositionStyle(position);
  const themedPrimaryColor = getThemeColorByTheme('primaryColor', actualTheme);

  return (
    <TouchableOpacity
      style={[
        styles.floatingButton,
        { backgroundColor: themedPrimaryColor },
        positionStyle,
        style
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Icon name={icon} size={size} fill={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    zIndex: 999,
  },
});

export default FloatingButton;