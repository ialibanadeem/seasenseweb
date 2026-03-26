import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Gauge, Navigation, Waves } from 'lucide-react-native';
import { theme } from '../theme/Theme';

interface StatsOverlayProps {
    speed: number;
    heading: number;
    depth: number;
}

export const StatsOverlay = ({ speed, heading, depth }: StatsOverlayProps) => {
    return (
        <View style={styles.container}>
            <StatItem
                icon={<Gauge size={14} color={theme.colors.muted} />}
                label="SPEED"
                value={speed.toString()}
                unit="kn"
            />
            <View style={styles.divider} />
            <StatItem
                icon={<Navigation size={14} color={theme.colors.muted} />}
                label="HEADING"
                value={`${heading}°`}
                unit="deg"
            />
            <View style={styles.divider} />
            <StatItem
                icon={<Waves size={14} color={theme.colors.muted} />}
                label="DEPTH"
                value={depth.toString()}
                unit="m"
            />
        </View>
    );
};

const StatItem = ({ icon, label, value, unit }: { icon: any, label: string, value: string, unit: string }) => (
    <View style={styles.statItem}>
        <View style={styles.labelRow}>
            {icon}
            <Text style={styles.labelText}>{label}</Text>
        </View>
        <View style={styles.valueRow}>
            <Text style={styles.valueText}>{value}</Text>
            <Text style={styles.unitText}>{unit}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 20,
        left: 16,
        right: 16,
        backgroundColor: 'rgba(26, 26, 26, 0.85)',
        borderRadius: theme.roundness.lg,
        padding: theme.spacing.sm,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
        gap: 2,
    },
    labelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    labelText: {
        fontSize: 9,
        color: theme.colors.muted,
        letterSpacing: 0.5,
    },
    valueRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 2,
    },
    valueText: {
        fontSize: 18,
        fontWeight: '700',
        color: theme.colors.text,
    },
    unitText: {
        fontSize: 10,
        color: theme.colors.muted,
    },
    divider: {
        width: 1,
        height: 24,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    }
});
