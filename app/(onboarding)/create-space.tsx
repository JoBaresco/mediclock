import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { MCText } from '../../src/components/ui/MCText';
import { MCButton } from '../../src/components/ui/MCButton';
import { MCInput } from '../../src/components/ui/MCInput';
import { useTranslation } from '../../src/hooks/useTranslation';
import { Colors, Spacing } from '../../src/design-system';

export default function CreateSpaceScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <MCText variant="h1">{t('onboarding.createSpace.title')}</MCText>
      <MCText variant="body" color="secondary" style={styles.subtitle}>
        {t('onboarding.createSpace.subtitle')}
      </MCText>
      <MCInput placeholder={t('onboarding.createSpace.namePlaceholder')} />
      <MCButton label={t('onboarding.createSpace.cta')} onPress={() => router.push('/(onboarding)/first-treatment')} />
      <MCButton label={t('onboarding.createSpace.skip')} variant="ghost" onPress={() => router.push('/(onboarding)/first-treatment')} />
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
