import { StyleSheet, View } from 'react-native';
import { MCButton } from '../../components/ui/MCButton';
import { MCText } from '../../components/ui/MCText';
import { Colors, Typography } from '../../theme';

type Step5MyCircleProps = {
  onContinue: () => void;
  onSkip: () => void;
};

export function Step5MyCircle({ onContinue, onSkip }: Step5MyCircleProps) {
  return (
    <View style={styles.container}>
      <MCText style={styles.step}>Étape 5/6</MCText>
      <MCText style={styles.title}>Invitez votre cercle de confiance</MCText>
      <MCText style={styles.subtitle}>
        Famille, proches, aidants: tout le monde reste aligne, sans friction ni surcharge.
      </MCText>

      <View style={styles.pillars}>
        <MCText style={styles.pillar}>Acces partages maitrisables</MCText>
        <MCText style={styles.pillar}>Alertes prioritaires en cas de besoin</MCText>
        <MCText style={styles.pillar}>Historique d'actions transparent</MCText>
      </View>

      <View style={styles.actions}>
        <MCButton label="Configurer mon cercle" onPress={onContinue} />
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
  pillars: {
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EAF0F6',
    padding: 18,
    gap: 10,
  },
  pillar: {
    color: Colors.text,
    fontFamily: Typography.fonts.body,
    fontSize: 15,
    lineHeight: 22,
  },
  actions: {
    marginTop: 26,
    gap: 10,
  },
});
