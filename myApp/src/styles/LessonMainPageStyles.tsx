import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from './root';

export const lessonLandingStyles = StyleSheet.create({

    // ─── Основа ──────────────────────────────────────────────────────
    /** Корневой контейнер лендинга урока. */
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    } as ViewStyle,

    scrollContent: {
        flexGrow: 1,
        paddingBottom: SPACING.xxxl,
    } as ViewStyle,

    // ─── Hero-обложка ────────────────────────────────────────────────
    /** Цветная обложка урока вверху экрана.
     *  Высота фиксирована — достаточно для визуального веса. */
    heroBanner: {
        height: 200,
        backgroundColor: COLORS.primary,
        justifyContent: 'flex-end',
        padding: SPACING.lg,
        position: 'relative',
    } as ViewStyle,

    /** Кнопка «←» поверх обложки (абсолютная). */
    heroBackButton: {
        position: 'absolute',
        top: SPACING.xl,
        left: SPACING.lg,
        width: 36,
        height: 36,
        borderRadius: RADIUS.full,
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
    } as ViewStyle,

    heroBackIconWrapper: {
        width: 16,
        height: 16,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    /** Кнопка «⋯» (поделиться / ещё) в правом верхнем углу обложки. */
    heroMoreButton: {
        position: 'absolute',
        top: SPACING.xl,
        right: SPACING.lg,
        width: 36,
        height: 36,
        borderRadius: RADIUS.full,
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
    } as ViewStyle,

    heroMoreIconWrapper: {
        width: 16,
        height: 16,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    /** Бейдж категории поверх обложки. */
    heroCategoryBadge: {
        alignSelf: 'flex-start',
        paddingHorizontal: SPACING.sm,
        paddingVertical: 3,
        borderRadius: RADIUS.sm,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: SPACING.sm,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
    } as ViewStyle,

    heroCategoryText: {
        fontSize: 11,
        fontWeight: '600' as const,
        fontFamily: 'Inter_600SemiBold',
        color: COLORS.surface,
    } as TextStyle,

    /** Заголовок урока поверх обложки. */
    heroTitle: {
        ...FONTS.h2,
        color: COLORS.surface,
        lineHeight: 32,
    } as TextStyle,

    // ─── Прогресс-полоска под обложкой ──────────────────────────────
    /** Тонкая полоска прогресса — визуально «прилипает» к низу обложки.
     *  Показывает насколько урок уже пройден. */
    progressStrip: {
        height: 4,
        backgroundColor: COLORS.border,
    } as ViewStyle,

    progressStripFill: {
        height: '100%',
        backgroundColor: COLORS.primary,
    } as ViewStyle,

    // ─── Карточка автора ─────────────────────────────────────────────
    /** Строка с аватаром и именем автора + дата публикации. */
    authorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.md,
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.lg,
        backgroundColor: COLORS.surface,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    } as ViewStyle,

    authorAvatar: {
        width: 40,
        height: 40,
        borderRadius: RADIUS.full,
        backgroundColor: COLORS.primaryLight,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    } as ViewStyle,

    authorAvatarText: {
        ...FONTS.semibold,
        fontSize: 14,
        color: COLORS.surface,
    } as TextStyle,

    authorInfo: {
        flex: 1,
    } as ViewStyle,

    authorName: {
        ...FONTS.semibold,
        fontSize: 14,
        color: COLORS.text,
        marginBottom: 2,
    } as TextStyle,

    authorMeta: {
        ...FONTS.regular,
        fontSize: 12,
        color: COLORS.textSecondary,
    } as TextStyle,

    /** Кнопка «Подписаться» рядом с автором. */
    followButton: {
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.xs,
        borderRadius: RADIUS.full,
        borderWidth: 1.5,
        borderColor: COLORS.primary,
        backgroundColor: COLORS.surface,
    } as ViewStyle,

    followButtonActive: {
        backgroundColor: COLORS.primary,
    } as ViewStyle,

    followButtonText: {
        fontSize: 12,
        fontWeight: '600' as const,
        fontFamily: 'Inter_600SemiBold',
        color: COLORS.primary,
    } as TextStyle,

    followButtonTextActive: {
        color: COLORS.surface,
    } as TextStyle,

    // ─── Метрики урока ───────────────────────────────────────────────
    /** Ряд из 3 метрик: страниц / студентов / сложность. */
    metricsRow: {
        flexDirection: 'row',
        backgroundColor: COLORS.surface,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    } as ViewStyle,

    metricItem: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: SPACING.md,
        borderRightWidth: 1,
        borderRightColor: COLORS.border,
    } as ViewStyle,

    metricItemLast: {
        borderRightWidth: 0,
    } as ViewStyle,

    metricIconWrapper: {
        width: 18,
        height: 18,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: SPACING.xs,
    } as ViewStyle,

    metricValue: {
        ...FONTS.bold,
        fontSize: 16,
        color: COLORS.text,
        marginBottom: 1,
    } as TextStyle,

    metricLabel: {
        fontSize: 11,
        fontFamily: 'Inter_400Regular',
        color: COLORS.textSecondary,
        textAlign: 'center',
    } as TextStyle,

    // ─── Описание урока ──────────────────────────────────────────────
    descriptionContainer: {
        paddingHorizontal: SPACING.lg,
        paddingTop: SPACING.lg,
        paddingBottom: SPACING.md,
    } as ViewStyle,

    descriptionText: {
        ...FONTS.regular,
        color: COLORS.text,
        lineHeight: 24,
    } as TextStyle,

    // ─── Теги ────────────────────────────────────────────────────────
    tagsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: SPACING.sm,
        paddingHorizontal: SPACING.lg,
        paddingBottom: SPACING.xl,
    } as ViewStyle,

    tagChip: {
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.xs,
        borderRadius: RADIUS.full,
        backgroundColor: '#EEF2FF',
        borderWidth: 1,
        borderColor: '#C7D2FE',
    } as ViewStyle,

    tagChipText: {
        fontSize: 12,
        fontWeight: '500' as const,
        fontFamily: 'Inter_500Medium',
        color: COLORS.primary,
    } as TextStyle,

    // ─── Блок оценки ─────────────────────────────────────────────────
    /** Карточка оценки: лайк + звёздный рейтинг.
     *  Отделена от остального контента — важное действие читателя. */
    ratingCard: {
        marginHorizontal: SPACING.lg,
        marginBottom: SPACING.xl,
        backgroundColor: COLORS.surface,
        borderRadius: RADIUS.xl,
        padding: SPACING.lg,
        borderWidth: 1,
        borderColor: COLORS.border,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    } as ViewStyle,

    ratingCardTitle: {
        ...FONTS.semibold,
        fontSize: 15,
        color: COLORS.text,
        marginBottom: SPACING.lg,
        textAlign: 'center',
    } as TextStyle,

    /** Строка: кнопка лайка слева + звёзды справа. */
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: SPACING.lg,
    } as ViewStyle,

    // ─── Лайк ────────────────────────────────────────────────────────
    /** Кнопка лайка с анимацией нажатия. */
    likeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.sm,
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
        borderRadius: RADIUS.full,
        borderWidth: 1.5,
        borderColor: COLORS.border,
        backgroundColor: COLORS.surface,
    } as ViewStyle,

    /** Лайк активный — фон розовый. */
    likeButtonActive: {
        borderColor: '#FBCFE8',
        backgroundColor: '#FDF2F8',
    } as ViewStyle,

    likeButtonPressed: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.sm,
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
        borderRadius: RADIUS.full,
        borderWidth: 1.5,
        borderColor: '#DB2777',
        backgroundColor: '#FCE7F3',
    } as ViewStyle,

    likeIconWrapper: {
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    likeCount: {
        ...FONTS.semibold,
        fontSize: 14,
        color: COLORS.textSecondary,
    } as TextStyle,

    likeCountActive: {
        ...FONTS.semibold,
        fontSize: 14,
        color: '#DB2777',
    } as TextStyle,

    // ─── Звёздный рейтинг ────────────────────────────────────────────
    /** Ряд из 5 звёзд. */
    starsRow: {
        flexDirection: 'row',
        gap: SPACING.xs,
        alignItems: 'center',
    } as ViewStyle,

    /** Одна звезда — нажимаемая область. */
    starButton: {
        padding: SPACING.xs,
    } as ViewStyle,

    starIconWrapper: {
        width: 28,
        height: 28,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    /** Текст среднего рейтинга рядом со звёздами. */
    ratingValue: {
        ...FONTS.semibold,
        fontSize: 14,
        color: COLORS.text,
    } as TextStyle,

    ratingCount: {
        ...FONTS.regular,
        fontSize: 12,
        color: COLORS.textSecondary,
        textAlign: 'center',
        marginTop: SPACING.sm,
    } as TextStyle,

    /** Тост-подтверждение после выставления оценки. */
    ratingToast: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.sm,
        backgroundColor: COLORS.text,
        borderRadius: RADIUS.full,
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.sm,
        alignSelf: 'center',
        marginTop: SPACING.md,
    } as ViewStyle,

    ratingToastText: {
        ...FONTS.regular,
        fontSize: 13,
        color: COLORS.surface,
    } as TextStyle,

    // ─── Прогресс-карточка (если начат) ─────────────────────────────
    /** Карточка «Продолжить с X страницы» — появляется если есть прогресс. */
    resumeCard: {
        marginHorizontal: SPACING.lg,
        marginBottom: SPACING.xl,
        backgroundColor: '#EEF2FF',
        borderRadius: RADIUS.xl,
        padding: SPACING.lg,
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.md,
        borderWidth: 1,
        borderColor: '#C7D2FE',
    } as ViewStyle,

    resumeIconCircle: {
        width: 44,
        height: 44,
        borderRadius: RADIUS.full,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    } as ViewStyle,

    resumeIconWrapper: {
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    resumeInfo: {
        flex: 1,
    } as ViewStyle,

    resumeTitle: {
        ...FONTS.semibold,
        fontSize: 14,
        color: COLORS.primary,
        marginBottom: 2,
    } as TextStyle,

    resumeSubtitle: {
        ...FONTS.regular,
        fontSize: 12,
        color: '#6366F1',
        opacity: 0.8,
    } as TextStyle,

    /** Мини прогресс-бар внутри resumeCard. */
    resumeProgressTrack: {
        height: 4,
        backgroundColor: '#C7D2FE',
        borderRadius: RADIUS.full,
        marginTop: SPACING.sm,
        overflow: 'hidden',
    } as ViewStyle,

    resumeProgressFill: {
        height: '100%',
        backgroundColor: COLORS.primary,
        borderRadius: RADIUS.full,
    } as ViewStyle,

    // ─── Нижние CTA-кнопки ───────────────────────────────────────────
    /** Обёртка двух кнопок — «Продолжить» и «Выйти». */
    ctaContainer: {
        paddingHorizontal: SPACING.lg,
        paddingBottom: SPACING.xl,
        gap: SPACING.sm,
    } as ViewStyle,

    /** Основная кнопка «Продолжить обучение» / «Начать урок». */
    startButton: {
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

    startButtonText: {
        ...FONTS.semibold,
        color: COLORS.surface,
    } as TextStyle,

    startButtonIconWrapper: {
        width: 16,
        height: 16,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    /** Кнопка «Выйти» — вторичная, деструктивная.
     *  Не красная — просто нейтральная, чтобы не пугать. */
    exitButton: {
        paddingVertical: SPACING.sm,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    exitButtonText: {
        ...FONTS.regular,
        fontSize: 14,
        color: COLORS.textSecondary,
    } as TextStyle,
});