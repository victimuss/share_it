// Цветовая палитра
const COLORS = {
  // Основной фирменный цвет для главных действий и акцентов
  primary: '#6366F1',
  // Более тёмный основной цвет для нажатых/активных элементов
  primaryDark: '#4F46E5',
  // Светлый оттенок основного цвета для декоративных фонов
  primaryLight: '#818CF8',
  // Вторичный акцентный цвет для выделений
  accent: '#EC4899',
  // Фон страниц приложения
  background: '#F9FAFB',
  // Цвет поверхностей: карточек, инпутов и блоков
  surface: '#FFFFFF',
  // Основной цвет текста для заголовков и контента
  text: '#1F2937',
  // Вторичный цвет текста для подсказок и подзаголовков
  textSecondary: '#6B7280',
  // Светлый оттенок текста/состояние disabled
  textLight: '#D1D5DB',
  // Стандартный цвет границ и нейтральных разделителей
  border: '#E5E7EB',
  // Более тёмная нейтральная граница для disabled/сильных разделителей
  borderDark: '#D1D5DB',
  // Позитивный цвет для успешных и завершённых состояний
  success: '#10B981',
  // Цвет ошибки/опасности для валидации и алертов
  error: '#EF4444',
  // Светлый фон ошибки для контейнеров с алертами
  errorLight: '#FEE2E2',
  // Цвет предупреждения для статусов средней важности
  warning: '#F59E0B',
  // Базовый цвет тени (используется с прозрачностью)
  shadow: '#000000',
  // Очень светлый индиго-фон для чипов и бейджей
  indigoSoft: '#eef2ffb0',
  // Светлая индиго-граница для обводок чипов
  indigoBorder: '#C7D2FE',
  // Светло-зелёный фон для beginner/success чипов
  successLight: '#D1FAE5',
  // Светло-янтарный фон для intermediate/warning чипов
  warningLight: '#FEF3C7',
  // Официальный синий Telegram
  
  textTertiary: '#666',
  linkBlue: '#007AFF',
  warningSoft: '#FFFBEB',
  primaryAlpha30: 'rgba(99,102,241,0.3)',
  warningBorder: '#FCD34D',
  accentDark: '#DB2777',
  whiteAlpha20: 'rgba(255,255,255,0.2)',
  primarySoft: '#EEF2FF',
  pink50: '#FDF2F8',
  pink100: '#FCE7F3',
  whiteAlpha30: 'rgba(255,255,255,0.3)',
  pink200: '#FBCFE8',
  overlay: 'rgba(0,0,0,0.45)',
  backgroundAlt: '#F3F4F6',
  successBorder: '#6EE7B7',
  errorBorder: '#FECACA',
  primaryDeep: '#3730A3',
  darkSurface: '#1E1E2E',
  darkSurfaceAlt: '#2D2D3F',
  whiteAlpha15: 'rgba(255,255,255,0.15)',
  successSoft: '#F0FDF4',
  blackAlpha50: 'rgba(0,0,0,0.5)',
  whiteAlpha70: 'rgba(255, 255, 255, 0.7)',
  red300: '#FCA5A5',
  amber900: '#92400E',
  whiteAlpha45: 'rgba(255,255,255,0.45)',
  darkBackground: '#12121C',
  indigo100: '#E0E7FF',
  black: '#000',
  whiteAlpha25: 'rgba(255,255,255,0.25)',
  green200: '#BBF7D0',
  modalOverlay: 'rgba(15, 15, 35, 0.55)',
  red50: '#FFF5F5',
  
  whiteAlpha50: 'rgba(255,255,255,0.5)',
  primaryAlpha20: 'rgba(99,102,241,0.2)',
  slate200: '#E2E8F0',
  telegramBlue: '#2AABEE',
};

// Типографика на шрифте Inter
const FONTS = {
  
  tiny: { fontSize: 8, fontWeight: '400' as const, fontFamily: 'Inter_400Regular', lineHeight: 12 },
  micro: { fontSize: 9, fontWeight: '400' as const, fontFamily: 'Inter_400Regular', lineHeight: 14 },
  mini: { fontSize: 10, fontWeight: '400' as const, fontFamily: 'Inter_400Regular', lineHeight: 14 },
  xs: { fontSize: 11, fontWeight: '400' as const, fontFamily: 'Inter_400Regular', lineHeight: 16 },
  small: { fontSize: 12, fontWeight: '400' as const, fontFamily: 'Inter_400Regular', lineHeight: 18 },
  sub: { fontSize: 13, fontWeight: '400' as const, fontFamily: 'Inter_400Regular', lineHeight: 18 },
  medium_15: { fontSize: 15, fontWeight: '500' as const, fontFamily: 'Inter_500Medium', lineHeight: 22 },
  xl: { fontSize: 20, fontWeight: '600' as const, fontFamily: 'Inter_600SemiBold', lineHeight: 28 },
  xxl: { fontSize: 22, fontWeight: '700' as const, fontFamily: 'Inter_700Bold', lineHeight: 30 },
  regular: {
    fontSize: 14,
    fontWeight: '400' as const,
    fontFamily: 'Inter_400Regular',
    lineHeight: 20,
  },
  medium: {
    fontSize: 16,
    fontWeight: '500' as const,
    fontFamily: 'Inter_500Medium',
    lineHeight: 24,
  },
  semibold: {
    fontSize: 16,
    fontWeight: '600' as const,
    fontFamily: 'Inter_600SemiBold',
    lineHeight: 24,
  },
  bold: {
    fontSize: 18,
    fontWeight: '700' as const,
    fontFamily: 'Inter_700Bold',
    lineHeight: 28,
  },
  h1: {
    fontSize: 32,
    fontWeight: '800' as const,
    fontFamily: 'Inter_800ExtraBold',
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700' as const,
    fontFamily: 'Inter_700Bold',
    lineHeight: 32,
  },
};

// Отступы
const SPACING = {
  
  none: 0,
  s1: 1,
  s2: 2,
  s3: 3,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,

  s10: 10,
  s56: 56,
  s100: 100,

};

// Скругления
const RADIUS = {
  
  none: 0,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,

  xxl: 28,
  xxxl: 32,

  full: 9999,
};

export { COLORS, FONTS, SPACING, RADIUS };