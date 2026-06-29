export type TreatmentType =
  | 'tablet'
  | 'capsule'
  | 'drops'
  | 'eye_drops'
  | 'injection'
  | 'inhaler'
  | 'cream'
  | 'patch'
  | 'syrup'
  | 'other';

export type TreatmentDurationType =
  | 'single'
  | 'days'
  | 'weeks'
  | 'months'
  | 'until_empty'
  | 'specific_date'
  | 'indefinite';

export type TreatmentStatus = 'active' | 'paused' | 'completed' | 'stopped';

export interface TreatmentSchedule {
  times: string[];
  frequency: 'daily' | 'every_x_days' | 'weekly' | 'as_needed';
  frequencyValue?: number;
}

export interface Treatment {
  id: string;
  name: string;
  type: TreatmentType;
  dosage: string;
  dosageAmount: number;
  unit: string;
  schedule: TreatmentSchedule;
  durationType: TreatmentDurationType;
  durationValue?: number;
  startDate: string;
  endDate?: string;
  stock?: number;
  stockAlert?: number;
  status: TreatmentStatus;
  notes?: string;
  laboratory?: string;
  barcode?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TreatmentIntake {
  id: string;
  treatmentId: string;
  scheduledTime: string;
  takenAt?: string;
  status: 'taken' | 'missed' | 'pending' | 'skipped';
}
