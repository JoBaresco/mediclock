import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { useIsFocused, useRouter } from 'expo-router';
import { useMemo } from 'react';
import { AppHeaderLogo } from '../../components/ui/AppHeaderLogo';
import { MCButton } from '../../components/ui/MCButton';
import { MCCard } from '../../components/ui/MCCard';
import { MCText } from '../../components/ui/MCText';
import { Typography } from '../../theme';
import { useAppointmentStore } from '../../store/useAppointmentStore';
import { useTreatmentStore } from '../../store/useTreatmentStore';
import { useInactivityTimer } from '../../hooks/useInactivityTimer';

export function HoyScreen() {
  const router = useRouter();
  const isFocused = useIsFocused();
  const { registerActivity } = useInactivityTimer({
    enabled: isFocused,
    onTimeout: () => router.push('/splash?from=lock'),
  });
  const allTreatments = useTreatmentStore((state) => state.treatments);
  const treatments = useMemo(
    () => allTreatments.filter((item) => item.status === 'active'),
    [allTreatments]
  );
  const markTreatmentTaken = useTreatmentStore((state) => state.markTreatmentTaken);
  const appointments = useAppointmentStore((state) => state.appointments);
  const addAppointment = useAppointmentStore((state) => state.addAppointment);
  const markAppointmentCompleted = useAppointmentStore((state) => state.markAppointmentCompleted);

  const nextAppointment = appointments.find((item) => !item.isCompleted) ?? null;

  const dateText = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      onTouchStart={registerActivity}
      onScrollBeginDrag={registerActivity}
      onScroll={registerActivity}
      scrollEventThrottle={1000}
      // @ts-expect-error onMouseDown is forwarded to the DOM node by react-native-web for mouse input on web builds
      onMouseDown={registerActivity}
    >
      <AppHeaderLogo />
      <MCText style={styles.kicker}>Aujourd'hui</MCText>
      <MCText style={styles.title}>Bonjour, Jean</MCText>
      <MCText style={styles.subtitle}>{dateText}</MCText>

      <MCCard style={styles.statusCard}>
        <MCText style={styles.statusTitle}>Tout est sous contrôle</MCText>
        <MCText style={styles.statusBody}>Aucune action importante pour le moment.</MCText>
      </MCCard>

      {treatments.map((treatment) => (
        <MCCard key={treatment.id} style={styles.treatmentCard}>
          <MCText style={styles.sectionLabel}>{treatment.name}</MCText>
          <MCText style={styles.sectionValue}>
            {treatment.dosage} - {treatment.schedule.times[0] ?? '--:--'}
          </MCText>
          <MCText style={styles.caption}>
            {treatment.lastTakenAt
              ? `Pris le ${new Date(treatment.lastTakenAt).toLocaleString('fr-FR')}`
              : "Pas encore pris aujourd'hui"}
          </MCText>
          <View style={styles.inlineAction}>
            <MCButton label="Pris" size="sm" fullWidth={false} onPress={() => markTreatmentTaken(treatment.id)} />
          </View>
        </MCCard>
      ))}

      <View style={styles.actions}>
        <MCButton label="Ouvrir Smart Capture" onPress={() => router.push('/smart-capture')} />
      </View>

      <MCCard style={styles.sectionCard}>
        <View style={styles.sectionLabelRow}>
          <View style={styles.sectionIconFrame}>
            <Image source={require('../../../assets/images/Calendrier.png')} style={styles.sectionIcon} resizeMode="contain" />
          </View>
          <MCText style={styles.sectionLabel}>Prochain rendez-vous</MCText>
        </View>
        {nextAppointment ? (
          <>
            <MCText style={styles.sectionValue}>
              {new Date(nextAppointment.date).toLocaleDateString('fr-FR')} - {nextAppointment.title}
            </MCText>
            <MCText style={styles.caption}>
              {nextAppointment.location ?? 'Lieu non précisé'}
            </MCText>
            <View style={styles.inlineAction}>
              <MCButton
                label={nextAppointment.isCompleted ? 'Effectué' : 'Marquer effectué'}
                size="sm"
                variant={nextAppointment.isCompleted ? 'secondary' : 'primary'}
                fullWidth={false}
                disabled={nextAppointment.isCompleted}
                onPress={() => markAppointmentCompleted(nextAppointment.id)}
              />
            </View>
          </>
        ) : (
          <>
            <MCText style={styles.sectionValue}>Aucun rendez-vous planifié.</MCText>
            <View style={styles.inlineAction}>
              <MCButton
                label="Ajouter rendez-vous"
                size="sm"
                fullWidth={false}
                onPress={() =>
                  addAppointment({
                    title: 'Cardiologue',
                    date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
                    location: 'Cabinet médical',
                    doctorName: 'Dr Martin',
                    notes: '',
                    isCompleted: false,
                  })
                }
              />
            </View>
          </>
        )}
      </MCCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFBFC',
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 120,
  },
  kicker: {
    color: '#2F80ED',
    fontFamily: Typography.fonts.title,
    fontWeight: '700',
    fontSize: 13,
    lineHeight: 16,
    marginBottom: 8,
  },
  title: {
    color: '#102033',
    fontFamily: Typography.fonts.title,
    fontWeight: '700',
    fontSize: 31,
    lineHeight: 38,
  },
  subtitle: {
    color: '#102033',
    fontFamily: Typography.fonts.body,
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 21,
    opacity: 0.72,
    marginTop: 4,
    marginBottom: 20,
  },
  statusCard: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#CFEEDB',
    backgroundColor: '#EAF8F0',
    padding: 20,
  },
  statusTitle: {
    color: '#102033',
    fontFamily: Typography.fonts.title,
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 6,
  },
  statusBody: {
    color: '#102033',
    fontFamily: Typography.fonts.body,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 23,
    opacity: 0.85,
  },
  actions: {
    marginTop: 16,
  },
  treatmentCard: {
    marginTop: 12,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#EAF0F6',
    backgroundColor: '#FFFFFF',
  },
  sectionCard: {
    marginTop: 14,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderWidth: 1,
    borderColor: '#EAF0F6',
  },
  sectionLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionIconFrame: {
    backgroundColor: '#F1F7FF',
    borderRadius: 10,
    padding: 4,
  },
  sectionIcon: {
    width: 20,
    height: 20,
  },
  sectionLabel: {
    color: '#2F80ED',
    fontFamily: Typography.fonts.body,
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 18,
  },
  sectionValue: {
    marginTop: 4,
    color: '#102033',
    fontFamily: Typography.fonts.body,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 22,
  },
  caption: {
    marginTop: 4,
    color: '#102033',
    fontFamily: Typography.fonts.body,
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 18,
    opacity: 0.75,
  },
  inlineAction: {
    marginTop: 10,
    alignItems: 'flex-start',
  },
});
