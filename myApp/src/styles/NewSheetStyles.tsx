import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Theme, FONTS, SPACING, RADIUS } from './root';

export const lessonEditorStyles = (theme: Theme) => StyleSheet.create({

    // ─── Основа ──────────────────────────────────────────────────────
    /** Корневой контейнер экрана редактора урока. */
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    } as ViewStyle,

    /** ScrollView — весь контент страницы. */
    scrollContent: {
        flexGrow: 1,
        paddingBottom: SPACING.s100,
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
        backgroundColor: theme.colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    } as ViewStyle,

    headerTitle: {
        ...FONTS.semibold,
        color: theme.colors.text,
        fontSize: FONTS.medium.fontSize,
        marginRight: SPACING.xxl
    } as TextStyle,

    /** Кнопка «Опубликовать» — акцентная, справа в шапке. */
    publishButton: {
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderRadius: RADIUS.lg,
        backgroundColor: theme.colors.primary,
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    } as ViewStyle,

    publishButtonText: {
        ...FONTS.semibold,
        color: theme.colors.surface,
        fontSize: FONTS.sub.fontSize,
    } as TextStyle,

    /** Кнопка «Опубликовать» задизейблена (урок не завершён). */
    publishButtonDisabled: {
        backgroundColor: theme.colors.borderDark,
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
        backgroundColor: theme.colors.surface,
        width: '100%',
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
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
        backgroundColor: theme.colors.background,
        borderWidth: 1.5,
        borderColor: theme.colors.border,
    } as ViewStyle,

    /** Активная (редактируемая) страница — заливка primary. */
    pageTabActive: {
        width: 32,
        height: 32,
        borderRadius: RADIUS.md,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primary,
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 4,
    } as ViewStyle,

    /** Заполненная (сохранённая) страница — лёгкий фиолетовый фон. */
    pageTabDone: {
        backgroundColor: theme.colors.primarySoft,
        borderColor: theme.colors.indigoBorder,
    } as ViewStyle,

    pageTabText: {
        fontSize: FONTS.sub.fontSize,
        fontWeight: '500' as const,
        fontFamily: 'Inter_500Medium',
        color: theme.colors.textSecondary,
    } as TextStyle,

    pageTabTextActive: {
        color: theme.colors.surface,
        fontWeight: '600' as const,
    } as TextStyle,

    pageTabTextDone: {
        color: theme.colors.primary,
        fontWeight: '600' as const,
    } as TextStyle,

    /** Разделитель между номерами страниц и счётчиком. */
    pagesDivider: {
        width: 1,
        height: 25,
        backgroundColor: theme.colors.border,
        marginHorizontal: SPACING.xs,
    } as ViewStyle,

    /** Счётчик «N / 15» справа от разделителя. */
    pagesCounter: {
        ...FONTS.regular,
        fontSize: FONTS.small.fontSize,
        color: theme.colors.textSecondary,
        minWidth: 32,
    } as TextStyle,

    /** Подсветка числа в счётчике. */
    pagesCounterBold: {
        ...FONTS.regular,
        fontSize: FONTS.small.fontSize,
        fontWeight: '800' as const,
        color: theme.colors.text,
    } as TextStyle,

    /** Кнопка «+» добавления новой страницы. */
    addPageButton: {
        width: 32,
        height: 32,
        borderRadius: RADIUS.md,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.surface,
        borderWidth: 1.5,
        borderColor: theme.colors.primary,
    } as ViewStyle,

    /** Кнопка «+» задизейблена при достижении лимита 15 страниц. */
    addPageButtonDisabled: {
        borderColor: theme.colors.border,
        backgroundColor: theme.colors.background,
        opacity: 0.4,
    } as ViewStyle,

    addPageButtonText: {
        fontSize: FONTS.bold.fontSize,
        fontWeight: '400' as const,
        color: theme.colors.primary,
        lineHeight: 22,
        marginTop: -1,
    } as TextStyle,

    addPageButtonTextDisabled: {
        color: theme.colors.textLight,
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
        fontSize: FONTS.regular.fontSize,
        color: theme.colors.text,
    } as TextStyle,

    /** Счётчик символов — нейтральный. */
    charCount: {
        fontSize: FONTS.xs.fontSize,
        fontFamily: 'Inter_400Regular',
        color: theme.colors.textSecondary,
    } as TextStyle,

    /** Счётчик символов — предупреждение (близко к лимиту). */
    charCountWarn: {
        color: theme.colors.warning,
    } as TextStyle,

    /** Счётчик символов — достигнут лимит. */
    charCountLimit: {
        color: theme.colors.error,
        fontWeight: '600' as const,
    } as TextStyle,

    /** Базовое поле ввода — однострочное. */
    input: {
        backgroundColor: theme.colors.background,
        borderWidth: 1.5,
        borderColor: theme.colors.border,
        borderRadius: RADIUS.lg,
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
        marginBottom: SPACING.lg,
        ...FONTS.regular,
        color: theme.colors.text,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
        elevation: 2,
    } as TextStyle,

    inputFocused: {
        borderColor: theme.colors.primary,
        shadowColor: theme.colors.primary,
        shadowOpacity: 0.1,
    } as TextStyle,

    /** Многострочное поле (textarea).
     *  textAlignVertical: top — курсор в начале, не по центру. */
    textArea: {
        backgroundColor: theme.colors.background,
        borderWidth: 1.5,
        borderColor: theme.colors.border,
        borderRadius: RADIUS.lg,
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
        ...FONTS.regular,
        color: theme.colors.text,
        textAlignVertical: 'top',
        minHeight: 120,
        lineHeight: 22,
        marginBottom: SPACING.lg
    } as TextStyle,

    textAreaFocused: {
        borderColor: theme.colors.primary,
        shadowColor: theme.colors.primary,
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
        backgroundColor: theme.colors.background,
        borderWidth: 1.5,
        borderColor: theme.colors.border,
        borderRadius: RADIUS.lg,
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
        elevation: 2,
    } as ViewStyle,

    typeSelectorOpen: {
        borderColor: theme.colors.primary,
        borderBottomLeftRadius: RADIUS.none,
        borderBottomRightRadius: RADIUS.none,
    } as ViewStyle,

    /** Цветной бейдж выбранного типа внутри дропдауна. */
    typeSelectedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.xs,
    } as ViewStyle,

    typeSelectorText: {
        ...FONTS.regular,
        color: theme.colors.textSecondary,
    } as TextStyle,

    typeSelectorTextSelected: {
        color: theme.colors.text,
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
        backgroundColor: theme.colors.surface,
        borderWidth: 1.5,
        borderColor: theme.colors.primary,
        borderTopWidth: 0,
        borderBottomLeftRadius: RADIUS.lg,
        borderBottomRightRadius: RADIUS.lg,
        overflow: 'hidden',
        shadowColor: theme.colors.shadow,
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
        borderTopColor: theme.colors.border,
    } as ViewStyle,

    typeOptionActive: {
        backgroundColor: theme.colors.primarySoft,
    } as ViewStyle,

    /** Иконка-кружок типа в опции дропдауна. */
    typeOptionDot: {
        width: 32,
        height: 32,
        borderRadius: RADIUS.full,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.successLight,
    } as ViewStyle,

    typeOptionTitle: {
        ...FONTS.medium,
        fontSize: FONTS.regular.fontSize,
        color: theme.colors.text,
    } as TextStyle,

    typeOptionSubtitle: {
        ...FONTS.regular,
        fontSize: FONTS.small.fontSize,
        color: theme.colors.textSecondary,
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
        borderColor: theme.colors.indigoBorder,
        backgroundColor: theme.colors.primarySoft,
    } as ViewStyle,

    calloutCardWarning: {
        flex: 1,
        borderRadius: RADIUS.lg,
        borderWidth: 1.5,
        padding: SPACING.md,
        borderColor: theme.colors.warningBorder,
        backgroundColor: theme.colors.warningSoft,
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
        fontSize: FONTS.small.fontSize,
        fontWeight: '600' as const,
        fontFamily: 'Inter_600SemiBold',
    } as TextStyle,

    calloutTitleAdvice: {
        flex: 1,
        fontSize: FONTS.small.fontSize,
        fontWeight: '600' as const,
        fontFamily: 'Inter_600SemiBold',
        color: theme.colors.primary,
    } as TextStyle,

    calloutTitleWarning: {
        flex: 1,
        fontSize: FONTS.small.fontSize,
        fontWeight: '600' as const,
        fontFamily: 'Inter_600SemiBold',
        color: theme.colors.warning,
    } as TextStyle,

    /** Поле ввода внутри callout-карточки — без фона, вписанное. */
    calloutInput: {
        fontSize: FONTS.small.fontSize,
        fontFamily: 'Inter_400Regular',
        color: theme.colors.text,
        lineHeight: 18,
        textAlignVertical: 'top',
        minHeight: 48,
        padding: SPACING.none,
    } as TextStyle,

    // ─── Тип Video ───────────────────────────────────────────────────
    /** Карточка-превью видео после ввода ссылки. */
    videoPreview: {
        backgroundColor: theme.colors.darkSurface,
        borderRadius: RADIUS.lg,
        overflow: 'hidden',
        marginBottom: SPACING.lg,
    } as ViewStyle,

    videoThumb: {
        height: 160,
        backgroundColor: theme.colors.darkSurfaceAlt,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    /** Кнопка-плей поверх превью. */
    playButton: {
        width: 48,
        height: 48,
        borderRadius: RADIUS.full,
        backgroundColor: theme.colors.whiteAlpha15,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: theme.colors.whiteAlpha30,
    } as ViewStyle,

    /** View-обёртка под иконку плей — добавишь сам. */
    playIconWrapper: {
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: SPACING.s2,
    } as ViewStyle,

    videoMeta: {
        padding: SPACING.md,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    } as ViewStyle,

    videoUrl: {
        fontSize: FONTS.xs.fontSize,
        fontFamily: 'Inter_400Regular',
        color: theme.colors.whiteAlpha50,
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
        borderColor: theme.colors.border,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        backgroundColor: theme.colors.surface,
    } as ViewStyle,

    checkboxActive: {
        borderColor: theme.colors.success,
        backgroundColor: theme.colors.success,
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
        backgroundColor: theme.colors.background,
        borderWidth: 1.5,
        borderColor: theme.colors.border,
        borderRadius: RADIUS.md,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        fontSize: FONTS.regular.fontSize,
        fontFamily: 'Inter_400Regular',
        color: theme.colors.text,
    } as TextStyle,

    /** Поле ввода ответа — отмечен как правильный. */
    answerInputCorrect: {
        borderColor: theme.colors.success,
        backgroundColor: theme.colors.successSoft,
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
        fontSize: FONTS.sub.fontSize,
        color: theme.colors.primary,
        fontWeight: '500' as const,
    } as TextStyle,

    // ─── Тип Picture ─────────────────────────────────────────────────
    /** Зона загрузки фото — пунктирная рамка, центрированный контент. */
    pictureUploadZone: {
        borderWidth: 2,
        borderColor: theme.colors.borderDark,
        borderStyle: 'dashed',
        borderRadius: RADIUS.xl,
        height: 180,
        alignItems: 'center',
        justifyContent: 'center',
        gap: SPACING.sm,
        backgroundColor: theme.colors.background,
        marginBottom: SPACING.lg,
    } as ViewStyle,

    pictureUploadZoneActive: {
        borderColor: theme.colors.primary,
        backgroundColor: theme.colors.primarySoft,
    } as ViewStyle,

    /** Круглая иконка загрузки в центре зоны. */
    uploadIconCircle: {
        width: 52,
        height: 52,
        borderRadius: RADIUS.full,
        backgroundColor: theme.colors.surface,
        borderWidth: 1,
        borderColor: theme.colors.border,
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
        fontSize: FONTS.xs.fontSize,
        color: theme.colors.textSecondary,
        textAlign: 'center',
    } as TextStyle,

    uploadHintAccent: {
        color: theme.colors.primary,
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
        backgroundColor: theme.colors.blackAlpha50,
        borderRadius: RADIUS.full,
        paddingHorizontal: SPACING.sm,
        paddingVertical: SPACING.xs,
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.xs,
    } as ViewStyle,

    pictureReplaceText: {
        fontSize: FONTS.xs.fontSize,
        fontFamily: 'Inter_400Regular',
        color: theme.colors.surface,
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
        backgroundColor: theme.colors.surface,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
        shadowColor: theme.colors.shadow,
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
        backgroundColor: theme.colors.errorLight,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: theme.colors.errorBorder,
        flexShrink: 0,
    } as ViewStyle,

    savePageButtonDisabled: {
        flex: 1,
        paddingVertical: SPACING.md,
        borderRadius: RADIUS.lg,
        backgroundColor: theme.colors.border,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: theme.colors.border,
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
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 6,
    } as ViewStyle,

    savePageButtonText: {
        ...FONTS.semibold,
        color: theme.colors.surface,
    } as TextStyle,
});