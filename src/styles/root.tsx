// Color Palette
const COLORS = {
  primary: '#6366F1',
  primaryDark: '#4F46E5',
  primaryLight: '#818CF8',
  accent: '#EC4899',
  background: '#F9FAFB',
  surface: '#FFFFFF',
  text: '#1F2937',
  textSecondary: '#6B7280',
  textLight: '#D1D5DB',
  border: '#E5E7EB',
  borderDark: '#D1D5DB',
  success: '#10B981',
  error: '#EF4444',
  errorLight: '#FEE2E2',
  warning: '#F59E0B',
  shadow: '#000000',
};

// Typography with Inter Font
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

// Spacing
const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

// Border Radius
const RADIUS = {
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export { COLORS, FONTS, SPACING, RADIUS };