import { useEffect, useRef } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, View } from 'react-native';
import { MCText } from './MCText';
import { Colors, Typography } from '../../theme';

const ITEM_HEIGHT = 44;
const VISIBLE_ITEMS = 5;

type WheelPickerProps = {
  values: number[];
  selectedValue: number;
  onChange: (value: number) => void;
  label?: string;
};

export function WheelPicker({ values, selectedValue, onChange, label }: WheelPickerProps) {
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    const index = Math.max(0, values.indexOf(selectedValue));
    const timeout = setTimeout(() => {
      scrollRef.current?.scrollTo({ y: index * ITEM_HEIGHT, animated: false });
    }, 0);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSnap = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.y / ITEM_HEIGHT);
    const clamped = Math.max(0, Math.min(values.length - 1, index));
    scrollRef.current?.scrollTo({ y: clamped * ITEM_HEIGHT, animated: true });
    onChange(values[clamped]);
  };

  return (
    <View style={styles.container}>
      {label ? <MCText style={styles.label}>{label}</MCText> : null}
      <View style={styles.wheel}>
        <View pointerEvents="none" style={styles.selectionHighlight} />
        <ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate="fast"
          contentContainerStyle={styles.scrollContent}
          onMomentumScrollEnd={onSnap}
        >
          {values.map((value) => (
            <View key={value} style={styles.item}>
              <MCText style={value === selectedValue ? [styles.itemText, styles.itemTextActive] : styles.itemText}>
                {value}
              </MCText>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  label: {
    fontFamily: Typography.fonts.title,
    fontSize: 13,
    color: Colors.text,
    marginBottom: 8,
  },
  wheel: {
    height: ITEM_HEIGHT * VISIBLE_ITEMS,
    width: 100,
  },
  selectionHighlight: {
    position: 'absolute',
    top: ITEM_HEIGHT * 2,
    left: 0,
    right: 0,
    height: ITEM_HEIGHT,
    backgroundColor: Colors.softBlueSurface,
    borderRadius: 12,
  },
  scrollContent: {
    paddingVertical: ITEM_HEIGHT * 2,
  },
  item: {
    height: ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    fontFamily: Typography.fonts.body,
    fontSize: 18,
    color: '#9CA3AF',
  },
  itemTextActive: {
    fontFamily: Typography.fonts.title,
    fontSize: 22,
    color: Colors.primary,
  },
});
