import viAuth from '@/app/locales/vi/auth.json';
import enAuth from '@/app/locales/en/auth.json';
import jaAuth from '@/app/locales/ja/auth.json';
import cnAuth from '@/app/locales/cn/auth.json';

import viCommon from '@/app/locales/vi/common.json';
import enCommon from '@/app/locales/en/common.json';
import jaCommon from '@/app/locales/ja/common.json';
import cnCommon from '@/app/locales/cn/common.json';

import viLang from '@/app/locales/vi/languages.json';
import enLang from '@/app/locales/en/languages.json';
import jaLang from '@/app/locales/ja/languages.json';
import cnLang from '@/app/locales/cn/languages.json';

import viChat from '@/app/locales/vi/chat.json';
import enChat from '@/app/locales/en/chat.json';
import jaChat from '@/app/locales/ja/chat.json';
import cnChat from '@/app/locales/cn/chat.json';

export const locales = ['vi', 'en', 'ja', 'cn'] as const;

export const defaultLocale = 'vi';

export type Locale = typeof locales[number];

export const translations: Record<Locale, any> = {
    vi: { auth: viAuth, common: viCommon, languages: viLang, chat: viChat },
    en: { auth: enAuth, common: enCommon, languages: enLang, chat: enChat },
    ja: { auth: jaAuth, common: jaCommon, languages: jaLang, chat: jaChat },
    cn: { auth: cnAuth, common: cnCommon, languages: cnLang, chat: cnChat },
}

export const getTranslation = (locale: Locale) => {
    return translations[locale] || translations[defaultLocale];
}