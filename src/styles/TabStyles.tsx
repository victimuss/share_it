import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from '../styles/root';

export const tabBarStyles = StyleSheet.create({

    // ─── Обёртка всего таб-бара ───────────────────────────────────────
    /** Корневой контейнер нижней навигации.
     *  Белый фон, верхняя граница, тень вверх — отделяет бар от контента. */
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        paddingBottom: SPACING.lg,
        paddingTop: SPACING.sm,
        paddingHorizontal: SPACING.sm,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
        elevation: 4,
        overflow: 'visible',
    } as ViewStyle,

    // ─── Обычная вкладка ──────────────────────────────────────────────
    /** Контейнер одной обычной вкладки (Главная / Поиск / Мои уроки / Профиль).
     *  flex: 1 — все четыре вкладки делят ширину поровну вокруг центральной кнопки. */
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: SPACING.xs,
        gap: SPACING.xs,
    } as ViewStyle,

    // ─── Область иконки ───────────────────────────────────────────────
    /** View-контейнер под иконку вкладки.
     *  Намеренно не содержит иконку — её добавишь сам.
     *  При активном состоянии фон меняется на primaryLight-подложку. */
    iconWrapper: {
        width: 32,
        height: 32,
        borderRadius: RADIUS.full,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    } as ViewStyle,

    /** Подложка иконки в активном состоянии.
     *  Лёгкий фиолетовый фон (#EEF2FF) визуально «обнимает» иконку. */
    iconWrapperActive: {
        width: 32,
        height: 32,
        borderRadius: RADIUS.full,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EEF2FF',
    } as ViewStyle,

    // ─── Подпись вкладки ──────────────────────────────────────────────
    /** Текст-лейбл под иконкой в неактивном состоянии.
     *  Используем самый маленький допустимый размер шрифта — 11px. */
    tabLabel: {
        marginTop: -SPACING.xs,
        fontSize: 8,
        width: '100%',
        fontWeight: '400' as const,
        fontFamily: 'Inter_400Regular',
        color: COLORS.textSecondary,
        lineHeight: 14,
    } as TextStyle,

    /** Текст-лейбл в активном состоянии.
     *  Меняем цвет на primary и увеличиваем вес — вкладка «подсвечивается». */
    tabLabelActive: {
        marginTop: -SPACING.xs,
        fontSize: 8,
        width: '100%',
        color: COLORS.primary,
        ontWeight: '400' as const,
        fontFamily: 'Inter_400Regular',
        lineHeight: 14
    } as TextStyle,

    // ─── Центральная кнопка «+» ───────────────────────────────────────
    /** Враппер центральной FAB-кнопки.
     *  flex: 0 — кнопка не тянется, занимает только своё место.
     *  Отрицательный marginTop поднимает кнопку над баром — классический эффект FAB. */
    fabWrapper: {
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -SPACING.lg,
        paddingHorizontal: SPACING.sm,
    } as ViewStyle,

    /** Сама круглая кнопка «+».
     *  Размер 56×56 — стандартный FAB по Material guidelines.
     *  Тень primary-цвета создаёт эффект «парения» над баром. */
    fabButton: {
        width: 56,
        height: 56,
        borderRadius: RADIUS.full,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35,
        shadowRadius: 12,
        elevation: 10,
    } as ViewStyle,

    /** Состояние FAB при нажатии (Pressable onPress).
     *  Немного темнее + слабее тень — тактильный отклик. */
    fabButtonPressed: {
        width: 56,
        height: 56,
        borderRadius: RADIUS.full,
        shadowRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 6 },
        elevation: 10,
        backgroundColor: COLORS.primaryDark,
        shadowOpacity: 0.2,
    } as ViewStyle,

    /** Текст «+» внутри FAB.
     *  Используем h1-размер из FONTS для крупного, читаемого плюса. */
    fabIcon: {
        ...FONTS.h1,
        color: COLORS.surface,
        lineHeight: 56,
        marginTop: -2,
    } as TextStyle,

    // ─── Индикатор активной вкладки ───────────────────────────────────
    /** Маленькая точка-индикатор под иконкой активной вкладки.
     *  Альтернатива подчёркиванию — более современный паттерн для мобайла. */
    activeDot: {
        width: 4,
        height: 4,
        borderRadius: RADIUS.full,
        backgroundColor: COLORS.primary,
        marginTop: 2,
    } as ViewStyle,

    /** Заглушка той же высоты для неактивных вкладок — сохраняет выравнивание. */
    activeDotPlaceholder: {
        width: 4,
        height: 4,
        marginTop: 2,
    } as ViewStyle,

    // ─── Бейдж с числом уведомлений ──────────────────────────────────
    /** Красный бейдж-счётчик поверх иконки (например, новые уведомления).
     *  Позиционируется абсолютно относительно iconWrapper. */
    badge: {
        position: 'absolute',
        top: 0,
        right: 0,
        minWidth: 16,
        height: 16,
        borderRadius: RADIUS.full,
        backgroundColor: COLORS.error,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: SPACING.xs,
        borderWidth: 1.5,
        borderColor: COLORS.surface,
    } as ViewStyle,

    /** Текст внутри бейджа с числом уведомлений. */
    badgeText: {
        fontSize: 9,
        fontWeight: '700' as const,
        fontFamily: 'Inter_700Bold',
        color: COLORS.surface,
        lineHeight: 12,
    } as TextStyle,
});