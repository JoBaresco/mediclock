import { Colors } from './colors';
import { Typography } from './typography';
import { Spacing } from './spacing';
import { Radius } from './radius';
import { Shadows } from './shadows';
import { Animations } from './animations';

export const Theme = {
  colors: Colors,
  typography: Typography,
  spacing: Spacing,
  radius: Radius,
  shadows: Shadows,
  animations: Animations,
} as const;

export type ThemeType = typeof Theme;
