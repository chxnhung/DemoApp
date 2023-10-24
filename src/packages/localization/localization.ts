import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import { LanguageType } from './enum';

import en from 'locales/en';
import ko from 'locales/ko';
import vi from 'locales/vi';

i18next
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3',
        interpolation: {
            escapeValue: true,
        },
        lng: LanguageType.English,
        fallbackLng: LanguageType.English,
        resources: {
            en: { translation: en },
            ko: { translation: ko },
            vi: { translation: vi },
        },
    })
    .catch((_err) => {
        // TODO: Log i18n init failed
        console.log(_err);
    });

export default i18next;
