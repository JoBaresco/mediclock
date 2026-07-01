import { useMemo, useState } from 'react';
import { Alert, Image, Platform, View, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { AppHeaderLogo } from '../../src/components/ui/AppHeaderLogo';
import { MCText } from '../../src/components/ui/MCText';
import { MCCard } from '../../src/components/ui/MCCard';
import { MCButton } from '../../src/components/ui/MCButton';
import { MCInput } from '../../src/components/ui/MCInput';
import { Colors, Spacing } from '../../src/design-system';
import { useTranslation } from '../../src/hooks/useTranslation';
import { useTreatmentStore } from '../../src/store/useTreatmentStore';
import { useAppStore } from '../../src/store/useAppStore';
import { LocalNotificationService } from '../../src/services/notifications';
import type { TreatmentSchedule } from '../../src/types/treatment.types';

export default function TreatmentsScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('1 comprimé');
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
        ? globalThis.confirm('Supprimer ce médicament ? Cette action est irréversible.')
        : true;
      if (confirmed) {
        proceed();
      }
      return;
    }

    Alert.alert('Confirmation', 'Supprimer ce médicament ? Cette action est irréversible.', [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Supprimer', style: 'destructive', onPress: proceed },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.backRow}>
          <MCButton label="Retour" variant="ghost" fullWidth={false} onPress={() => router.back()} />
        </View>
        <AppHeaderLogo />
        <View style={styles.heroFrame}>
          <Image source={require('../../assets/images/Pilule.png')} style={styles.heroImage} resizeMode="contain" />
        </View>
        <MCText variant="h1">Traitements</MCText>
      </View>

      <MCCard style={styles.card}>
        <MCText style={styles.formTitle}>Ajouter un médicament</MCText>
        <MCInput placeholder="Nom" value={name} onChangeText={setName} style={styles.input} />
        <MCInput placeholder="Dosage" value={dosage} onChangeText={setDosage} style={styles.input} />
        <MCInput placeholder="Heure (HH:MM)" value={time} onChangeText={setTime} style={styles.input} />

        <View style={styles.frequencyRow}>
          <MCButton
            label={t('treatments.frequencyLabels.daily')}
            size="sm"
            variant={frequency === 'daily' ? 'primary' : 'secondary'}
            onPress={() => setFrequency('daily')}
            fullWidth={false}
            style={styles.frequencyBtn}
          />
          <MCButton
            label={t('treatments.frequencyLabels.weekly')}
            size="sm"
            variant={frequency === 'weekly' ? 'primary' : 'secondary'}
            onPress={() => setFrequency('weekly')}
            fullWidth={false}
            style={styles.frequencyBtn}
          />
          <MCButton
            label={t('treatments.frequencyLabels.as_needed')}
            size="sm"
            variant={frequency === 'as_needed' ? 'primary' : 'secondary'}
            onPress={() => setFrequency('as_needed')}
            fullWidth={false}
            style={styles.frequencyBtn}
          />
          <MCButton
            label={t('treatments.frequencyLabels.every_x_days')}
            size="sm"
            variant={frequency === 'every_x_days' ? 'primary' : 'secondary'}
            onPress={() => setFrequency('every_x_days')}
            fullWidth={false}
            style={styles.frequencyBtn}
          />
        </View>

        {frequency === 'every_x_days' ? (
          <MCInput
            placeholder="Tous les X jours (ex: 2)"
            value={everyXDays}
            onChangeText={setEveryXDays}
            keyboardType="number-pad"
            style={styles.input}
          />
        ) : null}

        <MCButton label={editingTreatmentId ? 'Enregistrer' : 'Ajouter'} onPress={onAddTreatment} />
      </MCCard>

      {!hasNotificationsPermission ? (
        <View style={styles.permissionBlock}>
          <MCButton label="Activer les notifications" variant="secondary" onPress={requestNotifications} />
        </View>
      ) : null}

      {activeTreatments.length === 0 ? (
        <MCCard style={styles.card}>
          <MCText variant="body">Aucun traitement actif.</MCText>
          <MCText variant="small" color="secondary" style={styles.hint}>
            Ajoutez votre premier traitement pour commencer.
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
              ? `Pris le ${new Date(treatment.lastTakenAt).toLocaleString('fr-FR')}`
              : 'Pas encore pris aujourd\'hui'}
          </MCText>
          <View style={styles.actionsRow}>
            <MCButton label="Pris" size="sm" fullWidth={false} onPress={() => onTaken(treatment.id)} />
            <MCButton
              label="Éditer"
              size="sm"
              variant="secondary"
              fullWidth={false}
              onPress={() => onEditTreatment(treatment.id)}
              style={styles.inlineBtn}
            />
            <MCButton
              label="Supprimer"
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
        <MCText style={styles.formTitle}>Historique des prises</MCText>
        <View style={styles.frequencyRow}>
          <MCButton
            label="Jour"
            size="sm"
            variant={historyFilter === 'day' ? 'primary' : 'secondary'}
            fullWidth={false}
            onPress={() => setHistoryFilter('day')}
          />
          <MCButton
            label="Semaine"
            size="sm"
            variant={historyFilter === 'week' ? 'primary' : 'secondary'}
            fullWidth={false}
            onPress={() => setHistoryFilter('week')}
          />
        </View>

        {filteredHistory.length === 0 ? (
          <MCText variant="small" color="secondary">Aucune prise enregistrée pour ce filtre.</MCText>
        ) : (
          filteredHistory.map((item) => (
            <View key={item.id} style={styles.historyItem}>
              <MCText style={styles.cardTitle}>{treatmentById[item.treatmentId] ?? 'Médicament'}</MCText>
              <MCText variant="small" color="secondary">
                {new Date(item.takenAt ?? item.scheduledTime).toLocaleString('fr-FR')}
              </MCText>
            </View>
          ))
        )}
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
  backRow: {
    marginBottom: Spacing.sm,
  },
  heroFrame: {
    backgroundColor: '#F1F7FF',
    borderRadius: 20,
    padding: 10,
    marginBottom: Spacing.sm,
  },
  heroImage: {
    width: '100%',
    height: 140,
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
  frequencyBtn: {
    minWidth: 94,
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
