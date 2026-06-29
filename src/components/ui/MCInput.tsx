import React from 'react';
import { TextInput, StyleSheet, TextInputProps, ViewStyle } from 'react-native';
import { Colors, Radius, Spacing, Typography } from '../../design-system';

interface MCInputProps extends TextInputProps {
  style?: ViewStyle;
}

export const MCInput: React.FC<MCInputProps> = ({ style, ...rest }) => {
  return <TextInput style={[styles.input, style]} placeholderTextColor={Colors.textSecondary} {...rest} />;
};

const styles = StyleSheet.create({
  input: {
    height: Spacing.inputHeight,
    borderRadius: Radius.md,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    paddingHorizontal: Spacing.md,
    color: Colors.textPrimary,
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.sizes.body.fontSize,
  },
});
