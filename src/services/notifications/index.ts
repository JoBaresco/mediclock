export const LocalNotificationService = {
  requestPermissions: async (): Promise<boolean> => {
    console.log('[LocalNotificationService] stub — request permissions');
    return true;
  },
  schedule: async (title: string, body: string, date: Date): Promise<string> => {
    console.log('[LocalNotificationService] stub — schedule', title, body, date.toISOString());
    return `notification_${Date.now()}`;
  },
};
