import { TFunction } from 'i18next';

import { LanguageType } from './enum';

export interface ILanguageContext {
    t: TFunction<'translation'>;
    language: LanguageType;
    updateLanguage: (language: string) => void;
}
