import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { MCButton } from '../../components/ui/MCButton';
import { MCText } from '../../components/ui/MCText';
import { Colors, Typography } from '../../theme';

type Step3FirstTreatmentProps = {
  onSmartCapture: () => void;
  onManual: () => void;
  onSkip: () => void;
};

export function Step3FirstTreatment({ onSmartCapture, onManual, onSkip }: Step3FirstTreatmentProps) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <MCButton label="Retour" variant="ghost" fullWidth={false} onPress={() => router.back()} />
      </View>
      <MCText style={styles.step}>Étape 3/6</MCText>
      <MCText style={styles.title}>Ajoutez votre premier traitement</MCText>
      <MCText style={styles.subtitle}>
        Capturez une boite, un QR code ou saisissez a la main pour commencer en moins d'une minute.
      </MCText>

      <View style={styles.surface}>
        <MCText style={styles.surfaceTitle}>Smart Capture</MCText>
        <MCText style={styles.surfaceBody}>Photo intelligente + extraction automatique des informations.</MCText>
      </View>

      <View style={styles.actions}>
        <MCButton label="Utiliser Smart Capture" onPress={onSmartCapture} />
        <MCButton label="Saisie manuelle" variant="secondary" onPress={onManual} />
        <MCButton label="Plus tard" variant="ghost" onPress={onSkip} />
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
  surface: {
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EAF0F6',
    padding: 18,
  },
  surfaceTitle: {
    color: Colors.text,
    fontFamily: Typography.fonts.title,
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 6,
  },
  surfaceBody: {
    color: Colors.muted,
    fontFamily: Typography.fonts.body,
    fontSize: 15,
    lineHeight: 22,
  },
  actions: {
    marginTop: 26,
    gap: 10,
  },
});
