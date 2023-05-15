import * as en from './translations/en.json';
import * as ru from './translations/ru.json';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const translations: any = {
  en: en,
  ru: ru,
};

export function t(string: string, search = '', replace = ''): string {
  const lang = (localStorage.getItem('selectedLanguage') || 'en').replace(/['"]+/g, '').replace('-', '_');
  const keyParts = string.split('.');

  let strings;
  try {
    strings = { ...translations[lang] };
  } catch (e) {
    strings = { ...translations['en'] };
  }

  let translated = keyParts.reduce((o, i) => o[i], strings);

  if (translated === undefined) {
    translated = keyParts.reduce((o, i) => o[i], { ...translations['en'] });
  }

  if (translated && search !== '' && replace !== '') {
    translated = translated.replace(search, replace);
  }
  return translated;
}
