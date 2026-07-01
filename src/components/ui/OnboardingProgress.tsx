import { StyleSheet, View } from 'react-native';

type OnboardingProgressProps = {
  total: number;
  activeIndex: number;
  activeColor: string;
};

export function OnboardingProgress({ total, activeIndex, activeColor }: OnboardingProgressProps) {
  return (
    <View style={styles.row}>
      {Array.from({ length: total }).map((_, index) => {
        const isActive = activeIndex === -1 || index === activeIndex;
        return (
          <View key={index} style={[styles.dot, isActive && { backgroundColor: activeColor }]} />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 20,
  },
  dot: {
    width: 28,
    height: 4,
    borderRadius: 4,
    backgroundColor: '#D0E4FB',
  },
});
