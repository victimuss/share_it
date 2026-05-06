import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from './root';

export const tgModalStyles = StyleSheet.create({

    // ─── Overlay & Sheet ──────────────────────────────────────────────
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(15, 15, 35, 0.55)',
        justifyContent: 'flex-end',
    },
    sheet: {
        backgroundColor: COLORS.surface,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        paddingTop: SPACING.md,
        paddingBottom: SPACING.xxxl + SPACING.lg,
        paddingHorizontal: SPACING.xl + SPACING.sm,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: -8 },
        shadowOpacity: 0.14,
        shadowRadius: 24,
        elevation: 24,
    },
    dragHandle: {
        width: 44,
        height: 4,
        backgroundColor: COLORS.border,
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
        backgroundColor: COLORS.indigoSoft,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: COLORS.indigoBorder,
        shadowColor: COLORS.primary,
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
        fontSize: 11,
        color: COLORS.primary,
        fontWeight: '600' as const,
        textTransform: 'uppercase' as const,
        letterSpacing: 0.8,
        marginBottom: SPACING.xs,
    },
    title: {
        ...FONTS.h2,
        fontSize: 22,
        color: COLORS.text,
        lineHeight: 28,
    },

    // ─── Description ──────────────────────────────────────────────────
    description: {
        ...FONTS.regular,
        color: COLORS.textSecondary,
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
        backgroundColor: COLORS.background,
        borderRadius: RADIUS.xl,
        paddingVertical: SPACING.md,
        paddingHorizontal: SPACING.md,
        gap: SPACING.md,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    featureEmojiBadge: {
        width: 40,
        height: 40,
        borderRadius: RADIUS.lg,
        backgroundColor: COLORS.surface,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 2,
    },
    featureEmoji: {
        fontSize: 20,
    },
    featureTextBlock: {
        flex: 1,
    },
    featureTitle: {
        ...FONTS.medium,
        color: COLORS.text,
        fontSize: 14,
        fontWeight: '600' as const,
    },
    featureSubtitle: {
        ...FONTS.regular,
        color: COLORS.textSecondary,
        fontSize: 12,
        marginTop: 1,
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
        color: COLORS.textSecondary,
        fontSize: 12,
    },
    policyLink: {
        ...FONTS.regular,
        color: COLORS.primary,
        fontSize: 12,
        fontWeight: '600' as const,
        textDecorationLine: 'underline' as const,
    },

    // ─── Telegram CTA button ──────────────────────────────────────────
    tgBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: SPACING.sm,
        backgroundColor: COLORS.telegramBlue,
        borderRadius: RADIUS.xl,
        paddingVertical: SPACING.lg,
        marginBottom: SPACING.md,
        shadowColor: COLORS.telegramBlue,
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
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tgBtnText: {
        ...FONTS.semibold,
        color: COLORS.surface,
        fontSize: 16,
    },

    // ─── Skip ─────────────────────────────────────────────────────────
    skipBtn: {
        alignItems: 'center',
        paddingVertical: SPACING.sm,
    },
    skipText: {
        ...FONTS.regular,
        color: COLORS.textSecondary,
        fontSize: 13,
    },
});
