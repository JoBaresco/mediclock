import { ImageBackground, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from '../hooks/useTranslation';

type SplashScreenProps = {
  onAnimationComplete?: () => void;
};

export function SplashScreen({ onAnimationComplete }: SplashScreenProps) {
  const { t } = useTranslation();

  return (
    <ImageBackground
      source={require('../../assets/images/screensplash_1.png')}
      style={styles.background}
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
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.85,
    lineHeight: 20,
  },
  taglineAccent: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 1,
    lineHeight: 20,
  },
});
