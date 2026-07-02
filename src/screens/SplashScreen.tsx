import { ImageBackground, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from '../hooks/useTranslation';

type SplashScreenProps = {
  onAnimationComplete?: () => void;
};

export function SplashScreen({ onAnimationComplete }: SplashScreenProps) {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  return (
    <ImageBackground
      source={require('../../assets/images/screensplash_2.png')}
      style={[styles.background, { paddingBottom: insets.bottom }]}
      resizeMode="cover"
    >
      <TouchableOpacity style={styles.tapArea} activeOpacity={1} onPress={() => onAnimationComplete?.()}>
        <Text style={styles.tagline}>
          <Text style={styles.taglineRegular}>{t('tagline.line1')}{'\n'}</Text>
          <Text style={styles.taglineAccent}>{t('tagline.line2')}</Text>
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  tapArea: {
    flex: 1,
  },
  tagline: {
    position: 'absolute',
    top: '34%',
    width: '100%',
    textAlign: 'center',
  },
  taglineRegular: {
    fontFamily: 'Poppins_300Light',
    fontSize: 16,
    letterSpacing: 0.4,
    color: '#FFFFFF',
    opacity: 0.9,
    lineHeight: 23,
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },
  taglineAccent: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 17,
    letterSpacing: 0.4,
    color: '#FFFFFF',
    opacity: 1,
    lineHeight: 24,
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },
});
