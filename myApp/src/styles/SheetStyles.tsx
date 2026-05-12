import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { Theme, FONTS, SPACING, RADIUS } from './root';

export const lessonSwipeViewStyles = (theme: Theme) => StyleSheet.create({

    // ─── Основа ──────────────────────────────────────────────────────
    /** Корневой контейнер экрана. */
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    } as ViewStyle,

    // ─── Header ──────────────────────────────────────────────────────
    /** Шапка: кнопка назад + название + закладка. */
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.lg,
        paddingTop: SPACING.xl,
        paddingBottom: SPACING.md,
        backgroundColor: theme.colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    } as ViewStyle,

    backButton: {
        width: 32,
        height: 32,
        borderRadius: RADIUS.full,
        backgroundColor: theme.colors.background,
        borderWidth: 0.5,
        borderColor: theme.colors.border,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    } as ViewStyle,

    backIconWrapper: {
        width: 14,
        height: 14,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    headerTitle: {
        ...FONTS.semibold,
        fontSize: FONTS.regular.fontSize,
        color: theme.colors.text,
        flex: 1,
        textAlign: 'center',
        marginHorizontal: SPACING.sm,
    } as TextStyle,

    bookmarkButton: {
        width: 32,
        height: 32,
        borderRadius: RADIUS.full,
        backgroundColor: theme.colors.background,
        borderWidth: 0.5,
        borderColor: theme.colors.border,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    } as ViewStyle,

    bookmarkButtonActive: {
        backgroundColor: theme.colors.primarySoft,
        borderColor: theme.colors.indigoBorder,
    } as ViewStyle,

    bookmarkIconWrapper: {
        width: 14,
        height: 14,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    // ─── Прогресс-бар ────────────────────────────────────────────────
    /** Контейнер прогресс-бара под хедером. */
    progressContainer: {
        backgroundColor: theme.colors.surface,
        paddingHorizontal: SPACING.lg,
        paddingTop: SPACING.md,
        paddingBottom: SPACING.sm,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    } as ViewStyle,

    /** Ряд сегментов прогресса. */
    segmentsRow: {
        flexDirection: 'row',
        gap: SPACING.xs,
        marginBottom: SPACING.xs,
    } as ViewStyle,

    /** Один сегмент — пустой. */
    segment: {
        flex: 1,
        height: 4,
        borderRadius: RADIUS.full,
        backgroundColor: theme.colors.border,
    } as ViewStyle,

    /** Пройденный сегмент. */
    segmentDone: {
        flex: 1,
        height: 4,
        borderRadius: RADIUS.full,
        backgroundColor: theme.colors.primary,
    } as ViewStyle,

    /** Текущий сегмент. */
    segmentCurrent: {
        backgroundColor: theme.colors.primaryLight,
    } as ViewStyle,

    /** Строка подписей под сегментами. */
    progressLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    } as ViewStyle,

    progressLabelLeft: {
        ...FONTS.regular,
        fontSize: FONTS.xs.fontSize,
        color: theme.colors.textSecondary,
    } as TextStyle,

    progressLabelRight: {
        ...FONTS.regular,
        fontSize: FONTS.xs.fontSize,
        color: theme.colors.primary,
        fontWeight: '600' as const,
    } as TextStyle,

    // ─── Горизонтальный свайп-контейнер ─────────────────────────────
    /** FlatList / ScrollView с pagingEnabled + horizontal.
     *  flex: 1 — занимает всё пространство между прогрессом и навбаром. */
    swipeContainer: {
        flex: 1,
    } as ViewStyle,

    /** Одна страница-карточка — ровно ширина экрана.
     *  Все четыре типа используют этот враппер. */
    swipePage: {
        flex: 1,
        backgroundColor: theme.colors.background,
    } as ViewStyle,

    /** Внутренний скролл страницы — padding снизу для навбара. */
    pageScroll: {
        flexGrow: 1,
        padding: SPACING.lg,
        paddingBottom: SPACING.xxxl,
    } as ViewStyle,

    // ─── Мета-строка (бейдж типа) ────────────────────────────────────
    /** Строка с бейджем типа страницы — без time-to-read. */
    pageMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.md,
    } as ViewStyle,

    typeBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.xs,
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.s3,
        borderRadius: RADIUS.sm,
    } as ViewStyle,

    typeBadgeTheory: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.xs,
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.s3,
        borderRadius: RADIUS.xl,
        backgroundColor: theme.colors.primarySoft,
    } as ViewStyle,

    typeBadgeVideo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.xs,
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.s3,
        borderRadius: RADIUS.xl,
        backgroundColor: theme.colors.errorLight,
    } as ViewStyle,

    typeBadgeQuestion: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.xs,
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.s3,
        borderRadius: RADIUS.xl,
        backgroundColor: theme.colors.successLight,
    } as ViewStyle,

    typeBadgePicture: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.xs,
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.s3,
        borderRadius: RADIUS.xl,
        backgroundColor: theme.colors.warningLight,
    } as ViewStyle,

    typeBadgeText: {
        ...FONTS.medium,
        fontSize: FONTS.sub.fontSize,
    } as TextStyle,

    typeBadgeTextTheory: { color: theme.colors.primary } as TextStyle,
    typeBadgeTextVideo: { color: theme.colors.error } as TextStyle,
    typeBadgeTextQuestion: { color: theme.colors.success } as TextStyle,
    typeBadgeTextPicture: { color: theme.colors.warning } as TextStyle,

    // ─── Заголовок страницы ──────────────────────────────────────────
    pageTitle: {
        ...FONTS.h2,
        color: theme.colors.text,
        marginBottom: SPACING.lg,
    } as TextStyle,

    // ════════════════════════════════════════════════════════════════
    // ТИП: THEORY
    // ════════════════════════════════════════════════════════════════

    paragraph: {
        ...FONTS.regular,
        color: theme.colors.text,
        lineHeight: 26,
        marginBottom: SPACING.lg,
        fontSize: FONTS.regular.fontSize,
    } as TextStyle,

    /** Advice-блок — синяя левая полоска. */
    adviceBlock: {
        flexDirection: 'row',
        gap: SPACING.md,
        backgroundColor: theme.colors.primarySoft,
        borderTopRightRadius: RADIUS.lg,
        borderBottomRightRadius: RADIUS.lg,
        padding: SPACING.md,
        marginBottom: SPACING.md,
        borderLeftWidth: 3,
        borderLeftColor: theme.colors.primary,
    } as ViewStyle,

    adviceIconWrapper: {
        width: 18,
        height: 18,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        marginTop: SPACING.s2,
    } as ViewStyle,

    adviceText: {
        ...FONTS.regular,
        fontSize: FONTS.sub.fontSize,
        color: theme.colors.primaryDeep,
        flex: 1,
        lineHeight: 20,
    } as TextStyle,

    /** Warning-блок — жёлтая левая полоска. */
    warningBlock: {
        flexDirection: 'row',
        gap: SPACING.md,
        backgroundColor: theme.colors.warningSoft,
        borderTopRightRadius: RADIUS.lg,
        borderBottomRightRadius: RADIUS.lg,
        padding: SPACING.md,
        marginBottom: SPACING.md,
        borderLeftWidth: 3,
        borderLeftColor: theme.colors.warning,
    } as ViewStyle,

    warningIconWrapper: {
        width: 18,
        height: 18,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        marginTop: SPACING.s2,
    } as ViewStyle,

    warningText: {
        ...FONTS.regular,
        fontSize: FONTS.sub.fontSize,
        color: theme.colors.amber900,
        flex: 1,
        lineHeight: 20,
    } as TextStyle,

    // ════════════════════════════════════════════════════════════════
    // ТИП: VIDEO
    // ════════════════════════════════════════════════════════════════

    /** Карточка-плеер. */
    videoPlayer: {
        backgroundColor: theme.colors.darkSurface,
        borderRadius: RADIUS.xl,
        overflow: 'hidden',
        marginBottom: SPACING.md,
    } as ViewStyle,

    videoThumb: {
        height: 180,
        backgroundColor: theme.colors.darkBackground,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    playButton: {
        width: 52,
        height: 52,
        borderRadius: RADIUS.full,
        backgroundColor: theme.colors.whiteAlpha15,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: theme.colors.whiteAlpha25,
    } as ViewStyle,

    playIconWrapper: {
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: SPACING.s2,
    } as ViewStyle,

    videoProgressArea: {
        padding: SPACING.md,
    } as ViewStyle,

    videoProgressTrack: {
        height: 3,
        backgroundColor: theme.colors.whiteAlpha15,
        borderRadius: RADIUS.full,
        overflow: 'hidden',
        marginBottom: SPACING.xs,
    } as ViewStyle,

    videoProgressFill: {
        height: '100%',
        backgroundColor: theme.colors.primary,
        borderRadius: RADIUS.full,
    } as ViewStyle,

    videoTimeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    } as ViewStyle,

    videoTimeText: {
        fontSize: FONTS.xs.fontSize,
        fontFamily: 'Inter_400Regular',
        color: theme.colors.whiteAlpha45,
    } as TextStyle,

    /** Блок комментария к видео. */
    videoComment: {
        backgroundColor: theme.colors.surface,
        borderRadius: RADIUS.lg,
        padding: SPACING.md,
        borderWidth: 0.5,
        borderColor: theme.colors.border,
    } as ViewStyle,

    videoCommentLabel: {
        fontSize: FONTS.xs.fontSize,
        ...FONTS.semibold,
        color: theme.colors.primary,
        letterSpacing: 0.5,
        marginBottom: SPACING.xs,
        textTransform: 'uppercase' as const,
    } as TextStyle,

    videoCommentText: {
        ...FONTS.regular,
        fontSize: FONTS.sub.fontSize,
        color: theme.colors.text,
        lineHeight: 20,
    } as TextStyle,

    videoLink: {
        ...FONTS.regular,
        fontSize: FONTS.small.fontSize,
        color: theme.colors.primary,
        fontWeight: '500' as const,
        marginTop: SPACING.sm,
    } as TextStyle,

    // ════════════════════════════════════════════════════════════════
    // ТИП: QUESTION
    // ════════════════════════════════════════════════════════════════

    /** Карточка-обёртка квиза. */
    quizCard: {
        backgroundColor: theme.colors.surface,
        borderRadius: RADIUS.xl,
        padding: SPACING.lg,
        borderWidth: 0.5,
        borderColor: theme.colors.border,
    } as ViewStyle,

    questionHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: SPACING.md,
        marginBottom: SPACING.lg,
    } as ViewStyle,

    questionIconCircle: {
        width: 34,
        height: 34,
        borderRadius: RADIUS.full,
        backgroundColor: theme.colors.successLight,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    } as ViewStyle,

    questionIconWrapper: {
        width: 16,
        height: 16,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    questionText: {
        ...FONTS.semibold,
        fontSize: FONTS.regular.fontSize,
        color: theme.colors.text,
        flex: 1,
        lineHeight: 22,
        paddingTop: SPACING.xs,
    } as TextStyle,

    answerOption: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.md,
        padding: SPACING.md,
        borderRadius: RADIUS.lg,
        borderWidth: 1.5,
        borderColor: theme.colors.border,
        backgroundColor: theme.colors.surface,
        marginBottom: SPACING.sm,
    } as ViewStyle,

    answerOptionSelected: {
        borderColor: theme.colors.primary,
        backgroundColor: theme.colors.primarySoft,
    } as ViewStyle,

    answerOptionCorrect: {
        borderColor: theme.colors.success,
        backgroundColor: theme.colors.successSoft,
    } as ViewStyle,

    answerOptionWrong: {
        borderColor: theme.colors.error,
        backgroundColor: theme.colors.errorLight,
    } as ViewStyle,

    answerBullet: {
        width: 28,
        height: 28,
        borderRadius: RADIUS.full,
        backgroundColor: theme.colors.background,
        borderWidth: 1.5,
        borderColor: theme.colors.border,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    } as ViewStyle,

    answerBulletSelected: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primary,
    } as ViewStyle,

    answerBulletCorrect: {
        backgroundColor: theme.colors.success,
        borderColor: theme.colors.success,
    } as ViewStyle,

    answerBulletWrong: {
        backgroundColor: theme.colors.error,
        borderColor: theme.colors.error,
    } as ViewStyle,

    answerBulletText: {
        fontSize: FONTS.xs.fontSize,
        fontWeight: '600' as const,
        fontFamily: 'Inter_600SemiBold',
        color: theme.colors.textSecondary,
    } as TextStyle,

    answerBulletTextActive: {
        color: theme.colors.surface,
    } as TextStyle,

    answerOptionText: {
        ...FONTS.regular,
        fontSize: FONTS.sub.fontSize,
        color: theme.colors.text,
        flex: 1,
        lineHeight: 20,
    } as TextStyle,

    answerOptionTextSelected: {
        color: theme.colors.primary,
        fontWeight: '500' as const,
    } as TextStyle,

    answerOptionTextCorrect: {
        color: theme.colors.success,
        fontWeight: '500' as const,
    } as TextStyle,

    answerOptionTextWrong: {
        color: theme.colors.error,
    } as TextStyle,

    answerResultIconWrapper: {
        width: 16,
        height: 16,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    } as ViewStyle,

    checkButton: {
        backgroundColor: theme.colors.primary,
        borderRadius: RADIUS.lg,
        paddingVertical: SPACING.md,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: SPACING.sm,
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    } as ViewStyle,

    checkButtonDisabled: {
        backgroundColor: theme.colors.borderDark,
        shadowOpacity: 0,
        elevation: 0,
        opacity: 0.5,
    } as ViewStyle,

    checkButtonText: {
        ...FONTS.semibold,
        color: theme.colors.surface,
    } as TextStyle,

    resultBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.sm,
        padding: SPACING.md,
        borderRadius: RADIUS.lg,
        marginTop: SPACING.md,
    } as ViewStyle,

    resultBannerCorrect: {
        backgroundColor: theme.colors.successSoft,
        borderWidth: 1,
        borderColor: theme.colors.green200,
    } as ViewStyle,

    resultBannerWrong: {
        backgroundColor: theme.colors.errorLight,
        borderWidth: 1,
        borderColor: theme.colors.errorBorder,
    } as ViewStyle,

    resultBannerIconWrapper: {
        width: 16,
        height: 16,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    resultBannerTextCorrect: {
        ...FONTS.semibold,
        fontSize: FONTS.small.fontSize,
        color: theme.colors.success,
        flex: 1,
    } as TextStyle,

    resultBannerTextWrong: {
        ...FONTS.semibold,
        fontSize: FONTS.small.fontSize,
        color: theme.colors.error,
        flex: 1,
    } as TextStyle,

    // ════════════════════════════════════════════════════════════════
    // ТИП: PICTURE
    // ════════════════════════════════════════════════════════════════

    pictureImageArea: {
        width: '100%',
        borderRadius: RADIUS.xl,
        overflow: 'hidden',
        marginBottom: SPACING.md,
        backgroundColor: theme.colors.indigo100,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 250,
    } as ViewStyle,

    pictureImage: {
        width: '100%',
        height: 250,
        borderRadius: RADIUS.xl,
    } as ImageStyle,

    pictureZoomButton: {
        position: 'absolute',
        bottom: SPACING.md,
        right: SPACING.md,
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.xs,
        backgroundColor: theme.colors.overlay,
        borderRadius: RADIUS.full,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.xs,
    } as ViewStyle,

    pictureZoomIconWrapper: {
        width: 12,
        height: 12,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    pictureZoomText: {
        fontSize: FONTS.xs.fontSize,
        fontFamily: 'Inter_400Regular',
        color: theme.colors.surface,
    } as TextStyle,

    pictureCaption: {
        ...FONTS.regular,
        fontSize: FONTS.small.fontSize,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        lineHeight: 18,
        marginBottom: SPACING.md,
    } as TextStyle,

    /** Оверлей полноэкранного просмотра — через Modal в RN. */
    pictureFullscreenOverlay: {
        flex: 1,
        backgroundColor: theme.colors.black,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    pictureFullscreenClose: {
        position: 'absolute',
        top: SPACING.xl,
        right: SPACING.lg,
        width: 36,
        height: 36,
        borderRadius: RADIUS.full,
        backgroundColor: theme.colors.whiteAlpha15,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    pictureFullscreenCloseIconWrapper: {
        width: 14,
        height: 14,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    // ─── Нижняя навигация ────────────────────────────────────────────
    /** Фиксированная панель «Назад / Далее». */
    bottomNav: {
        flexDirection: 'row',
        gap: SPACING.md,
        paddingHorizontal: SPACING.lg,
        paddingTop: SPACING.md,
        paddingBottom: SPACING.xl,
        backgroundColor: theme.colors.surface,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
        elevation: 8,
    } as ViewStyle,

    prevButton: {
        flex: 1,
        paddingVertical: SPACING.md,
        borderRadius: RADIUS.lg,
        backgroundColor: theme.colors.surface,
        borderWidth: 1.5,
        borderColor: theme.colors.border,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: SPACING.xs,
    } as ViewStyle,

    prevButtonDisabled: {
        flex: 1,
        paddingVertical: SPACING.md,
        borderRadius: RADIUS.lg,
        backgroundColor: theme.colors.surface,
        borderWidth: 1.5,
        borderColor: theme.colors.border,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: SPACING.xs,
        opacity: 0.35,
    } as ViewStyle,

    prevButtonText: {
        ...FONTS.semibold,
        fontSize: FONTS.regular.fontSize,
        color: theme.colors.textSecondary,
    } as TextStyle,

    nextButton: {
        flex: 2,
        paddingVertical: SPACING.md,
        borderRadius: RADIUS.lg,
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: SPACING.xs,
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 6,
    } as ViewStyle,

    nextButtonText: {
        ...FONTS.semibold,
        fontSize: FONTS.regular.fontSize,
        color: theme.colors.surface,
    } as TextStyle,

    finishButton: {
        flex: 2,
        paddingVertical: SPACING.md,
        borderRadius: RADIUS.lg,
        backgroundColor: theme.colors.success,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: SPACING.xs,
        shadowColor: theme.colors.success,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 6,
    } as ViewStyle,

    finishButtonText: {
        ...FONTS.semibold,
        fontSize: FONTS.regular.fontSize,
        color: theme.colors.surface,
    } as TextStyle,

    // ─── Экран завершения ────────────────────────────────────────────
    completeScreen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: SPACING.lg,
        paddingHorizontal: SPACING.xl,
        backgroundColor: theme.colors.background,
    } as ViewStyle,

    completeIcon: {
        width: 72,
        height: 72,
        borderRadius: RADIUS.full,
        backgroundColor: theme.colors.successLight,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    completeIconWrapper: {
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    completeTitle: {
        ...FONTS.h2,
        color: theme.colors.text,
        textAlign: 'center',
    } as TextStyle,

    completeSubtitle: {
        ...FONTS.regular,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        lineHeight: 22,
    } as TextStyle,

    completeButtons: {
        flexDirection: 'row',
        gap: SPACING.md,
        width: '100%',
    } as ViewStyle,

    completeSecondaryButton: {
        flex: 1,
        paddingVertical: SPACING.md,
        borderRadius: RADIUS.lg,
        backgroundColor: theme.colors.surface,
        borderWidth: 1.5,
        borderColor: theme.colors.border,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    completeSecondaryButtonText: {
        ...FONTS.semibold,
        fontSize: FONTS.regular.fontSize,
        color: theme.colors.textSecondary,
    } as TextStyle,

    completePrimaryButton: {
        flex: 1,
        paddingVertical: SPACING.md,
        borderRadius: RADIUS.lg,
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    } as ViewStyle,

    completePrimaryButtonText: {
        ...FONTS.semibold,
        fontSize: FONTS.regular.fontSize,
        color: theme.colors.surface,
    } as TextStyle,
});