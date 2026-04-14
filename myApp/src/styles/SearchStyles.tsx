import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from './root';

export const searchStyles = StyleSheet.create({

    // ─── Основа ──────────────────────────────────────────────────────
    /** Корневой контейнер экрана поиска */
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    } as ViewStyle,

    /** Внутренний контейнер скролла */
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: SPACING.xxxl,
    } as ViewStyle,

    // ─── Header ──────────────────────────────────────────────────────
    /** Шапка экрана: заголовок + строка поиска */
    header: {
        backgroundColor: COLORS.surface,
        paddingTop: SPACING.xl,
        paddingHorizontal: SPACING.lg,
        paddingBottom: SPACING.md,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    } as ViewStyle,

    /** Заголовок «Поиск» */
    headerTitle: {
        ...FONTS.h2,
        color: COLORS.text,
        marginBottom: SPACING.md,
    } as TextStyle,

    /** Контейнер строки поиска: иконка + инпут + кнопка очистки */
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.background,
        borderWidth: 1.5,
        borderColor: COLORS.border,
        borderRadius: RADIUS.lg,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        gap: SPACING.sm,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
        elevation: 2,
    } as ViewStyle,

    /** Строка поиска в фокусе — подсветка рамки primary */
    searchContainerFocused: {
        borderColor: COLORS.primary,
        shadowColor: COLORS.primary,
        shadowOpacity: 0.1,
    } as ViewStyle,

    /** View-обёртка под иконку лупы слева */
    searchIconWrapper: {
        width: 18,
        height: 18,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    } as ViewStyle,

    /** Сам текстовый инпут */
    searchInput: {
        flex: 1,
        ...FONTS.regular,
        color: COLORS.text,
        paddingVertical: 0,
    } as TextStyle,

    /** Кнопка очистки ✕ — появляется когда есть текст */
    clearButton: {
        width: 20,
        height: 20,
        borderRadius: RADIUS.full,
        backgroundColor: COLORS.textLight,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    } as ViewStyle,

    // ─── Фильтры-таблетки под поиском ───────────────────────────────
    /** Горизонтальный скролл фильтров (Все / По названию / Авторы...) */
    filtersScrollContent: {
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
        gap: SPACING.sm,
    } as ViewStyle,

    /** Чип фильтра неактивный */
    filterChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.xs,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.xs,
        borderRadius: RADIUS.full,
        backgroundColor: COLORS.surface,
        borderWidth: 1.5,
        borderColor: COLORS.border,
    } as ViewStyle,

    /** Чип фильтра активный */
    filterChipActive: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.18,
        shadowRadius: 8,
        elevation: 4,
    } as ViewStyle,

    /** Текст чипа фильтра неактивный */
    filterChipText: {
        ...FONTS.regular,
        color: COLORS.textSecondary,
        fontWeight: '500' as const,
    } as TextStyle,

    /** Текст чипа фильтра активный */
    filterChipTextActive: {
        color: COLORS.surface,
        fontWeight: '600' as const,
    } as TextStyle,

    // ─── Недавние запросы ────────────────────────────────────────────
    /** Обёртка секции (недавние / популярные теги) */
    section: {
        marginTop: SPACING.xl,
        paddingHorizontal: SPACING.lg,
    } as ViewStyle,

    /** Заголовок секции */
    sectionTitle: {
        ...FONTS.bold,
        color: COLORS.text,
        marginBottom: SPACING.md,
    } as TextStyle,

    /** Обёртка чипов — flex-wrap для переноса строк */
    chipsWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: SPACING.sm,
    } as ViewStyle,

    /** Чип недавнего запроса (с крестиком) */
    recentChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.xs,
        paddingLeft: SPACING.md,
        paddingRight: SPACING.sm,
        paddingVertical: SPACING.xs,
        borderRadius: RADIUS.full,
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.border,
    } as ViewStyle,

    /** Текст недавнего чипа */
    recentChipText: {
        ...FONTS.regular,
        color: COLORS.text,
        fontSize: 13,
    } as TextStyle,

    /** Кнопка удаления недавнего запроса (✕) */
    recentChipRemove: {
        width: 16,
        height: 16,
        borderRadius: RADIUS.full,
        backgroundColor: COLORS.borderDark,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    // ─── Популярные теги ─────────────────────────────────────────────
    /** Чип популярного тега — цветной фон, без удаления */
    tagChip: {
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.xs,
        borderRadius: RADIUS.full,
        backgroundColor: '#EEF2FF',
        borderWidth: 1,
        borderColor: '#C7D2FE',
    } as ViewStyle,

    /** Текст популярного тега */
    tagChipText: {
        fontSize: 13,
        fontWeight: '500' as const,
        fontFamily: 'Inter_500Medium',
        color: COLORS.primary,
    } as TextStyle,

    // ─── Строка результатов ──────────────────────────────────────────
    /** Строка «N результатов + кнопка фильтра» */
    resultsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
    } as ViewStyle,

    /** Текст «Найдено N уроков» */
    resultsCount: {
        ...FONTS.regular,
        color: COLORS.textSecondary,
        fontSize: 13,
    } as TextStyle,

    /** Выделенное число в строке результатов */
    resultsCountBold: {
        ...FONTS.semibold,
        color: COLORS.text,
        fontSize: 13,
    } as TextStyle,

    /** Кнопка «Фильтры» — вторичная */
    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.xs,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderRadius: RADIUS.md,
        borderWidth: 1.5,
        borderColor: COLORS.border,
        backgroundColor: COLORS.surface,
    } as ViewStyle,

    /** Текст кнопки фильтра */
    filterButtonText: {
        ...FONTS.regular,
        color: COLORS.text,
        fontSize: 13,
        fontWeight: '500' as const,
    } as TextStyle,

    /** View-обёртка под иконку фильтра */
    filterButtonIconWrapper: {
        width: 14,
        height: 14,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    // ─── Карточка результата ─────────────────────────────────────────
    /** Карточка одного результата поиска */
    resultCard: {
        flexDirection: 'row',
        alignItems: 'center',
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

    /** Миниатюра урока (квадрат с иконкой) */
    resultThumb: {
        width: 52,
        height: 52,
        borderRadius: RADIUS.md,
        backgroundColor: COLORS.background,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: SPACING.md,
        flexShrink: 0,
    } as ViewStyle,

    /** View-обёртка под иконку в миниатюре */
    resultThumbIconWrapper: {
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    /** Основной контент карточки */
    resultContent: {
        flex: 1,
        marginRight: SPACING.sm,
    } as ViewStyle,

    /** Заголовок урока в результате */
    resultTitle: {
        ...FONTS.medium,
        color: COLORS.text,
        marginBottom: SPACING.xs,
        fontSize: 14,
    } as TextStyle,

    /** Подсвеченная часть заголовка (совпадение с запросом) */
    resultTitleHighlight: {
        color: COLORS.primary,
        fontWeight: '700' as const,
        backgroundColor: '#EEF2FF',
    } as TextStyle,

    /** Строка мета: автор · категория */
    resultMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.xs,
        marginBottom: SPACING.xs,
        flexWrap: 'wrap',
    } as ViewStyle,

    /** Имя автора */
    resultAuthor: {
        ...FONTS.regular,
        color: COLORS.textSecondary,
        fontSize: 12,
    } as TextStyle,

    /** Разделитель «·» между мета-элементами */
    resultMetaDot: {
        ...FONTS.regular,
        color: COLORS.textLight,
        fontSize: 12,
    } as TextStyle,

    /** Строка: лайки + сложность */
    resultFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.sm,
    } as ViewStyle,

    /** Счётчик лайков */
    resultLikes: {
        ...FONTS.regular,
        color: COLORS.textSecondary,
        fontSize: 12,
    } as TextStyle,

    // ─── Empty state ─────────────────────────────────────────────────
    /** Контейнер пустого состояния (ничего не найдено) */
    emptyState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: SPACING.xxxl,
        paddingHorizontal: SPACING.xl,
    } as ViewStyle,

    /** View-обёртка под иконку пустого состояния */
    emptyIconWrapper: {
        width: 72,
        height: 72,
        borderRadius: RADIUS.full,
        backgroundColor: COLORS.background,
        borderWidth: 1.5,
        borderColor: COLORS.border,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: SPACING.lg,
    } as ViewStyle,

    /** Заголовок пустого состояния */
    emptyTitle: {
        ...FONTS.semibold,
        color: COLORS.text,
        textAlign: 'center',
        marginBottom: SPACING.sm,
    } as TextStyle,

    /** Подсказка под заголовком */
    emptySubtitle: {
        ...FONTS.regular,
        color: COLORS.textSecondary,
        textAlign: 'center',
        lineHeight: 22,
    } as TextStyle,
    // ─── Пагинация ───────────────────────────────────────────────────

    /** Обёртка всего блока пагинации.
     *  Располагается под списком результатов, центрирует содержимое. */
    paginationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: SPACING.xl,
        paddingHorizontal: SPACING.lg,
        gap: SPACING.xs,
    } as ViewStyle,

    /** Одна кнопка-страница (цифра).
     *  Квадратная, с мягким радиусом — узнаваемый паттерн пагинации. */
    pageButton: {
        width: 36,
        height: 36,
        borderRadius: RADIUS.md,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.border,
    } as ViewStyle,

    /** Активная страница — заливка primary, без рамки.
     *  Тень как у основных кнопок — визуально «поднимает» активный элемент. */
    pageButtonActive: {
        width: 36,
        height: 36,
        borderRadius: RADIUS.md,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    } as ViewStyle,

    /** Страница при нажатии (pressed state).
     *  Немного темнее active — тактильный отклик. */
    pageButtonPressed: {
        backgroundColor: COLORS.primaryDark,
        borderColor: COLORS.primaryDark,
    } as ViewStyle,

    /** Текст номера страницы — неактивный. */
    pageButtonText: {
        ...FONTS.regular,
        fontSize: 14,
        color: COLORS.textSecondary,
        fontWeight: '500' as const,
    } as TextStyle,

    /** Текст номера страницы — активный. */
    pageButtonTextActive: {
        color: COLORS.surface,
        fontWeight: '600' as const,
    } as TextStyle,

    /** Кнопки «‹ Пред» и «След ›» — стрелочная навигация.
     *  Чуть шире чем цифровые кнопки, чтобы вместить иконку + текст. */
    pageArrowButton: {
        height: 36,
        paddingHorizontal: SPACING.md,
        borderRadius: RADIUS.md,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: SPACING.xs,
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.border,
    } as ViewStyle,

    /** Стрелочная кнопка в задизейбленном состоянии.
     *  На первой/последней странице — приглушаем, но не убираем, чтобы layout не прыгал. */
    pageArrowButtonDisabled: {
        opacity: 0.35,
    } as ViewStyle,

    /** View-обёртка под иконку стрелки — добавишь сам. */
    pageArrowIconWrapper: {
        width: 14,
        height: 14,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    /** Текст «Пред» / «След» рядом со стрелкой. */
    pageArrowText: {
        ...FONTS.regular,
        fontSize: 13,
        color: COLORS.textSecondary,
        fontWeight: '500' as const,
    } as TextStyle,

    /** Многоточие «...» между страницами.
     *  Совпадает по размеру с pageButton — сетка не ломается. */
    pageDots: {
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    /** Текст многоточия. */
    pageDotsText: {
        ...FONTS.regular,
        fontSize: 14,
        color: COLORS.textLight,
        letterSpacing: 1,
    } as TextStyle,

    /** Строка «Страница X из Y» под кнопками.
     *  Опциональный элемент — даёт контекст при большом числе страниц. */
    pageInfo: {
        ...FONTS.regular,
        fontSize: 12,
        color: COLORS.textSecondary,
        textAlign: 'center',
        marginTop: SPACING.sm,
    } as TextStyle,
    // ─── Оверлей ─────────────────────────────────────────────────────
    /** Полупрозрачный фон поверх всего экрана.
     *  flex: 1 + justifyContent: 'flex-end' прижимает шторку к низу. */
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        justifyContent: 'flex-end',
    } as ViewStyle,

    // ─── Сама шторка ─────────────────────────────────────────────────
    /** Контейнер модального окна (bottom sheet).
     *  Скруглены только верхние углы — классический паттерн шторки. */
    sheet: {
        backgroundColor: COLORS.surface,
        borderTopLeftRadius: RADIUS.xl,
        borderTopRightRadius: RADIUS.xl,
        paddingBottom: SPACING.xxxl,
        maxHeight: '85%',
    } as ViewStyle,

    // ─── Ручка-индикатор ─────────────────────────────────────────────
    /** Серая «ручка» в верхней части шторки.
     *  Сигнализирует пользователю, что шторку можно свайпнуть вниз. */
    handle: {
        width: 36,
        height: 4,
        borderRadius: RADIUS.full,
        backgroundColor: COLORS.borderDark,
        alignSelf: 'center',
        marginTop: SPACING.md,
        marginBottom: SPACING.sm,
    } as ViewStyle,

    // ─── Шапка модалки ───────────────────────────────────────────────
    /** Строка «Фильтры» + кнопка закрытия.
     *  borderBottom отделяет заголовок от скроллируемого контента. */
    headerModal: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    } as ViewStyle,

    /** Заголовок «Фильтры» */
    headerTitleModal: {
        ...FONTS.bold,
        color: COLORS.text,
    } as TextStyle,

    /** Кнопка «Сбросить» — текстовая, без фона.
     *  Цвет error подчёркивает деструктивное действие. */
    resetButton: {
        paddingVertical: SPACING.xs,
        paddingHorizontal: SPACING.sm,
    } as ViewStyle,

    resetButtonText: {
        ...FONTS.regular,
        color: COLORS.error,
        fontWeight: '500' as const,
    } as TextStyle,

    /** Кнопка ✕ закрытия модалки. */
    closeButton: {
        width: 32,
        height: 32,
        borderRadius: RADIUS.full,
        backgroundColor: COLORS.background,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
    } as ViewStyle,

    /** View-обёртка под иконку ✕ — добавишь сам. */
    closeIconWrapper: {
        width: 14,
        height: 14,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    // ─── Скроллируемый контент ───────────────────────────────────────
    /** ScrollView внутри шторки — контент фильтров. */
    scrollContent: {
        paddingHorizontal: SPACING.lg,
        paddingTop: SPACING.lg,
        paddingBottom: SPACING.xl,
    } as ViewStyle,

    // ─── Секция фильтра ──────────────────────────────────────────────
    /** Обёртка одной группы фильтров (Категория / Сложность / Рейтинг...).
     *  marginBottom разделяет секции между собой. */
    filterSection: {
        marginBottom: SPACING.xl,
    } as ViewStyle,

    /** Заголовок группы фильтров + счётчик выбранных. */
    filterSectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: SPACING.md,
    } as ViewStyle,

    /** Название группы: «Категория», «Сложность» и т.д. */
    filterSectionTitle: {
        ...FONTS.semibold,
        color: COLORS.text,
        fontSize: 15,
    } as TextStyle,

    /** Бейдж «X выбрано» рядом с заголовком секции .
     *  Показывается только если есть активные значения. */
    filterSectionBadge: {
        backgroundColor: '#EEF2FF',
        borderRadius: RADIUS.full,
        paddingHorizontal: SPACING.sm,
        paddingVertical: 2,
        minWidth: 20,
        alignItems: 'center',
    } as ViewStyle,

    filterSectionBadgeText: {
        fontSize: 11,
        fontWeight: '600' as const,
        fontFamily: 'Inter_600SemiBold',
        color: COLORS.primary,
    } as TextStyle,

    // ─── Чипы выбора ─────────────────────────────────────────────────
    /** Обёртка ряда чипов — flex-wrap для переноса. */
    chipsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: SPACING.sm,
    } as ViewStyle,

    /** Чип-опция фильтра (неактивный). */
    filterOptionChip: {
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderRadius: RADIUS.full,
        backgroundColor: COLORS.surface,
        borderWidth: 1.5,
        borderColor: COLORS.border,
    } as ViewStyle,

    /** Чип-опция фильтра (выбранный).
     *  Заливка primary + тень — аналогично активным чипам на главном экране. */
    filterOptionChipActive: {
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderRadius: RADIUS.full,
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.18,
        shadowRadius: 8,
        elevation: 4,
    } as ViewStyle,

    filterOptionChipText: {
        fontSize: 13,
        fontWeight: '500' as const,
        fontFamily: 'Inter_500Medium',
        color: COLORS.textSecondary,
    } as TextStyle,

    filterOptionChipTextActive: {
        color: COLORS.surface,
        fontWeight: '600' as const,
    } as TextStyle,

    // ─── Чипы сложности (цветные) ────────────────────────────────────
    /** Чип «Beginner» — зелёный неактивный. */
    chipBeginner: {
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderRadius: RADIUS.full,
        borderWidth: 1.5,
        borderColor: '#6EE7B7',
        backgroundColor: COLORS.surface,
    } as ViewStyle,

    chipBeginnerActive: {
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderRadius: RADIUS.full,
        borderWidth: 1.5,
        backgroundColor: COLORS.success,
        borderColor: COLORS.success,
        shadowColor: COLORS.success,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.18,
        shadowRadius: 8,
        elevation: 4,
    } as ViewStyle,

    chipBeginnerText: {
        color: COLORS.success,
    } as TextStyle,

    chipBeginnerTextActive: {
        color: COLORS.surface,
    } as TextStyle,

    /** Чип «Intermediate» — жёлтый неактивный. */
    chipIntermediate: {
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderRadius: RADIUS.full,
        borderWidth: 1.5,
        borderColor: '#FCD34D',
        backgroundColor: COLORS.surface,
    } as ViewStyle,

    chipIntermediateActive: {
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderRadius: RADIUS.full,
        borderWidth: 1.5,
        backgroundColor: COLORS.warning,
        borderColor: COLORS.warning,
        shadowColor: COLORS.warning,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.18,
        shadowRadius: 8,
        elevation: 4,
    } as ViewStyle,

    chipIntermediateText: {
        color: COLORS.warning,
    } as TextStyle,

    chipIntermediateTextActive: {
        color: COLORS.surface,
    } as TextStyle,

    /** Чип «Advanced» — красный неактивный. */
    chipAdvanced: {
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderRadius: RADIUS.full,
        borderWidth: 1.5,
        borderColor: '#FCA5A5',
        backgroundColor: COLORS.surface,
    } as ViewStyle,

    chipAdvancedActive: {
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderRadius: RADIUS.full,
        borderWidth: 1.5,
        backgroundColor: COLORS.error,
        borderColor: COLORS.error,
        shadowColor: COLORS.error,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.18,
        shadowRadius: 8,
        elevation: 4,
    } as ViewStyle,

    chipAdvancedText: {
        color: COLORS.error,
    } as TextStyle,

    chipAdvancedTextActive: {
        color: COLORS.surface,
    } as TextStyle,

    // ─── Слайдер рейтинга ────────────────────────────────────────────
    /** Строка: иконка звезды + слайдер + текущее значение. */
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.md,
    } as ViewStyle,

    /** Трек слайдера рейтинга (фон). */
    sliderTrack: {
        flex: 1,
        height: 6,
        borderRadius: RADIUS.full,
        backgroundColor: COLORS.border,
        overflow: 'hidden',
    } as ViewStyle,

    /** Заполненная часть трека — ширина задаётся динамически через style. */
    sliderFill: {
        height: '100%',
        backgroundColor: COLORS.primary,
        borderRadius: RADIUS.full,
    } as ViewStyle,

    /** Подпись текущего значения рейтинга (например «4.0+»). */
    ratingValue: {
        ...FONTS.semibold,
        color: COLORS.primary,
        fontSize: 14,
        minWidth: 36,
        textAlign: 'right',
    } as TextStyle,

    // ─── Разделитель секций ──────────────────────────────────────────
    /** Горизонтальная линия между секциями фильтров. */
    divider: {
        height: 1,
        backgroundColor: COLORS.border,
        marginBottom: SPACING.xl,
    } as ViewStyle,

    // ─── Кнопка «Применить» ──────────────────────────────────────────
    /** Фиксированный футер с кнопкой применения.
     *  borderTop отделяет от скролла, paddingBottom = safe area. */
    footer: {
        paddingHorizontal: SPACING.lg,
        paddingTop: SPACING.md,
        paddingBottom: SPACING.lg,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        backgroundColor: COLORS.surface,
    } as ViewStyle,

    /** Кнопка «Применить фильтры».
     *  Та же анатомия, что и основная кнопка в authStyles. */
    applyButton: {
        backgroundColor: COLORS.primary,
        borderRadius: RADIUS.lg,
        paddingVertical: SPACING.md,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 6,
    } as ViewStyle,

    applyButtonText: {
        ...FONTS.semibold,
        color: COLORS.surface,
    } as TextStyle,

    /** Счётчик активных фильтров в тексте кнопки — «Применить (3)».
     *  Чуть светлее основного текста, чтобы не конкурировать. */
    applyButtonCount: {
        ...FONTS.semibold,
        color: 'rgba(255, 255, 255, 0.7)',
    } as TextStyle,
});

