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
    backgroundColor: COLORS.indigoSoft,
    borderWidth: 1,
    borderColor: COLORS.indigoBorder,
  } as ViewStyle,

  skillChipBegginer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.successLight,
    borderWidth: 1,
    borderColor: COLORS.indigoBorder,
  } as ViewStyle,

  skillChipIntermediate: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.warningLight,
    borderWidth: 1,
    borderColor: COLORS.indigoBorder,
  } as ViewStyle,

  skillChipAdvanced: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.errorLight,
    borderWidth: 1,
    borderColor: COLORS.indigoBorder,
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
    backgroundColor: COLORS.successLight,
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
    backgroundColor: COLORS.indigoSoft,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.indigoBorder,
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
  // ─── Общий оверлей ───────────────────────────────────────────────
  /** Полупрозрачный фон поверх экрана.
   *  Один оверлей переиспользуется для обеих модалок. */
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'flex-end',
  } as ViewStyle,

  // ─── Общая шторка ────────────────────────────────────────────────
  /** Контейнер bottom sheet — скруглены только верхние углы. */
  sheet: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    paddingBottom: SPACING.xxxl,
    maxHeight: '90%',
  } as ViewStyle,

  /** Ручка-индикатор свайпа вниз. */
  handle: {
    width: 36,
    height: 4,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.borderDark,
    alignSelf: 'center',
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
  } as ViewStyle,

  // ─── Общая шапка ─────────────────────────────────────────────────
  /** Строка заголовок + кнопка закрытия.
   *  borderBottom отделяет шапку от тела модалки. */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  } as ViewStyle,

  /** Заголовок модалки («Новый навык» / «Редактировать профиль»). */
  headerTitle: {
    ...FONTS.bold,
    color: COLORS.text,
  } as TextStyle,

  /** Кнопка ✕ закрытия. */
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

  // ─── Скроллируемое тело ──────────────────────────────────────────
  /** Внутренний контейнер прокрутки — поля и секции. */
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xl,
  } as ViewStyle,

  // ════════════════════════════════════════════════════════════════
  // МОДАЛКА 1 — ДОБАВЛЕНИЕ НАВЫКА
  // ════════════════════════════════════════════════════════════════

  // ─── Поле названия навыка ────────────────────────────────────────
  /** Обёртка одного поля ввода с лейблом. */
  inputGroup: {
    marginBottom: SPACING.lg,
  } as ViewStyle,

  /** Лейбл над полем. */
  inputLabel: {
    ...FONTS.medium,
    color: COLORS.text,
    fontSize: 14,
    marginBottom: SPACING.sm,
  } as TextStyle,

  /** Текстовое поле ввода.
   *  Та же анатомия, что input в authStyles — единый язык компонентов. */
  input: {
    backgroundColor: COLORS.background,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    ...FONTS.regular,
    color: COLORS.text,
    fontWeight: '500' as const,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: SPACING.xl
  } as TextStyle,

  /** Поле ввода в состоянии фокуса. */
  inputFocused: {
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.1,
  } as TextStyle,

  /** Поле ввода с ошибкой валидации. */
  inputError: {
    borderColor: COLORS.error,
    backgroundColor: COLORS.errorLight,
  } as TextStyle,

  /** Текст ошибки под полем. */
  errorText: {
    ...FONTS.regular,
    fontSize: 12,
    color: COLORS.error,
    marginTop: SPACING.xs,
    marginLeft: SPACING.xs,
  } as TextStyle,

  /** Счётчик символов справа под полем (например «12 / 40»).
   *  Помогает пользователю не превысить лимит. */
  charCounter: {
    ...FONTS.regular,
    fontSize: 11,
    color: COLORS.textSecondary,
    textAlign: 'right',
    marginTop: -SPACING.xxl,
  } as TextStyle,

  /** Счётчик когда лимит близко — меняем цвет на warning. */
  charCounterWarn: {
    ...FONTS.regular,
    fontSize: 11,
    color: COLORS.warning,
    textAlign: 'right',
    marginTop: -SPACING.xxl,
  } as TextStyle,

  // ─── Выбор уровня навыка ─────────────────────────────────────────
  /** Заголовок секции выбора уровня. */
  levelLabel: {
    ...FONTS.medium,
    color: COLORS.text,
    fontSize: 14,
    marginBottom: SPACING.md,
  } as TextStyle,

  /** Колонка из трёх карточек уровней.
   *  Карточки вертикально стекаются — больше места для описания. */
  levelList: {
    gap: SPACING.sm,
  } as ViewStyle,

  /** Карточка одного уровня (Beginner / Intermediate / Advanced).
   *  flexDirection: row — иконка слева, текст справа. */
  levelCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  } as ViewStyle,

  /** Активная карточка уровня — рамка цвета уровня. */
  levelCardActiveBeginner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    borderWidth: 1.5,
    borderColor: COLORS.success,
    backgroundColor: '#F0FDF4',
  } as ViewStyle,

  levelCardActiveIntermediate: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    borderWidth: 1.5,
    borderColor: COLORS.warning,
    backgroundColor: '#FFFBEB',
  } as ViewStyle,

  levelCardActiveAdvanced: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    borderWidth: 1.5,
    borderColor: COLORS.error,
    backgroundColor: '#FFF5F5',
  } as ViewStyle,

  /** Круглая иконка-индикатор уровня (цветной кружок). */
  levelDot: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  } as ViewStyle,

  levelDotBeginner: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    backgroundColor: '#D1FAE5',
  } as ViewStyle,

  levelDotIntermediate: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    backgroundColor: '#FEF3C7',
  } as ViewStyle,

  levelDotAdvanced: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    backgroundColor: '#FEE2E2',
  } as ViewStyle,

  /** View-обёртка под иконку внутри кружка — добавишь сам. */
  levelDotIconWrapper: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,

  /** Блок текста карточки уровня. */
  levelCardText: {
    flex: 1,
  } as ViewStyle,

  /** Название уровня. */
  levelCardTitle: {
    ...FONTS.semibold,
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 2,
  } as TextStyle,

  /** Подсказка под названием уровня. */
  levelCardSubtitle: {
    ...FONTS.regular,
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 16,
  } as TextStyle,

  /** Радиокнопка справа на карточке уровня. */
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: RADIUS.full,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  } as ViewStyle,

  radioOuterActive: {
    width: 20,
    height: 20,
    borderRadius: RADIUS.full,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    borderColor: COLORS.primary,
  } as ViewStyle,

  radioInner: {
    width: 10,
    height: 10,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primary,
  } as ViewStyle,

  // ════════════════════════════════════════════════════════════════
  // МОДАЛКА 2 — РЕДАКТИРОВАНИЕ ПРОФИЛЯ
  // ════════════════════════════════════════════════════════════════

  // ─── Аватар-редактор ─────────────────────────────────────────────
  /** Центрированная зона аватара с кнопкой смены фото. */
  avatarSection: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  } as ViewStyle,

  /** Враппер аватара — относительное позиционирование для кнопки камеры. */
  /** Кнопка «камера» поверх аватара (правый нижний угол).
   *  position absolute относительно avatarWrapper. */
  avatarCameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primary,
    borderWidth: 2,
    borderColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,

  /** View-обёртка под иконку камеры — добавишь сам. */
  cameraIconWrapper: {
    width: 14,
    height: 14,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,

  /** Ссылка «Изменить фото» под аватаром. */
  avatarChangeText: {
    ...FONTS.regular,
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '500' as const,
  } as TextStyle,

  // ─── Многострочный textarea (bio) ────────────────────────────────
  /** Поле ввода для bio — многострочное.
   *  textAlignVertical: 'top' — курсор начинается сверху, не по центру. */
  textArea: {
    backgroundColor: COLORS.background,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    ...FONTS.regular,
    color: COLORS.text,
    minHeight: 88,
    textAlignVertical: 'top',
  } as TextStyle,

  textAreaFocused: {
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  } as TextStyle,

  // ─── Разделитель секций внутри формы ────────────────────────────
  /** Горизонтальная черта между блоками полей. */
  formDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.lg,
  } as ViewStyle,

  /** Подзаголовок группы полей (например «Контакты»). */
  formGroupTitle: {
    ...FONTS.semibold,
    fontSize: 13,
    color: COLORS.textSecondary,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.5,
    marginBottom: SPACING.md,
  } as TextStyle,

  // ─── Футер с кнопкой сохранения ──────────────────────────────────
  /** Подвал с кнопкой — прилипает к низу, не прокручивается. */
  footer: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.surface,
    gap: SPACING.sm,
  } as ViewStyle,

  /** Основная кнопка сохранения.
   *  Та же анатомия, что button в authStyles. */
  saveButton: {
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

  /** Кнопка сохранения в задизейбленном состоянии (нет изменений). */
  saveButtonDisabled: {
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    backgroundColor: COLORS.borderDark,
    shadowOpacity: 0,
    elevation: 0,
    opacity: 0.6,
  } as ViewStyle,

  saveButtonText: {
    ...FONTS.semibold,
    color: COLORS.surface,
  } as TextStyle,

  /** Кнопка «Отмена» — вторичная, под кнопкой сохранения. */
  cancelButton: {
    paddingVertical: SPACING.sm,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,

  cancelButtonText: {
    ...FONTS.regular,
    fontSize: 14,
    color: COLORS.textSecondary,
  } as TextStyle,
});