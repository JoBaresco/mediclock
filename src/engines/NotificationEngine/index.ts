export const NotificationEngine = {
  requestPermission: async (): Promise<boolean> => {
    console.log('[NotificationEngine] stub — request permission');
    return true;
  },
  sendLocalNotification: async (title: string, body: string): Promise<void> => {
    console.log('[NotificationEngine] stub — send notification', title, body);
  },
};
