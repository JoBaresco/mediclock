import { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppHeaderLogo } from '../../components/ui/AppHeaderLogo';
import { MCCard } from '../../components/ui/MCCard';
import { MCInput } from '../../components/ui/MCInput';
import { MCText } from '../../components/ui/MCText';
import { TabScreenScrollView } from '../../components/ui/TabScreenScrollView';
import { Colors, Typography } from '../../theme';
import { DEFAULT_INACTIVITY_TIMEOUT_MINUTES, INACTIVITY_TIMEOUT_KEY } from '../../hooks/useInactivityTimer';
import { useUserStore } from '../../store/useUserStore';
import type { BloodGroup } from '../../types/user.types';
import { useTranslation } from '../../hooks/useTranslation';

const BLOOD_GROUPS: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export function MySpaceScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const [inactivityMinutes, setInactivityMinutes] = useState(DEFAULT_INACTIVITY_TIMEOUT_MINUTES);

  const INACTIVITY_OPTIONS = [
    { label: t('mySpace.autoLock.options.never'), minutes: 0 },
    { label: t('mySpace.autoLock.options.five'), minutes: 5 },
    { label: t('mySpace.autoLock.options.fifteen'), minutes: 15 },
    { label: t('mySpace.autoLock.options.thirty'), minutes: 30 },
  ];

  const profile = useUserStore((state) => state.profile);
  const ensureProfile = useUserStore((state) => state.ensureProfile);
  const updateProfile = useUserStore((state) => state.updateProfile);
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  useEffect(() => {
    ensureProfile();
  }, [ensureProfile]);

  useEffect(() => {
    setWeight(profile?.weight ? String(profile.weight) : '');
    setHeight(profile?.height ? String(profile.height) : '');
  }, [profile?.weight, profile?.height]);

  useEffect(() => {
    let isMounted = true;
    AsyncStorage.getItem(INACTIVITY_TIMEOUT_KEY).then((value) => {
      if (isMounted && value != null) {
        setInactivityMinutes(Number(value));
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const onSelectInactivity = (minutes: number) => {
    setInactivityMinutes(minutes);
    void AsyncStorage.setItem(INACTIVITY_TIMEOUT_KEY, String(minutes));
  };

  const onSelectBloodGroup = (bloodGroup: BloodGroup) => {
    updateProfile({ bloodGroup });
  };

  const onBlurWeight = () => {
    const parsed = Number(weight.replace(',', '.'));
    updateProfile({ weight: weight.trim() && Number.isFinite(parsed) && parsed > 0 ? parsed : undefined });
  };

  const onBlurHeight = () => {
    const parsed = Number(height.replace(',', '.'));
    updateProfile({ height: height.trim() && Number.isFinite(parsed) && parsed > 0 ? parsed : undefined });
  };

  return (
    <TabScreenScrollView style={styles.container} contentContainerStyle={styles.content}>
      <AppHeaderLogo />
      <View style={styles.heroFrame}>
        <Image source={require('../../../assets/images/Cercle_II.png')} style={styles.heroImage} resizeMode="contain" />
      </View>
      <MCText style={styles.kicker}>{t('mySpace.kicker')}</MCText>
      <MCText style={styles.title}>{t('mySpace.heroTitle')}</MCText>
      <MCText style={styles.subtitle}>{t('mySpace.heroSubtitle')}</MCText>

      <TouchableOpacity activeOpacity={0.86} onPress={() => router.push('/my-circle')}>
        <MCCard style={styles.card}>
          <View style={styles.cardIconFrame}>
            <Image source={require('../../../assets/images/Famille_Cercle.png')} style={styles.cardIcon} resizeMode="contain" />
          </View>
          <MCText style={styles.cardTitle}>{t('mySpace.circleCard.title')}</MCText>
          <MCText style={styles.cardBody}>{t('mySpace.circleCard.body')}</MCText>
        </MCCard>
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.86} onPress={() => router.push('/emergency')}>
        <MCCard style={styles.card}>
          <View style={styles.cardIconFrame}>
            <Image source={require('../../../assets/images/Urgence.png')} style={styles.cardIcon} resizeMode="contain" />
          </View>
          <MCText style={styles.cardTitle}>{t('emergency.title')}</MCText>
          <MCText style={styles.cardBody}>{t('mySpace.emergencyCard.body')}</MCText>
        </MCCard>
      </TouchableOpacity>

      <MCCard style={styles.card}>
        <MCText style={styles.cardTitle}>{t('mySpace.personalInfo.title')}</MCText>
        <MCText style={styles.cardBody}>
          {t('mySpace.personalInfo.body')}
        </MCText>

        <MCText style={styles.fieldLabel}>{t('mySpace.personalInfo.bloodGroupLabel')}</MCText>
        <View style={styles.optionsRow}>
          {BLOOD_GROUPS.map((bg) => {
            const isActive = bg === profile?.bloodGroup;
            return (
              <Pressable
                key={bg}
                style={[styles.optionPill, isActive && styles.optionPillActive]}
                onPress={() => onSelectBloodGroup(bg)}
              >
                <MCText style={isActive ? [styles.optionLabel, styles.optionLabelActive] : styles.optionLabel}>
                  {bg}
                </MCText>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.measurementsRow}>
          <View style={styles.measurementField}>
            <MCText style={styles.fieldLabel}>{t('mySpace.personalInfo.heightLabel')}</MCText>
            <MCInput
              placeholder={t('mySpace.personalInfo.heightPlaceholder')}
              value={height}
              onChangeText={setHeight}
              onBlur={onBlurHeight}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.measurementField}>
            <MCText style={styles.fieldLabel}>{t('mySpace.personalInfo.weightLabel')}</MCText>
            <MCInput
              placeholder={t('mySpace.personalInfo.weightPlaceholder')}
              value={weight}
              onChangeText={setWeight}
              onBlur={onBlurWeight}
              keyboardType="numeric"
            />
          </View>
        </View>
      </MCCard>

      <MCCard style={styles.card}>
        <MCText style={styles.cardTitle}>{t('mySpace.autoLock.title')}</MCText>
        <MCText style={styles.cardBody}>
          {t('mySpace.autoLock.body')}
        </MCText>
        <View style={styles.optionsRow}>
          {INACTIVITY_OPTIONS.map((option) => {
            const isActive = option.minutes === inactivityMinutes;
            return (
              <Pressable
                key={option.label}
                style={[styles.optionPill, isActive && styles.optionPillActive]}
                onPress={() => onSelectInactivity(option.minutes)}
              >
                <MCText style={isActive ? [styles.optionLabel, styles.optionLabelActive] : styles.optionLabel}>
                  {option.label}
                </MCText>
              </Pressable>
            );
          })}
        </View>
      </MCCard>
    </TabScreenScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFBFC',
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  heroFrame: {
    backgroundColor: '#F1F7FF',
    borderRadius: 20,
    padding: 8,
    marginBottom: 18,
  },
  heroImage: {
    width: '100%',
    height: 118,
  },
  kicker: {
    color: '#2F80ED',
    fontFamily: Typography.fonts.title,
    fontWeight: '700',
    fontSize: 13,
    lineHeight: 16,
    marginBottom: 8,
  },
  title: {
    color: '#102033',
    fontFamily: Typography.fonts.title,
    fontWeight: '700',
    fontSize: 31,
    lineHeight: 38,
  },
  subtitle: {
    color: '#102033',
    fontFamily: Typography.fonts.body,
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 21,
    opacity: 0.72,
    marginTop: 6,
    marginBottom: 22,
  },
  card: {
    marginBottom: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#EAF0F6',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  cardIconFrame: {
    backgroundColor: '#F1F7FF',
    borderRadius: 14,
    padding: 8,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  cardIcon: {
    width: 44,
    height: 44,
  },
  cardTitle: {
    color: '#102033',
    fontFamily: Typography.fonts.title,
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 23,
    marginBottom: 6,
  },
  cardBody: {
    color: '#102033',
    fontFamily: Typography.fonts.body,
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 21,
    opacity: 0.85,
  },
  fieldLabel: {
    color: '#102033',
    fontFamily: Typography.fonts.title,
    fontWeight: '700',
    fontSize: 13,
    marginTop: 14,
    marginBottom: 8,
  },
  measurementsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 14,
  },
  measurementField: {
    flex: 1,
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 14,
  },
  optionPill: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#E5E9F0',
    backgroundColor: '#F1F7FF',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  optionPillActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  optionLabel: {
    color: '#102033',
    fontFamily: Typography.fonts.title,
    fontWeight: '700',
    fontSize: 13,
  },
  optionLabelActive: {
    color: '#FFFFFF',
  },
});
