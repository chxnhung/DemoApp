import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { changeLanguage, ILanguageContext, LanguageType } from 'packages/localization';
interface Props {
    children: React.ReactElement;
}

type ISettingContext = ILanguageContext;

const SettingContext = createContext<ISettingContext>({} as ISettingContext);

const SettingProvider = (props: Props) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { t } = useTranslation();
    const [language, setLanguage] = useState<LanguageType>(LanguageType.English);

    const findOldLanguage = () => {
        // Storages.get(KeyStorage.Language).then(oldLanguage => {

        //     if (oldLanguage) {
        //         languageCurrent = oldLanguage as LanguageType;
        //     } else {
        //         // const locales = RNLocalize.getLocales();
        //         // const languagePrioritized = locales[0].languageCode;
        //         // languageCurrent = languagePrioritized === LanguageType.Korean ? LanguageType.Korean
        //         //     : languagePrioritized === LanguageType.Vietnamese ? LanguageType.Vietnamese : LanguageType.English;
        // }

        updateLanguage(LanguageType.Vietnamese);
        // });
    };

    // const findOldTheme = () => {
    //     Storages.get(KeyStorage.Theme).then(oldTheme => {
    //         let themeInitial;
    //         if (oldTheme) {
    //             themeInitial = oldTheme;
    //         } else {
    //             themeInitial = Appearance.getColorScheme();
    //         }
    //         setTheme(themeInitial || ThemeColor.Light);
    //     });
    // };

    // const findTimeAutoLock = () => {
    //     Storages.getTimeLock(KeyStorage.TimeAutoLock, userID).then(time => {
    //         if (time) {
    //             const valueTime = JSON.parse(time);
    //             setTimeAutoLock(valueTime);
    //         } else {
    //             setTimeAutoLock(timeAutoLock);
    //         }
    //     });
    // }

    useEffect(() => {
        findOldLanguage();
    }, []);

    // useEffect(() => {
    //     if (userID) {
    //         findTimeAutoLock();
    //     } else {
    //         setTimeAutoLock(null);
    //     }
    // }, [userID]);

    // useEffect(() => {
    //     findOldTheme();
    // }, []);

    const updateLanguage = (value: LanguageType) => {
        setLanguage(value);
        changeLanguage(value);
    };

    // const updateTheme = (value: ThemeColor | null) => {
    //     if (value) {
    //         setTheme(value);
    //         Storages.set(KeyStorage.Theme, value).catch();
    //     } else {
    //         Storages.remove(KeyStorage.Theme).catch();
    //     }
    // };

    // const updateTimeAutoLock = (value: number | null) => {
    //     setTimeAutoLock(value)
    //     // Storages.set(KeyStorage.TimeAutoLock.concat('1'), `${value}`).catch();
    //     Storages.setTimeLock(KeyStorage.TimeAutoLock, `${value}`, userID).catch();
    // };

    return (
        <SettingContext.Provider
            value={{
                t,
                language,
                updateLanguage,
            }}>
            {props.children}
        </SettingContext.Provider>
    );
};

export const useSetting = () => useContext(SettingContext);
export default SettingProvider;
