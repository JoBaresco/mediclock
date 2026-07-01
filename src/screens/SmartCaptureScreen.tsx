import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import Svg, { Defs, LinearGradient, RadialGradient, Rect, Stop } from 'react-native-svg';
import { AppHeaderLogo } from '../components/ui/AppHeaderLogo';
import { MCButton } from '../components/ui/MCButton';
import { MCCard } from '../components/ui/MCCard';
import { MCText } from '../components/ui/MCText';
import { Colors, Typography } from '../theme';

export function SmartCaptureScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <AppHeaderLogo />
      <View style={styles.scannerCard}>
        <Svg width="100%" height="100%" style={StyleSheet.absoluteFill} viewBox="0 0 300 210" preserveAspectRatio="none">
          <Defs>
            <RadialGradient id="glow" cx="50%" cy="50%" r="70%">
              <Stop offset="0%" stopColor="#2F80ED" stopOpacity={0.08} />
              <Stop offset="100%" stopColor="#0D1B2A" stopOpacity={0} />
            </RadialGradient>
          </Defs>
          <Rect x={0} y={0} width={300} height={210} fill="url(#glow)" />
        </Svg>

        <View style={styles.viewfinder}>
          <View style={[styles.corner, styles.cornerTL]} />
          <View style={[styles.corner, styles.cornerTR]} />
          <View style={[styles.corner, styles.cornerBL]} />
          <View style={[styles.corner, styles.cornerBR]} />
          <Svg width={154} height={2} style={styles.scanLine}>
            <Defs>
              <LinearGradient id="scanline" x1="0" y1="0" x2="1" y2="0">
                <Stop offset="0" stopColor="#2F80ED" stopOpacity={0} />
                <Stop offset="0.5" stopColor="#2F80ED" stopOpacity={0.7} />
                <Stop offset="1" stopColor="#2F80ED" stopOpacity={0} />
              </LinearGradient>
            </Defs>
            <Rect x={0} y={0} width={154} height={2} fill="url(#scanline)" />
          </Svg>
        </View>

        <MCText style={styles.scannerCaption}>Pointez vers le QR code ou le code-barres</MCText>
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
  scannerCard: {
    backgroundColor: '#0D1B2A',
    borderRadius: 24,
    height: 210,
    marginBottom: 18,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewfinder: {
    width: 170,
    height: 125,
    alignItems: 'center',
    justifyContent: 'center',
  },
  corner: {
    position: 'absolute',
    width: 22,
    height: 22,
    borderColor: Colors.primary,
  },
  cornerTL: {
    top: 0,
    left: 0,
    borderTopWidth: 2.5,
    borderLeftWidth: 2.5,
    borderTopLeftRadius: 5,
  },
  cornerTR: {
    top: 0,
    right: 0,
    borderTopWidth: 2.5,
    borderRightWidth: 2.5,
    borderTopRightRadius: 5,
  },
  cornerBL: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 2.5,
    borderLeftWidth: 2.5,
    borderBottomLeftRadius: 5,
  },
  cornerBR: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 2.5,
    borderRightWidth: 2.5,
    borderBottomRightRadius: 5,
  },
  scanLine: {
    opacity: 0.7,
  },
  scannerCaption: {
    position: 'absolute',
    bottom: 14,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontFamily: Typography.fonts.body,
    fontSize: 11,
    fontWeight: '300',
    color: 'rgba(255,255,255,0.65)',
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
