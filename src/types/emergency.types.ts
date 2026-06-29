export type EmergencyAccessLevel =
  | 'disabled'
  | 'app_only'
  | 'lock_screen'
  | 'lock_screen_sos';

export interface EmergencySettings {
  accessLevel: EmergencyAccessLevel;
  showName: boolean;
  showAge: boolean;
  showBloodGroup: boolean;
  showAllergies: boolean;
  showConditions: boolean;
  showCurrentTreatments: boolean;
  showDoctor: boolean;
  showEmergencyContacts: boolean;
  showMinimalProfile: boolean;
  emergencyContactIds: string[];
}
