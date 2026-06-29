import { useAppStore } from '../store/useAppStore';

export const useOnboarding = () => {
  const isOnboardingComplete = useAppStore((state) => state.isOnboardingComplete);
  return {
    isOnboardingComplete,
  };
};
