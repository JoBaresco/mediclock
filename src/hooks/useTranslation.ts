import { useTranslation as useI18nTranslation, UseTranslationResponse } from 'react-i18next';

export const useTranslation = (): UseTranslationResponse<'translation', undefined> => {
  return useI18nTranslation();
};
