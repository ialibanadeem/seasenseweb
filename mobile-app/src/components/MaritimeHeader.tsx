import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ship } from 'lucide-react-native';
import { theme } from '../theme/Theme';

interface MaritimeHeaderProps {
    title: string;
    subtitle?: string;
}

export const MaritimeHeader = ({ title, subtitle }: MaritimeHeaderProps) => {
    return (
        <View style={styles.header}>
            <View style={styles.leftSection}>
                <View style={styles.iconBg}>
                    <Ship size={20} color={theme.colors.accent} />
                </View>
                <View>
                    <Text style={styles.title}>{title}</Text>
                    {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.md,
        backgroundColor: theme.colors.background,
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.md,
    },
    iconBg: {
        width: 36,
        height: 36,
        borderRadius: theme.roundness.md,
        backgroundColor: `${theme.colors.accent}15`,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.text,
    },
    subtitle: {
        fontSize: 12,
        color: theme.colors.muted,
    }
});
