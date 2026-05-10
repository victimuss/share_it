import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Theme, FONTS, SPACING, RADIUS } from './root';

export const authStyles = (theme: Theme) => StyleSheet.create({
  // Основные контейнеры
  /** Основной контейнер страницы */
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
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
    color: theme.colors.text,
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
    color: theme.colors.text,
    marginBottom: SPACING.sm,
  } as TextStyle,

  /** Поле ввода */
  input: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    marginBottom: SPACING.md,
    fontSize: FONTS.regular.fontSize,
    color: theme.colors.text,
    fontWeight: '500' as const,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  } as TextStyle,

  /** Поле ввода при фокусе */
  inputFocused: {
    borderColor: theme.colors.primary,
    shadowColor: theme.colors.primary,
    shadowOpacity: 0.1,
  } as TextStyle,

  /** Поле ввода с ошибкой */
  inputError: {
    borderColor: theme.colors.error,
    backgroundColor: theme.colors.errorLight,
  } as TextStyle,

  // Ошибки
  /** Текст ошибки */
  errorText: {
    ...FONTS.regular,
    color: theme.colors.error,
    marginTop: SPACING.sm,
    marginLeft: SPACING.sm,
  } as TextStyle,

  /** Контейнер сообщения об ошибке */
  errorContainer: {
    backgroundColor: theme.colors.errorLight,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    marginBottom: SPACING.lg,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.error,
  } as ViewStyle,

  // Кнопки
  /** Основная кнопка входа */
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  } as ViewStyle,

  /** Кнопка при нажатии */
  buttonPressed: {
    backgroundColor: theme.colors.primaryDark,
    shadowOpacity: 0.15,
  } as ViewStyle,

  /** Отключённая кнопка */
  buttonDisabled: {
    backgroundColor: theme.colors.borderDark,
    opacity: 0.6,
  } as ViewStyle,

  /** Текст кнопки */
  buttonText: {
    ...FONTS.semibold,
    color: theme.colors.surface,
    textAlign: 'center',
  } as TextStyle,

  /** Вторичная кнопка регистрации */
  secondaryButton: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1.5,
    borderColor: theme.colors.primary,
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING.md,
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.lg,
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,

  /** Текст вторичной кнопки */
  secondaryButtonText: {
    ...FONTS.semibold,
    color: theme.colors.primary,
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
    color: theme.colors.textSecondary,
    textAlign: 'center',
  } as TextStyle,

  /** Выделенный текст ссылки */
  linkHighlight: {
    color: theme.colors.primary,
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
    color: theme.colors.textSecondary,
  } as TextStyle,
  legalText: {
    fontSize: FONTS.small.fontSize,
    color: theme.colors.textTertiary,
    textAlign: 'center',
    marginTop: SPACING.xl,
  } as TextStyle,
  link: {
    color: theme.colors.linkBlue,
    textDecorationLine: 'underline',
  } as TextStyle,
});

