import { useRouter } from 'expo-router';
import { Step4FirstAppointment } from '../../src/screens/onboarding/Step4FirstAppointment';

export default function FirstAppointmentScreen() {
  const router = useRouter();

  return (
    <Step4FirstAppointment
      onContinue={() => router.push('/(onboarding)/my-circle')}
      onSkip={() => router.push('/(onboarding)/my-circle')}
    />
  );
}
