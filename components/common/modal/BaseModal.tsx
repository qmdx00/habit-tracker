import React from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/components/common/ThemeContext';
import { getThemeColorByTheme } from '@/utils/theme';
import { handleModalClose } from '@/utils/modal';

// NOTE: 根据屏幕宽度计算模态框宽度，确保在小屏幕和大屏幕上都有合适的宽度
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const getModalWidth = () => Math.min(SCREEN_WIDTH * 0.85, 400);

export interface BaseModalProps {
  visible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  animationType?: 'none' | 'slide' | 'fade';
  backdropDismiss?: boolean;
  headerComponent?: React.ReactNode;
  footerComponent?: React.ReactNode;
  hideCloseButton?: boolean;
}

const BaseModal: React.FC<BaseModalProps> = ({
  visible,
  onClose,
  children,
  animationType = 'fade',
  backdropDismiss = true,
  headerComponent,
  footerComponent,
  hideCloseButton = false
}) => {
  const { actualTheme } = useTheme();
  const themedCardBgColor = getThemeColorByTheme('cardBackgroundColor', actualTheme);
  const themedBorderColor = getThemeColorByTheme('borderColor', actualTheme);
  const isDark = actualTheme === 'dark';

  const closeModal = () => {
    if (backdropDismiss) {
      handleModalClose((value) => !value && onClose(), 'close');
    }
  };

  const renderHeader = () => {
    if (headerComponent) {
      return (
        <View style={[styles.header, { borderColor: themedBorderColor }]}>
          {!hideCloseButton && (
            <TouchableOpacity
              style={styles.closeButton}
              onPress={closeModal}
              hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
            >
              <Ionicons
                name="close"
                size={24}
                color={isDark ? 'white' : 'black'}
              />
            </TouchableOpacity>
          )}
          {headerComponent}
        </View>
      );
    }

    if (!hideCloseButton) {
      return (
        <View style={[styles.header, { borderColor: themedBorderColor }]}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={closeModal}
            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          >
            <Ionicons
              name="close"
              size={24}
              color={isDark ? 'white' : 'black'}
            />
          </TouchableOpacity>
        </View>
      );
    }

    return null;
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={closeModal}
      animationType={animationType}
      statusBarTranslucent
    >
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.backdrop, { backgroundColor: isDark ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.5)' }]}
        onPress={closeModal}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.keyboardAvoid}
        >
          <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
            <View style={[
              styles.modalContainer,
              {
                backgroundColor: themedCardBgColor,
                borderColor: themedBorderColor,
                width: getModalWidth()
              }
            ]}>
              {renderHeader()}
              <View style={styles.content}>
                {children}
              </View>
              {footerComponent && (
                <View style={[styles.footer, { borderColor: themedBorderColor }]}>
                  {footerComponent}
                </View>
              )}
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardAvoid: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 12,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  closeButton: {
    padding: 4,
  },
  content: {
    padding: 16,
  },
  footer: {
    padding: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});

export default BaseModal;