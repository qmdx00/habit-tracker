import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ThemedText from '@/components/ThemedText';
import { useTheme } from '@/components/ThemeContext';
import { getEmptyStateColors } from '@/components/ui/emptyState';
import { isDarkTheme } from '@/utils/theme/themeUtils';

interface EmptyStateProps {
    icon?: string;
    title: string;
    subtitle?: string;
    iconSize?: number;
}

const EmptyState: React.FC<EmptyStateProps> = ({
    icon = 'calendar-outline',
    title,
    subtitle,
    iconSize = 60
}) => {
    const { actualTheme } = useTheme();
    const isDarkMode = isDarkTheme(actualTheme);
    const { iconColor, textColor } = getEmptyStateColors(isDarkMode);

    return (
        <View style={styles.emptyContainer}>
            <Ionicons name={icon as any} size={iconSize} color={iconColor} />
            <ThemedText style={styles.emptyText}>{title}</ThemedText>
            {subtitle && (
                <ThemedText style={[styles.emptySubText, { color: textColor }]}>
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
    emptyText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 12,
    },
    emptySubText: {
        fontSize: 14,
        marginTop: 8,
        textAlign: 'center',
    }
});

export default EmptyState; 