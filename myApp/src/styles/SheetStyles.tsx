import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from './root';

export const lessonSwipeViewStyles = StyleSheet.create({

    // ─── Основа ──────────────────────────────────────────────────────
    /** Корневой контейнер экрана. */
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
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
        backgroundColor: COLORS.surface,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    } as ViewStyle,

    backButton: {
        width: 32,
        height: 32,
        borderRadius: RADIUS.full,
        backgroundColor: COLORS.background,
        borderWidth: 0.5,
        borderColor: COLORS.border,
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
        fontSize: 14,
        color: COLORS.text,
        flex: 1,
        textAlign: 'center',
        marginHorizontal: SPACING.sm,
    } as TextStyle,

    bookmarkButton: {
        width: 32,
        height: 32,
        borderRadius: RADIUS.full,
        backgroundColor: COLORS.background,
        borderWidth: 0.5,
        borderColor: COLORS.border,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    } as ViewStyle,

    bookmarkButtonActive: {
        backgroundColor: '#EEF2FF',
        borderColor: '#C7D2FE',
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
        backgroundColor: COLORS.surface,
        paddingHorizontal: SPACING.lg,
        paddingTop: SPACING.md,
        paddingBottom: SPACING.sm,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
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
        backgroundColor: COLORS.border,
    } as ViewStyle,

    /** Пройденный сегмент. */
    segmentDone: {
        flex: 1,
        height: 4,
        borderRadius: RADIUS.full,
        backgroundColor: COLORS.primary,
    } as ViewStyle,

    /** Текущий сегмент. */
    segmentCurrent: {
        backgroundColor: COLORS.primaryLight,
    } as ViewStyle,

    /** Строка подписей под сегментами. */
    progressLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    } as ViewStyle,

    progressLabelLeft: {
        ...FONTS.regular,
        fontSize: 11,
        color: COLORS.textSecondary,
    } as TextStyle,

    progressLabelRight: {
        ...FONTS.regular,
        fontSize: 11,
        color: COLORS.primary,
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
        backgroundColor: COLORS.background,
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
        paddingVertical: 3,
        borderRadius: RADIUS.sm,
    } as ViewStyle,

    typeBadgeTheory: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.xs,
        paddingHorizontal: SPACING.sm,
        paddingVertical: 3,
        borderRadius: RADIUS.xl,
        backgroundColor: '#EEF2FF',
    } as ViewStyle,

    typeBadgeVideo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.xs,
        paddingHorizontal: SPACING.sm,
        paddingVertical: 3,
        borderRadius: RADIUS.xl,
        backgroundColor: '#FEE2E2',
    } as ViewStyle,

    typeBadgeQuestion: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.xs,
        paddingHorizontal: SPACING.sm,
        paddingVertical: 3,
        borderRadius: RADIUS.xl,
        backgroundColor: '#D1FAE5',
    } as ViewStyle,

    typeBadgePicture: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.xs,
        paddingHorizontal: SPACING.sm,
        paddingVertical: 3,
        borderRadius: RADIUS.xl,
        backgroundColor: '#FEF3C7',
    } as ViewStyle,

    typeBadgeText: {
        ...FONTS.medium,
        fontSize: 13,
    } as TextStyle,

    typeBadgeTextTheory: { color: COLORS.primary } as TextStyle,
    typeBadgeTextVideo: { color: COLORS.error } as TextStyle,
    typeBadgeTextQuestion: { color: COLORS.success } as TextStyle,
    typeBadgeTextPicture: { color: COLORS.warning } as TextStyle,

    // ─── Заголовок страницы ──────────────────────────────────────────
    pageTitle: {
        ...FONTS.h2,
        color: COLORS.text,
        marginBottom: SPACING.lg,
    } as TextStyle,

    // ════════════════════════════════════════════════════════════════
    // ТИП: THEORY
    // ════════════════════════════════════════════════════════════════

    paragraph: {
        ...FONTS.regular,
        color: COLORS.text,
        lineHeight: 26,
        marginBottom: SPACING.lg,
        fontSize: 14,
    } as TextStyle,

    /** Advice-блок — синяя левая полоска. */
    adviceBlock: {
        flexDirection: 'row',
        gap: SPACING.md,
        backgroundColor: '#EEF2FF',
        borderTopRightRadius: RADIUS.lg,
        borderBottomRightRadius: RADIUS.lg,
        padding: SPACING.md,
        marginBottom: SPACING.md,
        borderLeftWidth: 3,
        borderLeftColor: COLORS.primary,
    } as ViewStyle,

    adviceIconWrapper: {
        width: 18,
        height: 18,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        marginTop: 2,
    } as ViewStyle,

    adviceText: {
        ...FONTS.regular,
        fontSize: 13,
        color: '#3730A3',
        flex: 1,
        lineHeight: 20,
    } as TextStyle,

    /** Warning-блок — жёлтая левая полоска. */
    warningBlock: {
        flexDirection: 'row',
        gap: SPACING.md,
        backgroundColor: '#FFFBEB',
        borderTopRightRadius: RADIUS.lg,
        borderBottomRightRadius: RADIUS.lg,
        padding: SPACING.md,
        marginBottom: SPACING.md,
        borderLeftWidth: 3,
        borderLeftColor: COLORS.warning,
    } as ViewStyle,

    warningIconWrapper: {
        width: 18,
        height: 18,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        marginTop: 2,
    } as ViewStyle,

    warningText: {
        ...FONTS.regular,
        fontSize: 13,
        color: '#92400E',
        flex: 1,
        lineHeight: 20,
    } as TextStyle,

    // ════════════════════════════════════════════════════════════════
    // ТИП: VIDEO
    // ════════════════════════════════════════════════════════════════

    /** Карточка-плеер. */
    videoPlayer: {
        backgroundColor: '#1E1E2E',
        borderRadius: RADIUS.xl,
        overflow: 'hidden',
        marginBottom: SPACING.md,
    } as ViewStyle,

    videoThumb: {
        height: 180,
        backgroundColor: '#12121C',
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    playButton: {
        width: 52,
        height: 52,
        borderRadius: RADIUS.full,
        backgroundColor: 'rgba(255,255,255,0.15)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.25)',
    } as ViewStyle,

    playIconWrapper: {
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 2,
    } as ViewStyle,

    videoProgressArea: {
        padding: SPACING.md,
    } as ViewStyle,

    videoProgressTrack: {
        height: 3,
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderRadius: RADIUS.full,
        overflow: 'hidden',
        marginBottom: SPACING.xs,
    } as ViewStyle,

    videoProgressFill: {
        height: '100%',
        backgroundColor: COLORS.primary,
        borderRadius: RADIUS.full,
    } as ViewStyle,

    videoTimeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    } as ViewStyle,

    videoTimeText: {
        fontSize: 11,
        fontFamily: 'Inter_400Regular',
        color: 'rgba(255,255,255,0.45)',
    } as TextStyle,

    /** Блок комментария к видео. */
    videoComment: {
        backgroundColor: COLORS.surface,
        borderRadius: RADIUS.lg,
        padding: SPACING.md,
        borderWidth: 0.5,
        borderColor: COLORS.border,
    } as ViewStyle,

    videoCommentLabel: {
        fontSize: 10,
        fontFamily: 'Inter_400Regular',
        color: COLORS.textSecondary,
        fontWeight: '600' as const,
        letterSpacing: 0.4,
        marginBottom: SPACING.xs,
    } as TextStyle,

    videoCommentText: {
        ...FONTS.regular,
        fontSize: 13,
        color: COLORS.text,
        lineHeight: 20,
    } as TextStyle,

    videoLink: {
        ...FONTS.regular,
        fontSize: 12,
        color: COLORS.primary,
        fontWeight: '500' as const,
        marginTop: SPACING.sm,
    } as TextStyle,

    // ════════════════════════════════════════════════════════════════
    // ТИП: QUESTION
    // ════════════════════════════════════════════════════════════════

    /** Карточка-обёртка квиза. */
    quizCard: {
        backgroundColor: COLORS.surface,
        borderRadius: RADIUS.xl,
        padding: SPACING.lg,
        borderWidth: 0.5,
        borderColor: COLORS.border,
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
        backgroundColor: '#D1FAE5',
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
        fontSize: 14,
        color: COLORS.text,
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
        borderColor: COLORS.border,
        backgroundColor: COLORS.surface,
        marginBottom: SPACING.sm,
    } as ViewStyle,

    answerOptionSelected: {
        borderColor: COLORS.primary,
        backgroundColor: '#EEF2FF',
    } as ViewStyle,

    answerOptionCorrect: {
        borderColor: COLORS.success,
        backgroundColor: '#F0FDF4',
    } as ViewStyle,

    answerOptionWrong: {
        borderColor: COLORS.error,
        backgroundColor: COLORS.errorLight,
    } as ViewStyle,

    answerBullet: {
        width: 28,
        height: 28,
        borderRadius: RADIUS.full,
        backgroundColor: COLORS.background,
        borderWidth: 1.5,
        borderColor: COLORS.border,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    } as ViewStyle,

    answerBulletSelected: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    } as ViewStyle,

    answerBulletCorrect: {
        backgroundColor: COLORS.success,
        borderColor: COLORS.success,
    } as ViewStyle,

    answerBulletWrong: {
        backgroundColor: COLORS.error,
        borderColor: COLORS.error,
    } as ViewStyle,

    answerBulletText: {
        fontSize: 11,
        fontWeight: '600' as const,
        fontFamily: 'Inter_600SemiBold',
        color: COLORS.textSecondary,
    } as TextStyle,

    answerBulletTextActive: {
        color: COLORS.surface,
    } as TextStyle,

    answerOptionText: {
        ...FONTS.regular,
        fontSize: 13,
        color: COLORS.text,
        flex: 1,
        lineHeight: 20,
    } as TextStyle,

    answerOptionTextSelected: {
        color: COLORS.primary,
        fontWeight: '500' as const,
    } as TextStyle,

    answerOptionTextCorrect: {
        color: COLORS.success,
        fontWeight: '500' as const,
    } as TextStyle,

    answerOptionTextWrong: {
        color: COLORS.error,
    } as TextStyle,

    answerResultIconWrapper: {
        width: 16,
        height: 16,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    } as ViewStyle,

    checkButton: {
        backgroundColor: COLORS.primary,
        borderRadius: RADIUS.lg,
        paddingVertical: SPACING.md,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: SPACING.sm,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    } as ViewStyle,

    checkButtonDisabled: {
        backgroundColor: COLORS.borderDark,
        shadowOpacity: 0,
        elevation: 0,
        opacity: 0.5,
    } as ViewStyle,

    checkButtonText: {
        ...FONTS.semibold,
        color: COLORS.surface,
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
        backgroundColor: '#F0FDF4',
        borderWidth: 1,
        borderColor: '#BBF7D0',
    } as ViewStyle,

    resultBannerWrong: {
        backgroundColor: COLORS.errorLight,
        borderWidth: 1,
        borderColor: '#FECACA',
    } as ViewStyle,

    resultBannerIconWrapper: {
        width: 16,
        height: 16,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    resultBannerTextCorrect: {
        ...FONTS.semibold,
        fontSize: 12,
        color: COLORS.success,
        flex: 1,
    } as TextStyle,

    resultBannerTextWrong: {
        ...FONTS.semibold,
        fontSize: 12,
        color: COLORS.error,
        flex: 1,
    } as TextStyle,

    // ════════════════════════════════════════════════════════════════
    // ТИП: PICTURE
    // ════════════════════════════════════════════════════════════════

    pictureImageArea: {
        borderRadius: RADIUS.xl,
        overflow: 'hidden',
        marginBottom: SPACING.md,
        backgroundColor: '#E0E7FF',
        alignItems: 'center',
        justifyContent: 'center',
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
        backgroundColor: 'rgba(0,0,0,0.45)',
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
        fontSize: 11,
        fontFamily: 'Inter_400Regular',
        color: COLORS.surface,
    } as TextStyle,

    pictureCaption: {
        ...FONTS.regular,
        fontSize: 12,
        color: COLORS.textSecondary,
        textAlign: 'center',
        lineHeight: 18,
        marginBottom: SPACING.md,
    } as TextStyle,

    /** Оверлей полноэкранного просмотра — через Modal в RN. */
    pictureFullscreenOverlay: {
        flex: 1,
        backgroundColor: '#000',
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
        backgroundColor: 'rgba(255,255,255,0.15)',
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
        backgroundColor: COLORS.surface,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
        elevation: 8,
    } as ViewStyle,

    prevButton: {
        flex: 1,
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

    prevButtonDisabled: {
        flex: 1,
        paddingVertical: SPACING.md,
        borderRadius: RADIUS.lg,
        backgroundColor: COLORS.surface,
        borderWidth: 1.5,
        borderColor: COLORS.border,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: SPACING.xs,
        opacity: 0.35,
    } as ViewStyle,

    prevButtonText: {
        ...FONTS.semibold,
        fontSize: 14,
        color: COLORS.textSecondary,
    } as TextStyle,

    nextButton: {
        flex: 2,
        paddingVertical: SPACING.md,
        borderRadius: RADIUS.lg,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: SPACING.xs,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 6,
    } as ViewStyle,

    nextButtonText: {
        ...FONTS.semibold,
        fontSize: 14,
        color: COLORS.surface,
    } as TextStyle,

    finishButton: {
        flex: 2,
        paddingVertical: SPACING.md,
        borderRadius: RADIUS.lg,
        backgroundColor: COLORS.success,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: SPACING.xs,
        shadowColor: COLORS.success,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 6,
    } as ViewStyle,

    finishButtonText: {
        ...FONTS.semibold,
        fontSize: 14,
        color: COLORS.surface,
    } as TextStyle,

    // ─── Экран завершения ────────────────────────────────────────────
    completeScreen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: SPACING.lg,
        paddingHorizontal: SPACING.xl,
        backgroundColor: COLORS.background,
    } as ViewStyle,

    completeIcon: {
        width: 72,
        height: 72,
        borderRadius: RADIUS.full,
        backgroundColor: '#D1FAE5',
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
        color: COLORS.text,
        textAlign: 'center',
    } as TextStyle,

    completeSubtitle: {
        ...FONTS.regular,
        color: COLORS.textSecondary,
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
        backgroundColor: COLORS.surface,
        borderWidth: 1.5,
        borderColor: COLORS.border,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    completeSecondaryButtonText: {
        ...FONTS.semibold,
        fontSize: 14,
        color: COLORS.textSecondary,
    } as TextStyle,

    completePrimaryButton: {
        flex: 1,
        paddingVertical: SPACING.md,
        borderRadius: RADIUS.lg,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    } as ViewStyle,

    completePrimaryButtonText: {
        ...FONTS.semibold,
        fontSize: 14,
        color: COLORS.surface,
    } as TextStyle,
});