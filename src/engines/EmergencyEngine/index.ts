import { EmergencySettings } from '../../types/emergency.types';

export const EmergencyEngine = {
  getSettings: async (): Promise<EmergencySettings> => {
    console.log('[EmergencyEngine] stub — get settings');
    return {
      accessLevel: 'disabled',
      showName: true,
      showAge: true,
      showBloodGroup: true,
      showAllergies: true,
      showConditions: true,
      showCurrentTreatments: true,
      showDoctor: true,
      showEmergencyContacts: true,
      showMinimalProfile: false,
      emergencyContactIds: [],
    };
  },
};
