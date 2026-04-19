import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONTS, RADIUS } from '@/src/styles/root';

interface RejectedScreenProps {
    reason?: string | null;
    onClose?: () => void;
}

export const RejectedScreen: React.FC<RejectedScreenProps> = ({ 
    reason = "Нарушение правил платформы или генерация ИИ сочла контент небезопасным.",
    onClose
}) => {
    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            <View style={styles.content}>
                <View style={styles.iconCircle}>
                    <Text style={styles.icon}>❌</Text>
                </View>
                <Text style={styles.text}>Модерация не пройдена</Text>
                <Text style={styles.subtext}>Ваш урок был отклонен нейросетью.</Text>
                
                <View style={styles.errorBox}>
                    <Text style={styles.errorTitle}>Причина:</Text>
                    <Text style={styles.errorText}>{reason}</Text>
                </View>
            </View>
            <View style={styles.footer}>
                <Pressable 
                    style={styles.button}
                    onPress={onClose}
                >
                    <Text style={styles.buttonText}>Вернуться к редактированию</Text>
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
        backgroundColor: '#FEE2E2', // светло-красный
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
        marginTop: SPACING.xs,
        textAlign: 'center',
        lineHeight: 22,
    },
    errorBox: {
        marginTop: SPACING.xl,
        backgroundColor: '#FEF2F2',
        padding: SPACING.lg,
        borderRadius: RADIUS.md,
        width: '100%',
        borderColor: '#FECACA',
        borderWidth: 1,
    },
    errorTitle: {
        ...FONTS.semibold,
        color: '#DC2626',
        marginBottom: SPACING.xs,
    },
    errorText: {
        ...FONTS.regular,
        color: '#991B1B',
        lineHeight: 20,
    },
    footer: {
        paddingHorizontal: SPACING.lg,
        paddingBottom: SPACING.xxl,
    },
    button: {
        backgroundColor: '#EF4444', 
        paddingVertical: SPACING.md,
        borderRadius: RADIUS.lg,
        alignItems: 'center',
        shadowColor: '#EF4444',
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
