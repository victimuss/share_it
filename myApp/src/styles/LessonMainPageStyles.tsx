import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Theme, FONTS, SPACING, RADIUS } from './root';

export const lessonLandingStyles = (theme: Theme) => StyleSheet.create({

    // ─── Основа ──────────────────────────────────────────────────────
    /** Корневой контейнер лендинга урока. */
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
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
        backgroundColor: theme.colors.primary,
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
        backgroundColor: theme.colors.whiteAlpha20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: theme.colors.whiteAlpha30,
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
        backgroundColor: theme.colors.whiteAlpha20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: theme.colors.whiteAlpha30,
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
        paddingVertical: SPACING.s3,
        borderRadius: RADIUS.sm,
        backgroundColor: theme.colors.whiteAlpha20,
        marginBottom: SPACING.sm,
        borderWidth: 1,
        borderColor: theme.colors.whiteAlpha30,
    } as ViewStyle,

    heroCategoryText: {
        fontSize: FONTS.xs.fontSize,
        fontWeight: '600' as const,
        fontFamily: 'Inter_600SemiBold',
        color: theme.colors.surface,
    } as TextStyle,

    /** Заголовок урока поверх обложки. */
    heroTitle: {
        ...FONTS.h2,
        color: theme.colors.surface,
        lineHeight: 32,
    } as TextStyle,

    // ─── Прогресс-полоска под обложкой ──────────────────────────────
    /** Тонкая полоска прогресса — визуально «прилипает» к низу обложки.
     *  Показывает насколько урок уже пройден. */
    progressStrip: {
        height: 4,
        backgroundColor: theme.colors.border,
    } as ViewStyle,

    progressStripFill: {
        height: '100%',
        backgroundColor: theme.colors.primary,
    } as ViewStyle,

    // ─── Карточка автора ─────────────────────────────────────────────
    /** Строка с аватаром и именем автора + дата публикации. */
    authorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.md,
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.lg,
        backgroundColor: theme.colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    } as ViewStyle,

    authorAvatar: {
        width: 40,
        height: 40,
        borderRadius: RADIUS.full,
        backgroundColor: theme.colors.primaryLight,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    } as ViewStyle,

    authorAvatarText: {
        ...FONTS.semibold,
        fontSize: FONTS.regular.fontSize,
        color: theme.colors.surface,
    } as TextStyle,

    authorInfo: {
        flex: 1,
    } as ViewStyle,

    authorName: {
        ...FONTS.semibold,
        fontSize: FONTS.regular.fontSize,
        color: theme.colors.text,
        marginBottom: SPACING.s2,
    } as TextStyle,

    authorMeta: {
        ...FONTS.regular,
        fontSize: FONTS.small.fontSize,
        color: theme.colors.textSecondary,
    } as TextStyle,

    /** Кнопка «Подписаться» рядом с автором. */
    followButton: {
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.xs,
        borderRadius: RADIUS.full,
        borderWidth: 1.5,
        borderColor: theme.colors.primary,
        backgroundColor: theme.colors.surface,
    } as ViewStyle,

    followButtonActive: {
        backgroundColor: theme.colors.primary,
    } as ViewStyle,

    followButtonText: {
        fontSize: FONTS.small.fontSize,
        fontWeight: '600' as const,
        fontFamily: 'Inter_600SemiBold',
        color: theme.colors.primary,
    } as TextStyle,

    followButtonTextActive: {
        color: theme.colors.surface,
    } as TextStyle,

    // ─── Метрики урока ───────────────────────────────────────────────
    /** Ряд из 3 метрик: страниц / студентов / сложность. */
    metricsRow: {
        flexDirection: 'row',
        backgroundColor: theme.colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    } as ViewStyle,

    metricItem: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: SPACING.md,
        borderRightWidth: 1,
        borderRightColor: theme.colors.border,
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
        fontSize: FONTS.medium.fontSize,
        color: theme.colors.text,
        marginBottom: SPACING.s1,
    } as TextStyle,

    metricLabel: {
        fontSize: FONTS.xs.fontSize,
        fontFamily: 'Inter_400Regular',
        color: theme.colors.textSecondary,
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
        color: theme.colors.text,
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
        backgroundColor: theme.colors.primarySoft,
        borderWidth: 1,
        borderColor: theme.colors.indigoBorder,
    } as ViewStyle,

    tagChipText: {
        fontSize: FONTS.small.fontSize,
        fontWeight: '500' as const,
        fontFamily: 'Inter_500Medium',
        color: theme.colors.primary,
    } as TextStyle,

    // ─── Блок оценки ─────────────────────────────────────────────────
    /** Карточка оценки: лайк + звёздный рейтинг.
     *  Отделена от остального контента — важное действие читателя. */
    ratingCard: {
        marginHorizontal: SPACING.lg,
        marginBottom: SPACING.xl,
        backgroundColor: theme.colors.surface,
        borderRadius: RADIUS.xl,
        padding: SPACING.lg,
        borderWidth: 1,
        borderColor: theme.colors.border,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    } as ViewStyle,

    ratingCardTitle: {
        ...FONTS.semibold,
        fontSize: FONTS.medium_15.fontSize,
        color: theme.colors.text,
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
        borderColor: theme.colors.border,
        backgroundColor: theme.colors.surface,
    } as ViewStyle,

    /** Лайк активный — фон розовый. */
    likeButtonActive: {
        borderColor: theme.colors.pink200,
        backgroundColor: theme.colors.pink50,
    } as ViewStyle,

    likeButtonPressed: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.sm,
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
        borderRadius: RADIUS.full,
        borderWidth: 1.5,
        borderColor: theme.colors.accentDark,
        backgroundColor: theme.colors.pink100,
    } as ViewStyle,

    likeIconWrapper: {
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    likeCount: {
        ...FONTS.semibold,
        fontSize: FONTS.regular.fontSize,
        color: theme.colors.textSecondary,
    } as TextStyle,

    likeCountActive: {
        ...FONTS.semibold,
        fontSize: FONTS.regular.fontSize,
        color: theme.colors.accentDark,
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
        fontSize: FONTS.regular.fontSize,
        color: theme.colors.text,
    } as TextStyle,

    ratingCount: {
        ...FONTS.regular,
        fontSize: FONTS.small.fontSize,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        marginTop: SPACING.sm,
    } as TextStyle,

    /** Тост-подтверждение после выставления оценки. */
    ratingToast: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.sm,
        backgroundColor: theme.colors.text,
        borderRadius: RADIUS.full,
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.sm,
        alignSelf: 'center',
        marginTop: SPACING.md,
    } as ViewStyle,

    ratingToastText: {
        ...FONTS.regular,
        fontSize: FONTS.sub.fontSize,
        color: theme.colors.surface,
    } as TextStyle,

    // ─── Прогресс-карточка (если начат) ─────────────────────────────
    /** Карточка «Продолжить с X страницы» — появляется если есть прогресс. */
    resumeCard: {
        marginHorizontal: SPACING.lg,
        marginBottom: SPACING.xl,
        backgroundColor: theme.colors.primarySoft,
        borderRadius: RADIUS.xl,
        padding: SPACING.lg,
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.md,
        borderWidth: 1,
        borderColor: theme.colors.indigoBorder,
    } as ViewStyle,

    resumeIconCircle: {
        width: 44,
        height: 44,
        borderRadius: RADIUS.full,
        backgroundColor: theme.colors.primary,
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
        fontSize: FONTS.regular.fontSize,
        color: theme.colors.primary,
        marginBottom: SPACING.s2,
    } as TextStyle,

    resumeSubtitle: {
        ...FONTS.regular,
        fontSize: FONTS.small.fontSize,
        color: theme.colors.primary,
        opacity: 0.8,
    } as TextStyle,

    /** Мини прогресс-бар внутри resumeCard. */
    resumeProgressTrack: {
        height: 4,
        backgroundColor: theme.colors.indigoBorder,
        borderRadius: RADIUS.full,
        marginTop: SPACING.sm,
        overflow: 'hidden',
    } as ViewStyle,

    resumeProgressFill: {
        height: '100%',
        backgroundColor: theme.colors.primary,
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

    startButtonText: {
        ...FONTS.semibold,
        color: theme.colors.surface,
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
        fontSize: FONTS.regular.fontSize,
        color: theme.colors.textSecondary,
    } as TextStyle,
});