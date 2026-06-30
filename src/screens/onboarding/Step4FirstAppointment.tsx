import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { MCButton } from '../../components/ui/MCButton';
import { MCText } from '../../components/ui/MCText';
import { Colors, Typography } from '../../theme';

type Step4FirstAppointmentProps = {
  onContinue: () => void;
  onSkip: () => void;
};

export function Step4FirstAppointment({ onContinue, onSkip }: Step4FirstAppointmentProps) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <MCButton label="Retour" variant="ghost" fullWidth={false} onPress={() => router.back()} />
      </View>
      <MCText style={styles.step}>Étape 4/6</MCText>
      <MCText style={styles.title}>Planifiez votre prochain rendez-vous</MCText>
      <MCText style={styles.subtitle}>
        Visualisez vos dates importantes dans un seul flux, avec rappels discrets et fiables.
      </MCText>

      <View style={styles.timelineCard}>
        <MCText style={styles.timelineTitle}>Prochain rappel</MCText>
        <MCText style={styles.timelineBody}>Demain 10:00 - Cardiologue</MCText>
      </View>

      <View style={styles.actions}>
        <MCButton label="Ajouter un rendez-vous" onPress={onContinue} />
        <MCButton label="Passer" variant="ghost" onPress={onSkip} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 24,
    paddingTop: 72,
    paddingBottom: 32,
  },
  headerRow: {
    marginBottom: 12,
  },
  step: {
    color: Colors.primary,
    fontFamily: Typography.fonts.title,
    fontSize: 12,
    lineHeight: 14,
    marginBottom: 14,
  },
  title: {
    color: Colors.text,
    fontFamily: Typography.fonts.title,
    fontSize: 34,
    lineHeight: 40,
    marginBottom: 10,
  },
  subtitle: {
    color: Colors.muted,
    fontFamily: Typography.fonts.body,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 22,
  },
  timelineCard: {
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EAF0F6',
    padding: 18,
  },
  timelineTitle: {
    color: Colors.primary,
    fontFamily: Typography.fonts.title,
    fontSize: 13,
    lineHeight: 16,
    marginBottom: 6,
  },
  timelineBody: {
    color: Colors.text,
    fontFamily: Typography.fonts.body,
    fontSize: 16,
    lineHeight: 22,
  },
  actions: {
    marginTop: 26,
    gap: 10,
  },
});
