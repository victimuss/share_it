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
});
