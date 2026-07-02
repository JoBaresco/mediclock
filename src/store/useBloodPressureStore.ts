import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { BloodPressureReading } from '../types/bloodPressure.types';

interface BloodPressureState {
  readings: BloodPressureReading[];
  addReading: (systolic: number, diastolic: number, measuredAt: string) => BloodPressureReading;
  deleteReading: (id: string) => void;
}

export const useBloodPressureStore = create<BloodPressureState>()(
  persist(
    (set) => ({
      readings: [],
      addReading: (systolic, diastolic, measuredAt) => {
        const reading: BloodPressureReading = {
          id: `${Date.now()}`,
          systolic,
          diastolic,
          measuredAt,
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          readings: [reading, ...state.readings].sort(
            (a, b) => new Date(b.measuredAt).getTime() - new Date(a.measuredAt).getTime()
          ),
        }));
        return reading;
      },
      deleteReading: (id) => {
        set((state) => ({ readings: state.readings.filter((item) => item.id !== id) }));
      },
    }),
    {
      name: 'MediClock-blood-pressure-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
