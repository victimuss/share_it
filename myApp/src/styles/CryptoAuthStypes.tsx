import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from './root';

export const zkpAuthStyles = StyleSheet.create({

    safeArea: {
        flex: 1,
        backgroundColor: COLORS.background,
    } as ViewStyle,

    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: SPACING.lg,
        paddingBottom: SPACING.xxxl,
    } as ViewStyle,

    // Hero
    heroSection: {
        alignItems: 'center',
        paddingTop: 56,
        paddingBottom: SPACING.xxxl,
    } as ViewStyle,

    logoOuter: {
        width: 96,
        height: 96,
        borderRadius: RADIUS.full,
        backgroundColor: '#EEF2FF',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: SPACING.xl,
        borderWidth: 1.5,
        borderColor: '#C7D2FE',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
        elevation: 8,
    } as ViewStyle,

    logoInner: {
        width: 60,
        height: 60,
        borderRadius: RADIUS.full,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    } as ViewStyle,

    logoIconWrapper: {
        width: 28,
        height: 28,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    heroTitle: {
        ...FONTS.h2,
        color: COLORS.text,
        textAlign: 'center',
        marginBottom: SPACING.sm,
    } as TextStyle,

    heroSubtitle: {
        ...FONTS.regular,
        fontSize: 14,
        color: COLORS.textSecondary,
        textAlign: 'center',
        lineHeight: 22,
        paddingHorizontal: SPACING.md,
    } as TextStyle,

    // ZKP Card
    zkpCard: {
        backgroundColor: '#EEF2FF',
        borderRadius: RADIUS.xl,
        padding: SPACING.lg,
        marginBottom: SPACING.xl,
        borderLeftWidth: 3,
        borderLeftColor: COLORS.primary,
        borderWidth: 1,
        borderColor: '#C7D2FE',
    } as ViewStyle,

    zkpCardTitle: {
        ...FONTS.semibold,
        fontSize: 13,
        color: COLORS.primary,
        marginBottom: SPACING.sm,
    } as TextStyle,

    zkpCardRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: SPACING.sm,
        marginBottom: SPACING.sm,
    } as ViewStyle,

    zkpCardRowLast: {
        marginBottom: 0,
    } as ViewStyle,

    zkpCardIconWrapper: {
        width: 16,
        height: 16,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        marginTop: 2,
    } as ViewStyle,

    zkpCardText: {
        ...FONTS.regular,
        fontSize: 12,
        color: '#3730A3',
        flex: 1,
        lineHeight: 18,
    } as TextStyle,

    // Tabs
    tabsWrapper: {
        flexDirection: 'row',
        backgroundColor: COLORS.borderDark,
        borderRadius: RADIUS.full,
        padding: 4,
        marginBottom: SPACING.md,
    } as ViewStyle,

    tabButton: {
        flex: 1,
        paddingVertical: SPACING.sm,
        borderRadius: RADIUS.full,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    tabButtonActive: {
        backgroundColor: COLORS.primary,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 4,
    } as ViewStyle,

    tabButtonText: {
        ...FONTS.semibold,
        fontSize: 13,
        color: COLORS.textSecondary,
    } as TextStyle,

    tabButtonTextActive: {
        color: COLORS.surface,
    } as TextStyle,

    // Section Card
    sectionCard: {
        backgroundColor: COLORS.surface,
        borderRadius: RADIUS.xl,
        padding: SPACING.lg,
        marginBottom: SPACING.md,
        borderWidth: 1,
        borderColor: COLORS.border,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    } as ViewStyle,

    sectionCardTitle: {
        ...FONTS.semibold,
        fontSize: 15,
        color: COLORS.text,
        marginBottom: SPACING.xs,
    } as TextStyle,

    sectionCardSubtitle: {
        ...FONTS.regular,
        fontSize: 13,
        color: COLORS.textSecondary,
        lineHeight: 20,
        marginBottom: SPACING.lg,
    } as TextStyle,

    // Generate Button
    generateButton: {
        backgroundColor: COLORS.primary,
        borderRadius: RADIUS.lg,
        paddingVertical: SPACING.md,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: SPACING.sm,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 6,
    } as ViewStyle,

    generateButtonText: {
        ...FONTS.semibold,
        color: COLORS.surface,
    } as TextStyle,

    generateButtonIconWrapper: {
        width: 18,
        height: 18,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    // Key Display Block
    keyDisplayBlock: {
        backgroundColor: '#1E1E2E',
        borderRadius: RADIUS.lg,
        padding: SPACING.md,
        marginTop: SPACING.md,
    } as ViewStyle,

    keyDisplayHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: SPACING.sm,
        paddingBottom: SPACING.sm,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.08)',
    } as ViewStyle,

    keyDisplayLabel: {
        fontSize: 10,
        fontFamily: 'Inter_600SemiBold',
        fontWeight: '600' as const,
        color: COLORS.primaryLight,
        letterSpacing: 0.5,
    } as TextStyle,

    copyButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.xs,
        paddingHorizontal: SPACING.sm,
        paddingVertical: 3,
        borderRadius: RADIUS.sm,
        backgroundColor: 'rgba(99,102,241,0.2)',
        borderWidth: 1,
        borderColor: 'rgba(99,102,241,0.3)',
    } as ViewStyle,

    copyButtonText: {
        fontSize: 10,
        fontFamily: 'Inter_400Regular',
        color: COLORS.primaryLight,
    } as TextStyle,

    copyIconWrapper: {
        width: 11,
        height: 11,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    keyText: {
        fontSize: 11,
        fontFamily: 'SpaceMono_400Regular',
        color: '#E2E8F0',
        lineHeight: 18,
        letterSpacing: 0.3,
        wordBreak: 'break-all',
    } as TextStyle,

    // Key Warning
    keyWarning: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: SPACING.sm,
        marginTop: SPACING.md,
        backgroundColor: '#FFFBEB',
        borderRadius: RADIUS.md,
        padding: SPACING.md,
        borderWidth: 1,
        borderColor: '#FCD34D',
    } as ViewStyle,

    keyWarningIconWrapper: {
        width: 16,
        height: 16,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        marginTop: 1,
    } as ViewStyle,

    keyWarningText: {
        ...FONTS.regular,
        fontSize: 12,
        color: '#92400E',
        flex: 1,
        lineHeight: 18,
    } as TextStyle,

    // Login Tab
    keyInput: {
        backgroundColor: COLORS.background,
        borderWidth: 1.5,
        borderColor: COLORS.border,
        borderRadius: RADIUS.lg,
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
        fontSize: 11,
        color: COLORS.text,
        fontFamily: 'SpaceMono_400Regular',
        minHeight: 80,
        textAlignVertical: 'top',
        lineHeight: 20,
        letterSpacing: 0.3,
        marginBottom: SPACING.md,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
        elevation: 2,
    } as TextStyle,

    keyInputFocused: {
        borderColor: COLORS.primary,
        shadowColor: COLORS.primary,
        shadowOpacity: 0.1,
    } as TextStyle,

    loginRow: {
        flexDirection: 'row',
        gap: SPACING.sm,
    } as ViewStyle,

    pasteButton: {
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.md,
        borderRadius: RADIUS.lg,
        backgroundColor: COLORS.surface,
        borderWidth: 1.5,
        borderColor: COLORS.border,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: SPACING.xs,
    } as ViewStyle,

    pasteButtonText: {
        ...FONTS.semibold,
        fontSize: 13,
        color: COLORS.text,
    } as TextStyle,

    pasteIconWrapper: {
        width: 16,
        height: 16,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    loginButton: {
        flex: 1,
        paddingVertical: SPACING.md,
        borderRadius: RADIUS.lg,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: SPACING.sm,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 6,
    } as ViewStyle,

    loginButtonDisabled: {
        backgroundColor: COLORS.borderDark,
        shadowOpacity: 0,
        elevation: 0,
        opacity: 0.6,
    } as ViewStyle,

    loginButtonText: {
        ...FONTS.semibold,
        color: COLORS.surface,
    } as TextStyle,

    loginButtonIconWrapper: {
        width: 16,
        height: 16,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    // Footer
    footer: {
        alignItems: 'center',
        paddingTop: SPACING.lg,
    } as ViewStyle,

    footerText: {
        ...FONTS.regular,
        fontSize: 11,
        color: COLORS.textSecondary,
        textAlign: 'center',
        lineHeight: 18,
    } as TextStyle,

    footerAccent: {
        color: COLORS.primary,
        fontWeight: '500' as const,
    } as TextStyle,
});