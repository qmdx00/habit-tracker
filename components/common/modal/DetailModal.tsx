import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/components/common/ThemeContext';
import { getThemeColorByTheme } from '@/utils/theme';
import ThemedText from '@/components/common/ThemedText';
import BaseModal from '@/components/common/modal/BaseModal';

export interface DetailItem {
  icon?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  iconBackgroundColor?: string;
  title: string;
  value?: string | number;
  component?: React.ReactNode;
}

export interface DetailModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  iconBackgroundColor?: string;
  items?: DetailItem[];
  children?: React.ReactNode;
  actionButton?: {
    text: string;
    onPress: () => void;
    color?: string;
    disabled?: boolean;
  };
}

const DetailModal: React.FC<DetailModalProps> = ({
  visible,
  onClose,
  title,
  description,
  icon = 'information-circle-outline',
  iconColor,
  iconBackgroundColor,
  items = [],
  children,
  actionButton
}) => {
  const { actualTheme } = useTheme();
  const themedPrimaryColor = getThemeColorByTheme('primaryColor', actualTheme);
  const themedSuccessColor = getThemeColorByTheme('successColor', actualTheme);
  const themedSecondaryColor = getThemeColorByTheme('secondaryColor', actualTheme);
  const themedBorderColor = getThemeColorByTheme('borderColor', actualTheme);

  const defaultIconColor = iconColor || themedPrimaryColor;
  const defaultIconBgColor = iconBackgroundColor || `${defaultIconColor}15`;
  const defaultBorderColor = `${defaultIconColor}30`;

  return (
    <BaseModal
      visible={visible}
      onClose={onClose}
      animationType="fade"
    >
      <View style={styles.container}>
        <View style={styles.headerSection}>
          <View style={[
            styles.circleIcon,
            {
              backgroundColor: defaultIconBgColor,
              borderColor: defaultBorderColor
            }
          ]}>
            <Ionicons
              name={icon}
              size={24}
              color={defaultIconColor}
            />
          </View>

          <ThemedText category="h5" isBold style={styles.title}>
            {title}
          </ThemedText>

          {description && (
            <ThemedText category="p1" style={styles.description}>
              {description}
            </ThemedText>
          )}
        </View>

        {items.length > 0 && (
          <View style={styles.detailsList}>
            {items.map((item, index) => (
              <View
                key={`detail-item-${index}`}
                style={[
                  styles.detailItem,
                  index < items.length - 1 && styles.itemWithBottomBorder,
                  index < items.length - 1 && { borderBottomColor: themedBorderColor }
                ]}
              >
                {item.icon && (
                  <View style={[
                    styles.itemIconContainer,
                    {
                      backgroundColor: item.iconBackgroundColor || `${item.iconColor || themedSecondaryColor}15`,
                      borderColor: `${item.iconColor || themedSecondaryColor}30`
                    }
                  ]}>
                    <Ionicons
                      name={item.icon}
                      size={18}
                      color={item.iconColor || themedSecondaryColor}
                    />
                  </View>
                )}

                <View style={styles.itemContent}>
                  <ThemedText category="p1" isBold style={styles.itemTitle}>
                    {item.title}
                  </ThemedText>

                  {item.value !== undefined && (
                    <ThemedText category="p1" style={styles.itemValue}>
                      {item.value}
                    </ThemedText>
                  )}

                  {item.component}
                </View>
              </View>
            ))}
          </View>
        )}

        {children}

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              styles.closeButton,
              { borderColor: themedBorderColor }
            ]}
            onPress={onClose}
          >
            <ThemedText category="p1" isBold>
              关闭
            </ThemedText>
          </TouchableOpacity>

          {actionButton && (
            <TouchableOpacity
              style={[
                styles.button,
                styles.actionButton,
                { backgroundColor: actionButton.color || themedSuccessColor },
                actionButton.disabled && styles.disabledButton
              ]}
              onPress={actionButton.onPress}
              disabled={actionButton.disabled}
            >
              <ThemedText category="p1" isBold style={styles.actionButtonText}>
                {actionButton.text}
              </ThemedText>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </BaseModal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  circleIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
  },
  title: {
    textAlign: 'center',
    marginBottom: 6,
  },
  description: {
    textAlign: 'center',
    opacity: 0.7,
    lineHeight: 18,
    paddingHorizontal: 4,
  },
  detailsList: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  itemWithBottomBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  itemIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    marginBottom: 2,
    fontSize: 14,
  },
  itemValue: {
    opacity: 0.7,
    fontSize: 14,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  button: {
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  closeButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    marginRight: 10,
  },
  actionButton: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  actionButtonText: {
    color: 'white',
  },
  disabledButton: {
    opacity: 0.6,
  },
});

export default DetailModal;