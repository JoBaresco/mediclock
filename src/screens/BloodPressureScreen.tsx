import { useMemo, useState } from 'react';
import { Modal, ScrollView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { AppHeaderLogo } from '../components/ui/AppHeaderLogo';
import { MCButton } from '../components/ui/MCButton';
import { MCCard } from '../components/ui/MCCard';
import { MCText } from '../components/ui/MCText';
import { WheelPicker } from '../components/ui/WheelPicker';
import { Colors, Typography } from '../theme';
import { useTranslation } from '../hooks/useTranslation';
import { getBcp47Locale } from '../i18n/dateLocale';
import { useBloodPressureStore } from '../store/useBloodPressureStore';

const SYSTOLIC_VALUES = Array.from({ length: 131 }, (_, index) => 70 + index);
const DIASTOLIC_VALUES = Array.from({ length: 91 }, (_, index) => 40 + index);

export function BloodPressureScreen() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const locale = getBcp47Locale(i18n.language);
  const readings = useBloodPressureStore((state) => state.readings);
  const addReading = useBloodPressureStore((state) => state.addReading);

  const [modalVisible, setModalVisible] = useState(false);
  const [systolic, setSystolic] = useState(120);
  const [diastolic, setDiastolic] = useState(80);

  const unit = useMemo(() => t('bloodPressure.unit'), [t]);

  const onOpenModal = () => {
    setSystolic(120);
    setDiastolic(80);
    setModalVisible(true);
  };

  const onSave = () => {
    addReading(systolic, diastolic, new Date().toISOString());
    setModalVisible(false);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headerRow}>
        <MCButton label={t('common.back')} variant="ghost" fullWidth={false} onPress={() => router.back()} />
      </View>
      <AppHeaderLogo />
      <MCText style={styles.kicker}>{t('bloodPressure.title')}</MCText>
      <MCText style={styles.title}>{t('bloodPressure.heroTitle')}</MCText>
      <MCText style={styles.subtitle}>{t('bloodPressure.heroSubtitle')}</MCText>

      <MCButton label={t('bloodPressure.addMeasurement')} onPress={onOpenModal} style={styles.addButton} />

      <MCText style={styles.sectionTitle}>{t('bloodPressure.historyTitle')}</MCText>

      {readings.length === 0 ? (
        <MCCard style={styles.card}>
          <MCText style={styles.cardTitle}>{t('bloodPressure.empty')}</MCText>
          <MCText style={styles.cardBody}>{t('bloodPressure.emptyHint')}</MCText>
        </MCCard>
      ) : (
        readings.map((reading) => (
          <MCCard key={reading.id} style={styles.card}>
            <MCText style={styles.readingValue}>
              {t('bloodPressure.reading', { systolic: reading.systolic, diastolic: reading.diastolic, unit })}
            </MCText>
            <MCText style={styles.readingDate}>
              {new Date(reading.measuredAt).toLocaleString(locale)}
            </MCText>
          </MCCard>
        ))
      )}

      <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.backdrop}>
          <View style={styles.sheet}>
            <MCText style={styles.sheetTitle}>{t('bloodPressure.addMeasurement')}</MCText>
            <View style={styles.wheelsRow}>
              <WheelPicker label={t('bloodPressure.systolic')} values={SYSTOLIC_VALUES} selectedValue={systolic} onChange={setSystolic} />
              <MCText style={styles.slash}>/</MCText>
              <WheelPicker label={t('bloodPressure.diastolic')} values={DIASTOLIC_VALUES} selectedValue={diastolic} onChange={setDiastolic} />
            </View>
            <MCButton label={t('bloodPressure.save')} onPress={onSave} style={styles.saveButton} />
            <MCButton label={t('bloodPressure.cancel')} variant="ghost" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </ScrollView>
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
    paddingBottom: 120,
  },
  headerRow: {
    marginBottom: 12,
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
  addButton: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#102033',
    fontFamily: Typography.fonts.title,
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 12,
  },
  card: {
    marginBottom: 12,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#EAF0F6',
    backgroundColor: '#FFFFFF',
    padding: 18,
  },
  cardTitle: {
    color: '#102033',
    fontFamily: Typography.fonts.title,
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 6,
  },
  cardBody: {
    color: '#102033',
    fontFamily: Typography.fonts.body,
    fontSize: 15,
    opacity: 0.85,
  },
  readingValue: {
    color: '#102033',
    fontFamily: Typography.fonts.title,
    fontWeight: '700',
    fontSize: 20,
    marginBottom: 4,
  },
  readingDate: {
    color: '#102033',
    fontFamily: Typography.fonts.body,
    fontSize: 13,
    opacity: 0.65,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(16, 32, 51, 0.4)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
    alignItems: 'center',
  },
  sheetTitle: {
    color: '#102033',
    fontFamily: Typography.fonts.title,
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 20,
  },
  wheelsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 24,
  },
  slash: {
    fontFamily: Typography.fonts.title,
    fontSize: 24,
    color: Colors.muted,
    marginTop: 20,
  },
  saveButton: {
    width: '100%',
    marginBottom: 8,
  },
});
