import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface Appointment {
  id: string;
  title: string;
  date: string;
  location?: string;
  doctorName?: string;
  notes?: string;
  isCompleted: boolean;
  completedAt?: string;
}

interface AppointmentState {
  appointments: Appointment[];
  isLoading: boolean;
  hydrated: boolean;
  addAppointment: (appointment: Omit<Appointment, 'id'>) => Appointment;
  updateAppointment: (id: string, updates: Partial<Appointment>) => void;
  markAppointmentCompleted: (id: string) => void;
  setHydrated: (value: boolean) => void;
}

export const useAppointmentStore = create<AppointmentState>()(
  persist(
    (set) => ({
      appointments: [],
      isLoading: false,
      hydrated: false,
      addAppointment: (appointment) => {
        const newAppointment: Appointment = {
          ...appointment,
          id: `${Date.now()}`,
        };

        set((state) => ({
          appointments: [newAppointment, ...state.appointments],
        }));

        return newAppointment;
      },
      updateAppointment: (id, updates) => {
        set((state) => ({
          appointments: state.appointments.map((item) =>
            item.id === id ? { ...item, ...updates } : item
          ),
        }));
      },
      markAppointmentCompleted: (id) => {
        const completedAt = new Date().toISOString();
        set((state) => ({
          appointments: state.appointments.map((item) =>
            item.id === id ? { ...item, isCompleted: true, completedAt } : item
          ),
        }));
      },
      setHydrated: (value) => set({ hydrated: value }),
    }),
    {
      name: 'mediclock-appointment-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        appointments: state.appointments,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);
