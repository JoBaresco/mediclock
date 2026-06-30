import { useRouter } from 'expo-router';
import { Step1Welcome } from '../../src/screens/onboarding/Step1Welcome';

export default function WelcomeScreen() {
  const router = useRouter();

  return <Step1Welcome onContinue={() => router.push('/(onboarding)/create-space')} />;
}
