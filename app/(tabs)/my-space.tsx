import { View, StyleSheet, ScrollView } from 'react-native';
import { MCText } from '../../src/components/ui/MCText';
import { MCCard } from '../../src/components/ui/MCCard';
import { useTranslation } from '../../src/hooks/useTranslation';
import { Colors, Spacing } from '../../src/design-system';

export default function MySpaceScreen() {
  const { t } = useTranslation();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <MCText variant="h1">{t('mySpace.title')}</MCText>
      </View>
      <MCCard style={styles.card}>
        <MCText variant="body">{t('mySpace.healthProfile')}</MCText>
      </MCCard>
      <MCCard style={styles.card}>
        <MCText variant="body">{t('mySpace.myCircle')}</MCText>
      </MCCard>
      <MCCard style={styles.card}>
        <MCText variant="body">{t('mySpace.emergency')}</MCText>
      </MCCard>
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
});
