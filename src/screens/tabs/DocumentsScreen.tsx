import { Image, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { AppHeaderLogo } from '../../components/ui/AppHeaderLogo';
import { MCCard } from '../../components/ui/MCCard';
import { MCButton } from '../../components/ui/MCButton';
import { MCText } from '../../components/ui/MCText';
import { TabScreenScrollView } from '../../components/ui/TabScreenScrollView';
import { Typography } from '../../theme';
import { useTranslation } from '../../hooks/useTranslation';

export function DocumentsScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <TabScreenScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headerRow}>
        <MCButton label={t('common.back')} variant="ghost" fullWidth={false} onPress={() => router.back()} />
      </View>
      <AppHeaderLogo />
      <View style={styles.imageFrame}>
        <Image source={require('../../../assets/images/Dossier_Medical.png')} style={styles.heroImage} resizeMode="contain" />
      </View>
      <MCText style={styles.kicker}>{t('documents.title')}</MCText>
      <MCText style={styles.title}>{t('documents.heroTitle')}</MCText>
      <MCText style={styles.subtitle}>{t('documents.heroSubtitle')}</MCText>

      <MCCard style={styles.card}>
        <MCText style={styles.cardTitle}>{t('documents.emptyTitle')}</MCText>
        <MCText style={styles.cardBody}>{t('documents.emptyBody')}</MCText>
      </MCCard>

      <View style={styles.actions}>
        <MCButton label={t('documents.add')} onPress={() => undefined} />
      </View>
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
  headerRow: {
    marginBottom: 12,
  },
  imageFrame: {
    backgroundColor: '#F1F7FF',
    borderRadius: 20,
    padding: 10,
    marginBottom: 18,
  },
  heroImage: {
    width: '100%',
    height: 170,
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
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#EAF0F6',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  cardTitle: {
    color: '#102033',
    fontFamily: Typography.fonts.title,
    fontWeight: '700',
    fontSize: 17,
    lineHeight: 22,
    marginBottom: 8,
  },
  cardBody: {
    color: '#102033',
    fontFamily: Typography.fonts.body,
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 21,
    opacity: 0.85,
  },
  actions: {
    marginTop: 18,
  },
});
