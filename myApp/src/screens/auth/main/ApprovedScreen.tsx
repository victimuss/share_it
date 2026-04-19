import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONTS, RADIUS } from '@/src/styles/root';
import { useNavigation } from '@react-navigation/native';

export const ApprovedScreen = () => {
    const navigation = useNavigation<any>();

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            <View style={styles.content}>
                <View style={styles.iconCircle}>
                    <Text style={styles.icon}>✅</Text>
                </View>
                <Text style={styles.text}>Урок опубликован!</Text>
                <Text style={styles.subtext}>Поздравляем! Ваш урок успешно прошел модерацию и теперь доступен для всех пользователей.</Text>
            </View>
            <View style={styles.footer}>
                <Pressable 
                    style={styles.button}
                    onPress={() => navigation.navigate('MainTabs')}
                >
                    <Text style={styles.buttonText}>На главную</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: SPACING.xl,
    },
    iconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: COLORS.successLight || '#D1FAE5', // Фоллбэк на случай если successLight нет
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.xl,
    },
    icon: {
        fontSize: 36,
    },
    text: {
        ...FONTS.h2,
        color: COLORS.text,
        textAlign: 'center',
    },
    subtext: {
        ...FONTS.regular,
        color: COLORS.textSecondary,
        marginTop: SPACING.md,
        textAlign: 'center',
        lineHeight: 22,
    },
    footer: {
        paddingHorizontal: SPACING.lg,
        paddingBottom: SPACING.xxl,
    },
    button: {
        backgroundColor: COLORS.primary,
        paddingVertical: SPACING.md,
        borderRadius: RADIUS.lg,
        alignItems: 'center',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    buttonText: {
        ...FONTS.semibold,
        color: COLORS.surface,
        fontSize: 16,
    }
});
