import viAuth from '@/app/locales/vi/auth.json';
import enAuth from '@/app/locales/en/auth.json';
import jaAuth from '@/app/locales/ja/auth.json';

import viCommon from '@/app/locales/vi/common.json';
import enCommon from '@/app/locales/en/common.json';
import jaCommon from '@/app/locales/ja/common.json';

import viLang from '@/app/locales/vi/languages.json';
import enLang from '@/app/locales/en/languages.json';
import jaLang from '@/app/locales/ja/languages.json';

export const locales = ['vi', 'en', 'ja'] as const;

export const defaultLocale = 'vi';

export type Locale = typeof locales[number];

export const translations: Record<Locale, any> = {
    vi: { auth: viAuth, common: viCommon, languages: viLang },
    en: { auth: enAuth, common: enCommon, languages: enLang },
    ja: { auth: jaAuth, common: jaCommon, languages: jaLang },
}

export const getTranslation = (locale: Locale) => {
    return translations[locale] || translations[defaultLocale];
}