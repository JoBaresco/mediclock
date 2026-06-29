import { ScrollView, View, StyleSheet } from 'react-native';
import { MCText } from '../../src/components/ui/MCText';
import { MCStatusCard } from '../../src/components/cards/MCStatusCard';
import { MCCard } from '../../src/components/ui/MCCard';
import { useTranslation } from '../../src/hooks/useTranslation';
import { useTodayStatus } from '../../src/hooks/useTodayStatus';
import { useUserStore } from '../../src/store/useUserStore';
import { Colors, Spacing } from '../../src/design-system';

export default function TodayScreen() {
  const { t } = useTranslation();
  const { status, title, subtitle } = useTodayStatus();
  const userName = useUserStore((state) => state.profile?.firstName ?? t('app.name'));
  const dateText = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <MCText variant="h1">{t('today.greeting', { name: userName })}</MCText>
        <MCText variant="small" color="secondary">
          {dateText}
        </MCText>
      </View>

      <MCStatusCard status={status} title={title} subtitle={subtitle} />

      <MCCard style={styles.section}>
        <MCText variant="caption" color="secondary">
          {t('today.nextAction')}
        </MCText>
        <MCText variant="body">{t('today.sampleAction')}</MCText>
        <MCText variant="small" color="secondary">{t('today.sampleActionDetail')}</MCText>
      </MCCard>

      <MCCard style={styles.section}>
        <MCText variant="caption" color="secondary">
          {t('today.nextAppointment')}
        </MCText>
        <MCText variant="body">{t('today.sampleAppointment')}</MCText>
        <MCText variant="small" color="secondary">{t('today.sampleAppointmentDetail')}</MCText>
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
    marginBottom: Spacing.sm,
  },
  section: {
    marginTop: Spacing.sm,
  },
});
