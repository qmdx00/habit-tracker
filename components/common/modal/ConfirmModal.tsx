import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import ThemedText from '@/components/common/ThemedText';
import { useTheme } from '@/components/common/ThemeContext';
import { getThemeColorByTheme } from '@/utils/theme';
import BaseModal from '@/components/common/modal/BaseModal';

export interface ConfirmModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'success' | 'warning' | 'info';
  loading?: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  visible,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = '确定',
  cancelText = '取消',
  type = 'info',
  loading = false
}) => {
  const { actualTheme } = useTheme();
  const themedPrimaryColor = getThemeColorByTheme('primaryColor', actualTheme);
  const themedSuccessColor = getThemeColorByTheme('successColor', actualTheme);
  const themedWarningColor = getThemeColorByTheme('warningColor', actualTheme);
  const themedBorderColor = getThemeColorByTheme('borderColor', actualTheme);

  const getColorByType = () => {
    switch (type) {
      case 'success':
        return themedSuccessColor;
      case 'warning':
        return themedWarningColor;
      case 'info':
      default:
        return themedPrimaryColor;
    }
  };

  const getIconByType = (): keyof typeof Ionicons.glyphMap => {
    switch (type) {
      case 'success':
        return 'checkmark-circle-outline';
      case 'warning':
        return 'alert-circle-outline';
      case 'info':
      default:
        return 'information-circle-outline';
    }
  };

  const typeColor = getColorByType();
  const typeIcon = getIconByType();

  return (
    <BaseModal
      visible={visible}
      onClose={onClose}
      animationType="fade"
      backdropDismiss={!loading}
    >
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <View style={[
            styles.icon,
            { backgroundColor: `${typeColor}15`, borderColor: `${typeColor}30` }
          ]}>
            <Ionicons name={typeIcon} size={40} color={typeColor} />
          </View>
        </View>

        <ThemedText category="h5" isBold style={styles.title}>
          {title}
        </ThemedText>

        {message && (
          <ThemedText category="p1" style={styles.message}>
            {message}
          </ThemedText>
        )}

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              styles.cancelButton,
              { borderColor: themedBorderColor }
            ]}
            onPress={onClose}
            disabled={loading}
          >
            <ThemedText category="p1" isBold>
              {cancelText}
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              styles.confirmButton,
              { backgroundColor: typeColor },
              loading && styles.disabledButton
            ]}
            onPress={onConfirm}
            disabled={loading}
          >
            <ThemedText category="p1" isBold style={styles.confirmButtonText}>
              {loading ? '处理中...' : confirmText}
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </BaseModal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  title: {
    textAlign: 'center',
    marginBottom: 12,
  },
  message: {
    textAlign: 'center',
    marginBottom: 24,
    opacity: 0.8,
    lineHeight: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    marginRight: 12,
  },
  confirmButton: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  confirmButtonText: {
    color: 'white',
  },
  disabledButton: {
    opacity: 0.6,
  },
});

export default ConfirmModal;