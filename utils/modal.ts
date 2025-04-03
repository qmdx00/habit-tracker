import { triggerHaptic, HapticFeedbackType } from '@/utils/haptic';

/**
 * 定义模态框操作时使用的触觉反馈类型
 */
export type ModalHapticType = {
  open?: HapticFeedbackType;
  close?: HapticFeedbackType;
  confirm?: HapticFeedbackType;
  cancel?: HapticFeedbackType;
};

/**
 * 默认模态框操作触觉反馈配置
 */
export const defaultModalHaptics: ModalHapticType = {
  open: 'light',
  close: 'none',
  confirm: 'light',
  cancel: 'none'
};

/**
 * 处理模态框打开事件
 * @param setVisible 设置模态框可见性的函数
 * @param hapticType 触觉反馈类型
 */
export const handleModalOpen = (setVisible: (visible: boolean) => void, hapticType?: keyof ModalHapticType) => {
  const haptic = hapticType || 'open';
  defaultModalHaptics[haptic] && triggerHaptic(defaultModalHaptics[haptic]!);
  setVisible(true);
};

/**
 * 处理模态框关闭事件
 * @param setVisible 设置模态框可见性的函数
 * @param hapticType 触觉反馈类型
 * @param callback 关闭后的回调函数
 */
export const handleModalClose = (setVisible: (visible: boolean) => void, hapticType?: keyof ModalHapticType, callback?: () => void) => {
  const haptic = hapticType || 'close';
  defaultModalHaptics[haptic] && triggerHaptic(defaultModalHaptics[haptic]!);
  setVisible(false);

  // 延迟执行回调，确保模态框已完全关闭
  if (callback) {
    setTimeout(callback, 300);
  }
};

/**
 * 处理模态框确认事件
 * @param setVisible 设置模态框可见性的函数
 * @param onConfirm 确认回调函数
 * @param hapticType 触觉反馈类型
 */
export const handleModalConfirm = async (setVisible: (visible: boolean) => void, onConfirm: () => void | Promise<void>, hapticType?: keyof ModalHapticType) => {
  const haptic = hapticType || 'confirm';
  defaultModalHaptics[haptic] && triggerHaptic(defaultModalHaptics[haptic]!);

  try {
    // 执行确认操作
    await onConfirm();

    // 操作完成后关闭模态框
    setVisible(false);
  } catch (error) {
    console.error('Modal confirm action failed:', error);
    // 如果确认操作失败，触发错误反馈
    triggerHaptic('error');
  }
};

/**
 * 处理模态框取消事件
 * @param setVisible 设置模态框可见性的函数
 * @param onCancel 取消回调函数
 * @param hapticType 触觉反馈类型
 */
export const handleModalCancel = (setVisible: (visible: boolean) => void, onCancel?: () => void, hapticType?: keyof ModalHapticType) => {
  const haptic = hapticType || 'cancel';
  defaultModalHaptics[haptic] && triggerHaptic(defaultModalHaptics[haptic]!);

  // 执行取消回调
  onCancel?.();

  // 关闭模态框
  setVisible(false);
};