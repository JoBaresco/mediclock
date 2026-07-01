import { StyleSheet, View } from 'react-native';
import { Colors, Typography } from '../../theme';
import { MCText } from './MCText';

export function OnboardingHeader() {
  return (
    <View style={styles.container}>
      <MCText style={styles.wordmark}>
        Medi
        <MCText style={styles.wordmarkAccent}>Clock</MCText>
        <MCText style={styles.heart}> ♥</MCText>
      </MCText>
      <View style={styles.divider} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  wordmark: {
    fontFamily: Typography.fonts.title,
    fontSize: 22,
    color: Colors.text,
    letterSpacing: -0.3,
  },
  wordmarkAccent: {
    fontFamily: Typography.fonts.title,
    fontSize: 22,
    color: Colors.primary,
  },
  heart: {
    fontFamily: Typography.fonts.title,
    fontSize: 10,
    color: Colors.danger,
  },
  divider: {
    width: '100%',
    height: 0.5,
    backgroundColor: '#E8EDF2',
    marginTop: 10,
  },
});
