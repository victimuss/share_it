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
};

// Типографика на шрифте Inter
const FONTS = {
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
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

// Скругления
const RADIUS = {
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export { COLORS, FONTS, SPACING, RADIUS };