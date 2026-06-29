import { create } from 'zustand';

export interface Appointment {
  id: string;
  title: string;
  date: string;
  location?: string;
  doctorName?: string;
  notes?: string;
  isConfirmed: boolean;
}

interface AppointmentState {
  appointments: Appointment[];
  isLoading: boolean;
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  updateAppointment: (id: string, updates: Partial<Appointment>) => void;
}

export const useAppointmentStore = create<AppointmentState>((set) => ({
  appointments: [],
  isLoading: false,
  addAppointment: (appointment) => {
    set((state) => ({
      appointments: [
        ...state.appointments,
        { ...appointment, id: Date.now().toString() },
      ],
    }));
  },
  updateAppointment: (id, updates) => {
    set((state) => ({
      appointments: state.appointments.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      ),
    }));
  },
}));
