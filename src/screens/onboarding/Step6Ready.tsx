import { Image, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MCButton } from '../../components/ui/MCButton';
import { MCText } from '../../components/ui/MCText';
import { Colors, Typography } from '../../theme';

type Step6ReadyProps = {
  onFinish: () => void;
};

export function Step6Ready({ onFinish }: Step6ReadyProps) {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View>
        <View style={styles.headerRow}>
          <MCButton label="Retour" variant="ghost" fullWidth={false} onPress={() => router.back()} />
        </View>
        <MCText style={styles.step}>Étape 6/6</MCText>
        <MCText style={styles.title}>Votre espace MediClock est prêt</MCText>
        <MCText style={styles.subtitle}>
          Une expérience claire, calme et rapide pour piloter votre quotidien santé.
        </MCText>

        <Image
          source={require('../../../assets/images/silhoutte_bout_chemin_II.png')}
          style={styles.illustration}
          resizeMode="contain"
        />

        <View style={styles.card}>
          <MCText style={styles.cardTitle}>Configuration terminée</MCText>
          <MCText style={styles.cardBody}>Vous pouvez maintenant accéder à l'écran d'aujourd'hui.</MCText>
        </View>
      </View>

      <View style={styles.actions}>
        <MCButton label="Aller à l'écran d'aujourd'hui" onPress={onFinish} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 14,
    justifyContent: 'space-between',
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
    marginBottom: 8,
  },
  subtitle: {
    color: Colors.muted,
    fontFamily: Typography.fonts.body,
    fontSize: 15,
    lineHeight: 23,
    marginBottom: 12,
  },
  illustration: {
    width: '100%',
    height: 170,
    marginBottom: 12,
  },
  card: {
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EAF0F6',
    padding: 16,
  },
  cardTitle: {
    color: Colors.primary,
    fontFamily: Typography.fonts.title,
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 6,
  },
  cardBody: {
    color: Colors.text,
    fontFamily: Typography.fonts.body,
    fontSize: 16,
    lineHeight: 22,
  },
  actions: {
    marginTop: 12,
  },
});
