import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import esEN from './locales/esEN';

const resources = {
    'es-EN': {
        translation: esEN
    }
};

i18n
    .use( initReactI18next ) // passes i18n down to react-i18next
    .init({
        resources,
        lng: 'es-EN',
        fallbackLng: 'es-EN',
        keySeparator: '',  // we use keys in form messages.welcome
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
