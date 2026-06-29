import { create } from 'zustand';

interface AppState {
  isOnboardingComplete: boolean;
  isDarkMode: boolean;
  hasNotificationsPermission: boolean;
  setOnboardingComplete: (value: boolean) => void;
  setDarkMode: (value: boolean) => void;
  setNotificationsPermission: (value: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isOnboardingComplete: false,
  isDarkMode: false,
  hasNotificationsPermission: false,
  setOnboardingComplete: (value) => set({ isOnboardingComplete: value }),
  setDarkMode: (value) => set({ isDarkMode: value }),
  setNotificationsPermission: (value) => set({ hasNotificationsPermission: value }),
}));
