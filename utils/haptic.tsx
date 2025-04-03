import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

/**
 * 触觉反馈类型
 */
export type HapticFeedbackType =
  | 'none'
  | 'light'
  | 'medium'
  | 'heavy'
  | 'success'
  | 'warning'
  | 'error';

/**
 * 触发触觉反馈（仅在支持的设备上）
 * @param type 反馈类型
 */
export const triggerHaptic = async (type: HapticFeedbackType = 'none') => {
  if (Platform.OS === 'web') return;

  try {
    switch (type) {
      case 'none':
        break;
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
