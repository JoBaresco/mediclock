import { Image, ScrollView, View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography } from '../../theme';
import { MCText } from '../../components/ui/MCText';
import { MCButton } from '../../components/ui/MCButton';

type Step1WelcomeProps = {
  onContinue?: () => void;
};

const FEATURES = [
  {
    color: Colors.primary,
    title: 'Rappels intelligents',
    subtitle: 'Ne manquez plus aucun traitement',
    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z',
  },
  {
    color: Colors.success,
    title: 'Suivi simplifié',
    subtitle: 'Votre santé organisée en quelques secondes',
    icon: 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z',
  },
  {
    color: Colors.warning,
    title: 'Mon Cercle',
    subtitle: 'Partagez avec vos proches en toute sécurité',
    icon: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
  },
];

export function Step1Welcome({ onContinue }: Step1WelcomeProps) {
  return (
    <View style={styles.page}>
      <View style={styles.card}>
        <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
          <ScrollView contentContainerStyle={styles.content}>
            <Image
              source={require('../../../assets/images/Logo_Master_MC_sans_MD_2.png')}
              style={{ width: 380, height: 253, alignSelf: 'center' }}
              resizeMode="contain"
            />

            <MCText style={styles.title}>Bienvenue dans</MCText>

            <Image source={require('../../../assets/images/mediclock_II.jpeg')} style={styles.wordmark} resizeMode="contain" />

            <MCText style={styles.body}>Votre compagnon santé au quotidien.</MCText>

            <View style={styles.featureList}>
              {FEATURES.map((feature) => (
                <View key={feature.title} style={styles.featureRow}>
                  <View style={[styles.featureIconBox, { backgroundColor: feature.color }]}>
                    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                      <Path d={feature.icon} fill="#FFFFFF" />
                    </Svg>
                  </View>
                  <View style={styles.featureTextBlock}>
                    <MCText style={styles.featureTitle}>{feature.title}</MCText>
                    <MCText style={styles.featureSubtitle}>{feature.subtitle}</MCText>
                  </View>
                </View>
              ))}
            </View>

            <MCButton label="Commencer" onPress={() => onContinue?.()} style={styles.button} />
          </ScrollView>
        </SafeAreaView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#F5F6F8',
    padding: 8,
  },
  card: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: 40,
    overflow: 'hidden',
    shadowColor: '#2F80ED',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 20,
    elevation: 4,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingTop: 24,
    paddingBottom: 24,
  },
  title: {
    fontFamily: Typography.fonts.title,
    fontSize: 26,
    lineHeight: 32,
    color: '#102033',
    textAlign: 'center',
    marginBottom: 8,
  },
  wordmark: {
    width: 200,
    height: 60,
    marginBottom: 20,
  },
  body: {
    fontFamily: Typography.fonts.body,
    fontSize: 15,
    lineHeight: 22,
    color: '#6B7280',
    textAlign: 'center',
    maxWidth: 300,
    marginBottom: 28,
  },
  featureList: {
    width: '100%',
    gap: 12,
    marginBottom: 20,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.softBlueSurface,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  featureIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureTextBlock: {
    flexShrink: 1,
  },
  featureTitle: {
    fontFamily: Typography.fonts.title,
    fontSize: 13,
    color: Colors.text,
  },
  featureSubtitle: {
    fontFamily: Typography.fonts.body,
    fontSize: 11,
    color: Colors.muted,
  },
  button: {
    width: '100%',
    borderRadius: 16,
  },
});
