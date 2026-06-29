import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import frTranslation from './fr/translation.json';
import esTranslation from './es/translation.json';
import enTranslation from './en/translation.json';

const resources = {
  fr: { translation: frTranslation },
  es: { translation: esTranslation },
  en: { translation: enTranslation },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'fr',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
