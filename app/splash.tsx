import { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from '../src/hooks/useTranslation';
import { Colors, Spacing } from '../src/design-system';
import { MCText } from '../src/components/ui/MCText';

export default function SplashScreen() {
  const { t } = useTranslation();
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(800),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start(() => {
      router.replace('/(onboarding)/welcome');
    });
  }, [opacity, scale]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.card, { opacity, transform: [{ scale }] }]}> 
        <MCText variant="display" weight="bold" style={styles.logo}>
          {t('app.name')}
        </MCText>
        <MCText variant="caption" color="secondary" style={styles.tagline}>
          {t('splash.message')}
        </MCText>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.warmWhite,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.screenHorizontal,
  },
  card: {
    alignItems: 'center',
  },
  logo: {
    color: Colors.deepNavy,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  tagline: {
    textAlign: 'center',
    marginTop: Spacing.sm,
  },
});
