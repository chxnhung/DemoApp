import { LanguageType } from '../enum';
import i18n from '../localization';

export const changeLanguage = (value: LanguageType) => {
    i18n.changeLanguage(value).then(() => {
        // TODO: function save key to store
        // Storages.set(KeyStorage.Language, value).catch();
    });
};
