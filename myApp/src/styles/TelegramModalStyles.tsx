import { StyleSheet } from 'react-native';
import { Theme, FONTS, SPACING, RADIUS } from './root';

export const tgModalStyles = (theme: Theme) => StyleSheet.create({

    // ─── Overlay & Sheet ──────────────────────────────────────────────
    overlay: {
        flex: 1,
        backgroundColor: theme.colors.modalOverlay,
        justifyContent: 'flex-end',
    },
    sheet: {
        backgroundColor: theme.colors.surface,
        borderTopLeftRadius: RADIUS.xxxl,
        borderTopRightRadius: RADIUS.xxxl,
        paddingTop: SPACING.md,
        paddingBottom: SPACING.xxxl + SPACING.lg,
        paddingHorizontal: SPACING.xl + SPACING.sm,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: -8 },
        shadowOpacity: 0.14,
        shadowRadius: 24,
        elevation: 24,
    },
    dragHandle: {
        width: 44,
        height: 4,
        backgroundColor: theme.colors.border,
        borderRadius: RADIUS.full,
        alignSelf: 'center',
        marginBottom: SPACING.xl + SPACING.sm,
    },

    // ─── Hero row ─────────────────────────────────────────────────────
    heroRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.xl,
        gap: SPACING.lg,
    },
    iconCircle: {
        width: 60,
        height: 60,
        borderRadius: RADIUS.full,
        backgroundColor: theme.colors.indigoSoft,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: theme.colors.indigoBorder,
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.18,
        shadowRadius: 10,
        elevation: 4,
    },
    heroText: {
        flex: 1,
    },
    eyebrow: {
        ...FONTS.regular,
        fontSize: FONTS.xs.fontSize,
        color: theme.colors.primary,
        fontWeight: '600' as const,
        textTransform: 'uppercase' as const,
        letterSpacing: 0.8,
        marginBottom: SPACING.xs,
    },
    title: {
        ...FONTS.h2,
        fontSize: FONTS.xxl.fontSize,
        color: theme.colors.text,
        lineHeight: 28,
    },

    // ─── Description ──────────────────────────────────────────────────
    description: {
        ...FONTS.regular,
        color: theme.colors.textSecondary,
        lineHeight: 22,
        marginBottom: SPACING.xl,
    },

    // ─── Features ─────────────────────────────────────────────────────
    features: {
        gap: SPACING.sm,
        marginBottom: SPACING.xl,
    },
    featureRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
        borderRadius: RADIUS.xl,
        paddingVertical: SPACING.md,
        paddingHorizontal: SPACING.md,
        gap: SPACING.md,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    featureEmojiBadge: {
        width: 40,
        height: 40,
        borderRadius: RADIUS.lg,
        backgroundColor: theme.colors.surface,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 2,
    },
    featureEmoji: {
        fontSize: FONTS.xl.fontSize,
    },
    featureTextBlock: {
        flex: 1,
    },
    featureTitle: {
        ...FONTS.medium,
        color: theme.colors.text,
        fontSize: FONTS.regular.fontSize,
        fontWeight: '600' as const,
    },
    featureSubtitle: {
        ...FONTS.regular,
        color: theme.colors.textSecondary,
        fontSize: FONTS.small.fontSize,
        marginTop: SPACING.s1,
    },

    // ─── Policy ───────────────────────────────────────────────────────
    policyRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.lg,
    },
    policyText: {
        ...FONTS.regular,
        color: theme.colors.textSecondary,
        fontSize: FONTS.small.fontSize,
    },
    policyLink: {
        ...FONTS.regular,
        color: theme.colors.primary,
        fontSize: FONTS.small.fontSize,
        fontWeight: '600' as const,
        textDecorationLine: 'underline' as const,
    },

    // ─── Telegram CTA button ──────────────────────────────────────────
    tgBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: SPACING.sm,
        backgroundColor: theme.colors.telegramBlue,
        borderRadius: RADIUS.xl,
        paddingVertical: SPACING.lg,
        marginBottom: SPACING.md,
        shadowColor: theme.colors.telegramBlue,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.35,
        shadowRadius: 16,
        elevation: 8,
    },
    tgBtnPressed: {
        opacity: 0.88,
        shadowOpacity: 0.15,
        elevation: 2,
    },
    tgIconWrapper: {
        width: 32,
        height: 32,
        borderRadius: RADIUS.full,
        backgroundColor: theme.colors.whiteAlpha20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tgBtnText: {
        ...FONTS.semibold,
        color: theme.colors.surface,
        fontSize: FONTS.medium.fontSize,
    },

    // ─── Skip ─────────────────────────────────────────────────────────
    skipBtn: {
        alignItems: 'center',
        paddingVertical: SPACING.sm,
    },
    skipText: {
        ...FONTS.regular,
        color: theme.colors.textSecondary,
        fontSize: FONTS.sub.fontSize,
    },
});
