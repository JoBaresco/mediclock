import { create } from 'zustand';
import { UserProfile, EmergencyContact, HealthProfessional } from '../types/user.types';

interface UserState {
  profile: UserProfile | null;
  setProfile: (profile: UserProfile) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  addEmergencyContact: (contact: EmergencyContact) => void;
  addHealthProfessional: (professional: HealthProfessional) => void;
}

export const useUserStore = create<UserState>((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
  updateProfile: (updates) => set((state) => ({
    profile: state.profile ? { ...state.profile, ...updates } : null,
  })),
  addEmergencyContact: (contact) => set((state) => ({
    profile: state.profile
      ? { ...state.profile, emergencyContacts: [...state.profile.emergencyContacts, contact] }
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
}));
