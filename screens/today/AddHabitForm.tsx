import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, View, TouchableOpacity, Modal, Keyboard, TouchableWithoutFeedback, TextInput, Animated, Dimensions, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/components/common/ThemeContext';
import { getThemeColorByTheme, isDarkTheme } from '@/utils/theme';
import ThemedText from '@/components/common/ThemedText';
import { habitSQLiteRepository } from '@/data/sqlite';
import { useSQLiteContext } from 'expo-sqlite';

interface AddHabitFormProps {
  visible: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const AddHabitForm: React.FC<AddHabitFormProps> = ({ visible, onClose, onSuccess }) => {
  const db = useSQLiteContext();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const { actualTheme } = useTheme();
  const themedPrimaryColor = getThemeColorByTheme('primaryColor', actualTheme);
  const themedCardBgColor = getThemeColorByTheme('cardBackgroundColor', actualTheme);
  const themedTextColor = getThemeColorByTheme('textColor', actualTheme);
  const themedPlaceholderColor = getThemeColorByTheme('inactiveTextColor', actualTheme);
  const themedInputBgColor = getThemeColorByTheme('backgroundColor', actualTheme);
  const themedBorderColor = getThemeColorByTheme('borderColor', actualTheme);
  const isDark = isDarkTheme(actualTheme);

  const height = Dimensions.get('window').height;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    if (visible) {
      setModalVisible(true);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        })
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: height,
          duration: 100,
          useNativeDriver: true,
        })
      ]).start(() => {
        setModalVisible(false);
      });
    }
  }, [visible, fadeAnim, slideAnim, height]);

  const resetForm = useCallback(() => {
    setName('');
    setDescription('');
    setError('');
  }, []);

  const handleClose = useCallback(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 250,
        useNativeDriver: true,
      })
    ]).start(() => {
      resetForm();
      onClose();
    });
  }, [fadeAnim, slideAnim, height, resetForm, onClose]);

  const handleSubmit = useCallback(async () => {
    try {
      !name.trim() && setError('习惯名称不能为空');

      setLoading(true);
      setError('');

      await habitSQLiteRepository.create(db, { name: name.trim(), description: description.trim(), });

      resetForm();
      onSuccess?.();
      handleClose();
    } catch (err) {
      setError('创建习惯失败，请重试');
    } finally {
      setLoading(false);
    }
  }, [name, description, handleClose, onSuccess, resetForm, db]);

  return (
    <Modal
      transparent={true}
      visible={modalVisible}
      animationType="fade"
      onRequestClose={handleClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalContainer}>
          <Animated.View
            style={[
              styles.modalOverlay,
              { opacity: fadeAnim }
            ]}
          >
            <TouchableWithoutFeedback onPress={handleClose}>
              <View style={styles.backdropTouchable} />
            </TouchableWithoutFeedback>
          </Animated.View>

          <Animated.View
            style={[
              styles.modalContent,
              {
                backgroundColor: themedCardBgColor,
                shadowOpacity: isDark ? 0.3 : 0.1,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <View style={styles.header}>
              <ThemedText category="h6" style={styles.title}>添加新习惯</ThemedText>
              <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                <Ionicons name="close" size={24} color={themedTextColor} />
              </TouchableOpacity>
            </View>

            {error ? (
              <ThemedText style={styles.errorText}>{error}</ThemedText>
            ) : null}

            <View style={styles.inputContainer}>
              <ThemedText style={styles.inputLabel}>习惯名称</ThemedText>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="输入习惯名称"
                placeholderTextColor={themedPlaceholderColor}
                style={[
                  styles.input,
                  {
                    color: themedTextColor,
                    backgroundColor: themedInputBgColor,
                    borderColor: themedBorderColor
                  }
                ]}
              />
            </View>

            <View style={styles.inputContainer}>
              <ThemedText style={styles.inputLabel}>描述（可选）</ThemedText>
              <TextInput
                value={description}
                onChangeText={setDescription}
                placeholder="输入习惯描述"
                placeholderTextColor={themedPlaceholderColor}
                multiline
                numberOfLines={3}
                style={[
                  styles.input,
                  styles.textArea,
                  {
                    color: themedTextColor,
                    backgroundColor: themedInputBgColor,
                    borderColor: themedBorderColor
                  }
                ]}
              />
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={handleClose}
                activeOpacity={0.7}
              >
                <ThemedText>取消</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.submitButton,
                  { backgroundColor: themedPrimaryColor },
                  loading ? styles.disabledButton : null
                ]}
                onPress={handleSubmit}
                disabled={loading}
                activeOpacity={0.7}
              >
                <ThemedText style={styles.submitButtonText}>
                  {loading ? '创建中...' : '创建习惯'}
                </ThemedText>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backdropTouchable: {
    flex: 1,
  },
  modalContent: {
    width: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowRadius: 8,
    elevation: 5,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontWeight: '600',
  },
  closeButton: {
    padding: 4,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    marginBottom: 6,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: 'transparent',
  },
  submitButton: {
    minWidth: 100,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  errorText: {
    color: '#FF3B30',
    marginBottom: 12,
    fontSize: 14,
  },
  disabledButton: {
    opacity: 0.6,
  },
});

export default AddHabitForm;
