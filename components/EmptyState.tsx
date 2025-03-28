import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ThemedText from '@/components/ThemedText';
import { useTheme } from '@/components/ThemeContext';

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
    const isDarkMode = actualTheme === 'dark';
    const emptyColor = isDarkMode ? '#555555' : '#cccccc';
    const textColor = isDarkMode ? '#bbbbbb' : '#999999';

    return (
        <View style={styles.emptyContainer}>
            <Ionicons name={icon as any} size={iconSize} color={emptyColor} />
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