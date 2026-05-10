import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from './root';

export const myLessonsStyles = StyleSheet.create({

    // ─── Основа ──────────────────────────────────────────────────────
    /** Корневой контейнер экрана. */
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    } as ViewStyle,

    scrollContent: {
        flexGrow: 1,
        paddingBottom: SPACING.xxxl,
    } as ViewStyle,

    // ─── Header ──────────────────────────────────────────────────────
    header: {
        backgroundColor: COLORS.surface,
        paddingTop: SPACING.xl,
        paddingHorizontal: SPACING.lg,
        paddingBottom: SPACING.none,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    } as ViewStyle,

    headerTitle: {
        ...FONTS.h2,
        color: COLORS.text,
        marginBottom: SPACING.lg,
    } as TextStyle,

    // ─── Таб-переключатель Созданные / Мои ───────────────────────────
    /** Контейнер двух вкладок — прилипает к низу хедера. */
    tabsRow: {
        flexDirection: 'row',
    } as ViewStyle,

    tab: {
        flex: 1,
        paddingVertical: SPACING.md,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    } as ViewStyle,

    tabActive: {
        flex: 1,
        paddingVertical: SPACING.md,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: COLORS.primary,
    } as ViewStyle,

    tabText: {
        ...FONTS.semibold,
        fontSize: FONTS.regular.fontSize,
        color: COLORS.textSecondary,
    } as TextStyle,

    tabTextActive: {
        ...FONTS.semibold,
        fontSize: FONTS.regular.fontSize,
        color: COLORS.primary,
    } as TextStyle,

    // ─── Фильтр-чипы ─────────────────────────────────────────────────
    /** Горизонтальный скролл фильтров под табами. */
    filtersScrollContent: {
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
        gap: SPACING.xl,
    } as ViewStyle,

    filterChip: {
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.xs,
        borderRadius: RADIUS.full,
        backgroundColor: COLORS.surface,
        borderWidth: 1.5,
        borderColor: COLORS.border,
        marginRight: SPACING.xs,
        marginLeft: SPACING.xs,
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.md,
    } as ViewStyle,

    filterChipActive: {
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.xs,
        borderRadius: RADIUS.full,
        borderWidth: 1.5,
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.xs,
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    } as ViewStyle,

    filterChipText: {
        fontSize: FONTS.small.fontSize,
        fontWeight: '500' as const,
        fontFamily: 'Inter_500Medium',
        color: COLORS.textSecondary,
    } as TextStyle,

    filterChipTextActive: {
        color: COLORS.surface,
        fontWeight: '600' as const,
    } as TextStyle,

    /** Цветная точка-индикатор внутри чипа фильтра. */
    filterChipDot: {
        width: 6,
        height: 6,
        borderRadius: RADIUS.lg
    } as ViewStyle,

    // ─── Счётчик результатов ─────────────────────────────────────────
    resultsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SPACING.lg,
        paddingBottom: SPACING.sm,
    } as ViewStyle,

    resultsText: {
        ...FONTS.regular,
        fontSize: FONTS.small.fontSize,
        color: COLORS.textSecondary,
    } as TextStyle,

    resultsBold: {
        fontWeight: '600' as const,
        color: COLORS.text,
    } as TextStyle,

    // ─── Карточка урока (вкладка «Созданные») ────────────────────────
    /** Карточка созданного урока — нажатие открывает диалог. */
    lessonCard: {
        marginHorizontal: SPACING.lg,
        marginBottom: SPACING.md,
        backgroundColor: COLORS.surface,
        borderRadius: RADIUS.lg,
        padding: SPACING.md,
        borderWidth: 1,
        borderColor: COLORS.border,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
    } as ViewStyle,

    lessonCardTop: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: SPACING.md,
    } as ViewStyle,

    /** Миниатюра-иконка урока. */
    lessonThumb: {
        width: 48,
        height: 48,
        borderRadius: RADIUS.md,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    } as ViewStyle,

    lessonInfo: {
        flex: 1,
        gap: SPACING.xs,
    } as ViewStyle,

    lessonTitle: {
        ...FONTS.semibold,
        fontSize: FONTS.regular.fontSize,
        color: COLORS.text,
        lineHeight: 20,
    } as TextStyle,

    lessonMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.xs,
        flexWrap: 'wrap',
    } as ViewStyle,

    lessonMetaText: {
        ...FONTS.regular,
        fontSize: FONTS.small.fontSize,
        color: COLORS.textSecondary,
    } as TextStyle,

    lessonMetaDot: {
        fontSize: FONTS.small.fontSize,
        color: COLORS.textLight,
    } as TextStyle,

    /** Бабл-теги (сложность, категория). */
    tagBadge: {
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.xs,
        borderRadius: RADIUS.sm,
    } as ViewStyle,

    tagText: {
        fontSize: FONTS.xs.fontSize,
        fontWeight: '600' as const,
        fontFamily: 'Inter_600SemiBold',
    } as TextStyle,

    // ─── Кнопки действий на карточке ──────────────────────────────────
    continueButton: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.sm,
        borderRadius: RADIUS.lg,
    } as ViewStyle,

    continueButtonText: {
        color: COLORS.surface,
        fontSize: FONTS.sub.fontSize,
        fontWeight: '600' as const,
        fontFamily: 'Inter_600SemiBold',
    } as TextStyle,

    repeatButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.xs,
    } as ViewStyle,

    repeatButtonText: {
        color: COLORS.primary,
        fontSize: FONTS.sub.fontSize,
        fontWeight: '600' as const,
        fontFamily: 'Inter_600SemiBold',
    } as TextStyle,

    /** Кнопка ⋯ справа от карточки. */
    lessonMenuButton: {
        width: 32,
        height: 32,
        borderRadius: RADIUS.full,
        backgroundColor: COLORS.background,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
        flexShrink: 0,
    } as ViewStyle,

    lessonMenuIconWrapper: {
        width: 14,
        height: 14,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    /** Нижняя строка карточки: статус + статистика. */
    lessonCardBottom: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: SPACING.md,
        paddingTop: SPACING.sm,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    } as ViewStyle,

    lessonStats: {
        flexDirection: 'row',
        gap: SPACING.md,
        alignItems: 'center',
    } as ViewStyle,

    lessonStat: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
    } as ViewStyle,

    lessonStatIconWrapper: {
        width: 13,
        height: 13,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    lessonStatText: {
        fontSize: FONTS.small.fontSize,
        fontFamily: 'Inter_400Regular',
        color: COLORS.textSecondary,
    } as TextStyle,

    // ─── Статус-бейджи ────────────────────────────────────────────────
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.s3,
        borderRadius: RADIUS.sm,
    } as ViewStyle,

    /** Draft — серый. */
    statusDraft: {
        backgroundColor: COLORS.backgroundAlt,
        borderWidth: 1,
        borderColor: COLORS.border,
    } as ViewStyle,

    statusDraftText: {
        fontSize: FONTS.xs.fontSize,
        fontWeight: '600' as const,
        fontFamily: 'Inter_600SemiBold',
        color: COLORS.textSecondary,
    } as TextStyle,

    /** Active — зелёный. */
    statusActive: {
        backgroundColor: COLORS.successLight,
        borderWidth: 1,
        borderColor: COLORS.successBorder,
    } as ViewStyle,

    statusActiveText: {
        fontSize: FONTS.xs.fontSize,
        fontWeight: '600' as const,
        fontFamily: 'Inter_600SemiBold',
        color: COLORS.success,
    } as TextStyle,

    /** Rejected — красный. */
    statusRejected: {
        backgroundColor: COLORS.errorLight,
        borderWidth: 1,
        borderColor: COLORS.errorBorder,
    } as ViewStyle,

    statusRejectedText: {
        fontSize: FONTS.xs.fontSize,
        fontWeight: '600' as const,
        fontFamily: 'Inter_600SemiBold',
        color: COLORS.error,
    } as TextStyle,

    /** Точка-индикатор статуса. */
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: RADIUS.full,
    } as ViewStyle,

    // ─── Карточка «Мои уроки» (с прогресс-баром) ────────────────────
    /** Прогресс-бар внутри карточки «в процессе». */
    progressTrack: {
        height: 4,
        backgroundColor: COLORS.border,
        borderRadius: RADIUS.full,
        overflow: 'hidden',
        marginTop: SPACING.sm,
        flex: 1,
    } as ViewStyle,

    progressFill: {
        height: '100%',
        backgroundColor: COLORS.primary,
        borderRadius: RADIUS.full,
    } as ViewStyle,

    progressRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.sm,
        marginTop: SPACING.md,
        paddingTop: SPACING.sm,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    } as ViewStyle,

    progressLabel: {
        fontSize: FONTS.xs.fontSize,
        fontFamily: 'Inter_400Regular',
        color: COLORS.textSecondary,
        minWidth: 28,
        textAlign: 'right',
        flexShrink: 0,
    } as TextStyle,

    /** Бейдж «Завершено» на карточке законченного урока. */
    completedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.s3,
        borderRadius: RADIUS.sm,
        backgroundColor: COLORS.successLight,
        borderWidth: 1,
        borderColor: COLORS.successBorder,
    } as ViewStyle,

    completedBadgeIconWrapper: {
        width: 12,
        height: 12,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    completedBadgeText: {
        fontSize: FONTS.xs.fontSize,
        fontWeight: '600' as const,
        fontFamily: 'Inter_600SemiBold',
        color: COLORS.success,
    } as TextStyle,

    // ─── Разделитель секций («В процессе» / «Завершённые») ───────────
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.lg,
        paddingTop: SPACING.lg,
        paddingBottom: SPACING.sm,
    } as ViewStyle,

    sectionTitle: {
        ...FONTS.bold,
        fontSize: FONTS.medium_15.fontSize,
        color: COLORS.text,
    } as TextStyle,

    sectionCount: {
        ...FONTS.regular,
        fontSize: FONTS.small.fontSize,
        color: COLORS.textSecondary,
    } as TextStyle,

    // ─── Empty state ─────────────────────────────────────────────────
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: SPACING.xxxl,
        paddingHorizontal: SPACING.xl,
    } as ViewStyle,

    emptyIconCircle: {
        width: 64,
        height: 64,
        borderRadius: RADIUS.full,
        backgroundColor: COLORS.background,
        borderWidth: 1.5,
        borderColor: COLORS.border,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: SPACING.lg,
    } as ViewStyle,

    emptyIconWrapper: {
        width: 28,
        height: 28,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    emptyTitle: {
        ...FONTS.semibold,
        color: COLORS.text,
        textAlign: 'center',
        marginBottom: SPACING.sm,
    } as TextStyle,

    emptySubtitle: {
        ...FONTS.regular,
        color: COLORS.textSecondary,
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: SPACING.xl,
    } as TextStyle,

    emptyButton: {
        paddingHorizontal: SPACING.xl,
        paddingVertical: SPACING.md,
        borderRadius: RADIUS.lg,
        backgroundColor: COLORS.primary,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    } as ViewStyle,

    emptyButtonText: {
        ...FONTS.semibold,
        color: COLORS.surface,
        fontSize: FONTS.regular.fontSize,
    } as TextStyle,

    // ─── Диалог действий (просмотреть / редактировать / удалить) ─────
    /** Оверлей поверх экрана. */
    dialogOverlay: {
        flex: 1,
        backgroundColor: COLORS.overlay,
        justifyContent: 'flex-end',
    } as ViewStyle,

    /** Шторка диалога. */
    dialogSheet: {
        backgroundColor: COLORS.surface,
        borderTopLeftRadius: RADIUS.xl,
        borderTopRightRadius: RADIUS.xl,
        paddingBottom: SPACING.xxxl,
    } as ViewStyle,

    dialogHandle: {
        width: 36,
        height: 4,
        borderRadius: RADIUS.full,
        backgroundColor: COLORS.borderDark,
        alignSelf: 'center',
        marginTop: SPACING.md,
        marginBottom: SPACING.sm,
    } as ViewStyle,

    /** Превью урока в шапке диалога. */
    dialogPreview: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.md,
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    } as ViewStyle,

    dialogPreviewThumb: {
        width: 44,
        height: 44,
        borderRadius: RADIUS.md,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    } as ViewStyle,

    dialogPreviewTitle: {
        ...FONTS.semibold,
        fontSize: FONTS.regular.fontSize,
        color: COLORS.text,
    } as TextStyle,

    dialogPreviewMeta: {
        ...FONTS.regular,
        fontSize: FONTS.small.fontSize,
        color: COLORS.textSecondary,
        marginTop: SPACING.s2,
    } as TextStyle,

    /** Список действий диалога. */
    dialogActions: {
        paddingTop: SPACING.sm,
    } as ViewStyle,

    /** Одно действие в диалоге. */
    dialogAction: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.md,
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
    } as ViewStyle,

    dialogActionIconCircle: {
        width: 40,
        height: 40,
        borderRadius: RADIUS.full,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    } as ViewStyle,

    dialogActionIconWrapper: {
        width: 18,
        height: 18,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    dialogActionTitle: {
        ...FONTS.semibold,
        fontSize: FONTS.regular.fontSize,
        color: COLORS.text,
    } as TextStyle,

    dialogActionSubtitle: {
        ...FONTS.regular,
        fontSize: FONTS.small.fontSize,
        color: COLORS.textSecondary,
        marginTop: SPACING.s1,
    } as TextStyle,

    /** Действие «Удалить» — красный акцент. */
    dialogActionDelete: {
        marginTop: SPACING.xs,
    } as ViewStyle,

    dialogActionDeleteTitle: {
        ...FONTS.semibold,
        fontSize: FONTS.regular.fontSize,
        color: COLORS.error,
    } as TextStyle,

    dialogDivider: {
        height: 1,
        backgroundColor: COLORS.border,
        marginHorizontal: SPACING.lg,
    } as ViewStyle,
});