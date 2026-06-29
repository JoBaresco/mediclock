import AsyncStorage from '@react-native-async-storage/async-storage';

export const StorageService = {
  getItem: async <T>(key: string): Promise<T | null> => {
    const item = await AsyncStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  },
  setItem: async <T>(key: string, value: T): Promise<void> => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },
  removeItem: async (key: string): Promise<void> => {
    await AsyncStorage.removeItem(key);
  },
  clear: async (): Promise<void> => {
    await AsyncStorage.clear();
  },
};
