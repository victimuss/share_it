import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from './root';

export const homeStyles = StyleSheet.create({

    // ─── Основной контейнер ───────────────────────────────────────────
    /** Корневой контейнер экрана */
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    } as ViewStyle,

    /** ScrollView внутренний контейнер */
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: SPACING.xxxl,
    } as ViewStyle,

    // ─── Header ──────────────────────────────────────────────────────
    /** Шапка с приветствием и аватаром */
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SPACING.lg,
        paddingTop: SPACING.xl,
        paddingBottom: SPACING.md,
        backgroundColor: COLORS.surface,
    } as ViewStyle,

    /** Левая часть шапки (текст) */
    headerLeft: {
        flex: 1,
        marginRight: SPACING.md,
    } as ViewStyle,

    /** Приветственный текст "Привет, Имя 👋" */
    greetingText: {
        ...FONTS.h2,
        color: COLORS.text,
    } as TextStyle,

    /** Подзаголовок "Что изучим сегодня?" */
    greetingSubtext: {
        ...FONTS.regular,
        color: COLORS.textSecondary,
        marginTop: SPACING.xs,
    } as TextStyle,

    /** Правая часть шапки (иконки) */
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.sm,
    } as ViewStyle,

    /** Кнопка уведомлений */
    notificationButton: {
        width: 40,
        height: 40,
        borderRadius: RADIUS.full,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
    } as ViewStyle,

    /** Аватар пользователя */
    avatar: {
        width: 40,
        height: 40,
        borderRadius: RADIUS.full,
        backgroundColor: COLORS.primaryLight,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: COLORS.primary,
    } as ViewStyle,

    /** Инициалы в аватаре */
    avatarText: {
        ...FONTS.semibold,
        color: COLORS.surface,
        fontSize: 14,
    } as TextStyle,

    // ─── Поиск ───────────────────────────────────────────────────────
    /** Обёртка поисковой строки */
    searchWrapper: {
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
        backgroundColor: COLORS.surface,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    } as ViewStyle,

    /** Контейнер инпута с иконкой */
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.background,
        borderWidth: 1.5,
        borderColor: COLORS.border,
        borderRadius: RADIUS.lg,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
        elevation: 2,
    } as ViewStyle,

    /** Поле поиска */
    searchInput: {
        flex: 1,
        ...FONTS.regular,
        color: COLORS.text,
        marginLeft: SPACING.sm,
        paddingVertical: 0,
    } as TextStyle,

    // ─── Фильтры-чипы ────────────────────────────────────────────────
    /** Горизонтальный скролл категорий */
    filtersScrollContent: {
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
        gap: SPACING.sm,
    } as ViewStyle,

    /** Чип категории (неактивный) */
    chip: {
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.xs,
        borderRadius: RADIUS.full,
        backgroundColor: COLORS.surface,
        borderWidth: 1.5,
        borderColor: COLORS.border,
        justifyContent: 'center',
        alignItems: 'center',
    } as ViewStyle,

    /** Чип категории (активный) */
    chipActive: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    } as ViewStyle,

    /** Текст чипа (неактивный) */
    chipText: {
        ...FONTS.regular,
        color: COLORS.textSecondary,
        fontWeight: '500' as const,
    } as TextStyle,

    /** Текст чипа (активный) */
    chipTextActive: {
        color: COLORS.surface,
        fontWeight: '600' as const,
    } as TextStyle,

    // ─── Секции ──────────────────────────────────────────────────────
    /** Обёртка любой именованной секции */
    section: {
        marginTop: SPACING.xl,
    } as ViewStyle,

    /** Заголовок секции + кнопка "Все" */
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SPACING.lg,
        marginBottom: SPACING.md,
    } as ViewStyle,

    /** Заголовок секции */
    sectionTitle: {
        ...FONTS.bold,
        color: COLORS.text,
    } as TextStyle,

    /** Кнопка "Смотреть все" */
    seeAllText: {
        ...FONTS.regular,
        color: COLORS.primary,
        fontWeight: '600' as const,
    } as TextStyle,

    // ─── Featured карточка (большая, горизонтальный скролл) ──────────
    /** Контент горизонтального скролла */
    featuredScrollContent: {
        paddingHorizontal: SPACING.lg,
        marginBottom: SPACING.md,
        gap: SPACING.md,
    } as ViewStyle,

    /** Большая карточка урока */
    featuredCard: {
        width: 280,
        borderRadius: RADIUS.xl,
        backgroundColor: COLORS.surface,
        overflow: 'hidden',
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
        elevation: 6,
    } as ViewStyle,

    /** Обложка карточки (градиент/изображение) */
    featuredCardImage: {
        width: '100%',
        height: 140,
        backgroundColor: COLORS.primaryLight,
    } as ViewStyle,

    /** Контент под обложкой */
    featuredCardContent: {
        padding: SPACING.md,
    } as ViewStyle,


    /** Строка: бейдж категории + рейтинг */
    featuredCardMeta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.xs,
    } as ViewStyle,

    /** Заголовок урока на карточке */
    featuredCardTitle: {
        ...FONTS.semibold,
        color: COLORS.text,
        marginBottom: SPACING.xs,
    } as TextStyle,

    featureCardContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: SPACING.xs,
        backgroundColor: COLORS.surface,
        borderRadius: RADIUS.lg,
        padding: SPACING.md,
    } as ViewStyle,

    /** Автор урока */
    featuredCardAuthor: {
        ...FONTS.regular,
        color: COLORS.textSecondary,
    } as TextStyle,

    // ─── Карточка прогресса ("Продолжить обучение") ──────────────────
    /** Карточка с прогресс-баром */
    progressCard: {
        marginHorizontal: SPACING.lg,
        backgroundColor: COLORS.surface,
        borderRadius: RADIUS.xl,
        padding: SPACING.lg,
        borderWidth: 1,
        borderColor: COLORS.border,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 3,
    } as ViewStyle,

    /** Строка: иконка + текст */
    progressCardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.md,
        gap: SPACING.sm,
    } as ViewStyle,

    /** Название урока в прогресс-карточке */
    progressCardTitle: {
        ...FONTS.semibold,
        color: COLORS.text,
        flex: 1,
    } as TextStyle,

    /** Трек прогресс-бара */
    progressTrack: {
        height: 6,
        backgroundColor: COLORS.border,
        borderRadius: RADIUS.full,
        overflow: 'hidden',
        marginBottom: SPACING.xs,
    } as ViewStyle,

    /** Заполненная часть прогресс-бара */
    progressFill: {
        height: '100%',
        width: '30%', // пример: 30% прогресса
        backgroundColor: COLORS.primary,
        borderRadius: RADIUS.full,
    } as ViewStyle,

    /** Текст "X% завершено" */
    progressLabel: {
        ...FONTS.h2,
        color: COLORS.primary,
        fontSize: 12,
    } as TextStyle,

    // ─── Компактная карточка урока (вертикальный список) ─────────────
    /** Компактная карточка */
    lessonCard: {
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

    /** Миниатюра/иконка урока */
    lessonCardThumb: {
        width: 56,
        height: 56,
        borderRadius: RADIUS.md,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SPACING.md,
    } as ViewStyle,

    /** Основной контент карточки */
    lessonCardContent: {
        flex: 1,
        marginRight: SPACING.sm,
    } as ViewStyle,

    /** Заголовок урока */
    lessonCardTitle: {
        ...FONTS.medium,
        color: COLORS.text,
        marginBottom: SPACING.xs,
    } as TextStyle,

    /** Строка мета-информации (категория, сложность) */
    lessonCardMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.xs,
        marginBottom: SPACING.xs,
    } as ViewStyle,

    /** Строка: лайки */
    lessonCardFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.xs,
    } as ViewStyle,

    /** Счётчик лайков */
    lessonCardLikes: {
        ...FONTS.regular,
        color: COLORS.textSecondary,
        fontSize: 12,
    } as TextStyle,

    // ─── Бейджи ──────────────────────────────────────────────────────
    /** Универсальный бейдж */
    badge: {
        paddingHorizontal: SPACING.sm,
        backgroundColor: COLORS.primaryLight,
        paddingVertical: 2,
        borderRadius: RADIUS.sm,
        alignSelf: 'flex-start',
    } as ViewStyle,

    /** Текст бейджа */
    badgeText: {
        fontSize: 11,
        fontWeight: '600' as const,
        fontFamily: 'Inter_600SemiBold',
        lineHeight: 16,
    } as TextStyle,

    /** Бейдж категории (фиолетовый) */
    badgeCategory: {
        backgroundColor: COLORS.indigoSoft,
        paddingHorizontal: SPACING.sm,
        paddingVertical: 2,
        marginRight: SPACING.xs,
        borderRadius: RADIUS.sm,
        alignSelf: 'flex-start',
    } as ViewStyle,

    badgeCategoryText: {
        color: 'white',
        fontWeight: '600' as const,
        fontFamily: 'Inter_600SemiBold',
        lineHeight: 16,
    } as TextStyle,

    /** Бейдж сложности: Beginner */
    badgeBeginner: {
        backgroundColor: COLORS.successLight,
        paddingHorizontal: SPACING.sm,
        paddingVertical: 2,
        marginRight: SPACING.xs,
        borderRadius: RADIUS.sm,
        alignSelf: 'flex-start',
    } as ViewStyle,

    badgeBeginnerText: {
        color: COLORS.success,
    } as TextStyle,

    /** Бейдж сложности: Intermediate */
    badgeIntermediate: {
        paddingHorizontal: SPACING.sm,
        paddingVertical: 2,
        marginRight: SPACING.xs,
        borderRadius: RADIUS.sm,
        alignSelf: 'flex-start',
        backgroundColor: COLORS.warningLight,
    } as ViewStyle,

    badgeIntermediateText: {
        color: COLORS.warning,
    } as TextStyle,

    /** Бейдж сложности: Advanced */
    badgeAdvanced: {
        backgroundColor: COLORS.errorLight,
        paddingHorizontal: SPACING.sm,
        paddingVertical: 2,
        marginRight: SPACING.xs,
        borderRadius: RADIUS.sm,
        alignSelf: 'flex-start',
    } as ViewStyle,

    badgeAdvancedText: {
        color: COLORS.error,
    } as TextStyle,

    // ─── Кнопка "Изучить" ────────────────────────────────────────────
    /** Кнопка на компактной карточке */
    studyButton: {
        backgroundColor: COLORS.primary,
        borderRadius: RADIUS.md,
        paddingVertical: SPACING.sm,
        paddingHorizontal: SPACING.md,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 4,
    } as ViewStyle,

    /** Текст кнопки "Изучить" */
    studyButtonText: {
        ...FONTS.semibold,
        color: COLORS.surface,
        fontSize: 13,
    } as TextStyle,

    // ─── Пустое состояние ────────────────────────────────────────────
    /** Контейнер empty state */
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: SPACING.xxxl,
        paddingHorizontal: SPACING.xl,
    } as ViewStyle,

    /** Заголовок empty state */
    emptyStateTitle: {
        ...FONTS.semibold,
        color: COLORS.text,
        textAlign: 'center',
        marginTop: SPACING.md,
        marginBottom: SPACING.sm,
    } as TextStyle,

    /** Описание empty state */
    emptyStateText: {
        ...FONTS.regular,
        color: COLORS.textSecondary,
        textAlign: 'center',
    } as TextStyle,
});