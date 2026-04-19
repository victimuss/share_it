import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from './root';

export const lessonEditorStyles = StyleSheet.create({

    // ─── Основа ──────────────────────────────────────────────────────
    /** Корневой контейнер экрана редактора урока. */
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    } as ViewStyle,

    /** ScrollView — весь контент страницы. */
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 100,
    } as ViewStyle,

    // ─── Шапка экрана ────────────────────────────────────────────────
    /** Header с кнопкой назад, заголовком и кнопкой сохранения. */
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

    headerTitle: {
        ...FONTS.semibold,
        color: COLORS.text,
        fontSize: 16,
        marginRight: SPACING.xxl
    } as TextStyle,

    /** Кнопка «Опубликовать» — акцентная, справа в шапке. */
    publishButton: {
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderRadius: RADIUS.lg,
        backgroundColor: COLORS.primary,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    } as ViewStyle,

    publishButtonText: {
        ...FONTS.semibold,
        color: COLORS.surface,
        fontSize: 13,
    } as TextStyle,

    /** Кнопка «Опубликовать» задизейблена (урок не завершён). */
    publishButtonDisabled: {
        backgroundColor: COLORS.borderDark,
        shadowOpacity: 0,
        elevation: 0,
        opacity: 0.5,
    } as ViewStyle,

    // ════════════════════════════════════════════════════════════════
    // БЛОК ПАГИНАЦИИ СТРАНИЦ
    // ════════════════════════════════════════════════════════════════

    /** Контейнер блока пагинации страниц урока.
     *  Горизонтальный скролл — страниц может быть много. */
    pagesBar: {
        backgroundColor: COLORS.surface,
        width: '100%',
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
        paddingVertical: SPACING.md,
        flexDirection: 'column',
    } as ViewStyle,

    /** Внутренний контент скролла пагинации. */
    pagesScrollContent: {
        paddingHorizontal: SPACING.lg,
        alignItems: 'center',
        gap: SPACING.sm,
        flexDirection: 'row',
    } as ViewStyle,

    /** Одна кнопка-страница (цифра).
     *  Квадратная, скруглённая — вписывается в ряд. */
    pageTab: {
        width: 32,
        height: 32,
        borderRadius: RADIUS.md,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.background,
        borderWidth: 1.5,
        borderColor: COLORS.border,
    } as ViewStyle,

    /** Активная (редактируемая) страница — заливка primary. */
    pageTabActive: {
        width: 32,
        height: 32,
        borderRadius: RADIUS.md,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 4,
    } as ViewStyle,

    /** Заполненная (сохранённая) страница — лёгкий фиолетовый фон. */
    pageTabDone: {
        backgroundColor: '#EEF2FF',
        borderColor: '#C7D2FE',
    } as ViewStyle,

    pageTabText: {
        fontSize: 13,
        fontWeight: '500' as const,
        fontFamily: 'Inter_500Medium',
        color: COLORS.textSecondary,
    } as TextStyle,

    pageTabTextActive: {
        color: COLORS.surface,
        fontWeight: '600' as const,
    } as TextStyle,

    pageTabTextDone: {
        color: COLORS.primary,
        fontWeight: '600' as const,
    } as TextStyle,

    /** Разделитель между номерами страниц и счётчиком. */
    pagesDivider: {
        width: 1,
        height: 25,
        backgroundColor: COLORS.border,
        marginHorizontal: SPACING.xs,
    } as ViewStyle,

    /** Счётчик «N / 15» справа от разделителя. */
    pagesCounter: {
        ...FONTS.regular,
        fontSize: 12,
        color: COLORS.textSecondary,
        minWidth: 32,
    } as TextStyle,

    /** Подсветка числа в счётчике. */
    pagesCounterBold: {
        ...FONTS.regular,
        fontSize: 12,
        fontWeight: '800' as const,
        color: COLORS.text,
    } as TextStyle,

    /** Кнопка «+» добавления новой страницы. */
    addPageButton: {
        width: 32,
        height: 32,
        borderRadius: RADIUS.md,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.surface,
        borderWidth: 1.5,
        borderColor: COLORS.primary,
    } as ViewStyle,

    /** Кнопка «+» задизейблена при достижении лимита 15 страниц. */
    addPageButtonDisabled: {
        borderColor: COLORS.border,
        backgroundColor: COLORS.background,
        opacity: 0.4,
    } as ViewStyle,

    addPageButtonText: {
        fontSize: 18,
        fontWeight: '400' as const,
        color: COLORS.primary,
        lineHeight: 22,
        marginTop: -1,
    } as TextStyle,

    addPageButtonTextDisabled: {
        color: COLORS.textLight,
    } as TextStyle,

    // ════════════════════════════════════════════════════════════════
    // БЛОК КОНТЕНТА СТРАНИЦЫ
    // ════════════════════════════════════════════════════════════════

    /** Обёртка всего контента страницы под пагинацией. */
    pageContent: {
        padding: SPACING.lg,
    } as ViewStyle,

    // ─── Универсальные поля ──────────────────────────────────────────
    /** Обёртка одного поля с лейблом и вспомогательными элементами. */
    fieldGroup: {
        marginBottom: SPACING.lg,
    } as ViewStyle,

    /** Строка: лейбл слева + счётчик символов справа. */
    fieldHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.sm,
    } as ViewStyle,

    /** Лейбл поля. */
    fieldLabel: {
        ...FONTS.medium,
        fontSize: 14,
        color: COLORS.text,
    } as TextStyle,

    /** Счётчик символов — нейтральный. */
    charCount: {
        fontSize: 11,
        fontFamily: 'Inter_400Regular',
        color: COLORS.textSecondary,
    } as TextStyle,

    /** Счётчик символов — предупреждение (близко к лимиту). */
    charCountWarn: {
        color: COLORS.warning,
    } as TextStyle,

    /** Счётчик символов — достигнут лимит. */
    charCountLimit: {
        color: COLORS.error,
        fontWeight: '600' as const,
    } as TextStyle,

    /** Базовое поле ввода — однострочное. */
    input: {
        backgroundColor: COLORS.background,
        borderWidth: 1.5,
        borderColor: COLORS.border,
        borderRadius: RADIUS.lg,
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
        marginBottom: SPACING.lg,
        ...FONTS.regular,
        color: COLORS.text,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
        elevation: 2,
    } as TextStyle,

    inputFocused: {
        borderColor: COLORS.primary,
        shadowColor: COLORS.primary,
        shadowOpacity: 0.1,
    } as TextStyle,

    /** Многострочное поле (textarea).
     *  textAlignVertical: top — курсор в начале, не по центру. */
    textArea: {
        backgroundColor: COLORS.background,
        borderWidth: 1.5,
        borderColor: COLORS.border,
        borderRadius: RADIUS.lg,
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
        ...FONTS.regular,
        color: COLORS.text,
        textAlignVertical: 'top',
        minHeight: 120,
        lineHeight: 22,
        marginBottom: SPACING.lg
    } as TextStyle,

    textAreaFocused: {
        borderColor: COLORS.primary,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    } as TextStyle,

    // ─── Выпадающий выбор типа страницы ─────────────────────────────
    /** Кнопка-дропдаун выбора типа (Theory / Video / Question / Picture).
     *  Выглядит как input, но с иконкой шеврона справа. */
    typeSelector: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.background,
        borderWidth: 1.5,
        borderColor: COLORS.border,
        borderRadius: RADIUS.lg,
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
        elevation: 2,
    } as ViewStyle,

    typeSelectorOpen: {
        borderColor: COLORS.primary,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    } as ViewStyle,

    /** Цветной бейдж выбранного типа внутри дропдауна. */
    typeSelectedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.xs,
    } as ViewStyle,

    typeSelectorText: {
        ...FONTS.regular,
        color: COLORS.textSecondary,
    } as TextStyle,

    typeSelectorTextSelected: {
        color: COLORS.text,
        fontWeight: '500' as const,
    } as TextStyle,

    /** View-обёртка под иконку шеврона. */
    chevronWrapper: {
        width: 16,
        height: 16,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    /** Список опций дропдауна — прикреплён к нижней кромке селектора. */
    typeDropdown: {
        backgroundColor: COLORS.surface,
        borderWidth: 1.5,
        borderColor: COLORS.primary,
        borderTopWidth: 0,
        borderBottomLeftRadius: RADIUS.lg,
        borderBottomRightRadius: RADIUS.lg,
        overflow: 'hidden',
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
        elevation: 8,
        marginBottom: SPACING.lg,
    } as ViewStyle,

    /** Одна опция в дропдауне. */
    typeOption: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.md,
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    } as ViewStyle,

    typeOptionActive: {
        backgroundColor: '#EEF2FF',
    } as ViewStyle,

    /** Иконка-кружок типа в опции дропдауна. */
    typeOptionDot: {
        width: 32,
        height: 32,
        borderRadius: RADIUS.full,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.successLight,
    } as ViewStyle,

    typeOptionTitle: {
        ...FONTS.medium,
        fontSize: 14,
        color: COLORS.text,
    } as TextStyle,

    typeOptionSubtitle: {
        ...FONTS.regular,
        fontSize: 12,
        color: COLORS.textSecondary,
    } as TextStyle,

    // ─── Тип Theory — Advice / Warning блоки ────────────────────────
    /** Обёртка опциональных блоков advice / warning.
     *  Два блока идут в ряд — flex row, равная ширина. */
    calloutRow: {
        flexDirection: 'row',
        gap: SPACING.md,
        marginBottom: SPACING.lg,
    } as ViewStyle,

    /** Карточка одного callout-блока (Advice или Warning).
     *  Нажатие раскрывает поле ввода внутри. */
    calloutCard: {
        flex: 1,
        borderRadius: RADIUS.lg,
        borderWidth: 1.5,
        padding: SPACING.md,
    } as ViewStyle,

    calloutCardAdvice: {
        flex: 1,
        borderRadius: RADIUS.lg,
        borderWidth: 1.5,
        padding: SPACING.md,
        borderColor: '#C7D2FE',
        backgroundColor: '#EEF2FF',
    } as ViewStyle,

    calloutCardWarning: {
        flex: 1,
        borderRadius: RADIUS.lg,
        borderWidth: 1.5,
        padding: SPACING.md,
        borderColor: '#FCD34D',
        backgroundColor: '#FFFBEB',
    } as ViewStyle,

    /** Строка: иконка + заголовок + toggle. */
    calloutHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.xs,
        marginBottom: SPACING.sm,
    } as ViewStyle,

    calloutTitle: {
        flex: 1,
        fontSize: 12,
        fontWeight: '600' as const,
        fontFamily: 'Inter_600SemiBold',
    } as TextStyle,

    calloutTitleAdvice: {
        flex: 1,
        fontSize: 12,
        fontWeight: '600' as const,
        fontFamily: 'Inter_600SemiBold',
        color: COLORS.primary,
    } as TextStyle,

    calloutTitleWarning: {
        flex: 1,
        fontSize: 12,
        fontWeight: '600' as const,
        fontFamily: 'Inter_600SemiBold',
        color: COLORS.warning,
    } as TextStyle,

    /** Поле ввода внутри callout-карточки — без фона, вписанное. */
    calloutInput: {
        fontSize: 12,
        fontFamily: 'Inter_400Regular',
        color: COLORS.text,
        lineHeight: 18,
        textAlignVertical: 'top',
        minHeight: 48,
        padding: 0,
    } as TextStyle,

    // ─── Тип Video ───────────────────────────────────────────────────
    /** Карточка-превью видео после ввода ссылки. */
    videoPreview: {
        backgroundColor: '#1E1E2E',
        borderRadius: RADIUS.lg,
        overflow: 'hidden',
        marginBottom: SPACING.lg,
    } as ViewStyle,

    videoThumb: {
        height: 160,
        backgroundColor: '#2D2D3F',
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    /** Кнопка-плей поверх превью. */
    playButton: {
        width: 48,
        height: 48,
        borderRadius: RADIUS.full,
        backgroundColor: 'rgba(255,255,255,0.15)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.3)',
    } as ViewStyle,

    /** View-обёртка под иконку плей — добавишь сам. */
    playIconWrapper: {
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 2,
    } as ViewStyle,

    videoMeta: {
        padding: SPACING.md,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    } as ViewStyle,

    videoUrl: {
        fontSize: 11,
        fontFamily: 'Inter_400Regular',
        color: 'rgba(255,255,255,0.5)',
        flex: 1,
    } as TextStyle,

    // ─── Тип Question ────────────────────────────────────────────────
    /** Обёртка одного варианта ответа. */
    answerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.sm,
        marginBottom: SPACING.sm,
    } as ViewStyle,

    /** Чекбокс «правильный ответ». */
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: RADIUS.sm,
        borderWidth: 2,
        borderColor: COLORS.border,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        backgroundColor: COLORS.surface,
    } as ViewStyle,

    checkboxActive: {
        borderColor: COLORS.success,
        backgroundColor: COLORS.success,
    } as ViewStyle,

    /** View-обёртка под иконку галочки — добавишь сам. */
    checkIconWrapper: {
        width: 12,
        height: 12,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    /** Поле ввода варианта ответа — рядом с чекбоксом. */
    answerInput: {
        flex: 1,
        backgroundColor: COLORS.background,
        borderWidth: 1.5,
        borderColor: COLORS.border,
        borderRadius: RADIUS.md,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
        color: COLORS.text,
    } as TextStyle,

    /** Поле ввода ответа — отмечен как правильный. */
    answerInputCorrect: {
        borderColor: COLORS.success,
        backgroundColor: '#F0FDF4',
    } as TextStyle,

    /** Кнопка «+ Добавить вариант» под ответами. */
    addAnswerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.xs,
        paddingVertical: SPACING.sm,
        marginTop: SPACING.xs,
    } as ViewStyle,

    addAnswerText: {
        ...FONTS.regular,
        fontSize: 13,
        color: COLORS.primary,
        fontWeight: '500' as const,
    } as TextStyle,

    // ─── Тип Picture ─────────────────────────────────────────────────
    /** Зона загрузки фото — пунктирная рамка, центрированный контент. */
    pictureUploadZone: {
        borderWidth: 2,
        borderColor: COLORS.borderDark,
        borderStyle: 'dashed',
        borderRadius: RADIUS.xl,
        height: 180,
        alignItems: 'center',
        justifyContent: 'center',
        gap: SPACING.sm,
        backgroundColor: COLORS.background,
        marginBottom: SPACING.lg,
    } as ViewStyle,

    pictureUploadZoneActive: {
        borderColor: COLORS.primary,
        backgroundColor: '#EEF2FF',
    } as ViewStyle,

    /** Круглая иконка загрузки в центре зоны. */
    uploadIconCircle: {
        width: 52,
        height: 52,
        borderRadius: RADIUS.full,
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.border,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: SPACING.xs,
    } as ViewStyle,

    /** View-обёртка под иконку загрузки — добавишь сам. */
    uploadIconWrapper: {
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    uploadHint: {
        ...FONTS.regular,
        fontSize: 11,
        color: COLORS.textSecondary,
        textAlign: 'center',
    } as TextStyle,

    uploadHintAccent: {
        color: COLORS.primary,
        fontWeight: '500' as const,
    } as TextStyle,

    /** Превью загруженного фото — заменяет зону загрузки. */
    picturePreview: {
        borderRadius: RADIUS.xl,
        overflow: 'hidden',
        height: 180,
        marginBottom: SPACING.lg,
        position: 'relative',
    } as ViewStyle,

    picturePreviewImage: {
        width: '100%',
        height: '100%',
    } as ViewStyle,

    /** Кнопка замены фото поверх превью. */
    pictureReplaceButton: {
        position: 'absolute',
        top: SPACING.sm,
        right: SPACING.sm,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: RADIUS.full,
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.xs,
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.xs,
    } as ViewStyle,

    pictureReplaceText: {
        fontSize: 11,
        fontFamily: 'Inter_400Regular',
        color: COLORS.surface,
    } as TextStyle,

    // ─── Фиксированный футер ─────────────────────────────────────────
    /** Нижняя панель с кнопками «Сохранить страницу» и «Удалить».
     *  Фиксирована — всегда видна при скролле контента. */
    bottomBar: {
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

    /** Кнопка удаления текущей страницы. */
    deletePageButton: {
        width: 44,
        height: 44,
        borderRadius: RADIUS.lg,
        backgroundColor: COLORS.errorLight,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#FECACA',
        flexShrink: 0,
    } as ViewStyle,

    savePageButtonDisabled: {
        flex: 1,
        paddingVertical: SPACING.md,
        borderRadius: RADIUS.lg,
        backgroundColor: COLORS.border,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: COLORS.border,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 6,
    } as ViewStyle,

    /** View-обёртка под иконку удаления — добавишь сам. */
    deleteIconWrapper: {
        width: 18,
        height: 18,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    /** Кнопка «Сохранить страницу». */
    savePageButton: {
        flex: 1,
        paddingVertical: SPACING.md,
        borderRadius: RADIUS.lg,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 6,
    } as ViewStyle,

    savePageButtonText: {
        ...FONTS.semibold,
        color: COLORS.surface,
    } as TextStyle,
});