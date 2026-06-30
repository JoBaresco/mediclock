import { ImageBackground, Pressable, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography } from '../../theme';
import { MCText } from '../../components/ui/MCText';

type Step1WelcomeProps = {
  onContinue?: () => void;
};

export function Step1Welcome({ onContinue }: Step1WelcomeProps) {
  const router = useRouter();

  return (
    <ImageBackground
      source={require('../../../assets/images/pont_mediclock.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.overlay} edges={['top', 'bottom']}>
        <View style={styles.headerRow}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <MCText style={styles.backLabel}>Retour</MCText>
          </Pressable>
        </View>
        <View style={styles.copyBlock}>
          <MCText style={styles.title}>Bienvenue dans MediClock</MCText>
          <MCText style={styles.body}>Votre espace de santé clair, calme et toujours à jour.</MCText>
        </View>

        <Pressable style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]} onPress={onContinue}>
          <MCText style={styles.buttonLabel}>Commencer</MCText>
        </Pressable>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  overlay: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 20,
    paddingBottom: 18,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(250, 251, 252, 0.86)',
  },
  headerRow: {
    alignItems: 'flex-start',
  },
  backButton: {
    backgroundColor: '#F1F7FF',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  backLabel: {
    color: Colors.primary,
    fontFamily: Typography.fonts.title,
    fontSize: 13,
    lineHeight: 16,
  },
  copyBlock: {
    maxWidth: 334,
  },
  title: {
    color: Colors.text,
    fontFamily: Typography.fonts.title,
    fontSize: 38,
    lineHeight: 44,
    marginBottom: 10,
  },
  body: {
    color: Colors.muted,
    fontFamily: Typography.fonts.body,
    fontSize: 15,
    lineHeight: 23,
    maxWidth: 312,
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    minHeight: 54,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOpacity: 0.22,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 3,
  },
  buttonPressed: {
    transform: [{ scale: 0.992 }],
    shadowOpacity: 0.16,
  },
  buttonLabel: {
    color: '#FFFFFF',
    fontFamily: Typography.fonts.title,
    fontSize: 15,
    lineHeight: 20,
  },
});