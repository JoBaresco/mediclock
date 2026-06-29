import { View, StyleSheet, ScrollView } from 'react-native';
import { MCText } from '../../src/components/ui/MCText';
import { MCCard } from '../../src/components/ui/MCCard';
import { MCButton } from '../../src/components/ui/MCButton';
import { useTranslation } from '../../src/hooks/useTranslation';
import { Colors, Spacing } from '../../src/design-system';

export default function TreatmentsScreen() {
  const { t } = useTranslation();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <MCText variant="h1">{t('treatments.title')}</MCText>
      </View>
      <MCCard style={styles.card}>
        <MCText variant="body">{t('treatments.empty')}</MCText>
        <MCText variant="small" color="secondary" style={styles.hint}>
          {t('treatments.emptyHint')}
        </MCText>
      </MCCard>
      <MCButton label={t('treatments.add')} onPress={() => undefined} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.warmWhite,
  },
  content: {
    paddingHorizontal: Spacing.screenHorizontal,
    paddingBottom: 100,
  },
  header: {
    marginVertical: Spacing.sm,
  },
  card: {
    padding: Spacing.md,
  },
  hint: {
    marginTop: Spacing.sm,
  },
});
