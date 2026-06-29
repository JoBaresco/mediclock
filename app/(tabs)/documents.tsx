import { View, StyleSheet, ScrollView } from 'react-native';
import { MCText } from '../../src/components/ui/MCText';
import { MCButton } from '../../src/components/ui/MCButton';
import { MCCard } from '../../src/components/ui/MCCard';
import { useTranslation } from '../../src/hooks/useTranslation';
import { Colors, Spacing } from '../../src/design-system';

export default function DocumentsScreen() {
  const { t } = useTranslation();
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <MCText variant="h1">{t('documents.title')}</MCText>
      </View>
      <MCCard style={styles.card}>
        <MCText variant="body">{t('documents.empty')}</MCText>
        <MCText variant="small" color="secondary" style={styles.hint}>
          {t('documents.emptyHint')}
        </MCText>
      </MCCard>
      <MCButton label={t('documents.add')} onPress={() => undefined} />
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
