import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Rect } from 'react-native-svg';
import { MCButton } from '../../components/ui/MCButton';
import { MCText } from '../../components/ui/MCText';
import { AppHeaderLogo } from '../../components/ui/AppHeaderLogo';
import { OnboardingProgress } from '../../components/ui/OnboardingProgress';
import { Colors, Typography } from '../../theme';
import { useTranslation } from '../../hooks/useTranslation';

type Step3FirstTreatmentProps = {
  onSmartCapture: () => void;
  onManual: () => void;
  onSkip: () => void;
};

export function Step3FirstTreatment({ onSmartCapture, onManual, onSkip }: Step3FirstTreatmentProps) {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <AppHeaderLogo />
        <OnboardingProgress total={6} activeIndex={2} activeColor={Colors.primary} />

        <MCText style={styles.title}>
          {t('onboarding.step3.title')}{'\n'}
          <MCText style={styles.titleAccent}>{t('onboarding.step3.titleAccent')}</MCText>
        </MCText>
        <MCText style={styles.subtitle}>{t('onboarding.step3.subtitle')}</MCText>

        <View style={styles.scanCard}>
          <Svg width={70} height={70} viewBox="0 0 100 60" fill="none">
            <Rect x={5} y={5} width={90} height={50} rx={8} fill="#FFFFFF" stroke={Colors.primary} strokeWidth={2} />
            <Rect x={15} y={12} width={30} height={36} rx={4} fill={Colors.softBlueSurface} stroke={Colors.primary} strokeWidth={1.5} />
            <Rect x={17} y={16} width={26} height={3} rx={1.5} fill={Colors.primary} />
            <Rect x={17} y={22} width={20} height={2} rx={1} fill={Colors.muted} />
            <Rect x={17} y={27} width={24} height={2} rx={1} fill={Colors.muted} />
            <Rect x={17} y={32} width={18} height={2} rx={1} fill={Colors.muted} />
            <Rect x={52} y={12} width={36} height={36} rx={4} fill="#FFFFFF" stroke="#E8EDF2" strokeWidth={1} />
            <Rect x={55} y={15} width={6} height={6} rx={1} fill={Colors.text} />
            <Rect x={63} y={15} width={4} height={2} rx={1} fill={Colors.text} />
            <Rect x={63} y={19} width={6} height={2} rx={1} fill={Colors.text} />
            <Rect x={55} y={23} width={2} height={6} rx={1} fill={Colors.text} />
            <Rect x={59} y={23} width={6} height={2} rx={1} fill={Colors.text} />
            <Rect x={59} y={27} width={4} height={2} rx={1} fill={Colors.text} />
            <Rect x={65} y={23} width={2} height={6} rx={1} fill={Colors.text} />
            <Rect x={55} y={31} width={6} height={6} rx={1} fill={Colors.text} />
            <Rect x={63} y={33} width={8} height={2} rx={1} fill={Colors.text} />
            <Rect x={63} y={37} width={6} height={2} rx={1} fill={Colors.text} />
          </Svg>
          <MCText style={styles.scanHint}>{t('onboarding.step3.scanHint')}</MCText>
          <MCButton
            label={t('treatments.scan')}
            onPress={onSmartCapture}
            style={styles.scanButton}
          />
        </View>

        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <MCText style={styles.dividerText}>{t('common.or')}</MCText>
          <View style={styles.dividerLine} />
        </View>

        <Pressable style={styles.manualButton} onPress={onManual}>
          <MCText style={styles.manualLabel}>{t('treatments.manual')}</MCText>
        </Pressable>

        <Pressable style={styles.skipButton} onPress={onSkip}>
          <MCText style={styles.skipLabel}>{t('onboarding.step3.skip')}</MCText>
        </Pressable>
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
  scanCard: {
    width: '100%',
    backgroundColor: Colors.softBlueSurface,
    borderRadius: 20,
    padding: 19,
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  scanHint: {
    fontFamily: Typography.fonts.body,
    fontSize: 12,
    color: Colors.muted,
    textAlign: 'center',
    lineHeight: 18,
  },
  scanButton: {
    width: '100%',
    borderRadius: 14,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '100%',
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 0.5,
    backgroundColor: '#E8EDF2',
  },
  dividerText: {
    fontFamily: Typography.fonts.body,
    fontSize: 12,
    color: '#9CA3AF',
  },
  manualButton: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: Colors.primary,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 10,
  },
  manualLabel: {
    fontFamily: Typography.fonts.title,
    fontSize: 14,
    color: Colors.primary,
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
