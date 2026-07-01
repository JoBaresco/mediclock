import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Line, Path, Rect } from 'react-native-svg';
import { MCButton } from '../../components/ui/MCButton';
import { MCText } from '../../components/ui/MCText';
import { OnboardingHeader } from '../../components/ui/OnboardingHeader';
import { OnboardingProgress } from '../../components/ui/OnboardingProgress';
import { Colors, Typography } from '../../theme';

type Step6ReadyProps = {
  onFinish: () => void;
};

const CHECKLIST = [
  'Votre espace personnel créé',
  'Rappels intelligents activés',
  'Votre santé entre de bonnes mains',
];

export function Step6Ready({ onFinish }: Step6ReadyProps) {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.content}>
        <OnboardingHeader />
        <OnboardingProgress total={6} activeIndex={-1} activeColor={Colors.success} />

        <View style={styles.iconBox}>
          <Svg width={95} height={95} viewBox="0 0 110 110" fill="none">
            <Circle cx={52} cy={52} r={46} stroke={Colors.primary} strokeWidth={5} fill="none" />
            <Rect x={46} y={10} width={12} height={8} rx={4} fill={Colors.primary} />
            <Line x1={52} y1={24} x2={52} y2={52} stroke={Colors.primary} strokeWidth={4.5} strokeLinecap="round" />
            <Line x1={52} y1={52} x2={72} y2={60} stroke={Colors.text} strokeWidth={4.5} strokeLinecap="round" />
            <Circle cx={52} cy={52} r={4} fill={Colors.primary} />
            <Line x1={8} y1={52} x2={14} y2={52} stroke={Colors.primary} strokeWidth={3} strokeLinecap="round" />
            <Line x1={90} y1={52} x2={96} y2={52} stroke={Colors.primary} strokeWidth={3} strokeLinecap="round" />
            <Path
              d="M52 72 Q44 64 38 60 Q28 55 30 46 Q32 37 42 37 Q48 37 52 43 Q56 37 62 37 Q72 37 74 46 Q76 55 66 60 Q60 64 52 72Z"
              fill={Colors.danger}
            />
          </Svg>
          <View style={styles.checkBadge}>
            <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
              <Path d="M5 13l4 4L19 7" stroke="#FFFFFF" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
          </View>
        </View>

        <MCText style={styles.title}>
          Tout est <MCText style={styles.titleAccent}>prêt</MCText> !
        </MCText>
        <MCText style={styles.subtitle}>Votre espace est prêt.</MCText>

        <View style={styles.checklist}>
          {CHECKLIST.map((item) => (
            <View key={item} style={styles.checklistRow}>
              <View style={styles.checklistIconBox}>
                <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
                  <Path d="M5 13l4 4L19 7" stroke={Colors.success} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
                </Svg>
              </View>
              <MCText style={styles.checklistText}>{item}</MCText>
            </View>
          ))}
        </View>

        <View style={styles.quoteBox}>
          <MCText style={styles.quoteText}>"La vie continue,{'\n'}on s'occupe du reste."</MCText>
        </View>
      </View>

      <View style={styles.actions}>
        <MCButton label="Entrer dans MediClock" onPress={onFinish} style={styles.primaryButton} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 22,
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    alignItems: 'center',
  },
  iconBox: {
    width: 130,
    height: 130,
    backgroundColor: Colors.softBlueSurface,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  checkBadge: {
    position: 'absolute',
    bottom: -8,
    right: -8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.background,
  },
  title: {
    fontFamily: Typography.fonts.title,
    fontSize: 22,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 4,
  },
  titleAccent: {
    fontFamily: Typography.fonts.title,
    fontSize: 22,
    color: Colors.success,
  },
  subtitle: {
    fontFamily: Typography.fonts.body,
    fontSize: 13,
    color: Colors.muted,
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: 20,
  },
  checklist: {
    width: '100%',
    gap: 8,
    marginBottom: 20,
  },
  checklistRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  checklistIconBox: {
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundColor: '#F0FBF5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checklistText: {
    fontFamily: Typography.fonts.body,
    fontSize: 13,
    color: Colors.text,
  },
  quoteBox: {
    width: '100%',
    backgroundColor: Colors.softBlueSurface,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
    alignItems: 'center',
  },
  quoteText: {
    fontFamily: Typography.fonts.title,
    fontSize: 13,
    color: Colors.primary,
    textAlign: 'center',
    lineHeight: 22,
    fontStyle: 'italic',
  },
  actions: {
    width: '100%',
  },
  primaryButton: {
    borderRadius: 16,
  },
});
