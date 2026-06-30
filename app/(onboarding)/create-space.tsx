import { useRouter } from 'expo-router';
import { Step2CreateSpace } from '../../src/screens/onboarding/Step2CreateSpace';

export default function CreateSpaceScreen() {
  const router = useRouter();

  return (
    <Step2CreateSpace
      onContinue={() => router.push('/(onboarding)/first-treatment')}
      onSkip={() => router.push('/(onboarding)/first-treatment')}
    />
  );
}
