import * as en from './translations/en.json';
import * as ru from './translations/ru.json';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const translations: any = {
  en: en,
  ru: ru,
};

export function t(string: string, search = '', replace = ''): string {
  const lang = (localStorage.getItem('selectedLanguage') || 'en').replace(/['"]+/g, '').replace('-', '_');

  let translated: string;

  try {
    translated = string.split('.').reduce((o, i) => o[i], translations[lang]);
  } catch (e) {
    translated = string.split('.').reduce((o, i) => o[i], translations['en']);
  }

  if (translated === undefined) translated = string.split('.').reduce((o, i) => o[i], translations['en']);

  if (search !== '' && replace !== '') {
    translated = translated.replace(search, replace);
  }
  return translated;
}
