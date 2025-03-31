import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from '@ui-kitten/components';
import ThemedText from '@/components/common/ThemedText';
import { useTheme } from '@/components/common/ThemeContext';
import { getThemeColorByTheme } from '@/utils/theme/themeUtils';

interface EmptyStateProps {
  title: string;
  subtitle?: string;
  icon?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  subtitle,
  icon = 'calendar-outline',
}) => {
  const { actualTheme } = useTheme();
  const themedTextColor = getThemeColorByTheme('textColor', actualTheme);
  const themedInactiveTextColor = getThemeColorByTheme('inactiveTextColor', actualTheme);

  return (
    <View style={styles.emptyContainer}>
      <Icon name={icon} style={styles.emptyIcon} fill={themedInactiveTextColor} />
      <ThemedText category='h3' style={styles.emptyText}>{title}</ThemedText>
      {subtitle && (
        <ThemedText category='p1' style={[styles.emptySubText, { color: themedTextColor }]}>
          {subtitle}
        </ThemedText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  emptyIcon: {
    width: 60,
    height: 60,
  },
  emptyText: {
    marginTop: 12,
    opacity: 0.6,
  },
  emptySubText: {
    marginTop: 8,
    textAlign: 'center',
  }
});

export default EmptyState;