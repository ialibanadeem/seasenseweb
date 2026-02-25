import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ship, Bell } from 'lucide-react-native';
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

            <TouchableOpacity style={styles.bellButton}>
                <Bell size={20} color={theme.colors.muted} />
                <View style={styles.badge} />
            </TouchableOpacity>
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
    },
    bellButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.card,
    },
    badge: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: theme.colors.accent,
        borderWidth: 2,
        borderColor: theme.colors.background,
    }
});
