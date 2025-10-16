import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import es from './es.json';
import eu from './eu.json';

i18n.use(initReactI18next).init({
  resources: {
    es: { translation: es },
    eu: { translation: eu },
  },
  lng: 'es', // idioma por defecto
  fallbackLng: 'es',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

