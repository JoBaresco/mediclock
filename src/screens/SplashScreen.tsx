import { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography } from '../theme';
import { MCText } from '../components/ui/MCText';

type SplashScreenProps = {
  onAnimationComplete?: () => void;
};

export function SplashScreen({ onAnimationComplete }: SplashScreenProps) {
  const pulse = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const bgOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in background image
    Animated.timing(bgOpacity, {
      toValue: 0.18,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Logo pulse animation
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(pulse, {
            toValue: 1.04,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(pulse, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 0.9,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();

    const timeout = setTimeout(() => {
      onAnimationComplete?.();
    }, 1800);

    return () => {
      clearTimeout(timeout);
      pulse.stopAnimation();
      opacity.stopAnimation();
      bgOpacity.stopAnimation();
    };
  }, [onAnimationComplete, opacity, pulse, bgOpacity]);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Image narrative en fond, très subtile */}
      <Animated.Image
        source={require('../../assets/images/silhoutte_bout_chemin_II.png')}
        style={[styles.bgImage, { opacity: bgOpacity }]}
        resizeMode="cover"
      />

      <Animated.View style={[styles.centerWrap, { opacity, transform: [{ scale: pulse }] }]}>
        {/* Logo sans fond — plus propre sur fond sombre */}
        <Image
          source={require('../../assets/images/Logo_Master_MC.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.accent} />
        <MCText style={styles.slogan}>La vie continue, on s'occupe du reste.</MCText>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 22,
  },
  bgImage: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '55%',
  },
  centerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 330,
  },
  logo: {
    width: 180,
    height: 60,
    marginBottom: 14,
  },
  accent: {
    width: 62,
    height: 4,
    borderRadius: 999,
    backgroundColor: '#DCE9FD',
    marginBottom: 14,
  },
  slogan: {
    textAlign: 'center',
    color: Colors.text,
    fontFamily: Typography.fonts.body,
    fontSize: 15,
    lineHeight: 22,
    letterSpacing: 0.12,
    maxWidth: 292,
  },
});
