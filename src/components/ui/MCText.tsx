import React from 'react';
import { Text, TextProps, StyleSheet, TextStyle } from 'react-native';
import { Typography, Colors } from '../../design-system';

type MCTextVariant = 'display' | 'h1' | 'h2' | 'body' | 'small' | 'caption';

type MCTextWeight = 'regular' | 'medium' | 'semiBold' | 'bold';

interface MCTextProps extends TextProps {
  variant?: MCTextVariant;
  weight?: MCTextWeight;
  color?: 'primary' | 'secondary' | 'tertiary' | 'inverse' | string;
  style?: TextStyle | TextStyle[];
  children: React.ReactNode;
}

const variantStyles = {
  display: Typography.sizes.display,
  h1: Typography.sizes.h1,
  h2: Typography.sizes.h2,
  body: Typography.sizes.body,
  small: Typography.sizes.small,
  caption: Typography.sizes.caption,
} as const;

const weightStyles: Record<MCTextWeight, TextStyle> = {
  regular: { fontFamily: Typography.fonts.regular },
  medium: { fontFamily: Typography.fonts.medium },
  semiBold: { fontFamily: Typography.fonts.semiBold },
  bold: { fontFamily: Typography.fonts.bold },
};

export const MCText: React.FC<MCTextProps> = ({
  variant = 'body',
  weight = 'regular',
  color = 'primary',
  style,
  children,
  ...rest
}) => {
  const textColor =
    color === 'primary'
      ? Colors.textPrimary
      : color === 'secondary'
      ? Colors.textSecondary
      : color === 'tertiary'
      ? Colors.textTertiary
      : color === 'inverse'
      ? Colors.textInverse
      : color;

  return (
    <Text style={[styles.base, variantStyles[variant], weightStyles[weight], { color: textColor }, style]} {...rest}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    margin: 0,
    padding: 0,
  },
});
