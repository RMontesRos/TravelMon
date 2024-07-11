// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from './locales/en.json'; // Ruta correcta a tu archivo en inglés
import translationES from './locales/es.json'; // Ruta correcta a tu archivo en español

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources: {
      en: { translation: translationEN },
      es: { translation: translationES },
    },
    interpolation: {
      escapeValue: false,
    },
    debug: false,
  });

export default i18n;

