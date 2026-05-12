import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Theme, FONTS, SPACING, RADIUS } from './root';

export const zkpAuthStyles = (theme: Theme) => StyleSheet.create({

    safeArea: {
        flex: 1,
        backgroundColor: theme.colors.background,
    } as ViewStyle,

    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: SPACING.lg,
        paddingBottom: SPACING.xxxl,
    } as ViewStyle,

    // Hero
    heroSection: {
        alignItems: 'center',
        paddingTop: SPACING.s56,
        paddingBottom: SPACING.xxxl,
    } as ViewStyle,

    logoOuter: {
        width: 96,
        height: 96,
        borderRadius: RADIUS.full,
        backgroundColor: theme.colors.primarySoft,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: SPACING.xl,
        borderWidth: 1.5,
        borderColor: theme.colors.indigoBorder,
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
        elevation: 8,
    } as ViewStyle,

    logoInner: {
        width: 60,
        height: 60,
        borderRadius: RADIUS.full,
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: theme.colors.primary,
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
        color: theme.colors.text,
        textAlign: 'center',
        marginBottom: SPACING.sm,
    } as TextStyle,

    heroSubtitle: {
        ...FONTS.regular,
        fontSize: FONTS.regular.fontSize,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        lineHeight: 22,
        paddingHorizontal: SPACING.md,
    } as TextStyle,

    // ZKP Card
    zkpCard: {
        backgroundColor: theme.colors.primarySoft,
        borderRadius: RADIUS.xl,
        padding: SPACING.lg,
        marginBottom: SPACING.xl,
        borderLeftWidth: 3,
        borderLeftColor: theme.colors.primary,
        borderWidth: 1,
        borderColor: theme.colors.indigoBorder,
    } as ViewStyle,

    zkpCardTitle: {
        ...FONTS.semibold,
        fontSize: FONTS.sub.fontSize,
        color: theme.colors.primary,
        marginBottom: SPACING.sm,
    } as TextStyle,

    zkpCardRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: SPACING.sm,
        marginBottom: SPACING.sm,
    } as ViewStyle,

    zkpCardRowLast: {
        marginBottom: SPACING.none,
    } as ViewStyle,

    zkpCardIconWrapper: {
        width: 16,
        height: 16,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        marginTop: SPACING.s2,
    } as ViewStyle,

    zkpCardText: {
        ...FONTS.regular,
        fontSize: FONTS.small.fontSize,
        color: theme.colors.primaryDeep,
        flex: 1,
        lineHeight: 18,
    } as TextStyle,

    // Tabs
    tabsWrapper: {
        flexDirection: 'row',
        backgroundColor: theme.colors.borderDark,
        borderRadius: RADIUS.full,
        padding: SPACING.xs,
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
        flex: 1,
        paddingVertical: SPACING.sm,
        borderRadius: RADIUS.full,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    tabIndicator: {
        position: 'absolute',
        top: SPACING.xs,
        bottom: SPACING.xs,
        borderRadius: RADIUS.full,
        backgroundColor: theme.colors.primary,
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 4,
    } as ViewStyle,

    tabButtonText: {
        ...FONTS.semibold,
        fontSize: FONTS.sub.fontSize,
        color: theme.colors.textSecondary,
    } as TextStyle,

    tabButtonTextActive: {
        color: theme.colors.surface,
    } as TextStyle,

    // Section Card
    sectionCard: {
        backgroundColor: theme.colors.surface,
        borderRadius: RADIUS.xl,
        padding: SPACING.lg,
        marginBottom: SPACING.md,
        borderWidth: 1,
        borderColor: theme.colors.border,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    } as ViewStyle,

    sectionCardTitle: {
        ...FONTS.semibold,
        fontSize: FONTS.medium_15.fontSize,
        color: theme.colors.text,
        marginBottom: SPACING.xs,
    } as TextStyle,

    sectionCardSubtitle: {
        ...FONTS.regular,
        fontSize: FONTS.sub.fontSize,
        color: theme.colors.textSecondary,
        lineHeight: 20,
        marginBottom: SPACING.lg,
    } as TextStyle,

    // Generate Button
    generateButton: {
        backgroundColor: theme.colors.primary,
        borderRadius: RADIUS.lg,
        paddingVertical: SPACING.md,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: SPACING.sm,
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 6,
    } as ViewStyle,

    generateButtonText: {
        ...FONTS.semibold,
        color: theme.colors.surface,
    } as TextStyle,

    generateButtonIconWrapper: {
        width: 18,
        height: 18,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    // Key Display Block
    keyDisplayBlock: {
        backgroundColor: theme.colors.surfaceSunken,
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
        fontSize: FONTS.mini.fontSize,
        fontFamily: 'Inter_600SemiBold',
        fontWeight: '600' as const,
        color: theme.colors.primaryLight,
        letterSpacing: 0.5,
    } as TextStyle,

    copyButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.xs,
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.s3,
        borderRadius: RADIUS.sm,
        backgroundColor: theme.colors.primaryAlpha20,
        borderWidth: 1,
        borderColor: theme.colors.primaryAlpha30,
    } as ViewStyle,

    copyButtonText: {
        fontSize: FONTS.mini.fontSize,
        fontFamily: 'Inter_400Regular',
        color: theme.colors.primaryLight,
    } as TextStyle,

    copyIconWrapper: {
        width: 11,
        height: 11,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    keyText: {
        fontSize: FONTS.xs.fontSize,
        fontFamily: 'SpaceMono_400Regular',
        color: theme.colors.slate200,
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
        backgroundColor: theme.colors.warningSoft,
        borderRadius: RADIUS.md,
        padding: SPACING.md,
        borderWidth: 1,
        borderColor: theme.colors.warningBorder,
    } as ViewStyle,

    keyWarningIconWrapper: {
        width: 16,
        height: 16,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        marginTop: SPACING.s1,
    } as ViewStyle,

    keyWarningText: {
        ...FONTS.regular,
        fontSize: FONTS.small.fontSize,
        color: theme.colors.amber900,
        flex: 1,
        lineHeight: 18,
    } as TextStyle,

    // Login Tab
    keyInput: {
        backgroundColor: theme.colors.background,
        borderWidth: 1.5,
        borderColor: theme.colors.border,
        borderRadius: RADIUS.lg,
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
        fontSize: FONTS.xs.fontSize,
        color: theme.colors.text,
        fontFamily: 'SpaceMono_400Regular',
        minHeight: 80,
        textAlignVertical: 'top',
        lineHeight: 20,
        letterSpacing: 0.3,
        marginBottom: SPACING.md,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
        elevation: 2,
    } as TextStyle,

    keyInputFocused: {
        borderColor: theme.colors.primary,
        shadowColor: theme.colors.primary,
        shadowOpacity: 0.1,
    } as TextStyle,

    loginRow: {
        flexDirection: 'row',
        gap: SPACING.sm,
    } as ViewStyle,

    pasteButton: {
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.lg,
        borderRadius: RADIUS.lg,
        backgroundColor: theme.colors.surface,
        borderWidth: 1.5,
        borderColor: theme.colors.border,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: SPACING.xs,
    } as ViewStyle,

    pasteButtonText: {
        ...FONTS.semibold,
        fontSize: FONTS.sub.fontSize,
        color: theme.colors.text,
    } as TextStyle,

    pasteIconWrapper: {
        width: 16,
        height: 16,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    loginButton: {
        flex: 1,
        paddingVertical: SPACING.lg,
        borderRadius: RADIUS.lg,
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: SPACING.sm,
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 6,
    } as ViewStyle,

    loginButtonDisabled: {
        backgroundColor: theme.colors.borderDark,
        shadowOpacity: 0,
        elevation: 0,
        opacity: 0.6,
    } as ViewStyle,

    loginButtonText: {
        ...FONTS.semibold,
        color: theme.colors.surface,
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
        fontSize: FONTS.xs.fontSize,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        lineHeight: 18,
    } as TextStyle,

    footerAccent: {
        color: theme.colors.primary,
        fontWeight: '500' as const,
    } as TextStyle,
});