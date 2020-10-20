import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import esAR from './locales/esAR';

const resources = {
    'es-AR': {
        translation: esAR
    }
};

i18n
    .use( initReactI18next ) // passes i18n down to react-i18next
    .init({
        resources,
        lng: 'es-AR',
        fallbackLng: 'es-AR',
        keySeparator: '',  // we use keys in form messages.welcome
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
