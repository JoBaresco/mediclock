export const LocationService = {
  getCurrentPosition: async (): Promise<{ latitude: number; longitude: number }> => {
    console.log('[LocationService] stub — get current position');
    return { latitude: 0, longitude: 0 };
  },
};
