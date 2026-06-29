import { create } from 'zustand';
import { Treatment, TreatmentIntake } from '../types/treatment.types';

interface TreatmentState {
  treatments: Treatment[];
  intakes: TreatmentIntake[];
  isLoading: boolean;
  addTreatment: (treatment: Omit<Treatment, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTreatment: (id: string, updates: Partial<Treatment>) => void;
  stopTreatment: (id: string) => void;
  confirmIntake: (intakeId: string) => void;
  getTodayIntakes: () => TreatmentIntake[];
  getActiveTreatments: () => Treatment[];
}

export const useTreatmentStore = create<TreatmentState>((set, get) => ({
  treatments: [],
  intakes: [],
  isLoading: false,
  addTreatment: (treatment) => {
    const now = new Date().toISOString();
    const newTreatment: Treatment = {
      ...treatment,
      id: Date.now().toString(),
      createdAt: now,
      updatedAt: now,
    };
    set((state) => ({ treatments: [...state.treatments, newTreatment] }));
  },
  updateTreatment: (id, updates) => {
    set((state) => ({
      treatments: state.treatments.map((t) =>
        t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t
      ),
    }));
  },
  stopTreatment: (id) => {
    get().updateTreatment(id, { status: 'stopped' });
  },
  confirmIntake: (intakeId) => {
    set((state) => ({
      intakes: state.intakes.map((i) =>
        i.id === intakeId ? { ...i, status: 'taken', takenAt: new Date().toISOString() } : i
      ),
    }));
  },
  getTodayIntakes: () => {
    const today = new Date().toDateString();
    return get().intakes.filter(
      (i) => new Date(i.scheduledTime).toDateString() === today
    );
  },
  getActiveTreatments: () => {
    return get().treatments.filter((t) => t.status === 'active');
  },
}));
