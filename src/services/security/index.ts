export const SecurityService = {
  isBiometricAvailable: async (): Promise<boolean> => {
    console.log('[SecurityService] stub — check biometric availability');
    return false;
  },
  authenticate: async (): Promise<boolean> => {
    console.log('[SecurityService] stub — authenticate');
    return true;
  },
};
