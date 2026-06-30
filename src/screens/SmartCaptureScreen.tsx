import { Image, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { MCButton } from '../components/ui/MCButton';
import { MCCard } from '../components/ui/MCCard';
import { MCText } from '../components/ui/MCText';
import { Colors, Typography } from '../theme';

export function SmartCaptureScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.logoFrame}>
        <Image source={require('../../assets/images/Master_MediClock_seul_V.1.png')} style={styles.logo} resizeMode="contain" />
      </View>
      <View style={styles.heroFrame}>
        <Image source={require('../../assets/images/Dossier_Medical.png')} style={styles.heroImage} resizeMode="contain" />
      </View>
      <MCText style={styles.kicker}>Smart Capture</MCText>
      <MCText style={styles.title}>Capturez. MediClock structure.</MCText>
      <MCText style={styles.subtitle}>
        Analyse intelligente d'une boite, d'une ordonnance ou d'un code pour creer une fiche propre en quelques secondes.
      </MCText>

      <MCCard style={styles.preview}>
        <MCText style={styles.previewTitle}>Prêt à scanner</MCText>
        <MCText style={styles.previewBody}>Point de départ premium pour l'expérience caméra OCR/QR.</MCText>
      </MCCard>

      <View style={styles.actions}>
        <MCButton label="Lancer la capture" onPress={() => undefined} />
        <MCButton label="Retour" variant="ghost" onPress={() => router.back()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 28,
  },
  logoFrame: {
    backgroundColor: '#F1F7FF',
    borderRadius: 20,
    padding: 10,
    marginBottom: 16,
  },
  logo: {
    width: 120,
    height: 40,
  },
  heroFrame: {
    backgroundColor: '#F1F7FF',
    borderRadius: 20,
    padding: 10,
    marginBottom: 18,
  },
  heroImage: {
    width: '100%',
    height: 170,
  },
  kicker: {
    color: Colors.primary,
    fontFamily: Typography.fonts.title,
    fontSize: 13,
    lineHeight: 16,
    marginBottom: 8,
  },
  title: {
    color: Colors.text,
    fontFamily: Typography.fonts.title,
    fontSize: 31,
    lineHeight: 38,
    marginBottom: 8,
  },
  subtitle: {
    color: Colors.muted,
    fontFamily: Typography.fonts.body,
    fontSize: 15,
    lineHeight: 21,
    marginBottom: 20,
  },
  preview: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#EAF0F6',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  previewTitle: {
    color: Colors.primary,
    fontFamily: Typography.fonts.title,
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 6,
  },
  previewBody: {
    color: Colors.text,
    fontFamily: Typography.fonts.body,
    fontSize: 15,
    lineHeight: 21,
  },
  actions: {
    marginTop: 16,
    gap: 10,
  },
});
