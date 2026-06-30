import { ScrollView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { MCButton } from '../../components/ui/MCButton';
import { MCInput } from '../../components/ui/MCInput';
import { MCText } from '../../components/ui/MCText';
import { Colors, Typography } from '../../theme';

type Step2CreateSpaceProps = {
  onContinue: () => void;
  onSkip: () => void;
};

export function Step2CreateSpace({ onContinue, onSkip }: Step2CreateSpaceProps) {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headerRow}>
        <MCButton label="Retour" variant="ghost" fullWidth={false} onPress={() => router.back()} />
      </View>
      <View style={styles.badge}>
        <MCText style={styles.badgeText}>Étape 2/6</MCText>
      </View>

      <MCText style={styles.title}>Créons votre espace personnel</MCText>
      <MCText style={styles.subtitle}>
        Un espace simple pour vos traitements, vos rappels et vos documents de santé.
      </MCText>

      <View style={styles.formCard}>
        <MCText style={styles.label}>Nom de votre espace</MCText>
        <MCInput placeholder="Ex: Espace de Marie" />
        <MCText style={styles.hint}>Vous pourrez le modifier a tout moment.</MCText>
      </View>

      <View style={styles.actions}>
        <MCButton label="Continuer" onPress={onContinue} />
        <MCButton label="Passer" variant="ghost" onPress={onSkip} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 72,
    paddingBottom: 36,
  },
  headerRow: {
    marginBottom: 12,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#EAF2FF',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 18,
  },
  badgeText: {
    color: Colors.primary,
    fontFamily: Typography.fonts.title,
    fontSize: 12,
    lineHeight: 14,
  },
  title: {
    color: Colors.text,
    fontFamily: Typography.fonts.title,
    fontSize: 34,
    lineHeight: 40,
    marginBottom: 12,
  },
  subtitle: {
    color: Colors.muted,
    fontFamily: Typography.fonts.body,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 28,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#EAF0F6',
  },
  label: {
    color: Colors.text,
    fontFamily: Typography.fonts.title,
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 8,
  },
  hint: {
    marginTop: 8,
    color: Colors.muted,
    fontFamily: Typography.fonts.body,
    fontSize: 13,
    lineHeight: 18,
  },
  actions: {
    marginTop: 28,
    gap: 10,
  },
});
