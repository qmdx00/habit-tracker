import React, { useState, useCallback } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { useTheme } from '@/components/common/ThemeContext';
import { getThemeColorByTheme } from '@/utils/theme';
import ThemedText from '@/components/common/ThemedText';
import { habitSQLiteRepository } from '@/data/sqlite';
import { useSQLiteContext } from 'expo-sqlite';
import BottomSheetModal from '@/components/common/modal/BottomSheetModal';
import { handleModalClose } from '@/utils/modal';

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

  const { actualTheme } = useTheme();
  const themedPrimaryColor = getThemeColorByTheme('primaryColor', actualTheme);
  const themedTextColor = getThemeColorByTheme('textColor', actualTheme);
  const themedPlaceholderColor = getThemeColorByTheme('inactiveTextColor', actualTheme);
  const themedInputBgColor = getThemeColorByTheme('backgroundColor', actualTheme);
  const themedBorderColor = getThemeColorByTheme('borderColor', actualTheme);

  const resetForm = useCallback(() => {
    setName('');
    setDescription('');
    setError('');
  }, []);

  const handleClose = useCallback(() => {
    handleModalClose(() => { }, 'close', () => {
      resetForm();
      onClose();
    });
  }, [resetForm, onClose]);

  const handleSubmit = useCallback(async () => {
    try {
      if (!name.trim()) {
        setError('习惯名称不能为空');
        return;
      }

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

  const renderFooter = () => (
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
  );

  return (
    <BottomSheetModal
      visible={visible}
      onClose={handleClose}
      title="添加新习惯"
      backdropDismiss={!loading}
      footerComponent={renderFooter()}
    >
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
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: '#ff5252',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
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
    borderColor: '#ccc',
    marginRight: 12,
  },
  submitButton: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.6,
  },
});

export default AddHabitForm;
