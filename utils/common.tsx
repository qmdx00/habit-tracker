import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

/**
 * 浮动按钮位置
 */
export type FloatingButtonPosition =
  | 'bottomLeft'
  | 'topRight'
  | 'topLeft'
  | 'bottomRight';

/**
 * 触觉反馈类型
 */
export type HapticFeedbackType =
  | 'light'
  | 'medium'
  | 'heavy'
  | 'success'
  | 'warning'
  | 'error';

/**
 * 根据位置获取浮动按钮的位置样式
 * @param position 位置
 * @returns 位置样式
 */
export const getFloatingButtonPositionStyle = (position: FloatingButtonPosition = 'bottomRight') => {
  switch (position) {
    case 'bottomLeft':
      return { bottom: 24, left: 24 };
    case 'topRight':
      return { top: 24, right: 24 };
    case 'topLeft':
      return { top: 24, left: 24 };
    case 'bottomRight':
      return { bottom: 24, right: 24 };
  }
}


/**
 * 触发触觉反馈（仅在支持的设备上）
 * @param type 反馈类型
 */
export const triggerHaptic = async (type: HapticFeedbackType = 'light') => {
  if (Platform.OS === 'web') return;

  try {
    switch (type) {
      case 'light':
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        break;
      case 'medium':
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        break;
      case 'heavy':
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        break;
      case 'success':
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        break;
      case 'warning':
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        break;
      case 'error':
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        break;
      default:
        await Haptics.selectionAsync();
    }
  } catch (error) {
    console.warn(error);
  }
};
