import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

if (Platform.OS !== 'web') {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
}

const CHANNEL_ID = 'MediClock-reminders';

export const LocalNotificationService = {
  requestPermissions: async (): Promise<boolean> => {
    if (Platform.OS === 'web') {
      return false;
    }

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
        name: 'Rappels traitements',
        importance: Notifications.AndroidImportance.HIGH,
      });
    }

    const current = await Notifications.getPermissionsAsync();
    if (current.granted) {
      return true;
    }

    const requested = await Notifications.requestPermissionsAsync();
    return requested.granted;
  },

  scheduleDailyReminder: async (title: string, body: string, hour: number, minute: number): Promise<string | null> => {
    if (Platform.OS === 'web') {
      return null;
    }

    return Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour,
        minute,
      },
    });
  },

  scheduleIntervalReminder: async (title: string, body: string, everyXDays: number): Promise<string | null> => {
    if (Platform.OS === 'web') {
      return null;
    }

    const safeDays = Math.max(1, Math.floor(everyXDays));
    return Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: safeDays * 24 * 60 * 60,
        repeats: true,
      },
    });
  },

  cancelScheduled: async (id: string): Promise<void> => {
    if (Platform.OS === 'web') {
      return;
    }
    await Notifications.cancelScheduledNotificationAsync(id);
  },
};
