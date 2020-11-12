import languageDetector from 'i18next-browser-languagedetector';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import Arabic from '../translations/ar.json';
import English from '../translations/en.json';
const resources = {
  en: {
    translation: English
  },
  ar: {
    translation: Arabic
  }
};

i18next
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'ar',
    debug: false,
    resources,
    interpolation: {
      escapeValue: false
    }
  });

export default i18next;
