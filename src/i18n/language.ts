import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import i18n from './index';

export const APP_LANGUAGE_KEY = 'app_language';
export const SUPPORTED_LANGUAGES = ['fr', 'es', 'en'] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

function isSupportedLanguage(value: string | null | undefined): value is SupportedLanguage {
  return !!value && (SUPPORTED_LANGUAGES as readonly string[]).includes(value);
}

function detectDeviceLanguage(): SupportedLanguage {
  const deviceLanguage = Localization.getLocales()[0]?.languageCode;
  return isSupportedLanguage(deviceLanguage) ? deviceLanguage : 'fr';
}

export async function initializeLanguage(): Promise<void> {
  const stored = await AsyncStorage.getItem(APP_LANGUAGE_KEY);
  const language = isSupportedLanguage(stored) ? stored : detectDeviceLanguage();
  await i18n.changeLanguage(language);
}

export async function setAppLanguage(language: SupportedLanguage): Promise<void> {
  await i18n.changeLanguage(language);
  await AsyncStorage.setItem(APP_LANGUAGE_KEY, language);
}
