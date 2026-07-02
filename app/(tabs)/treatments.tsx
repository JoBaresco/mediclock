import { useMemo, useState } from 'react';
import { Alert, Image, Platform, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { AppHeaderLogo } from '../../src/components/ui/AppHeaderLogo';
import { MCText } from '../../src/components/ui/MCText';
import { MCCard } from '../../src/components/ui/MCCard';
import { MCButton } from '../../src/components/ui/MCButton';
import { MCInput } from '../../src/components/ui/MCInput';
import { MCDateTimePicker } from '../../src/components/ui/MCDateTimePicker';
import { TabScreenScrollView } from '../../src/components/ui/TabScreenScrollView';
import { Colors, Spacing } from '../../src/design-system';
import { useTranslation } from '../../src/hooks/useTranslation';
import { useTreatmentStore } from '../../src/store/useTreatmentStore';
import { useAppStore } from '../../src/store/useAppStore';
import { LocalNotificationService } from '../../src/services/notifications';
import type { TreatmentSchedule } from '../../src/types/treatment.types';
import { getBcp47Locale } from '../../src/i18n/dateLocale';

export default function TreatmentsScreen() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const locale = getBcp47Locale(i18n.language);
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState(t('treatments.addMedication.dosageDefault'));
  const [time, setTime] = useState('08:00');
  const [frequency, setFrequency] = useState<TreatmentSchedule['frequency']>('daily');
  const [everyXDays, setEveryXDays] = useState('2');
  const [editingTreatmentId, setEditingTreatmentId] = useState<string | null>(null);
  const [historyFilter, setHistoryFilter] = useState<'day' | 'week'>('day');

  const treatments = useTreatmentStore((state) => state.treatments);
  const intakes = useTreatmentStore((state) => state.intakes);
  const addTreatment = useTreatmentStore((state) => state.addTreatment);
  const markTreatmentTaken = useTreatmentStore((state) => state.markTreatmentTaken);
  const updateTreatment = useTreatmentStore((state) => state.updateTreatment);
  const deleteTreatment = useTreatmentStore((state) => state.deleteTreatment);
  const hasNotificationsPermission = useAppStore((state) => state.hasNotificationsPermission);
  const setNotificationsPermission = useAppStore((state) => state.setNotificationsPermission);

  const activeTreatments = useMemo(
    () => treatments.filter((item) => item.status === 'active'),
    [treatments]
  );
  const treatmentById = useMemo(
    () => Object.fromEntries(treatments.map((item) => [item.id, item.name])),
    [treatments]
  );
  const filteredHistory = useMemo(() => {
    const now = new Date();
    const start = new Date(now);
    if (historyFilter === 'day') {
      start.setHours(0, 0, 0, 0);
    } else {
      start.setDate(now.getDate() - 7);
      start.setHours(0, 0, 0, 0);
    }

    return intakes
      .filter((item) => item.status === 'taken' && item.takenAt)
      .filter((item) => new Date(item.takenAt ?? item.scheduledTime) >= start)
      .slice(0, 20);
  }, [historyFilter, intakes]);

  const requestNotifications = async () => {
    const granted = await LocalNotificationService.requestPermissions();
    setNotificationsPermission(granted);
  };

  const parseTime = (rawTime: string): { hour: number; minute: number } | null => {
    const match = /^(\d{1,2}):(\d{2})$/.exec(rawTime.trim());
    if (!match) {
      return null;
    }

    const hour = Number(match[1]);
    const minute = Number(match[2]);
    if (Number.isNaN(hour) || Number.isNaN(minute) || hour < 0 || hour > 23 || minute < 0 || minute > 59) {
      return null;
    }

    return { hour, minute };
  };

  const timeAsDate = useMemo(() => {
    const parsed = parseTime(time);
    const date = new Date();
    date.setHours(parsed?.hour ?? 8, parsed?.minute ?? 0, 0, 0);
    return date;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  const onTimeChange = (date: Date) => {
    const hh = String(date.getHours()).padStart(2, '0');
    const mm = String(date.getMinutes()).padStart(2, '0');
    setTime(`${hh}:${mm}`);
  };

  const onAddTreatment = async () => {
    const cleanName = name.trim();
    const cleanDosage = dosage.trim();
    const parsedTime = parseTime(time);
    const parsedEveryXDays = Math.max(1, Number(everyXDays) || 1);

    if (!cleanName || !cleanDosage || !parsedTime) {
      return;
    }

    if (editingTreatmentId) {
      updateTreatment(editingTreatmentId, {
        name: cleanName,
        dosage: cleanDosage,
        schedule: {
          times: [time.trim()],
          frequency,
          frequencyValue: frequency === 'every_x_days' ? parsedEveryXDays : undefined,
        },
      });
      setEditingTreatmentId(null);
      setName('');
      return;
    }

    const createdTreatment = addTreatment({
      name: cleanName,
      type: 'tablet',
      dosage: cleanDosage,
      dosageAmount: 1,
      unit: 'dose',
      schedule: {
        times: [time.trim()],
        frequency,
        frequencyValue: frequency === 'every_x_days' ? parsedEveryXDays : undefined,
      },
      durationType: 'indefinite',
      startDate: new Date().toISOString(),
      status: 'active',
    });

    if (hasNotificationsPermission) {
      const reminderId =
        frequency === 'every_x_days'
          ? await LocalNotificationService.scheduleIntervalReminder(
              `Rappel MediClock`,
              `${cleanName} - ${cleanDosage}`,
              parsedEveryXDays
            )
          : await LocalNotificationService.scheduleDailyReminder(
              `Rappel MediClock`,
              `${cleanName} - ${cleanDosage}`,
              parsedTime.hour,
              parsedTime.minute
            );

      if (reminderId) {
        updateTreatment(createdTreatment.id, { notificationIds: [reminderId] });
      }
    }

    setName('');
  };

  const onTaken = (treatmentId: string) => {
    markTreatmentTaken(treatmentId);
  };

  const onEditTreatment = (treatmentId: string) => {
    const treatment = treatments.find((item) => item.id === treatmentId);
    if (!treatment) {
      return;
    }

    setEditingTreatmentId(treatment.id);
    setName(treatment.name);
    setDosage(treatment.dosage);
    setTime(treatment.schedule.times[0] ?? '08:00');
    setFrequency(treatment.schedule.frequency);
    setEveryXDays(`${treatment.schedule.frequencyValue ?? 2}`);
  };

  const onDeleteTreatment = async (treatmentId: string) => {
    const treatment = treatments.find((item) => item.id === treatmentId);
    if (treatment?.notificationIds) {
      for (const notificationId of treatment.notificationIds) {
        await LocalNotificationService.cancelScheduled(notificationId);
      }
    }

    deleteTreatment(treatmentId);
    if (editingTreatmentId === treatmentId) {
      setEditingTreatmentId(null);
      setName('');
    }
  };

  const confirmDeleteTreatment = (treatmentId: string) => {
    const proceed = () => {
      void onDeleteTreatment(treatmentId);
    };

    if (Platform.OS === 'web') {
      const confirmed = typeof globalThis.confirm === 'function'
        ? globalThis.confirm(t('treatments.deleteConfirm.message'))
        : true;
      if (confirmed) {
        proceed();
      }
      return;
    }

    Alert.alert(t('treatments.deleteConfirm.title'), t('treatments.deleteConfirm.message'), [
      { text: t('common.cancel'), style: 'cancel' },
      { text: t('common.delete'), style: 'destructive', onPress: proceed },
    ]);
  };

  return (
    <TabScreenScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.backRow}>
          <MCButton label={t('common.back')} variant="ghost" fullWidth={false} onPress={() => router.back()} />
        </View>
        <AppHeaderLogo />
        <View style={styles.heroFrame}>
          <Image source={require('../../assets/images/Pilule.png')} style={styles.heroImage} resizeMode="contain" />
        </View>
        <MCText variant="h1">{t('treatments.title')}</MCText>
      </View>

      <MCCard style={styles.card}>
        <MCText style={styles.formTitle}>{t('treatments.addMedication.title')}</MCText>
        <MCInput placeholder={t('treatments.addMedication.namePlaceholder')} value={name} onChangeText={setName} style={styles.input} />
        <MCInput placeholder={t('treatments.addMedication.dosagePlaceholder')} value={dosage} onChangeText={setDosage} style={styles.input} />
        <MCDateTimePicker
          mode="time"
          value={timeAsDate}
          onChange={onTimeChange}
          label={timeAsDate.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })}
          style={styles.input}
        />

        <View style={styles.medFrequencyGrid}>
          <View style={styles.medFrequencyRow}>
            <MCButton
              label={t('treatments.frequencyLabels.daily')}
              size="sm"
              variant={frequency === 'daily' ? 'primary' : 'secondary'}
              onPress={() => setFrequency('daily')}
              fullWidth={false}
              style={styles.medFrequencyBtn}
            />
            <MCButton
              label={t('treatments.frequencyLabels.weekly')}
              size="sm"
              variant={frequency === 'weekly' ? 'primary' : 'secondary'}
              onPress={() => setFrequency('weekly')}
              fullWidth={false}
              style={styles.medFrequencyBtn}
            />
          </View>
          <View style={styles.medFrequencyRow}>
            <MCButton
              label={t('treatments.frequencyLabels.as_needed')}
              size="sm"
              variant={frequency === 'as_needed' ? 'primary' : 'secondary'}
              onPress={() => setFrequency('as_needed')}
              fullWidth={false}
              style={styles.medFrequencyBtn}
            />
            <MCButton
              label={t('treatments.frequencyLabels.every_x_days')}
              size="sm"
              variant={frequency === 'every_x_days' ? 'primary' : 'secondary'}
              onPress={() => setFrequency('every_x_days')}
              fullWidth={false}
              style={styles.medFrequencyBtn}
            />
          </View>
        </View>

        {frequency === 'every_x_days' ? (
          <MCInput
            placeholder={t('treatments.addMedication.everyXDaysPlaceholder')}
            value={everyXDays}
            onChangeText={setEveryXDays}
            keyboardType="number-pad"
            style={styles.input}
          />
        ) : null}

        <MCButton label={editingTreatmentId ? t('common.save') : t('treatments.addMedication.cta')} onPress={onAddTreatment} />
      </MCCard>

      <TouchableOpacity activeOpacity={0.86} onPress={() => router.push('/blood-pressure')}>
        <MCCard style={styles.card}>
          <MCText style={styles.cardTitle}>{t('bloodPressure.cardTitle')}</MCText>
          <MCText variant="small" color="secondary" style={styles.hint}>
            {t('bloodPressure.cardBody')}
          </MCText>
        </MCCard>
      </TouchableOpacity>

      {!hasNotificationsPermission ? (
        <View style={styles.permissionBlock}>
          <MCButton label={t('treatments.enableNotifications')} variant="secondary" onPress={requestNotifications} />
        </View>
      ) : null}

      {activeTreatments.length === 0 ? (
        <MCCard style={styles.card}>
          <MCText variant="body">{t('treatments.empty')}</MCText>
          <MCText variant="small" color="secondary" style={styles.hint}>
            {t('treatments.emptyHint')}
          </MCText>
        </MCCard>
      ) : null}

      {activeTreatments.map((treatment) => (
        <MCCard key={treatment.id} style={styles.card}>
          <MCText style={styles.cardTitle}>{treatment.name}</MCText>
          <MCText variant="small" color="secondary" style={styles.hint}>
            {treatment.dosage} -
            {treatment.schedule.frequency === 'every_x_days'
              ? ` ${t('treatments.frequencyLabels.every_x_days_value', { n: treatment.schedule.frequencyValue ?? 2 })}`
              : ` ${t(`treatments.frequencyLabels.${treatment.schedule.frequency}`)}`} - {treatment.schedule.times[0] ?? '--:--'}
          </MCText>
          <MCText variant="small" color="secondary" style={styles.hint}>
            {treatment.lastTakenAt
              ? t('today.treatmentCard.takenAt', { date: new Date(treatment.lastTakenAt).toLocaleString(locale) })
              : t('today.treatmentCard.notTakenYet')}
          </MCText>
          <View style={styles.actionsRow}>
            <MCButton label={t('today.treatmentCard.markTaken')} size="sm" fullWidth={false} onPress={() => onTaken(treatment.id)} />
            <MCButton
              label={t('treatments.editMedication')}
              size="sm"
              variant="secondary"
              fullWidth={false}
              onPress={() => onEditTreatment(treatment.id)}
              style={styles.inlineBtn}
            />
            <MCButton
              label={t('common.delete')}
              size="sm"
              variant="danger"
              fullWidth={false}
              onPress={() => confirmDeleteTreatment(treatment.id)}
              style={styles.inlineBtn}
            />
          </View>
        </MCCard>
      ))}

      <MCCard style={styles.card}>
        <MCText style={styles.formTitle}>{t('treatments.historyView.title')}</MCText>
        <View style={styles.frequencyRow}>
          <MCButton
            label={t('treatments.historyView.dayFilter')}
            size="sm"
            variant={historyFilter === 'day' ? 'primary' : 'secondary'}
            fullWidth={false}
            onPress={() => setHistoryFilter('day')}
          />
          <MCButton
            label={t('treatments.historyView.weekFilter')}
            size="sm"
            variant={historyFilter === 'week' ? 'primary' : 'secondary'}
            fullWidth={false}
            onPress={() => setHistoryFilter('week')}
          />
        </View>

        {filteredHistory.length === 0 ? (
          <MCText variant="small" color="secondary">{t('treatments.historyView.empty')}</MCText>
        ) : (
          filteredHistory.map((item) => (
            <View key={item.id} style={styles.historyItem}>
              <MCText style={styles.cardTitle}>{treatmentById[item.treatmentId] ?? t('treatments.historyView.unknownMedication')}</MCText>
              <MCText variant="small" color="secondary">
                {new Date(item.takenAt ?? item.scheduledTime).toLocaleString(locale)}
              </MCText>
            </View>
          ))
        )}
      </MCCard>
    </TabScreenScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.warmWhite,
  },
  content: {
    paddingHorizontal: Spacing.screenHorizontal,
  },
  header: {
    marginVertical: Spacing.sm,
  },
  backRow: {
    marginBottom: Spacing.sm,
  },
  heroFrame: {
    backgroundColor: '#F1F7FF',
    borderRadius: 20,
    padding: 10,
    marginBottom: Spacing.sm,
    alignItems: 'center',
  },
  heroImage: {
    width: '50%',
    height: 65,
  },
  card: {
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  hint: {
    marginTop: Spacing.sm,
  },
  formTitle: {
    marginBottom: Spacing.sm,
    fontFamily: 'Poppins_700Bold',
    color: Colors.deepNavy,
  },
  input: {
    marginBottom: Spacing.sm,
  },
  frequencyRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: Spacing.sm,
  },
  medFrequencyGrid: {
    gap: 8,
    marginBottom: Spacing.sm,
  },
  medFrequencyRow: {
    flexDirection: 'row',
    gap: 8,
  },
  medFrequencyBtn: {
    flex: 1,
  },
  permissionBlock: {
    marginBottom: Spacing.sm,
  },
  cardTitle: {
    fontFamily: 'Poppins_700Bold',
    color: Colors.deepNavy,
  },
  actionsRow: {
    marginTop: Spacing.sm,
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  inlineBtn: {
    marginLeft: 0,
  },
  historyItem: {
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    paddingTop: Spacing.sm,
    marginTop: Spacing.sm,
  },
});
