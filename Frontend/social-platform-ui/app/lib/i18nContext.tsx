'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Locale, getTranslation } from './i18n';

interface I18nContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType>({
    locale: 'vi',
    setLocale: () => {},
    t: () => ''
});

export const I18nProvider = ({
    children,
    initialLocale,
    initialMessages
}: {
    children: ReactNode;
    initialLocale: Locale;
    initialMessages: any;
}) => {
    const [locale, setLocaleState] = useState<Locale>(initialLocale);
    const [messages, setMessages] = useState(initialMessages);

    const setLocale = (newLocale: Locale) => {
        setLocaleState(newLocale);
        setMessages(getTranslation(newLocale));

        // lưu localStorage
        localStorage.setItem('locale', newLocale);

        // lưu cookie cho server
        document.cookie = `locale=${newLocale}; path=/`;
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