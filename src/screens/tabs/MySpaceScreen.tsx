import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { AppHeaderLogo } from '../../components/ui/AppHeaderLogo';
import { MCCard } from '../../components/ui/MCCard';
import { MCText } from '../../components/ui/MCText';
import { Typography } from '../../theme';

export function MySpaceScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <AppHeaderLogo />
      <View style={styles.heroFrame}>
        <Image source={require('../../../assets/images/Cercle_II.png')} style={styles.heroImage} resizeMode="contain" />
      </View>
      <MCText style={styles.kicker}>Mon Espace</MCText>
      <MCText style={styles.title}>Paramètres personnels et sécurité.</MCText>
      <MCText style={styles.subtitle}>Pilotez votre cercle et votre protocole d'urgence en un geste.</MCText>

      <TouchableOpacity activeOpacity={0.86} onPress={() => router.push('/my-circle')}>
        <MCCard style={styles.card}>
          <View style={styles.cardIconFrame}>
            <Image source={require('../../../assets/images/Famille_Cercle.png')} style={styles.cardIcon} resizeMode="contain" />
          </View>
          <MCText style={styles.cardTitle}>Mon Cercle</MCText>
          <MCText style={styles.cardBody}>Invitations, permissions, suivi des proches.</MCText>
        </MCCard>
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.86} onPress={() => router.push('/emergency')}>
        <MCCard style={styles.card}>
          <View style={styles.cardIconFrame}>
            <Image source={require('../../../assets/images/Urgence.png')} style={styles.cardIcon} resizeMode="contain" />
          </View>
          <MCText style={styles.cardTitle}>Urgence</MCText>
          <MCText style={styles.cardBody}>Contact prioritaire et actions critiques.</MCText>
        </MCCard>
      </TouchableOpacity>
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
});
