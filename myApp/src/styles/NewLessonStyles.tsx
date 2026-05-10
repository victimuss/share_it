import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Theme, FONTS, SPACING, RADIUS } from './root';

export const createLessonStyles = (theme: Theme) => StyleSheet.create({

    // ─── Основа ──────────────────────────────────────────────────────
    /** Корневой контейнер экрана создания урока. */
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    } as ViewStyle,

    /** Внутренний контейнер скролла. */
    scrollContent: {
        flexGrow: 1,
        paddingBottom: SPACING.s100,
    } as ViewStyle,

    // ─── Header ──────────────────────────────────────────────────────
    /** Шапка экрана: кнопка назад + заголовок. */
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

    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.lg,
        paddingLeft: SPACING.md
    } as ViewStyle,

    /** Кнопка «←» назад. */
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

    /** View-обёртка под иконку стрелки — добавишь сам. */
    backIconWrapper: {
        width: 16,
        height: 16,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    headerTitle: {
        ...FONTS.bold,
        color: theme.colors.text,
    } as TextStyle,

    // ─── Тело формы ──────────────────────────────────────────────────
    /** Обёртка всей формы. */
    formContainer: {
        padding: SPACING.lg,
    } as ViewStyle,

    /** Обёртка одного поля с лейблом. */
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

    /** Опциональный суффикс «*» обязательного поля. */
    fieldRequired: {
        color: theme.colors.error,
        fontWeight: '600' as const,
    } as TextStyle,

    /** Счётчик символов — нейтральный. */
    charCount: {
        ...FONTS.regular,
        color: theme.colors.textSecondary,
    } as TextStyle,

    charCountWarn: {
        color: theme.colors.warning,
        ...FONTS.regular,
    } as TextStyle,

    charCountLimit: {
        color: theme.colors.error,
        ...FONTS.bold,
    } as TextStyle,

    /** Текстовое поле ввода — однострочное. */
    input: {
        backgroundColor: theme.colors.surface,
        borderWidth: 1.5,
        borderColor: theme.colors.border,
        borderRadius: RADIUS.lg,
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
        ...FONTS.regular,
        color: theme.colors.text,
        fontWeight: '500' as const,
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

    inputError: {
        borderColor: theme.colors.error,
        backgroundColor: theme.colors.errorLight,
    } as TextStyle,

    /** Многострочное поле (описание). */
    textArea: {
        backgroundColor: theme.colors.surface,
        borderWidth: 1.5,
        borderColor: theme.colors.border,
        borderRadius: RADIUS.lg,
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
        ...FONTS.regular,
        color: theme.colors.text,
        textAlignVertical: 'top',
        minHeight: 110,
        lineHeight: 22,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
        elevation: 2,
    } as TextStyle,

    textAreaFocused: {
        borderColor: theme.colors.primary,
        shadowColor: theme.colors.primary,
        shadowOpacity: 0.1,
    } as TextStyle,

    /** Текст ошибки под полем. */
    errorText: {
        ...FONTS.regular,
        fontSize: FONTS.small.fontSize,
        color: theme.colors.error,
        marginTop: SPACING.xs,
        marginLeft: SPACING.xs,
    } as TextStyle,

    // ─── Выпадающий список (Difficulty / Type) ───────────────────────
    /** Кнопка-селектор — внешне как input, но кликабельна целиком. */
    selector: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.colors.surface,
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

    /** Открытый селектор — нижние углы выпрямляются для стыковки с дропдауном. */
    selectorOpen: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.colors.surface,
        borderWidth: 1.5,
        borderRadius: RADIUS.lg,
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        borderColor: theme.colors.primary,
        borderBottomLeftRadius: RADIUS.none,
        borderBottomRightRadius: RADIUS.none,
        shadowOpacity: 0,
        elevation: 0,
    } as ViewStyle,

    /** Плейсхолдер внутри селектора (ничего не выбрано). */
    selectorPlaceholder: {
        ...FONTS.regular,
        color: theme.colors.textSecondary,
    } as TextStyle,

    /** Текст выбранной опции. */
    selectorValue: {
        ...FONTS.regular,
        color: theme.colors.text,
        fontWeight: '500' as const,
    } as TextStyle,

    /** Левая часть: бейдж + текст. */
    selectorLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.sm,
    } as ViewStyle,

    /** View-обёртка под иконку шеврона. */
    chevronWrapper: {
        width: 16,
        height: 16,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    /** Список опций — стыкуется с нижней кромкой селектора. */
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
        marginBottom: SPACING.lg,
    } as ViewStyle,

    /** Одна строка опции в дропдауне. */
    dropdownOption: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.md,
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
    } as ViewStyle,

    /** Активная опция (выбранная). */
    dropdownOptionActive: {
        backgroundColor: theme.colors.primarySoft,
    } as ViewStyle,

    /** Иконка-кружок слева от названия опции. */
    optionDot: {
        width: 36,
        height: 36,
        borderRadius: RADIUS.full,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        backgroundColor: theme.colors.indigoSoft
    } as ViewStyle,

    optionTitle: {
        ...FONTS.medium,
        fontSize: FONTS.regular.fontSize,
        color: theme.colors.text,
    } as TextStyle,

    optionTitleActive: {
        color: theme.colors.primary,
    } as TextStyle,

    optionSubtitle: {
        ...FONTS.regular,
        fontSize: FONTS.small.fontSize,
        color: theme.colors.textSecondary,
    } as TextStyle,

    /** Галочка справа на активной опции. */
    optionCheck: {
        marginLeft: 'auto',
        width: 20,
        height: 20,
        borderRadius: RADIUS.full,
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    /** View-обёртка под иконку галочки. */
    checkIconWrapper: {
        width: 12,
        height: 12,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    // ─── Горизонтальный ряд двух селекторов ─────────────────────────
    /** Два дропдауна в одной строке (Difficulty + Type).
     *  gap + flex: 1 — равная ширина, не зависит от контента. */
    selectorsRow: {
        flexDirection: 'row',
        gap: SPACING.md,
        marginBottom: SPACING.lg,
    } as ViewStyle,

    /** Один селектор в ряду. */
    selectorCell: {
        flex: 1,
    } as ViewStyle,

    // ─── Нижняя кнопка «Сохранить» ───────────────────────────────────
    /** Фиксированная панель с кнопкой — не прокручивается. */
    bottomBar: {
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

    /** Кнопка «Сохранить и продолжить». */
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

    /** Кнопка задизейблена пока форма не заполнена. */
    saveButtonDisabled: {
        borderRadius: RADIUS.lg,
        paddingVertical: SPACING.md,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: SPACING.sm,
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 10,
        backgroundColor: theme.colors.borderDark,
        opacity: 0.6,
    } as ViewStyle,

    saveButtonText: {
        ...FONTS.semibold,
        color: '#FFFFFF',
    } as TextStyle,

    /** View-обёртка под иконку стрелки в кнопке. */
    saveButtonIconWrapper: {
        width: 16,
        height: 16,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    // ════════════════════════════════════════════════════════════════
    // МОДАЛКА ТЕГОВ
    // ════════════════════════════════════════════════════════════════

    /** Полупрозрачный оверлей. */
    overlay: {
        flex: 1,
        backgroundColor: theme.colors.overlay,
        justifyContent: 'flex-end',
    } as ViewStyle,

    /** Шторка модалки тегов. */
    tagsSheet: {
        backgroundColor: theme.colors.surface,
        borderTopLeftRadius: RADIUS.xl,
        borderTopRightRadius: RADIUS.xl,
        paddingBottom: SPACING.xxxl,
    } as ViewStyle,

    /** Ручка свайпа. */
    handle: {
        width: 36,
        height: 4,
        borderRadius: RADIUS.full,
        backgroundColor: theme.colors.borderDark,
        alignSelf: 'center',
        marginTop: SPACING.md,
        marginBottom: SPACING.sm,
    } as ViewStyle,

    /** Шапка модалки тегов. */
    tagsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    } as ViewStyle,

    tagsHeaderTitle: {
        ...FONTS.bold,
        color: theme.colors.text,
    } as TextStyle,

    /** Кнопка ✕ закрытия. */
    closeButton: {
        width: 32,
        height: 32,
        borderRadius: RADIUS.full,
        backgroundColor: theme.colors.background,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: theme.colors.border,
    } as ViewStyle,

    closeIconWrapper: {
        width: 14,
        height: 14,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    /** Тело модалки с отступами. */
    tagsBody: {
        padding: SPACING.lg,
    } as ViewStyle,

    // ─── Информационный блок «Зачем теги» ────────────────────────────
    /** Карточка-подсказка с пояснением зачем нужны теги.
     *  Левая полоска primary — знакомый паттерн из lessonStyles. */
    tagsHint: {
        flexDirection: 'row',
        gap: SPACING.md,
        backgroundColor: theme.colors.primarySoft,
        borderRadius: RADIUS.lg,
        padding: SPACING.md,
        marginBottom: SPACING.xl,
        borderLeftWidth: 3,
        borderLeftColor: theme.colors.primary,
    } as ViewStyle,

    tagsHintText: {
        ...FONTS.regular,
        fontSize: FONTS.sub.fontSize,
        color: theme.colors.primaryDeep,
        flex: 1,
        lineHeight: 20,
    } as TextStyle,

    /** View-обёртка под иконку лампочки в хинте. */
    hintIconWrapper: {
        width: 18,
        height: 18,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        marginTop: SPACING.s1,
    } as ViewStyle,

    // ─── Поле ввода тега ─────────────────────────────────────────────
    /** Строка: инпут + кнопка «Добавить». */
    tagInputRow: {
        flexDirection: 'row',
        gap: SPACING.sm,
        marginBottom: SPACING.lg,
    } as ViewStyle,

    /** Поле ввода нового тега. */
    tagInput: {
        flex: 1,
        backgroundColor: theme.colors.background,
        borderWidth: 1.5,
        borderColor: theme.colors.border,
        borderRadius: RADIUS.lg,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        ...FONTS.regular,
        color: theme.colors.text,
        fontSize: FONTS.regular.fontSize,
    } as TextStyle,

    tagInputFocused: {
        borderColor: theme.colors.primary,
    } as TextStyle,

    /** Кнопка «+» добавления тега.
     *  Задизейблена если введено 5 тегов или поле пустое. */
    tagAddButton: {
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderRadius: RADIUS.lg,
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 4,
    } as ViewStyle,

    tagAddButtonDisabled: {
        backgroundColor: theme.colors.borderDark,
        shadowOpacity: 0,
        elevation: 0,
        opacity: 0.5,
    } as ViewStyle,

    tagAddButtonText: {
        ...FONTS.semibold,
        color: theme.colors.surface,
        fontSize: FONTS.regular.fontSize,
    } as TextStyle,

    // ─── Счётчик тегов ───────────────────────────────────────────────
    /** Строка «Добавлено X из 5». */
    tagsCounter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.md,
    } as ViewStyle,

    tagsCounterText: {
        ...FONTS.regular,
        fontSize: FONTS.small.fontSize,
        color: theme.colors.textSecondary,
    } as TextStyle,

    tagsCounterBold: {
        fontWeight: '600' as const,
        color: theme.colors.text,
    } as TextStyle,

    /** Подсказка лимита символов под инпутом. */
    tagCharHint: {
        ...FONTS.regular,
        fontSize: FONTS.xs.fontSize,
        color: theme.colors.textSecondary,
        marginTop: SPACING.sm,
        marginBottom: SPACING.md,
        marginLeft: SPACING.xs,
    } as TextStyle,

    // ─── Чипы добавленных тегов ──────────────────────────────────────
    /** Обёртка чипов — flex-wrap. */
    tagsChipsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: SPACING.sm,
        marginBottom: SPACING.xl,
        minHeight: 36,
    } as ViewStyle,

    /** Один чип тега с кнопкой удаления. */
    tagChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.xs,
        paddingLeft: SPACING.md,
        paddingRight: SPACING.sm,
        paddingVertical: SPACING.xs,
        borderRadius: RADIUS.full,
        backgroundColor: theme.colors.primarySoft,
        borderWidth: 1,
        borderColor: theme.colors.indigoBorder,
    } as ViewStyle,

    tagChipText: {
        fontSize: FONTS.sub.fontSize,
        fontWeight: '500' as const,
        fontFamily: 'Inter_500Medium',
        color: theme.colors.primary,
    } as TextStyle,

    /** Кнопка удаления тега внутри чипа. */
    tagChipRemove: {
        width: 16,
        height: 16,
        borderRadius: RADIUS.full,
        backgroundColor: theme.colors.indigoBorder,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    tagChipRemoveIconWrapper: {
        width: 8,
        height: 8,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    // ─── Кнопки футера модалки ───────────────────────────────────────
    /** Футер модалки: две кнопки. */
    tagsFooter: {
        paddingHorizontal: SPACING.lg,
        paddingTop: SPACING.md,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
        gap: SPACING.sm,
    } as ViewStyle,

    /** Основная кнопка «Готово — опубликовать». */
    doneButton: {
        backgroundColor: theme.colors.primary,
        borderRadius: RADIUS.lg,
        paddingVertical: SPACING.md,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 6,
    } as ViewStyle,

    doneButtonText: {
        ...FONTS.semibold,
        color: '#FFFFFF',
    } as TextStyle,

    /** Вторичная кнопка «Пропустить». */
    skipButton: {
        paddingVertical: SPACING.sm,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    skipButtonText: {
        ...FONTS.regular,
        fontSize: FONTS.regular.fontSize,
        color: theme.colors.textSecondary,
    } as TextStyle,
});