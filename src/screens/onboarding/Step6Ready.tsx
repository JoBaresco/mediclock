import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MCButton } from '../../components/ui/MCButton';
import { MCText } from '../../components/ui/MCText';
import { useTranslation } from '../../hooks/useTranslation';
import { Typography } from '../../theme';

type Step6ReadyProps = {
  onFinish: () => void;
};

export function Step6Ready({ onFinish }: Step6ReadyProps) {
  const { t } = useTranslation();

  return (
    <ImageBackground
      source={require('../../../assets/images/step6ready_pret.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <View style={styles.content}>
          <MCText style={styles.title}>Tout est prêt !</MCText>
          <Text style={styles.tagline}>
            <Text style={styles.taglineRegular}>{t('tagline.line1')}{'\n'}</Text>
            <Text style={styles.taglineAccent}>{t('tagline.line2')}</Text>
          </Text>
        </View>

        <View style={styles.actions}>
          <MCButton label="Entrer dans MediClock" onPress={onFinish} style={styles.primaryButton} />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    paddingTop: 20,
    paddingBottom: 20,
  },
  content: {
    marginTop: '20%',
    alignItems: 'center',
  },
  title: {
    fontFamily: Typography.fonts.title,
    fontSize: 26,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
  },
  tagline: {
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
  actions: {
    width: '100%',
  },
  primaryButton: {
    borderRadius: 16,
  },
});
