// in src/i18nProvider.js
import polyglotI18nProvider from 'ra-i18n-polyglot';
import en from 'ra-language-english';
import id from "ra-language-indonesian-new"


const translations = { en, id };

export const i18nProvider = polyglotI18nProvider(locale => translations[locale], 'id');