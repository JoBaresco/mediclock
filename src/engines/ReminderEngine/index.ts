export interface ReminderConfig {
  treatmentId: string;
  treatmentName: string;
  scheduledTime: string;
  repeatDays?: number[];
}

export const ReminderEngine = {
  scheduleReminder: async (config: ReminderConfig): Promise<string> => {
    console.log('[ReminderEngine] stub — scheduling:', config.treatmentName);
    return `reminder_${config.treatmentId}`;
  },
  cancelReminder: async (reminderId: string): Promise<void> => {
    console.log('[ReminderEngine] stub — cancelling:', reminderId);
  },
  rescheduleAll: async (): Promise<void> => {
    console.log('[ReminderEngine] stub — rescheduling all');
  },
};
