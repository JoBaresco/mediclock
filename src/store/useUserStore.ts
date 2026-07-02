import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { UserProfile, EmergencyContact, HealthProfessional } from '../types/user.types';

interface UserState {
  profile: UserProfile | null;
  hydrated: boolean;
  ensureProfile: () => void;
  setProfile: (profile: UserProfile) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  addEmergencyContact: (contact: EmergencyContact) => void;
  updateEmergencyContact: (id: string, updates: Partial<EmergencyContact>) => void;
  removeEmergencyContact: (id: string) => void;
  addHealthProfessional: (professional: HealthProfessional) => void;
  setHydrated: (value: boolean) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      profile: null,
      hydrated: false,
      ensureProfile: () => set((state) => {
        if (state.profile) {
          return state;
        }

        const now = new Date().toISOString();
        return {
          profile: {
            id: 'local-profile',
            firstName: 'Jean',
            allergies: [],
            conditions: [],
            chronicTreatments: [],
            emergencyContacts: [],
            language: 'fr',
            notificationsEnabled: true,
            biometricEnabled: false,
            isPlusSubscriber: false,
            createdAt: now,
            updatedAt: now,
          },
        };
      }),
      setProfile: (profile) => set({ profile }),
      updateProfile: (updates) => set((state) => ({
        profile: state.profile ? { ...state.profile, ...updates } : null,
      })),
      addEmergencyContact: (contact) => set((state) => ({
        profile: state.profile
          ? { ...state.profile, emergencyContacts: [...state.profile.emergencyContacts, contact] }
          : state.profile,
      })),
      updateEmergencyContact: (id, updates) => set((state) => ({
        profile: state.profile
          ? {
              ...state.profile,
              emergencyContacts: state.profile.emergencyContacts.map((contact) =>
                contact.id === id ? { ...contact, ...updates } : contact
              ),
              updatedAt: new Date().toISOString(),
            }
          : state.profile,
      })),
      removeEmergencyContact: (id) => set((state) => ({
        profile: state.profile
          ? {
              ...state.profile,
              emergencyContacts: state.profile.emergencyContacts.filter((contact) => contact.id !== id),
              updatedAt: new Date().toISOString(),
            }
          : state.profile,
      })),
      addHealthProfessional: (professional) => set((state) => ({
        profile: state.profile
          ? {
              ...state.profile,
              primaryDoctor: professional,
            }
          : state.profile,
      })),
      setHydrated: (value) => set({ hydrated: value }),
    }),
    {
      name: 'MediClock-user-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ profile: state.profile }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);
