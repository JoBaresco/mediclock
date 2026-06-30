import { useRouter } from 'expo-router';
import { Step5MyCircle } from '../../src/screens/onboarding/Step5MyCircle';

export default function MyCircleScreen() {
  const router = useRouter();

  return (
    <Step5MyCircle
      onContinue={() => router.push('/(onboarding)/ready')}
      onSkip={() => router.push('/(onboarding)/ready')}
    />
  );
}
