export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-' | 'unknown';
export type Gender = 'male' | 'female' | 'other' | 'prefer_not_to_say';
export type AppLanguage = 'fr' | 'es' | 'en' | 'de' | 'it' | 'pt' | 'zh';

export interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  isInCircle: boolean;
}

export interface HealthProfessional {
  id: string;
  name: string;
  specialty: string;
  phone?: string;
  address?: string;
  email?: string;
  notes?: string;
  isFavorite: boolean;
  isEmergency: boolean;
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName?: string;
  dateOfBirth?: string;
  gender?: Gender;
  avatarUri?: string;
  bloodGroup?: BloodGroup;
  height?: number;
  weight?: number;
  allergies: string[];
  conditions: string[];
  chronicTreatments: string[];
  primaryDoctor?: HealthProfessional;
  preferredPharmacy?: HealthProfessional;
  emergencyContacts: EmergencyContact[];
  trustedPerson?: EmergencyContact;
  language: AppLanguage;
  notificationsEnabled: boolean;
  biometricEnabled: boolean;
  isPlusSubscriber: boolean;
  createdAt: string;
  updatedAt: string;
}
