import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { COLORS, FONTS, SPACING, RADIUS } from './root';

export const authStyles = StyleSheet.create({
  // Основные контейнеры
  /** Основной контейнер страницы */
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.lg,
  } as ViewStyle,

  /** Контейнер для центрирования формы */
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: SPACING.xxxl,
  } as ViewStyle,

  // Заголовок
  /** Заголовок страницы */
  title: {
    ...FONTS.h2,
    color: COLORS.text,
    marginBottom: SPACING.xl,
    textAlign: 'center',
  } as TextStyle,

  // Форма
  /** Контейнер для всей формы */
  formContainer: {
    marginBottom: SPACING.xl,
  } as ViewStyle,

  /** Контейнер для одного поля ввода */
  inputContainer: {
    marginBottom: SPACING.lg,
  } as ViewStyle,

  /** Подпись над полем ввода */
  labelText: {
    ...FONTS.medium,
    color: COLORS.text,
    marginBottom: SPACING.sm,
  } as TextStyle,

  /** Поле ввода */
  input: {
    backgroundColor: COLORS.surface,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    fontSize: FONTS.regular.fontSize,
    color: COLORS.text,
    fontWeight: '500' as const,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  } as TextStyle,

  /** Поле ввода при фокусе */
  inputFocused: {
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.1,
  } as TextStyle,

  /** Поле ввода с ошибкой */
  inputError: {
    borderColor: COLORS.error,
    backgroundColor: COLORS.errorLight,
  } as TextStyle,

  // Ошибки
  /** Текст ошибки */
  errorText: {
    ...FONTS.regular,
    color: COLORS.error,
    marginTop: SPACING.sm,
    marginLeft: SPACING.sm,
  } as TextStyle,

  /** Контейнер сообщения об ошибке */
  errorContainer: {
    backgroundColor: COLORS.errorLight,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    marginBottom: SPACING.lg,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.error,
  } as ViewStyle,

  // Кнопки
  /** Основная кнопка входа */
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  } as ViewStyle,

  /** Кнопка при нажатии */
  buttonPressed: {
    backgroundColor: COLORS.primaryDark,
    shadowOpacity: 0.15,
  } as ViewStyle,

  /** Отключённая кнопка */
  buttonDisabled: {
    backgroundColor: '#D1D5DB',
    opacity: 0.6,
  } as ViewStyle,

  /** Текст кнопки */
  buttonText: {
    ...FONTS.semibold,
    color: COLORS.surface,
    textAlign: 'center',
  } as TextStyle,

  /** Вторичная кнопка регистрации */
  secondaryButton: {
    backgroundColor: COLORS.surface,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,

  /** Текст вторичной кнопки */
  secondaryButtonText: {
    ...FONTS.semibold,
    color: COLORS.primary,
    textAlign: 'center',
  } as TextStyle,

  // Вспомогательно
  /** Контейнер ссылок внизу */
  bottomContainer: {
    marginTop: SPACING.xl,
    alignItems: 'center',
  } as ViewStyle,

  /** Текст ссылки */
  linkText: {
    ...FONTS.regular,
    color: COLORS.textSecondary,
    textAlign: 'center',
  } as TextStyle,

  /** Выделенный текст ссылки */
  linkHighlight: {
    color: COLORS.primary,
    fontWeight: '600' as const,
  } as TextStyle,

  // Загрузка
  /** Контейнер для индикатора загрузки */
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xl,
  } as ViewStyle,

  /** Текст "Загрузка..." */
  loadingText: {
    ...FONTS.medium,
    color: COLORS.textSecondary,
  } as TextStyle,
});

