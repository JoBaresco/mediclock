import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { MCText } from '../../src/components/ui/MCText';
import { MCButton } from '../../src/components/ui/MCButton';
import { useTranslation } from '../../src/hooks/useTranslation';
import { Colors, Spacing } from '../../src/design-system';

export default function MyCircleScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <MCText variant="h1">{t('onboarding.myCircle.title')}</MCText>
      <MCText variant="body" color="secondary" style={styles.subtitle}>
        {t('onboarding.myCircle.subtitle')}
      </MCText>
      <MCButton label={t('onboarding.myCircle.cta')} onPress={() => undefined} />
      <MCButton label={t('onboarding.myCircle.skip')} variant="ghost" onPress={() => router.push('/(onboarding)/ready')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.screenHorizontal,
    justifyContent: 'center',
    backgroundColor: Colors.warmWhite,
  },
  subtitle: {
    marginBottom: Spacing.xl,
  },
});
