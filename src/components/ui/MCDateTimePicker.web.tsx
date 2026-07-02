import type { ComponentType } from 'react';
import { Colors, Typography } from '../../theme';
import type { MCDateTimePickerProps } from './MCDateTimePicker';

// react-native-web renders unrecognized host tags straight to the DOM,
// so a plain <input type="date"/"time"> gives us a real native picker on web too.
// This bypasses RN's StyleSheet (which validates against RN-only style props),
// so styling here uses plain CSS via a regular object, not StyleSheet.create.
const WebInput = 'input' as unknown as ComponentType<Record<string, unknown>>;

const baseInputStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '#FFFFFF',
  borderRadius: 14,
  paddingLeft: 12,
  paddingRight: 12,
  paddingTop: 13,
  paddingBottom: 13,
  fontFamily: Typography.fonts.body,
  fontSize: 13,
  color: Colors.text,
  border: '1.5px solid #E8EDF2',
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
};

export function MCDateTimePicker({ mode, value, onChange, style }: MCDateTimePickerProps) {
  const webValue =
    mode === 'date'
      ? value.toISOString().slice(0, 10)
      : `${String(value.getHours()).padStart(2, '0')}:${String(value.getMinutes()).padStart(2, '0')}`;

  return (
    <WebInput
      type={mode}
      value={webValue}
      onChange={(event: { target: { value: string } }) => {
        const raw = event.target.value;
        if (!raw) {
          return;
        }
        const next = new Date(value);
        if (mode === 'date') {
          const [year, month, day] = raw.split('-').map(Number);
          next.setFullYear(year, month - 1, day);
        } else {
          const [hours, minutes] = raw.split(':').map(Number);
          next.setHours(hours, minutes, 0, 0);
        }
        onChange(next);
      }}
      style={{ ...baseInputStyle, ...(style as object) }}
    />
  );
}
