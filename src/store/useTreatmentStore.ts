import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Treatment, TreatmentIntake } from '../types/treatment.types';

interface TreatmentState {
  treatments: Treatment[];
  intakes: TreatmentIntake[];
  isLoading: boolean;
  hydrated: boolean;
  addTreatment: (treatment: Omit<Treatment, 'id' | 'createdAt' | 'updatedAt'>) => Treatment;
  updateTreatment: (id: string, updates: Partial<Treatment>) => void;
  deleteTreatment: (id: string) => void;
  stopTreatment: (id: string) => void;
  markTreatmentTaken: (treatmentId: string) => void;
  confirmIntake: (intakeId: string) => void;
  getTodayIntakes: () => TreatmentIntake[];
  getActiveTreatments: () => Treatment[];
  setHydrated: (value: boolean) => void;
}

export const useTreatmentStore = create<TreatmentState>()(
  persist(
    (set, get) => ({
      treatments: [],
      intakes: [],
      isLoading: false,
      hydrated: false,
      addTreatment: (treatment) => {
        const now = new Date().toISOString();
        const newTreatment: Treatment = {
          ...treatment,
          id: `${Date.now()}`,
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({ treatments: [...state.treatments, newTreatment] }));
        return newTreatment;
      },
      updateTreatment: (id, updates) => {
        set((state) => ({
          treatments: state.treatments.map((t) =>
            t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t
          ),
        }));
      },
      deleteTreatment: (id) => {
        set((state) => ({
          treatments: state.treatments.filter((t) => t.id !== id),
          intakes: state.intakes.filter((i) => i.treatmentId !== id),
        }));
      },
      stopTreatment: (id) => {
        get().updateTreatment(id, { status: 'stopped' });
      },
      markTreatmentTaken: (treatmentId) => {
        const now = new Date().toISOString();
        const intake: TreatmentIntake = {
          id: `${Date.now()}_${treatmentId}`,
          treatmentId,
          scheduledTime: now,
          takenAt: now,
          status: 'taken',
        };

        set((state) => ({
          intakes: [intake, ...state.intakes],
          treatments: state.treatments.map((t) =>
            t.id === treatmentId ? { ...t, lastTakenAt: now, updatedAt: now } : t
          ),
        }));
      },
      confirmIntake: (intakeId) => {
        const now = new Date().toISOString();
        set((state) => ({
          intakes: state.intakes.map((i) =>
            i.id === intakeId ? { ...i, status: 'taken', takenAt: now } : i
          ),
        }));
      },
      getTodayIntakes: () => {
        const today = new Date().toDateString();
        return get().intakes.filter((i) => new Date(i.scheduledTime).toDateString() === today);
      },
      getActiveTreatments: () => {
        return get().treatments.filter((t) => t.status === 'active');
      },
      setHydrated: (value) => set({ hydrated: value }),
    }),
    {
      name: 'MediClock-treatment-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        treatments: state.treatments,
        intakes: state.intakes,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);
