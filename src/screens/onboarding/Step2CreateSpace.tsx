import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Line, Rect } from 'react-native-svg';
import { MCButton } from '../../components/ui/MCButton';
import { MCInput } from '../../components/ui/MCInput';
import { MCText } from '../../components/ui/MCText';
import { AppHeaderLogo } from '../../components/ui/AppHeaderLogo';
import { OnboardingProgress } from '../../components/ui/OnboardingProgress';
import { Colors, Typography } from '../../theme';
import { useTranslation } from '../../hooks/useTranslation';

type Step2CreateSpaceProps = {
  onContinue: () => void;
  onSkip: () => void;
};

export function Step2CreateSpace({ onContinue, onSkip }: Step2CreateSpaceProps) {
  const { t } = useTranslation();
  const [gender, setGender] = useState<'homme' | 'femme'>('homme');

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <AppHeaderLogo />
        <OnboardingProgress total={6} activeIndex={1} activeColor={Colors.primary} />

        <MCText style={styles.title}>{t('onboarding.step2.title')}</MCText>
        <MCText style={styles.subtitle}>{t('onboarding.step2.subtitle')}</MCText>

        <View style={styles.form}>
          <View style={styles.field}>
            <MCText style={styles.label}>
              {t('onboarding.step2.firstNameLabel')} <MCText style={styles.required}>*</MCText>
            </MCText>
            <MCInput placeholder={t('onboarding.step2.firstNamePlaceholder')} style={styles.inputActive} />
          </View>

          <View style={styles.field}>
            <MCText style={styles.label}>
              {t('onboarding.step2.dobLabel')} <MCText style={styles.optional}>{t('common.optionalSuffix')}</MCText>
            </MCText>
            <Pressable style={styles.inputRow}>
              <MCText style={styles.placeholderText}>{t('onboarding.step2.dobPlaceholder')}</MCText>
              <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                <Rect x={3} y={4} width={18} height={18} rx={3} stroke="#9CA3AF" strokeWidth={2} />
                <Line x1={3} y1={9} x2={21} y2={9} stroke="#9CA3AF" strokeWidth={2} />
                <Line x1={8} y1={2} x2={8} y2={6} stroke="#9CA3AF" strokeWidth={2} strokeLinecap="round" />
                <Line x1={16} y1={2} x2={16} y2={6} stroke="#9CA3AF" strokeWidth={2} strokeLinecap="round" />
              </Svg>
            </Pressable>
          </View>

          <View style={styles.field}>
            <MCText style={styles.label}>
              {t('onboarding.step2.genderLabel')} <MCText style={styles.optional}>{t('common.optionalSuffix')}</MCText>
            </MCText>
            <View style={styles.genderRow}>
              <Pressable
                style={[styles.genderOption, gender === 'homme' && styles.genderOptionActive]}
                onPress={() => setGender('homme')}
              >
                <MCText style={gender === 'homme' ? [styles.genderLabel, styles.genderLabelActive] : styles.genderLabel}>
                  {t('onboarding.step2.genderMale')}
                </MCText>
              </Pressable>
              <Pressable
                style={[styles.genderOption, gender === 'femme' && styles.genderOptionActive]}
                onPress={() => setGender('femme')}
              >
                <MCText style={gender === 'femme' ? [styles.genderLabel, styles.genderLabelActive] : styles.genderLabel}>
                  {t('onboarding.step2.genderFemale')}
                </MCText>
              </Pressable>
            </View>
          </View>
        </View>

        <View style={styles.noteBox}>
          <Svg width={15} height={15} viewBox="0 0 24 24" fill="none" style={styles.noteIcon}>
            <Circle cx={12} cy={12} r={10} stroke={Colors.primary} strokeWidth={2} />
            <Line x1={12} y1={8} x2={12} y2={12} stroke={Colors.primary} strokeWidth={2} strokeLinecap="round" />
            <Circle cx={12} cy={16} r={1} fill={Colors.primary} />
          </Svg>
          <MCText style={styles.noteText}>
            {t('onboarding.step2.noteBefore')} <MCText style={styles.noteLink}>{t('mySpace.title')}</MCText>.
          </MCText>
        </View>

        <View style={styles.actions}>
          <MCButton label={t('onboarding.step2.cta')} onPress={onContinue} style={styles.primaryButton} />
          <MCButton label={t('onboarding.step2.skip')} variant="ghost" onPress={onSkip} />
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
  title: {
    fontFamily: Typography.fonts.title,
    fontSize: 19,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 6,
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
    gap: 14,
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
  required: {
    fontFamily: Typography.fonts.body,
    fontSize: 12,
    color: Colors.primary,
  },
  optional: {
    fontFamily: Typography.fonts.body,
    fontSize: 12,
    color: '#9CA3AF',
  },
  inputActive: {
    borderColor: Colors.primary,
    borderWidth: 1.5,
    borderRadius: 14,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E8EDF2',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  placeholderText: {
    fontFamily: Typography.fonts.body,
    fontSize: 14,
    color: '#9CA3AF',
  },
  genderRow: {
    flexDirection: 'row',
    gap: 10,
  },
  genderOption: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E8EDF2',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
  },
  genderOptionActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  genderLabel: {
    fontFamily: Typography.fonts.title,
    fontSize: 13,
    color: Colors.muted,
  },
  genderLabelActive: {
    color: '#FFFFFF',
  },
  noteBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: Colors.softBlueSurface,
    borderRadius: 14,
    paddingVertical: 11,
    paddingHorizontal: 14,
    width: '100%',
    marginBottom: 20,
  },
  noteIcon: {
    marginTop: 2,
  },
  noteText: {
    flex: 1,
    fontFamily: Typography.fonts.body,
    fontSize: 11,
    color: Colors.muted,
    lineHeight: 18,
  },
  noteLink: {
    fontFamily: Typography.fonts.body,
    fontSize: 11,
    color: Colors.primary,
  },
  actions: {
    width: '100%',
    gap: 10,
  },
  primaryButton: {
    borderRadius: 16,
  },
});
