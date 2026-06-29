import { Platform, ViewStyle } from 'react-native';

const baseShadow: ViewStyle = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.08,
  shadowRadius: 12,
  elevation: 4,
};

export const Shadows: {
  sm: ViewStyle;
  md: ViewStyle;
} = {
  sm: Platform.select({
    ios: baseShadow,
    android: { elevation: 2 },
    default: baseShadow,
  }) as ViewStyle,
  md: Platform.select({
    ios: { ...baseShadow, shadowOpacity: 0.12, shadowRadius: 16 },
    android: { elevation: 4 },
    default: { ...baseShadow, shadowOpacity: 0.12, shadowRadius: 16 },
  }) as ViewStyle,
};
