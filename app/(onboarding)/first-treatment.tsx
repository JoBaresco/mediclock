import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { MCText } from '../../src/components/ui/MCText';
import { MCButton } from '../../src/components/ui/MCButton';
import { useTranslation } from '../../src/hooks/useTranslation';
import { Colors, Spacing } from '../../src/design-system';

export default function FirstTreatmentScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <MCText variant="h1">{t('onboarding.firstTreatment.title')}</MCText>
      <MCText variant="body" color="secondary" style={styles.subtitle}>
        {t('onboarding.firstTreatment.subtitle')}
      </MCText>
      <MCButton label={t('onboarding.firstTreatment.ctaScan')} onPress={() => undefined} />
      <MCButton label={t('onboarding.firstTreatment.ctaManual')} variant="secondary" onPress={() => undefined} />
      <MCButton label={t('onboarding.firstTreatment.skip')} variant="ghost" onPress={() => router.push('/(onboarding)/first-appointment')} />
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
