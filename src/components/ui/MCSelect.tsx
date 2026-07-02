import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { MCText } from './MCText';
import { Colors, Typography } from '../../theme';

export type MCSelectOption = {
  label: string;
  value: string;
};

type MCSelectProps = {
  value: string;
  options: MCSelectOption[];
  onSelect: (value: string) => void;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
};

export function MCSelect({ value, options, onSelect, placeholder, style }: MCSelectProps) {
  const [visible, setVisible] = useState(false);
  const insets = useSafeAreaInsets();
  const selectedLabel = options.find((option) => option.value === value)?.label;

  return (
    <>
      <Pressable style={[styles.inputRow, style]} onPress={() => setVisible(true)}>
        <MCText style={selectedLabel ? styles.value : styles.placeholder}>
          {selectedLabel ?? placeholder ?? ''}
        </MCText>
        <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
          <Path d="M6 9l6 6 6-6" stroke={Colors.muted} strokeWidth={2} strokeLinecap="round" />
        </Svg>
      </Pressable>

      <Modal visible={visible} transparent animationType="fade" onRequestClose={() => setVisible(false)}>
        <Pressable style={styles.backdrop} onPress={() => setVisible(false)}>
          <Pressable style={[styles.sheet, { paddingBottom: insets.bottom + 16 }]} onPress={(event) => event.stopPropagation()}>
            <ScrollView bounces={false}>
              {options.map((option) => {
                const isActive = option.value === value;
                return (
                  <Pressable
                    key={option.value}
                    style={styles.optionRow}
                    onPress={() => {
                      onSelect(option.value);
                      setVisible(false);
                    }}
                  >
                    <MCText style={isActive ? [styles.optionText, styles.optionTextActive] : styles.optionText}>
                      {option.label}
                    </MCText>
                  </Pressable>
                );
              })}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: Colors.primary,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  value: {
    fontFamily: Typography.fonts.body,
    fontSize: 14,
    color: Colors.text,
  },
  placeholder: {
    fontFamily: Typography.fonts.body,
    fontSize: 14,
    color: '#9CA3AF',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(16, 32, 51, 0.4)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '60%',
    paddingVertical: 8,
  },
  optionRow: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  optionText: {
    fontFamily: Typography.fonts.body,
    fontSize: 16,
    color: Colors.text,
  },
  optionTextActive: {
    fontFamily: Typography.fonts.title,
    color: Colors.primary,
  },
});
