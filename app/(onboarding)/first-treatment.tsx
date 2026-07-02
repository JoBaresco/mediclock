import { useRouter } from 'expo-router';
import { Step3FirstTreatment } from '../../src/screens/onboarding/Step3FirstTreatment';

export default function FirstTreatmentScreen() {
  const router = useRouter();

  return (
    <Step3FirstTreatment
      onSmartCapture={() => router.push('/smart-capture')}
      onManual={() => router.push('/(tabs)/treatments')}
      onSkip={() => router.push('/(onboarding)/first-appointment')}
    />
  );
}
