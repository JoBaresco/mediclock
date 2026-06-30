import { useCallback } from 'react';
import { router } from 'expo-router';
import { SplashScreen as SplashScreenView } from '../src/screens/SplashScreen';

export default function SplashScreen() {
  const handleComplete = useCallback(() => {
    router.replace('/(onboarding)/welcome');
  }, []);

  return <SplashScreenView onAnimationComplete={handleComplete} />;
}
