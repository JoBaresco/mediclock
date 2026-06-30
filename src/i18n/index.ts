import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import frTranslation from './fr/translation.json';

const resources = {
  fr: { translation: frTranslation },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'fr',
  fallbackLng: 'fr',
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
