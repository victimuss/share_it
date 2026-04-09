import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from './root';

export const profileStyles = StyleSheet.create({

  // ─── Основной контейнер ───────────────────────────────────────────
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  } as ViewStyle,

  scrollContainer: {
    flexGrow: 1,
    paddingBottom: SPACING.xxxl,
  } as ViewStyle,

  // ─── Обложка + аватар ────────────────────────────────────────────
  /** Цветная шапка-обложка */
  coverBanner: {
    height: 120,
    backgroundColor: COLORS.primary,
  } as ViewStyle,

  /** Зона аватара и имени под обложкой */
  profileHeaderContainer: {
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    paddingBottom: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  } as ViewStyle,

  /** Враппер аватара (вынесен вверх поверх обложки) */
  avatarWrapper: {
    marginTop: -44,
    marginBottom: SPACING.md,
    alignItems: 'center',
  } as ViewStyle,

  /** Аватар */
  avatar: {
    width: 88,
    height: 88,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primaryLight,
    borderWidth: 4,
    borderColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,

  /** Инициалы в аватаре */
  avatarText: {
    ...FONTS.h2,
    color: COLORS.surface,
  } as TextStyle,

  /** Онлайн-индикатор поверх аватара */
  onlineDot: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 16,
    height: 16,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.success,
    borderWidth: 2,
    borderColor: COLORS.surface,
  } as ViewStyle,

  /** Имя пользователя */
  userName: {
    ...FONTS.h2,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  } as TextStyle,

  /** @никнейм */
  userHandle: {
    ...FONTS.regular,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  } as TextStyle,

  /** Короткое bio */
  userBio: {
    ...FONTS.regular,
    color: COLORS.textSecondary,
    textAlign: 'center',
    paddingHorizontal: SPACING.xxxl,
    marginBottom: SPACING.md,
    lineHeight: 20,
  } as TextStyle,

  /** Кнопка «Редактировать профиль» */
  editButton: {
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.xl,
    backgroundColor: COLORS.surface,
  } as ViewStyle,

  editButtonText: {
    ...FONTS.semibold,
    color: COLORS.primary,
    fontSize: 14,
  } as TextStyle,

  // ─── Статистика ──────────────────────────────────────────────────
  /** Строка из трёх метрик */
  statsRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginBottom: SPACING.xl,
  } as ViewStyle,

  /** Одна метрика */
  statItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: SPACING.lg,
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
  } as ViewStyle,

  statItemLast: {
    borderRightWidth: 0,
  } as ViewStyle,

  /** Число метрики */
  statValue: {
    ...FONTS.bold,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  } as TextStyle,

  /** Подпись метрики */
  statLabel: {
    ...FONTS.regular,
    color: COLORS.textSecondary,
    fontSize: 12,
    textAlign: 'center',
  } as TextStyle,

  // ─── Навыки ──────────────────────────────────────────────────────
  section: {
    marginBottom: SPACING.xl,
  } as ViewStyle,

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  } as ViewStyle,

  sectionTitle: {
    ...FONTS.bold,
    color: COLORS.text,
  } as TextStyle,

  sectionAction: {
    ...FONTS.regular,
    color: COLORS.primary,
    fontWeight: '600' as const,
  } as TextStyle,

  skillsScrollContent: {
    paddingHorizontal: SPACING.lg,
    gap: SPACING.sm,
  } as ViewStyle,

  /** Чип навыка */
  skillChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
    backgroundColor: '#EEF2FF',
    borderWidth: 1,
    borderColor: '#C7D2FE',
  } as ViewStyle,

    skillChipBegginer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
    backgroundColor: '#D1FAE5',
    borderWidth: 1,
    borderColor:'#C7D2FE',
  } as ViewStyle,

    skillChipIntermediate: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#C7D2FE',
  } as ViewStyle,

    skillChipAdvanced: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor:'#C7D2FE',
  } as ViewStyle,

  skillChipText: {
    fontSize: 13,
    fontWeight: '500' as const,
    fontFamily: 'Inter_500Medium',
    color: COLORS.primary,
  } as TextStyle,

  /** Кнопка добавить навык */
  addSkillChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surface,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
  } as ViewStyle,

  addSkillText: {
    fontSize: 13,
    fontWeight: '500' as const,
    color: COLORS.textSecondary,
  } as TextStyle,

  // ─── Вкладки ─────────────────────────────────────────────────────
  /** Контейнер вкладок */
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    borderTopColor: COLORS.border,
    borderTopWidth: 1,
    marginBottom: SPACING.md,
  } as ViewStyle,

  /** Одна вкладка */
  tab: {
    flex: 1,
    paddingVertical: SPACING.md,
    alignItems: 'center',
  } as ViewStyle,

  /** Активная вкладка — подчёркивание */
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
        flex: 1,
    paddingVertical: SPACING.md,
    alignItems: 'center',
  } as ViewStyle,

  tabText: {
    ...FONTS.regular,
    color: COLORS.textSecondary,
    fontSize: 14,
  } as TextStyle,

  tabTextActive: {
    color: COLORS.primary,
    fontWeight: '600' as const,
    
  } as TextStyle,

  // ─── Карточка урока в профиле ────────────────────────────────────
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

  lessonThumb: {
    width: 52,
    height: 52,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
    overflow: 'hidden',
  } as ViewStyle,

  lessonContent: {
    flex: 1,
    marginRight: SPACING.sm,
  } as ViewStyle,

  lessonTitle: {
    ...FONTS.medium,
    color: COLORS.text,
    marginBottom: SPACING.xs,
    fontSize: 14,
  } as TextStyle,

  lessonMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  } as ViewStyle,

  /** Иконка завершённого урока */
  completedBadge: {
    width: 28,
    height: 28,
    borderRadius: RADIUS.full,
    backgroundColor: '#D1FAE5',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  } as ViewStyle,

  // ─── Достижения ──────────────────────────────────────────────────
  achievementsScrollContent: {
    paddingHorizontal: SPACING.lg,
    gap: SPACING.md,
  } as ViewStyle,

  /** Карточка ачивки */
  achievementCard: {
    width: 80,
    alignItems: 'center',
    gap: SPACING.xs,
  } as ViewStyle,

  /** Иконка ачивки */
  achievementIcon: {
    width: 56,
    height: 56,
    borderRadius: RADIUS.lg,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C7D2FE',
  } as ViewStyle,

  /** Залоченная ачивка */
  achievementLocked: {
    backgroundColor: COLORS.background,
    borderColor: COLORS.border,
    opacity: 0.5,
  } as ViewStyle,

  achievementLabel: {
    fontSize: 10,
    fontWeight: '500' as const,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 14,
  } as TextStyle,
});