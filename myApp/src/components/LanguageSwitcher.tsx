import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Modal, Animated } from 'react-native';
import { useTranslation } from 'react-i18next';
import Svg, { Path } from 'react-native-svg';
import { COLORS, FONTS, RADIUS, SPACING } from '../styles/root';

const LANGUAGES = [
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'zh', label: '中文', flag: '🇨🇳' },
];

const ChevronDownIcon = ({ color = COLORS.textSecondary }) => (
    <Svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <Path d="M6 9L12 15L18 9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

const CheckIcon = ({ color = COLORS.primary }) => (
    <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <Path d="M5 13L9 17L19 7" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

export const LanguageSwitcher = () => {
    const { i18n, t } = useTranslation();
    const [open, setOpen] = useState(false);

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        setOpen(false);
    };

    const currentLangCode = i18n.language ? i18n.language.split('-')[0] : 'ru';
    const currentLang = LANGUAGES.find(l => l.code === currentLangCode) || LANGUAGES[0];

    return (
        <View style={styles.container}>
            <Pressable 
                onPress={() => setOpen(true)} 
                style={({ pressed }) => [
                    styles.dropdownBtn,
                    pressed && styles.dropdownBtnPressed
                ]}
            >
                <Text style={styles.flagText}>{currentLang.flag}</Text>
                <Text style={styles.langCodeText}>{currentLang.code.toUpperCase()}</Text>
                <ChevronDownIcon />
            </Pressable>

            <Modal visible={open} transparent animationType="fade">
                <Pressable style={styles.modalOverlay} onPress={() => setOpen(false)}>
                    <Pressable style={styles.dropdownCard} onPress={(e) => e.stopPropagation()}>
                        <View style={styles.dropdownHeader}>
                            <Text style={styles.dropdownTitle}>{t('components.languageSwitcher.title', 'Select language')}</Text>
                        </View>
                        <View style={styles.dropdownList}>
                            {LANGUAGES.map((lang) => {
                                const isActive = currentLangCode === lang.code;
                                return (
                                    <Pressable 
                                        key={lang.code}
                                        onPress={() => changeLanguage(lang.code)}
                                        style={({ pressed }) => [
                                            styles.langItem,
                                            isActive && styles.activeItem,
                                            pressed && styles.langItemPressed
                                        ]}
                                    >
                                        <View style={styles.langItemLeft}>
                                            <Text style={styles.langItemFlag}>{lang.flag}</Text>
                                            <Text style={[styles.langItemLabel, isActive && styles.activeText]}>
                                                {lang.label}
                                            </Text>
                                        </View>
                                        {isActive && <CheckIcon color={COLORS.primary} />}
                                    </Pressable>
                                );
                            })}
                        </View>
                    </Pressable>
                </Pressable>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        zIndex: 100,
    },
    dropdownBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: RADIUS.full,
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.border,
        gap: 6,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    dropdownBtnPressed: {
        backgroundColor: COLORS.background,
        transform: [{ scale: 0.98 }],
    },
    flagText: {
        fontSize: 16,
    },
    langCodeText: {
        ...FONTS.semibold,
        fontSize: 13,
        color: COLORS.text,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(15, 23, 42, 0.4)', // Тёмно-синий полупрозрачный оверлей
    },
    dropdownCard: {
        backgroundColor: COLORS.surface,
        borderRadius: RADIUS.xl,
        width: 260,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 10,
        overflow: 'hidden',
    },
    dropdownHeader: {
        padding: SPACING.lg,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
        backgroundColor: COLORS.background,
    },
    dropdownTitle: {
        ...FONTS.bold,
        fontSize: 16,
        color: COLORS.text,
        textAlign: 'center',
    },
    dropdownList: {
        padding: SPACING.sm,
    },
    langItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: SPACING.md,
        paddingHorizontal: SPACING.md,
        borderRadius: RADIUS.md,
        marginBottom: 2,
    },
    langItemPressed: {
        backgroundColor: COLORS.background,
    },
    activeItem: {
        backgroundColor: COLORS.indigoSoft,
    },
    langItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.sm,
    },
    langItemFlag: {
        fontSize: 20,
    },
    langItemLabel: {
        ...FONTS.medium,
        fontSize: 15,
        color: COLORS.text,
    },
    activeText: {
        color: COLORS.primaryDark,
        ...FONTS.semibold,
    }
});
