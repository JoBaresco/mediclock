import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Path } from 'react-native-svg';
import { MCButton } from '../../components/ui/MCButton';
import { MCText } from '../../components/ui/MCText';
import { OnboardingHeader } from '../../components/ui/OnboardingHeader';
import { OnboardingProgress } from '../../components/ui/OnboardingProgress';
import { Colors, Typography } from '../../theme';

type Step5MyCircleProps = {
  onContinue: () => void;
  onSkip: () => void;
};

const PILLARS = [
  {
    color: Colors.primary,
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    boldLead: 'Vous décidez',
    rest: ' qui entre dans votre cercle',
  },
  {
    color: Colors.success,
    icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
    boldLead: 'Vous choisissez',
    rest: ' ce qu\'ils peuvent voir',
  },
  {
    color: Colors.warning,
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    boldLead: 'Vous restez',
    rest: ' toujours maître de votre santé',
  },
];

export function Step5MyCircle({ onContinue, onSkip }: Step5MyCircleProps) {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <OnboardingHeader />
        <OnboardingProgress total={6} activeIndex={4} activeColor={Colors.primary} />

        <View style={styles.optionalBadge}>
          <MCText style={styles.optionalBadgeText}>Étape optionnelle — vous pouvez la passer</MCText>
        </View>

        <View style={styles.iconBox}>
          <Svg width={72} height={72} viewBox="0 0 24 24" fill="none">
            <Circle cx={9} cy={7} r={3} fill={Colors.primary} opacity={0.8} />
            <Circle cx={15} cy={7} r={3} fill={Colors.primary} />
            <Path
              d="M3 19c0-3.314 2.686-6 6-6h6c3.314 0 6 2.686 6 6"
              stroke={Colors.primary}
              strokeWidth={2}
              strokeLinecap="round"
              fill="none"
            />
            <Circle cx={12} cy={19} r={2} fill={Colors.danger} />
          </Svg>
        </View>

        <MCText style={styles.title}>
          Votre cercle de <MCText style={styles.titleAccent}>confiance</MCText>
        </MCText>
        <MCText style={styles.subtitle}>
          Invitez un proche de confiance pour qu'il soit informé et puisse vous aider si besoin.
        </MCText>

        <View style={styles.pillarList}>
          {PILLARS.map((pillar) => (
            <View key={pillar.boldLead} style={styles.pillarRow}>
              <View style={[styles.pillarIconBox, { backgroundColor: pillar.color }]}>
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                  <Path d={pillar.icon} stroke="#FFFFFF" strokeWidth={2} strokeLinecap="round" />
                </Svg>
              </View>
              <MCText style={styles.pillarText}>
                <MCText style={styles.pillarBold}>{pillar.boldLead}</MCText>
                {pillar.rest}
              </MCText>
            </View>
          ))}
        </View>

        <View style={styles.actions}>
          <MCButton label="Inviter quelqu'un" onPress={onContinue} style={styles.primaryButton} />
          <Pressable style={styles.skipButton} onPress={onSkip}>
            <MCText style={styles.skipLabel}>Je le ferai plus tard</MCText>
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
  iconBox: {
    width: 110,
    height: 110,
    backgroundColor: Colors.softBlueSurface,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
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
    maxWidth: 240,
    marginBottom: 20,
  },
  pillarList: {
    width: '100%',
    gap: 10,
    marginBottom: 18,
  },
  pillarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.softBlueSurface,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  pillarIconBox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillarText: {
    flex: 1,
    fontFamily: Typography.fonts.body,
    fontSize: 12,
    color: Colors.text,
    lineHeight: 18,
  },
  pillarBold: {
    fontFamily: Typography.fonts.title,
    fontSize: 12,
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
