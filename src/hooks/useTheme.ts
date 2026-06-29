import { useColorScheme } from 'react-native';
import { useAppStore } from '../store/useAppStore';

export const useTheme = () => {
  const systemScheme = useColorScheme();
  const isDarkMode = useAppStore((state) => state.isDarkMode);
  return {
    colorScheme: isDarkMode ? 'dark' : systemScheme || 'light',
    isDarkMode,
  };
};
