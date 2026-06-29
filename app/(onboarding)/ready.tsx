import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { MCText } from '../../src/components/ui/MCText';
import { MCButton } from '../../src/components/ui/MCButton';
import { useTranslation } from '../../src/hooks/useTranslation';
import { Colors, Spacing } from '../../src/design-system';

export default function ReadyScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <MCText variant="h1">{t('onboarding.ready.title')}</MCText>
      <MCText variant="body" color="secondary" style={styles.subtitle}>
        {t('onboarding.ready.subtitle')}
      </MCText>
      <MCButton label={t('onboarding.ready.cta')} onPress={() => router.replace('/(tabs)/today')} />
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
