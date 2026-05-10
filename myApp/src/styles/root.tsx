// ─────────────────────────────────────────────────────────────────────────────
// PRIMITIVE PALETTE
// Raw color inventory. Do not use directly in components — use theme tokens.
// ─────────────────────────────────────────────────────────────────────────────
const PALETTE = {
  // ── Whites & Blacks ────────────────────────────────────────────────────────
  white: '#FFFFFF',
  black: '#000000',

  // ── Grays (Light → Dark) ───────────────────────────────────────────────────
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',

  // ── Slate (for dark surfaces / skeleton shimmers) ──────────────────────────
  slate50: '#F8FAFC',
  slate100: '#F1F5F9',
  slate200: '#E2E8F0',
  slate300: '#CBD5E1',
  slate400: '#94A3B8',
  slate500: '#64748B',
  slate600: '#475569',
  slate700: '#334155',
  slate800: '#1E293B',
  slate900: '#0F172A',

  // ── Indigo (Brand Primary) ─────────────────────────────────────────────────
  indigo50: '#EEF2FF',
  indigo100: '#E0E7FF',
  indigo200: '#C7D2FE',
  indigo300: '#A5B4FC',
  indigo400: '#818CF8',
  indigo500: '#6366F1',
  indigo600: '#4F46E5',
  indigo700: '#4338CA',
  indigo800: '#3730A3',
  indigo900: '#312E81',

  // ── Pink / Accent ──────────────────────────────────────────────────────────
  pink50: '#FDF2F8',
  pink100: '#FCE7F3',
  pink200: '#FBCFE8',
  pink300: '#F9A8D4',
  pink400: '#F472B6',
  pink500: '#EC4899',
  pink600: '#DB2777',
  pink700: '#BE185D',

  // ── Emerald / Success ──────────────────────────────────────────────────────
  emerald50: '#ECFDF5',
  emerald100: '#D1FAE5',
  emerald200: '#BBF7D0',
  emerald300: '#6EE7B7',
  emerald400: '#34D399',
  emerald500: '#10B981',
  emerald600: '#059669',
  emerald700: '#047857',

  // ── Red / Error ────────────────────────────────────────────────────────────
  red50: '#FFF5F5',
  red100: '#FEE2E2',
  red200: '#FECACA',
  red300: '#FCA5A5',
  red400: '#F87171',
  red500: '#EF4444',
  red600: '#DC2626',

  // ── Amber / Warning ────────────────────────────────────────────────────────
  amber50: '#FFFBEB',
  amber100: '#FEF3C7',
  amber200: '#FDE68A',
  amber300: '#FCD34D',
  amber400: '#FBBF24',
  amber500: '#F59E0B',
  amber600: '#D97706',
  amber900: '#92400E',

  // ── Blue (Links) ───────────────────────────────────────────────────────────
  blue500: '#007AFF',

  // ── Telegram ──────────────────────────────────────────────────────────────
  telegramBlue: '#2AABEE',

  // ── Dark UI Surfaces (off-black family for dark theme elevation) ───────────
  dark50: '#2D2D3F',   // elevated card / modal surface
  dark100: '#252535',   // card / bottom sheet
  dark200: '#1E1E2E',   // surface (e.g. input background)
  dark300: '#17172A',   // background alt
  dark400: '#12121C',   // base background
  dark500: '#0D0D14',   // deepest shadow / scrim

  // ── Alpha ─────────────────────────────────────────────────────────────────
  blackAlpha45: 'rgba(0,0,0,0.45)',
  blackAlpha50: 'rgba(0,0,0,0.5)',
  whiteAlpha15: 'rgba(255,255,255,0.15)',
  whiteAlpha20: 'rgba(255,255,255,0.2)',
  whiteAlpha25: 'rgba(255,255,255,0.25)',
  whiteAlpha30: 'rgba(255,255,255,0.3)',
  whiteAlpha45: 'rgba(255,255,255,0.45)',
  whiteAlpha50: 'rgba(255,255,255,0.5)',
  whiteAlpha70: 'rgba(255,255,255,0.7)',
  indigoAlpha20: 'rgba(99,102,241,0.2)',
  indigoAlpha30: 'rgba(99,102,241,0.3)',
  modalOverlay: 'rgba(15,15,35,0.55)',
};

// ─────────────────────────────────────────────────────────────────────────────
// SEMANTIC THEME TYPE
// ─────────────────────────────────────────────────────────────────────────────
type ThemeColors = {
  // ── Backgrounds ─────────────────────────────────────────────────────────
  background: string;
  backgroundAlt: string;
  surface: string;
  surfaceRaised: string;
  surfaceSunken: string;

  // ── Text ────────────────────────────────────────────────────────────────
  text: string;
  textSecondary: string;
  textTertiary: string;
  textLight: string;
  textInverse: string;

  // ── Brand / Primary ─────────────────────────────────────────────────────
  primary: string;
  primaryDark: string;
  primaryLight: string;
  primaryDeep: string;
  primarySoft: string;
  primaryAlpha20: string;
  primaryAlpha30: string;

  // ── Accent ──────────────────────────────────────────────────────────────
  accent: string;
  accentDark: string;

  // ── Semantic States ─────────────────────────────────────────────────────
  success: string;
  successLight: string;
  successSoft: string;
  successBorder: string;
  error: string;
  errorLight: string;
  errorBorder: string;
  warning: string;
  warningLight: string;
  warningSoft: string;
  warningBorder: string;

  // ── Borders & Dividers ──────────────────────────────────────────────────
  border: string;
  borderDark: string;
  indigoBorder: string;
  indigoSoft: string;
  indigo100: string;

  // ── Chip / Badge tints ──────────────────────────────────────────────────
  pink50: string;
  pink100: string;
  pink200: string;
  green200: string;
  red50: string;
  red300: string;
  amber900: string;
  slate200: string;

  // ── Overlays & Scrim ────────────────────────────────────────────────────
  overlay: string;
  modalOverlay: string;
  shadow: string;
  whiteAlpha15: string;
  whiteAlpha20: string;
  whiteAlpha25: string;
  whiteAlpha30: string;
  whiteAlpha45: string;
  whiteAlpha50: string;
  whiteAlpha70: string;
  blackAlpha50: string;

  // ── Special ─────────────────────────────────────────────────────────────
  linkBlue: string;
  telegramBlue: string;
};

type Theme = { colors: ThemeColors };

// ─────────────────────────────────────────────────────────────────────────────
// LIGHT THEME
// ─────────────────────────────────────────────────────────────────────────────
const lightTheme: Theme = {
  colors: {
    // Backgrounds
    background: PALETTE.gray50,
    backgroundAlt: PALETTE.gray100,
    surface: PALETTE.white,
    surfaceRaised: PALETTE.white,
    surfaceSunken: PALETTE.gray100,

    // Text
    text: PALETTE.gray800,
    textSecondary: PALETTE.gray500,
    textTertiary: '#666666',
    textLight: PALETTE.gray300,
    textInverse: PALETTE.white,

    // Brand
    primary: PALETTE.indigo500,
    primaryDark: PALETTE.indigo600,
    primaryLight: PALETTE.indigo400,
    primaryDeep: PALETTE.indigo800,
    primarySoft: PALETTE.indigo50,
    primaryAlpha20: PALETTE.indigoAlpha20,
    primaryAlpha30: PALETTE.indigoAlpha30,

    // Accent
    accent: PALETTE.pink500,
    accentDark: PALETTE.pink600,

    // Semantic
    success: PALETTE.emerald500,
    successLight: PALETTE.emerald100,
    successSoft: PALETTE.emerald50,
    successBorder: PALETTE.emerald300,
    error: PALETTE.red500,
    errorLight: PALETTE.red100,
    errorBorder: PALETTE.red200,
    warning: PALETTE.amber500,
    warningLight: PALETTE.amber100,
    warningSoft: PALETTE.amber50,
    warningBorder: PALETTE.amber300,

    // Borders
    border: PALETTE.gray200,
    borderDark: PALETTE.gray300,
    indigoBorder: PALETTE.indigo200,
    indigoSoft: '#EEF2FFB0',
    indigo100: PALETTE.indigo100,

    // Tints
    pink50: PALETTE.pink50,
    pink100: PALETTE.pink100,
    pink200: PALETTE.pink200,
    green200: PALETTE.emerald200,
    red50: PALETTE.red50,
    red300: PALETTE.red300,
    amber900: PALETTE.amber900,
    slate200: PALETTE.slate200,

    // Overlays
    overlay: PALETTE.blackAlpha45,
    modalOverlay: PALETTE.modalOverlay,
    shadow: PALETTE.black,
    whiteAlpha15: PALETTE.whiteAlpha15,
    whiteAlpha20: PALETTE.whiteAlpha20,
    whiteAlpha25: PALETTE.whiteAlpha25,
    whiteAlpha30: PALETTE.whiteAlpha30,
    whiteAlpha45: PALETTE.whiteAlpha45,
    whiteAlpha50: PALETTE.whiteAlpha50,
    whiteAlpha70: PALETTE.whiteAlpha70,
    blackAlpha50: PALETTE.blackAlpha50,

    // Special
    linkBlue: PALETTE.blue500,
    telegramBlue: PALETTE.telegramBlue,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// DARK THEME
// ─────────────────────────────────────────────────────────────────────────────
const darkTheme: Theme = {
  colors: {
    // Backgrounds — off-black, layered elevation
    background: PALETTE.dark400,       // #12121C — base canvas
    backgroundAlt: PALETTE.dark300,       // #17172A — slightly lifted
    surface: PALETTE.dark200,       // #1E1E2E — cards, inputs
    surfaceRaised: PALETTE.dark100,       // #252535 — modals, sheets
    surfaceSunken: PALETTE.dark500,       // #0D0D14 — recessed areas

    // Text — inverted, high contrast
    text: PALETTE.gray50,        // near-white for main content
    textSecondary: PALETTE.slate400,      // muted mid-gray
    textTertiary: PALETTE.slate500,      // subtlest text / hints
    textLight: PALETTE.slate600,      // disabled / placeholder
    textInverse: PALETTE.gray800,       // text on light surfaces

    // Brand — slightly lightened to hold contrast on dark bg
    primary: PALETTE.indigo400,     // #818CF8 — brighter than 500
    primaryDark: PALETTE.indigo500,     // pressed state
    primaryLight: PALETTE.indigo300,     // #A5B4FC
    primaryDeep: PALETTE.indigo600,
    primarySoft: 'rgba(99,102,241,0.15)',
    primaryAlpha20: PALETTE.indigoAlpha20,
    primaryAlpha30: PALETTE.indigoAlpha30,

    // Accent
    accent: PALETTE.pink400,
    accentDark: PALETTE.pink500,

    // Semantic — muted backgrounds, vivid status colors
    success: PALETTE.emerald400,
    successLight: 'rgba(52,211,153,0.15)',
    successSoft: 'rgba(52,211,153,0.1)',
    successBorder: 'rgba(52,211,153,0.35)',
    error: PALETTE.red400,
    errorLight: 'rgba(248,113,113,0.15)',
    errorBorder: 'rgba(248,113,113,0.35)',
    warning: PALETTE.amber400,
    warningLight: 'rgba(251,191,36,0.15)',
    warningSoft: 'rgba(251,191,36,0.1)',
    warningBorder: 'rgba(251,191,36,0.35)',

    // Borders — subtle, almost invisible dividers
    border: 'rgba(255,255,255,0.1)',
    borderDark: 'rgba(255,255,255,0.18)',
    indigoBorder: 'rgba(165,180,252,0.3)',
    indigoSoft: 'rgba(99,102,241,0.12)',
    indigo100: 'rgba(99,102,241,0.2)',

    // Tints — desaturated / alpha versions for dark bg
    pink50: 'rgba(244,114,182,0.12)',
    pink100: 'rgba(244,114,182,0.18)',
    pink200: 'rgba(244,114,182,0.25)',
    green200: 'rgba(52,211,153,0.2)',
    red50: 'rgba(248,113,113,0.1)',
    red300: 'rgba(248,113,113,0.35)',
    amber900: PALETTE.amber900,
    slate200: PALETTE.slate700,

    // Overlays — same semantics, slightly more opaque
    overlay: 'rgba(0,0,0,0.65)',
    modalOverlay: 'rgba(5,5,15,0.75)',
    shadow: PALETTE.black,
    whiteAlpha15: PALETTE.whiteAlpha15,
    whiteAlpha20: PALETTE.whiteAlpha20,
    whiteAlpha25: PALETTE.whiteAlpha25,
    whiteAlpha30: PALETTE.whiteAlpha30,
    whiteAlpha45: PALETTE.whiteAlpha45,
    whiteAlpha50: PALETTE.whiteAlpha50,
    whiteAlpha70: PALETTE.whiteAlpha70,
    blackAlpha50: PALETTE.blackAlpha50,

    // Special
    linkBlue: '#4DA3FF',
    telegramBlue: PALETTE.telegramBlue,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// BACKWARD-COMPAT ALIAS
// All existing style files import COLORS — this keeps them working unchanged.
// To migrate a file: replace `COLORS.x` with `theme.colors.x` where `theme`
// comes from your theme context/hook.
// ─────────────────────────────────────────────────────────────────────────────
const COLORS = lightTheme.colors;

// ─────────────────────────────────────────────────────────────────────────────
// TYPOGRAPHY — Inter font scale (unchanged)
// ─────────────────────────────────────────────────────────────────────────────
const FONTS = {
  tiny: { fontSize: 8, fontWeight: '400' as const, fontFamily: 'Inter_400Regular', lineHeight: 12 },
  micro: { fontSize: 9, fontWeight: '400' as const, fontFamily: 'Inter_400Regular', lineHeight: 14 },
  mini: { fontSize: 10, fontWeight: '400' as const, fontFamily: 'Inter_400Regular', lineHeight: 14 },
  xs: { fontSize: 11, fontWeight: '400' as const, fontFamily: 'Inter_400Regular', lineHeight: 16 },
  small: { fontSize: 12, fontWeight: '400' as const, fontFamily: 'Inter_400Regular', lineHeight: 18 },
  sub: { fontSize: 13, fontWeight: '400' as const, fontFamily: 'Inter_400Regular', lineHeight: 18 },
  regular: { fontSize: 14, fontWeight: '400' as const, fontFamily: 'Inter_400Regular', lineHeight: 20 },
  medium_15: { fontSize: 15, fontWeight: '500' as const, fontFamily: 'Inter_500Medium', lineHeight: 22 },
  medium: { fontSize: 16, fontWeight: '500' as const, fontFamily: 'Inter_500Medium', lineHeight: 24 },
  semibold: { fontSize: 16, fontWeight: '600' as const, fontFamily: 'Inter_600SemiBold', lineHeight: 24 },
  bold: { fontSize: 18, fontWeight: '700' as const, fontFamily: 'Inter_700Bold', lineHeight: 28 },
  xl: { fontSize: 20, fontWeight: '600' as const, fontFamily: 'Inter_600SemiBold', lineHeight: 28 },
  xxl: { fontSize: 22, fontWeight: '700' as const, fontFamily: 'Inter_700Bold', lineHeight: 30 },
  h2: { fontSize: 24, fontWeight: '700' as const, fontFamily: 'Inter_700Bold', lineHeight: 32 },
  h1: { fontSize: 32, fontWeight: '800' as const, fontFamily: 'Inter_800ExtraBold', lineHeight: 40 },
};

// ─────────────────────────────────────────────────────────────────────────────
// SPACING — 4-pt base grid (unchanged)
// ─────────────────────────────────────────────────────────────────────────────
const SPACING = {
  none: 0,
  s1: 1,
  s2: 2,
  s3: 3,
  xs: 4,
  sm: 8,
  s10: 10,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  s56: 56,
  s100: 100,
};

// ─────────────────────────────────────────────────────────────────────────────
// BORDER RADIUS (unchanged)
// ─────────────────────────────────────────────────────────────────────────────
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

export { PALETTE, lightTheme, darkTheme, COLORS, FONTS, SPACING, RADIUS };
export type { Theme, ThemeColors };