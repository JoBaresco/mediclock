const BCP47_LOCALES: Record<string, string> = {
  fr: 'fr-FR',
  es: 'es-ES',
  en: 'en-US',
};

export function getBcp47Locale(language: string): string {
  return BCP47_LOCALES[language] ?? BCP47_LOCALES.fr;
}
