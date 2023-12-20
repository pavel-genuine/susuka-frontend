'use client';

import React, { PropsWithChildren, useEffect, useState } from 'react';

import English from '@/lang/en.json';
import German from '@/lang/de.json';
import French from '@/lang/fr.json';
import Bengli from '@/lang/bn.json';

import { IntlProvider } from 'react-intl';

export interface ILanguageContext {
    locale: string;
    setLocale: React.Dispatch<React.SetStateAction<string>>;
    languageTranslations: any;
}
export const LanguageContext = React.createContext<ILanguageContext | null>(
    null
);

const LanguageProvider: React.FC<PropsWithChildren> = ({ children }) => {
    let selectedLang =
        typeof window !== 'undefined'
            ? localStorage.getItem('PREFERRED_LANGUAGE') || navigator.language
            : 'en'; //check localstorage
    const [locale, setLocale] = useState<string>(selectedLang);
    const [language, setLanguage] = useState(English); //default set to English
    useEffect(() => {
        switch (locale) {
            case 'en-US':
                setLanguage(English);
                break;
            case 'de':
                setLanguage(German);
                break;
            case 'fr':
                setLanguage(French);
                break;
            case 'bn':
                setLanguage(Bengli);
                break;
            default:
                setLanguage(English);
        }
    }, [locale]);
    return (
        <LanguageContext.Provider
            value={{ locale, setLocale, languageTranslations: language }}
        >
            <IntlProvider
                messages={language}
                locale={locale}
                defaultLocale="en"
            >
                {children}
            </IntlProvider>
        </LanguageContext.Provider>
    );
};

export default LanguageProvider;
