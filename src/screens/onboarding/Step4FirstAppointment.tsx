import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Line, Rect } from 'react-native-svg';
import { MCButton } from '../../components/ui/MCButton';
import { MCInput } from '../../components/ui/MCInput';
import { MCText } from '../../components/ui/MCText';
import { MCSelect } from '../../components/ui/MCSelect';
import { MCDateTimePicker } from '../../components/ui/MCDateTimePicker';
import { SaveToast } from '../../components/ui/SaveToast';
import { AppHeaderLogo } from '../../components/ui/AppHeaderLogo';
import { OnboardingProgress } from '../../components/ui/OnboardingProgress';
import { Colors, Typography } from '../../theme';
import { useTranslation } from '../../hooks/useTranslation';
import { useSaveToast } from '../../hooks/useSaveToast';
import { getBcp47Locale } from '../../i18n/dateLocale';
import { MEDICAL_SPECIALTIES } from '../../constants/medicalSpecialties';
import { APPOINTMENT_LOCATION_TYPES } from '../../constants/appointmentLocationTypes';

type Step4FirstAppointmentProps = {
  onContinue: () => void;
  onSkip: () => void;
};

const DEFAULT_APPOINTMENT_DATE = (() => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  date.setHours(10, 0, 0, 0);
  return date;
})();

export function Step4FirstAppointment({ onContinue, onSkip }: Step4FirstAppointmentProps) {
  const { t, i18n } = useTranslation();
  const locale = getBcp47Locale(i18n.language);
  const [specialty, setSpecialty] = useState('cardiology');
  const [customSpecialty, setCustomSpecialty] = useState('');
  const [locationType, setLocationType] = useState('');
  const [customLocation, setCustomLocation] = useState('');
  const [appointmentDate, setAppointmentDate] = useState(DEFAULT_APPOINTMENT_DATE);
  const formToast = useSaveToast();
  const specialtyOptions = MEDICAL_SPECIALTIES.map((key) => ({
    value: key,
    label: t(`medicalSpecialties.${key}`),
  }));
  const locationTypeOptions = APPOINTMENT_LOCATION_TYPES.map((key) => ({
    value: key,
    label: t(`appointmentLocationTypes.${key}`),
  }));

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoider}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
      >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <AppHeaderLogo />
        <OnboardingProgress total={6} activeIndex={3} activeColor={Colors.primary} />

        <View style={styles.optionalBadge}>
          <MCText style={styles.optionalBadgeText}>{t('onboarding.optionalStepBadge')}</MCText>
        </View>

        <MCText style={styles.title}>
          {t('onboarding.step4.title')} <MCText style={styles.titleAccent}>{t('onboarding.step4.titleAccent')}</MCText>
        </MCText>
        <MCText style={styles.subtitle}>{t('onboarding.step4.subtitle')}</MCText>

        <View style={styles.form}>
          <View style={styles.field}>
            <MCText style={styles.label}>{t('onboarding.step4.specialtyLabel')}</MCText>
            <MCSelect
              value={specialty}
              options={specialtyOptions}
              onSelect={setSpecialty}
              placeholder={t('common.specialtyPlaceholder')}
            />
            {specialty === 'other' ? (
              <MCInput
                placeholder={t('common.otherPlaceholder')}
                value={customSpecialty}
                onChangeText={setCustomSpecialty}
                onBlur={() => formToast.show()}
                style={styles.customInput}
              />
            ) : null}
          </View>

          <View style={styles.row}>
            <View style={[styles.field, styles.rowItem]}>
              <MCText style={styles.label}>{t('onboarding.step4.dateLabel')}</MCText>
              <MCDateTimePicker
                mode="date"
                value={appointmentDate}
                onChange={setAppointmentDate}
                label={appointmentDate.toLocaleDateString(locale)}
                style={styles.rowItem}
                icon={
                  <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
                    <Rect x={3} y={4} width={18} height={18} rx={3} stroke="#9CA3AF" strokeWidth={2} />
                    <Line x1={3} y1={9} x2={21} y2={9} stroke="#9CA3AF" strokeWidth={2} />
                    <Line x1={8} y1={2} x2={8} y2={6} stroke="#9CA3AF" strokeWidth={2} strokeLinecap="round" />
                    <Line x1={16} y1={2} x2={16} y2={6} stroke="#9CA3AF" strokeWidth={2} strokeLinecap="round" />
                  </Svg>
                }
              />
            </View>
            <View style={[styles.field, styles.rowItem]}>
              <MCText style={styles.label}>{t('onboarding.step4.timeLabel')}</MCText>
              <MCDateTimePicker
                mode="time"
                value={appointmentDate}
                onChange={setAppointmentDate}
                label={appointmentDate.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })}
                icon={
                  <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
                    <Circle cx={12} cy={12} r={9} stroke="#9CA3AF" strokeWidth={2} />
                    <Line x1={12} y1={7} x2={12} y2={12} stroke="#9CA3AF" strokeWidth={2} strokeLinecap="round" />
                    <Line x1={12} y1={12} x2={15} y2={14} stroke="#9CA3AF" strokeWidth={2} strokeLinecap="round" />
                  </Svg>
                }
              />
            </View>
          </View>

          <View style={styles.field}>
            <MCText style={styles.label}>
              {t('onboarding.step4.doctorLabel')} <MCText style={styles.optional}>{t('common.optionalSuffix')}</MCText>
            </MCText>
            <MCInput placeholder={t('onboarding.step4.doctorPlaceholder')} />
          </View>

          <View style={styles.field}>
            <MCText style={styles.label}>
              {t('onboarding.step4.locationLabel')} <MCText style={styles.optional}>{t('common.optionalSuffix')}</MCText>
            </MCText>
            <MCSelect
              value={locationType}
              options={locationTypeOptions}
              onSelect={setLocationType}
              placeholder={t('common.locationTypePlaceholder')}
            />
            {locationType === 'other' ? (
              <MCInput
                placeholder={t('onboarding.step4.locationPlaceholder')}
                value={customLocation}
                onChangeText={setCustomLocation}
                onBlur={() => formToast.show()}
                style={styles.customInput}
              />
            ) : null}
          </View>
        </View>

        <View style={styles.actions}>
          <MCButton label={t('common.continue')} onPress={onContinue} style={styles.primaryButton} />
          <Pressable style={styles.skipButton} onPress={onSkip} hitSlop={16}>
            <MCText style={styles.skipLabel}>{t('onboarding.step4.skip')}</MCText>
          </Pressable>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
      <SaveToast visible={formToast.visible} message={t('common.saved')} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboardAvoider: {
    flex: 1,
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
  customInput: {
    marginTop: 8,
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
