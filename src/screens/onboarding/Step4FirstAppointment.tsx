import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Line, Path, Rect } from 'react-native-svg';
import { MCButton } from '../../components/ui/MCButton';
import { MCInput } from '../../components/ui/MCInput';
import { MCText } from '../../components/ui/MCText';
import { OnboardingHeader } from '../../components/ui/OnboardingHeader';
import { OnboardingProgress } from '../../components/ui/OnboardingProgress';
import { Colors, Typography } from '../../theme';

type Step4FirstAppointmentProps = {
  onContinue: () => void;
  onSkip: () => void;
};

export function Step4FirstAppointment({ onContinue, onSkip }: Step4FirstAppointmentProps) {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <OnboardingHeader />
        <OnboardingProgress total={6} activeIndex={3} activeColor={Colors.primary} />

        <View style={styles.optionalBadge}>
          <MCText style={styles.optionalBadgeText}>Étape optionnelle — vous pouvez la passer</MCText>
        </View>

        <MCText style={styles.title}>
          Ajoutons une <MCText style={styles.titleAccent}>consultation</MCText>
        </MCText>
        <MCText style={styles.subtitle}>Ainsi nous vous aiderons à être préparé et à l'heure.</MCText>

        <View style={styles.form}>
          <View style={styles.field}>
            <MCText style={styles.label}>Spécialité</MCText>
            <Pressable style={styles.inputRowActive}>
              <MCText style={styles.inputValue}>Cardiologie</MCText>
              <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                <Path d="M6 9l6 6 6-6" stroke={Colors.muted} strokeWidth={2} strokeLinecap="round" />
              </Svg>
            </Pressable>
          </View>

          <View style={styles.row}>
            <View style={[styles.field, styles.rowItem]}>
              <MCText style={styles.label}>Date</MCText>
              <Pressable style={styles.inputRow}>
                <MCText style={styles.inputValueSmall}>15/07/2026</MCText>
                <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
                  <Rect x={3} y={4} width={18} height={18} rx={3} stroke="#9CA3AF" strokeWidth={2} />
                  <Line x1={3} y1={9} x2={21} y2={9} stroke="#9CA3AF" strokeWidth={2} />
                  <Line x1={8} y1={2} x2={8} y2={6} stroke="#9CA3AF" strokeWidth={2} strokeLinecap="round" />
                  <Line x1={16} y1={2} x2={16} y2={6} stroke="#9CA3AF" strokeWidth={2} strokeLinecap="round" />
                </Svg>
              </Pressable>
            </View>
            <View style={[styles.field, styles.rowItem]}>
              <MCText style={styles.label}>Heure</MCText>
              <Pressable style={styles.inputRow}>
                <MCText style={styles.inputValueSmall}>10:00</MCText>
                <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
                  <Circle cx={12} cy={12} r={9} stroke="#9CA3AF" strokeWidth={2} />
                  <Line x1={12} y1={7} x2={12} y2={12} stroke="#9CA3AF" strokeWidth={2} strokeLinecap="round" />
                  <Line x1={12} y1={12} x2={15} y2={14} stroke="#9CA3AF" strokeWidth={2} strokeLinecap="round" />
                </Svg>
              </Pressable>
            </View>
          </View>

          <View style={styles.field}>
            <MCText style={styles.label}>
              Médecin <MCText style={styles.optional}>— optionnel</MCText>
            </MCText>
            <MCInput placeholder="Dr. Nom du médecin" />
          </View>

          <View style={styles.field}>
            <MCText style={styles.label}>
              Lieu <MCText style={styles.optional}>— optionnel</MCText>
            </MCText>
            <MCInput placeholder="Cabinet, hôpital..." />
          </View>
        </View>

        <View style={styles.actions}>
          <MCButton label="Continuer" onPress={onContinue} style={styles.primaryButton} />
          <Pressable style={styles.skipButton} onPress={onSkip}>
            <MCText style={styles.skipLabel}>Passer cette étape</MCText>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingHorizontal: 22,
    paddingTop: 20,
    paddingBottom: 32,
    alignItems: 'center',
  },
  optionalBadge: {
    backgroundColor: Colors.softBlueSurface,
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginBottom: 18,
  },
  optionalBadgeText: {
    fontFamily: Typography.fonts.body,
    fontSize: 11,
    fontWeight: '500',
    color: Colors.primary,
    textAlign: 'center',
  },
  title: {
    fontFamily: Typography.fonts.title,
    fontSize: 19,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 6,
  },
  titleAccent: {
    fontFamily: Typography.fonts.title,
    fontSize: 19,
    color: Colors.primary,
  },
  subtitle: {
    fontFamily: Typography.fonts.body,
    fontSize: 13,
    color: Colors.muted,
    textAlign: 'center',
    lineHeight: 21,
    maxWidth: 230,
    marginBottom: 20,
  },
  form: {
    width: '100%',
    gap: 12,
    marginBottom: 18,
  },
  field: {
    gap: 5,
  },
  label: {
    fontFamily: Typography.fonts.body,
    fontSize: 12,
    color: Colors.text,
    paddingLeft: 4,
  },
  optional: {
    fontFamily: Typography.fonts.body,
    fontSize: 12,
    color: '#9CA3AF',
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  rowItem: {
    flex: 1,
  },
  inputRowActive: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: Colors.primary,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E8EDF2',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 13,
  },
  inputValue: {
    fontFamily: Typography.fonts.body,
    fontSize: 14,
    color: Colors.text,
  },
  inputValueSmall: {
    fontFamily: Typography.fonts.body,
    fontSize: 13,
    color: Colors.text,
  },
  actions: {
    width: '100%',
    gap: 10,
  },
  primaryButton: {
    borderRadius: 16,
  },
  skipButton: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  skipLabel: {
    fontFamily: Typography.fonts.body,
    fontSize: 13,
    color: '#9CA3AF',
  },
});
