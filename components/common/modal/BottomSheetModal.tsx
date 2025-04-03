import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/components/common/ThemeContext';
import { getThemeColorByTheme, isDarkTheme } from '@/utils/theme';
import ThemedText from '@/components/common/ThemedText';

export interface BottomSheetModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  contentStyle?: object;
  titleStyle?: object;
  backdropDismiss?: boolean;
  height?: number | string;
  showHandle?: boolean;
  headerComponent?: React.ReactNode;
  footerComponent?: React.ReactNode;
}

const BottomSheetModal: React.FC<BottomSheetModalProps> = ({
  visible,
  onClose,
  title,
  children,
  contentStyle,
  titleStyle,
  backdropDismiss = true,
  height = 'auto',
  showHandle = true,
  headerComponent,
  footerComponent
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { actualTheme } = useTheme();
  const themedCardBgColor = getThemeColorByTheme('cardBackgroundColor', actualTheme);
  const themedBorderColor = getThemeColorByTheme('borderColor', actualTheme);
  const themedTextColor = getThemeColorByTheme('textColor', actualTheme);
  const themedDividerColor = getThemeColorByTheme('dividerColor', actualTheme);
  const themedHandleColor = getThemeColorByTheme('inactiveTextColor', actualTheme);
  const isDark = isDarkTheme(actualTheme);

  const screenHeight = Dimensions.get('window').height;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(screenHeight)).current;

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
          toValue: screenHeight,
          duration: 150,
          useNativeDriver: true,
        })
      ]).start(() => {
        setModalVisible(false);
      });
    }
  }, [visible, fadeAnim, slideAnim, screenHeight]);

  const handleBackdropPress = () => {
    if (backdropDismiss) {
      onClose();
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      transparent={true}
      visible={modalVisible}
      animationType="none"
      onRequestClose={handleClose}
      statusBarTranslucent
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalContainer}>
          <Animated.View
            style={[
              styles.modalOverlay,
              { opacity: fadeAnim }
            ]}
          >
            <TouchableWithoutFeedback onPress={handleBackdropPress}>
              <View style={styles.backdropTouchable} />
            </TouchableWithoutFeedback>
          </Animated.View>

          <Animated.View
            style={[
              styles.modalContent,
              {
                backgroundColor: themedCardBgColor,
                borderColor: themedBorderColor,
                shadowOpacity: isDark ? 0.3 : 0.1,
                height: height === 'auto' ? undefined : height,
                transform: [{ translateY: slideAnim }]
              },
              contentStyle
            ]}
          >
            {showHandle && (
              <View style={styles.handleContainer}>
                <View style={[styles.handle, { backgroundColor: themedHandleColor }]} />
              </View>
            )}

            {headerComponent || (
              title && (
                <View style={styles.header}>
                  <ThemedText category="h5" isBold style={[styles.title, titleStyle]}>
                    {title}
                  </ThemedText>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={handleClose}
                    hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
                  >
                    <Ionicons name="close" size={24} color={themedTextColor} />
                  </TouchableOpacity>
                </View>
              )
            )}

            {(title || headerComponent) && (
              <View style={[styles.divider, { backgroundColor: themedDividerColor }]} />
            )}

            <View style={styles.content}>
              {children}
            </View>

            {footerComponent && (
              <>
                <View style={[styles.divider, { backgroundColor: themedDividerColor }]} />
                <View style={styles.footer}>
                  {footerComponent}
                </View>
              </>
            )}
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
    borderWidth: 1,
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowRadius: 8,
    elevation: 5,
    maxHeight: '90%',
  },
  handleContainer: {
    width: '100%',
    paddingVertical: 10,
    alignItems: 'center',
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    opacity: 0.6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 6,
    paddingBottom: 12,
  },
  title: {
    flex: 1,
  },
  closeButton: {
    padding: 5,
  },
  divider: {
    height: 1,
    width: '100%',
    opacity: 0.8,
  },
  content: {
    padding: 16,
  },
  footer: {
    padding: 16,
  }
});

export default BottomSheetModal;