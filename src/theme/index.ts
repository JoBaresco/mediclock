export const Colors = {
  primary: '#2F80ED',
  background: '#FAFBFC',
  text: '#102033',
  success: '#2FBF71',
  danger: '#E85C5C',
  warning: '#F5A623',
  muted: '#6B7280',
  info: '#2F80ED',
  error: '#E85C5C',

  // Compatibility aliases used by existing UI components.
  mediclockBlue: '#2F80ED',
  warmWhite: '#FAFBFC',
  deepNavy: '#102033',
  serenityGreen: '#2FBF71',
  calmRed: '#E85C5C',
  softWarning: '#F5A623',
  calmGray: '#6B7280',
  textPrimary: '#102033',
  textSecondary: '#6B7280',
  textTertiary: '#6B7280',
  textInverse: '#FAFBFC',
  surface: '#FFFFFF',
  surfaceSecondary: '#FAFBFC',
  softBlueSurface: '#F1F7FF',
  border: '#E5E9F0',
  borderLight: '#F0F4F8',
  dark: {
    background: '#0A1628',
    surface: '#102033',
    surfaceSecondary: '#1A2E45',
    textPrimary: '#FAFBFC',
    textSecondary: '#6B7280',
    border: '#1E3A5F',
  },
} as const;

export const Typography = {
  fonts: {
    title: 'Poppins_700Bold',
    body: 'Inter_400Regular',

    // Compatibility aliases used by existing UI components.
    regular: 'Inter_400Regular',
    medium: 'Poppins_700Bold',
    semiBold: 'Poppins_700Bold',
    bold: 'Poppins_700Bold',
  },
} as const;

export const Theme = {
  colors: Colors,
  typography: Typography,
} as const;

export type ThemeType = typeof Theme;