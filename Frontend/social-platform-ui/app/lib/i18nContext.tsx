'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Locale, defaultLocale, getTranslation } from './i18n';

interface I18nContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType>({
    locale: defaultLocale,
    setLocale: () => { },
    t: () => ''
});

export const I18nProvider = ({ children }: { children: ReactNode }) => {
    const [locale, setLocaleState] = useState<Locale>(defaultLocale);
    const [messages, setMessages] = useState(getTranslation(defaultLocale));

    useEffect(() => {
        const saved = localStorage.getItem('locale') as Locale;
        if (saved) {
            setLocaleState(saved);
            setMessages(getTranslation(saved));
        }
    }, []);

    const setLocale = (newLocale: Locale) => {
        setLocaleState(newLocale);
        setMessages(getTranslation(newLocale));
        localStorage.setItem('locale', newLocale);
    };

    const t = (key: string) => {
        return key.split('.').reduce((obj: any, k: string) => obj?.[k], messages) || key;
    };

    return (
        <I18nContext.Provider value={{ locale, setLocale, t }}>
            {children}
        </I18nContext.Provider>
    );
};

export const useI18n = () => useContext(I18nContext);