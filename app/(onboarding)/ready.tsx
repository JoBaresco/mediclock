import { useRouter } from 'expo-router';
import { Step6Ready } from '../../src/screens/onboarding/Step6Ready';

export default function ReadyScreen() {
  const router = useRouter();

  return <Step6Ready onFinish={() => router.replace('/(tabs)/today')} />;
}
