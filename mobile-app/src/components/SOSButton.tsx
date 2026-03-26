import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Animated } from 'react-native';
import { AlertTriangle, X, Phone, Radio, MapPin } from 'lucide-react-native';
import { theme } from '../theme/Theme';
import { socket } from '../services/socket';

interface SOSButtonProps {
    location: { latitude: number; longitude: number };
    vesselId: string;
    tripId: string | null;
}

type SOSState = "idle" | "confirming" | "countdown" | "sending" | "sent" | "error";
const COUNTDOWN_SECONDS = 5;

export const SOSButton = ({ location, vesselId, tripId }: SOSButtonProps) => {
    const [state, setState] = useState<SOSState>("idle");
    const [count, setCount] = useState(COUNTDOWN_SECONDS);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const pulseAnim = useRef(new Animated.Value(1)).current;

    const reset = useCallback(() => {
        setState("idle");
        setCount(COUNTDOWN_SECONDS);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    useEffect(() => {
        if (state === "countdown") {
            intervalRef.current = setInterval(() => {
                setCount((c) => {
                    if (c <= 1) {
                        clearInterval(intervalRef.current!);
                        intervalRef.current = null;
                        return 0;
                    }
                    return c - 1;
                });
            }, 1000);

            Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnim, { toValue: 1.2, duration: 500, useNativeDriver: true }),
                    Animated.timing(pulseAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
                ])
            ).start();
        } else {
            pulseAnim.setValue(1);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [state, pulseAnim]);

    useEffect(() => {
        if (state === "countdown" && count === 0) {
            fire();
        }
    }, [count, state]);

    const fire = async () => {
        setState("sending");
        try {
            socket.emit("sos_triggered", {
                vesselId,
                tripId: tripId || 'unknown',
                latitude: location.latitude,
                longitude: location.longitude,
                timestamp: new Date().toISOString(),
                message: "Emergency SOS requested from mobile app"
            });
            setState("sent");
            setTimeout(reset, 5000);
        } catch (error) {
            console.error("SOS Trigger Error:", error);
            setState("error");
            setTimeout(reset, 3000);
        }
    };

    if (state === "idle") {
        return (
            <TouchableOpacity
                style={styles.idleButton}
                onPress={() => setState("confirming")}
            >
                <Text style={styles.idleText}>SOS</Text>
            </TouchableOpacity>
        );
    }

    return (
        <Modal visible={true} transparent animationType="fade">
            <View style={styles.overlay}>
                <TouchableOpacity style={styles.closeButton} onPress={reset}>
                    <X size={24} color={theme.colors.text} />
                </TouchableOpacity>

                <View style={styles.content}>
                    {state === "confirming" && (
                        <>
                            <View style={[styles.iconCircle, { backgroundColor: `${theme.colors.destructive}20` }]}>
                                <AlertTriangle size={40} color={theme.colors.destructive} />
                            </View>
                            <Text style={styles.title}>Emergency SOS</Text>
                            <Text style={styles.description}>
                                This will broadcast a distress signal with your live coordinates to the coast guard and emergency contacts.
                            </Text>
                            <View style={styles.infoCard}>
                                <View style={styles.infoRow}>
                                    <MapPin size={14} color={theme.colors.accent} />
                                    <Text style={styles.infoLabel}>Current Position</Text>
                                </View>
                                <Text style={styles.infoValue}>
                                    {location.latitude.toFixed(4)}°N, {location.longitude.toFixed(4)}°E
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={styles.actionButton}
                                onPress={() => setState("countdown")}
                            >
                                <Text style={styles.actionText}>Send Distress Signal</Text>
                            </TouchableOpacity>
                        </>
                    )}

                    {state === "countdown" && (
                        <>
                            <Animated.View style={[styles.pulseCircle, { transform: [{ scale: pulseAnim }] }]}>
                                <Text style={styles.countdownText}>{count}</Text>
                            </Animated.View>
                            <Text style={styles.title}>Sending in {count}s</Text>
                            <Text style={styles.description}>Tap cancel to abort the distress signal</Text>
                            <TouchableOpacity style={styles.cancelButton} onPress={reset}>
                                <Text style={styles.cancelText}>Cancel</Text>
                            </TouchableOpacity>
                        </>
                    )}

                    {state === "sending" && (
                        <>
                            <View style={styles.iconCircle}>
                                <Radio size={40} color={theme.colors.destructive} />
                            </View>
                            <Text style={styles.title}>Transmitting...</Text>
                            <Text style={styles.description}>Broadcasting distress signal</Text>
                        </>
                    )}

                    {state === "sent" && (
                        <>
                            <View style={[styles.iconCircle, { backgroundColor: `${theme.colors.success}20` }]}>
                                <Radio size={40} color={theme.colors.success} />
                            </View>
                            <Text style={styles.title}>SOS Transmitted</Text>
                            <Text style={styles.description}>
                                Distress signal sent. Emergency services and your contacts have been notified.
                            </Text>
                            <TouchableOpacity style={styles.cancelButton} onPress={reset}>
                                <Text style={styles.cancelText}>Dismiss</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    idleButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: theme.colors.destructive,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
        shadowColor: theme.colors.destructive,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    idleText: {
        color: theme.colors.text,
        fontWeight: '900',
        fontSize: 16,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(10, 10, 10, 0.95)',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    closeButton: {
        position: 'absolute',
        top: 60,
        right: 24,
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: theme.colors.card,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        width: '100%',
        alignItems: 'center',
        gap: 24,
    },
    iconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.card,
    },
    pulseCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: theme.colors.destructive,
        alignItems: 'center',
        justifyContent: 'center',
    },
    countdownText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: theme.colors.text,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.text,
    },
    description: {
        fontSize: 14,
        color: theme.colors.muted,
        textAlign: 'center',
        lineHeight: 20,
        paddingHorizontal: 20,
    },
    infoCard: {
        width: '100%',
        backgroundColor: theme.colors.card,
        borderRadius: theme.roundness.lg,
        padding: 16,
        borderWidth: 1,
        borderColor: theme.colors.border,
        gap: 4,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    infoLabel: {
        fontSize: 12,
        color: theme.colors.muted,
        textTransform: 'uppercase',
    },
    infoValue: {
        fontSize: 16,
        color: theme.colors.text,
        fontFamily: 'monospace',
    },
    actionButton: {
        width: '100%',
        backgroundColor: theme.colors.destructive,
        paddingVertical: 16,
        borderRadius: theme.roundness.lg,
        alignItems: 'center',
    },
    actionText: {
        color: theme.colors.text,
        fontWeight: 'bold',
        fontSize: 16,
    },
    cancelButton: {
        width: '100%',
        backgroundColor: theme.colors.card,
        paddingVertical: 14,
        borderRadius: theme.roundness.lg,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    cancelText: {
        color: theme.colors.text,
        fontWeight: '600',
        fontSize: 14,
    }
});
