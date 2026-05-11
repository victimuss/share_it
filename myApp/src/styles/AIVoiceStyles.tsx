import { StyleSheet, ViewStyle, TextStyle, Platform } from 'react-native';
import { Theme, FONTS, SPACING, RADIUS } from './root';

export const createAIVoiceStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    } as ViewStyle,

    // ─── Header ──────────────────────────────────────────────────────
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.lg,
        paddingTop: Platform.OS === 'ios' ? SPACING.xl : SPACING.lg,
        paddingBottom: SPACING.md,
        backgroundColor: theme.colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
        zIndex: 100,
    } as ViewStyle,

    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.lg,
        paddingLeft: SPACING.md
    } as ViewStyle,

    headerTitle: {
        ...FONTS.bold,
        color: theme.colors.text,
    } as TextStyle,

    backButton: {
        width: 36,
        height: 36,
        borderRadius: RADIUS.full,
        backgroundColor: theme.colors.background,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: theme.colors.border,
    } as ViewStyle,

    backIconWrapper: {
        width: 16,
        height: 16,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    // ─── Body ──────────────────────────────────────────────────────
    scrollContent: {
        flexGrow: 1,
        paddingBottom: SPACING.xxxl,
    } as ViewStyle,

    mainContent: {
        flex: 1,
        width: '100%',
        paddingHorizontal: SPACING.xl,
        paddingTop: SPACING.xxxl,
        alignItems: 'center',
    } as ViewStyle,

    instructionContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: SPACING.xxxl,
    } as ViewStyle,

    instructionText: {
        ...FONTS.medium,
        color: theme.colors.textSecondary,
        textAlign: 'center',
    } as TextStyle,

    actionText: {
        ...FONTS.bold,
        color: theme.colors.primary,
        textDecorationLine: 'underline',
    } as TextStyle,

    micWrapper: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: theme.colors.primaryAlpha20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.xxxl,
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
        elevation: 8,
    } as ViewStyle,

    inputContainer: {
        width: '100%',
        marginTop: SPACING.xl,
    } as ViewStyle,

    input: {
        backgroundColor: theme.colors.surface,
        borderWidth: 1.5,
        borderColor: theme.colors.border,
        borderRadius: RADIUS.lg,
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.xl,
        ...FONTS.medium,
        color: theme.colors.text,
        minHeight: 120,
        textAlignVertical: 'top',
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    } as TextStyle,

    inputFocused: {
        borderColor: theme.colors.primary,
        shadowOpacity: 0.1,
    } as TextStyle,

    // ─── Footer ──────────────────────────────────────────────────────
    bottomBar: {
        paddingHorizontal: SPACING.lg,
        paddingTop: SPACING.md,
        paddingBottom: Platform.OS === 'ios' ? SPACING.xxl : SPACING.xl,
        backgroundColor: theme.colors.surface,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
        elevation: 8,
    } as ViewStyle,

    saveButton: {
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

    saveButtonDisabled: {
        borderRadius: RADIUS.lg,
        paddingVertical: SPACING.md,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: SPACING.sm,
        backgroundColor: theme.colors.borderDark,
        opacity: 0.6,
    } as ViewStyle,

    saveButtonText: {
        ...FONTS.semibold,
        color: '#FFFFFF',
    } as TextStyle,

    // ─── Выпадающие списки (Dropdowns) ───────────────────────────────
    selectorsRow: {
        flexDirection: 'row',
        width: '100%',
        gap: SPACING.md,
        marginBottom: SPACING.xl,
    } as ViewStyle,

    selectorCell: {
        flex: 1,
    } as ViewStyle,

    fieldLabel: {
        ...FONTS.medium,
        fontSize: FONTS.small.fontSize,
        color: theme.colors.text,
        marginBottom: SPACING.xs,
        marginLeft: SPACING.xs,
    } as TextStyle,

    selector: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.colors.surface,
        borderWidth: 1.5,
        borderColor: theme.colors.border,
        borderRadius: RADIUS.lg,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
        elevation: 2,
    } as ViewStyle,

    selectorOpen: {
        borderColor: theme.colors.primary,
        borderBottomLeftRadius: RADIUS.none,
        borderBottomRightRadius: RADIUS.none,
    } as ViewStyle,

    selectorPlaceholder: {
        ...FONTS.regular,
        fontSize: FONTS.small.fontSize,
        color: theme.colors.textSecondary,
    } as TextStyle,

    selectorValue: {
        ...FONTS.regular,
        fontSize: FONTS.small.fontSize,
        color: theme.colors.text,
        fontWeight: '500' as const,
    } as TextStyle,

    dropdownList: {
        backgroundColor: theme.colors.surface,
        borderWidth: 1.5,
        borderColor: theme.colors.primary,
        borderTopWidth: 0,
        borderBottomLeftRadius: RADIUS.lg,
        borderBottomRightRadius: RADIUS.lg,
        overflow: 'hidden',
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.08,
        shadowRadius: 16,
        elevation: 8,
    } as ViewStyle,

    dropdownOption: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.sm,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
    } as ViewStyle,

    optionDot: {
        width: 32,
        height: 32,
        borderRadius: RADIUS.full,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        backgroundColor: theme.colors.indigoSoft
    } as ViewStyle,

    optionTitle: {
        ...FONTS.medium,
        fontSize: FONTS.small.fontSize,
        color: theme.colors.text,
    } as TextStyle,

    optionSubtitle: {
        ...FONTS.regular,
        fontSize: 10,
        color: theme.colors.textSecondary,
    } as TextStyle,
});
