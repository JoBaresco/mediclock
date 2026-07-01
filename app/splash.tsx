import { useCallback } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { SplashScreen as SplashScreenView } from '../src/screens/SplashScreen';

export default function SplashScreen() {
  const { from } = useLocalSearchParams<{ from?: string }>();

  const handleComplete = useCallback(() => {
    if (from === 'lock') {
      router.replace('/(tabs)/today');
      return;
    }
    router.replace('/(onboarding)/welcome');
  }, [from]);

  return <SplashScreenView onAnimationComplete={handleComplete} />;
}
