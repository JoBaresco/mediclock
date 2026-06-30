import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle, TextStyle, GestureResponderEvent } from 'react-native';
import { Colors, Radius, Spacing } from '../../design-system';
import { MCText } from './MCText';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface MCButtonProps {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
}

export const MCButton: React.FC<MCButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = true,
  style,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      style={[
        styles.base,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        style,
      ]}
    >
      <MCText variant="body" weight="semiBold" style={[styles.label, styles[`${variant}Label`]]}>
        {label}
      </MCText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: Spacing.buttonHeight,
    paddingHorizontal: 10,
  } as ViewStyle,
  primary: {
    backgroundColor: Colors.mediClockBlue,
  } as ViewStyle,
  secondary: {
    backgroundColor: Colors.softBlueSurface,
    borderWidth: 1,
    borderColor: Colors.mediClockBlue,
  } as ViewStyle,
  ghost: {
    backgroundColor: 'transparent',
  } as ViewStyle,
  danger: {
    backgroundColor: Colors.calmRed,
  } as ViewStyle,
  sm: {
    height: 40,
    paddingHorizontal: 10,
  } as ViewStyle,
  md: {
    height: 54,
    paddingHorizontal: 10,
  } as ViewStyle,
  lg: {
    height: 60,
    paddingHorizontal: 10,
  } as ViewStyle,
  fullWidth: {
    width: '100%',
  } as ViewStyle,
  disabled: {
    opacity: 0.5,
  } as ViewStyle,
  label: {
    fontSize: 14,
    lineHeight: 18,
  } as TextStyle,
  primaryLabel: {
    color: Colors.textInverse,
  } as TextStyle,
  secondaryLabel: {
    color: Colors.mediClockBlue,
  } as TextStyle,
  ghostLabel: {
    color: Colors.mediClockBlue,
  } as TextStyle,
  dangerLabel: {
    color: Colors.textInverse,
  } as TextStyle,
});
