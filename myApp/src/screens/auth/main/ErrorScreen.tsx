import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONTS, RADIUS } from '@/src/styles/root';
interface ErrorScreenProps {
    error: string;
    onRetry?: () => void;
}

export const ErrorScreen = ({ error, onRetry }: ErrorScreenProps) => {
    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    <Text style={styles.iconText}>!</Text>
                </View>
                <Text style={styles.title}>Что-то пошло не так</Text>
                <Text style={styles.errorMessage}>{error}</Text>

                {onRetry && (
                    <Pressable
                        style={({ pressed }) => [
                            styles.retryButton,
                            pressed && styles.retryButtonPressed
                        ]}
                        onPress={onRetry}
                    >
                        <Text style={styles.retryButtonText}>Попробовать снова</Text>
                    </Pressable>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // Фон как на главном экране
        backgroundColor: COLORS.background,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: SPACING.xl,
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: RADIUS.full,
        backgroundColor: COLORS.errorLight,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.md,
    },
    iconText: {
        ...FONTS.bold,
        color: COLORS.error,
        fontSize: 40,
    },
    title: {
        ...FONTS.h2,
        color: COLORS.text,
        textAlign: 'center',
        marginBottom: SPACING.xs,
    },
    errorMessage: {
        ...FONTS.regular,
        color: COLORS.textSecondary,
        textAlign: 'center',
    },
    retryButton: {
        marginTop: SPACING.xxl,
        backgroundColor: COLORS.primary,
        paddingVertical: SPACING.md,
        paddingHorizontal: SPACING.xl,
        borderRadius: RADIUS.lg,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    retryButtonPressed: {
        opacity: 0.8,
        transform: [{ scale: 0.98 }],
    },
    retryButtonText: {
        ...FONTS.semibold,
        color: COLORS.surface,
        fontSize: 15,
    }
});
