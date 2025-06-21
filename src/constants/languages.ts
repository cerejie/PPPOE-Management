/**
 * Language options for the app
 * Used in language selector and internationalization
 */

export type Language = {
  code: string;
  name: string;
  nativeName: string; // Name of the language in the language itself
  flag: string; // Emoji flag of the country
};

/**
 * Available languages in the application
 */
export const LANGUAGES: Language[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸'
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸'
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷'
  },
  {
    code: 'id',
    name: 'Indonesian',
    nativeName: 'Bahasa Indonesia',
    flag: '🇮🇩'
  }
];

/**
 * Get language details by code
 */
export const getLanguageByCode = (code: string): Language => {
  return LANGUAGES.find(lang => lang.code === code) || LANGUAGES[0];
};
