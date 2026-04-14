import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONTS } from '@/src/styles/root';

export const LoadScreen = () => {
    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            <View style={styles.content}>
                <ActivityIndicator size="large" color={COLORS.primary} />
                <Text style={styles.text}>Загружаем данные...</Text>
                <Text style={styles.subtext}>Подождите совсем немного</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // Фон как на главном экране (MainScreen)
        backgroundColor: COLORS.background,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: SPACING.xl,
    },
    text: {
        ...FONTS.h2,
        color: COLORS.text,
        marginTop: SPACING.xl,
        textAlign: 'center',
    },
    subtext: {
        ...FONTS.regular,
        color: COLORS.textSecondary,
        marginTop: SPACING.xs,
        textAlign: 'center',
    }
});
