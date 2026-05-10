import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useNetwork } from '../hooks/useNetwork';
import { useOfflineStore } from '../context/useOfflineStore';
import { useStyles } from '../hooks/useStyles';
import { Theme } from '../context/useThemeStore';

const { width } = Dimensions.get('window');

export const OfflineFallback = () => {
    const { isOffline } = useNetwork();
    const { t } = useTranslation();
    const navigation = useNavigation<any>();
    const styles = useStyles(offlineStyles);
    
    const savedLessons = useOfflineStore(state => state.savedLessons);
    const savedIds = Object.keys(savedLessons);
    const lastSavedId = savedIds.length > 0 ? savedIds[savedIds.length - 1] : null;
    const lastLesson = lastSavedId ? savedLessons[lastSavedId] : null;
    const lessonTitle = lastLesson?.lesson?.lesson_name || lastLesson?.lesson?.title || '';

    if (!isOffline) return null;

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    <Text style={styles.icon}>📡</Text>
                </View>
                
                <Text style={styles.title}>{t('offline.title')}</Text>
                <Text style={styles.subtitle}>{t('offline.subtitle')}</Text>

                {lastLesson ? (
                    <TouchableOpacity 
                        style={styles.button}
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('LessonMainScreen', { lessonId: lastSavedId })}
                    >
                        <Text style={styles.buttonText} numberOfLines={1}>
                            {t('offline.continue_reading')} {lessonTitle}
                        </Text>
                        <Text style={styles.arrow}>→</Text>
                    </TouchableOpacity>
                ) : (
                    <Text style={styles.emptyState}>{t('offline.empty_state')}</Text>
                )}
            </View>
        </View>
    );
};

const offlineStyles = (theme: Theme) => StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: theme.colors.background,
        zIndex: 9999,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        width: width * 0.85,
        alignItems: 'center',
        padding: 24,
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: theme.colors.primary + '15',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    icon: {
        fontSize: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: theme.colors.text,
        textAlign: 'center',
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 16,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 40,
    },
    button: {
        width: '100%',
        height: 56,
        backgroundColor: theme.colors.primary,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    buttonText: {
        color: theme.colors.surface,
        fontSize: 16,
        fontWeight: '600',
        marginRight: 8,
        flexShrink: 1,
    },
    arrow: {
        color: theme.colors.surface,
        fontSize: 18,
        fontWeight: '700',
    },
    emptyState: {
        fontSize: 14,
        color: theme.colors.textSecondary,
        fontStyle: 'italic',
        opacity: 0.7,
    },
});
