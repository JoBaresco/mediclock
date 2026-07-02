import { ReactNode, useState } from 'react';
import { Platform, Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MCText } from './MCText';
import { Colors, Typography } from '../../theme';

export type MCDateTimePickerProps = {
  mode: 'date' | 'time';
  value: Date;
  onChange: (date: Date) => void;
  label: string;
  icon?: ReactNode;
  style?: StyleProp<ViewStyle>;
  placeholder?: boolean;
};

export function MCDateTimePicker({ mode, value, onChange, label, icon, style, placeholder }: MCDateTimePickerProps) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Pressable style={[styles.inputRow, style]} onPress={() => setVisible(true)}>
        <MCText style={placeholder ? styles.placeholder : styles.value}>{label}</MCText>
        {icon}
      </Pressable>
      {visible ? (
        <DateTimePicker
          value={value}
          mode={mode}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onValueChange={(_event, selectedDate) => {
            setVisible(false);
            if (selectedDate) {
              onChange(selectedDate);
            }
          }}
          onDismiss={() => setVisible(false)}
        />
      ) : null}
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
    borderColor: '#E8EDF2',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 13,
  },
  value: {
    fontFamily: Typography.fonts.body,
    fontSize: 13,
    color: Colors.text,
  },
  placeholder: {
    fontFamily: Typography.fonts.body,
    fontSize: 13,
    color: '#9CA3AF',
  },
});
