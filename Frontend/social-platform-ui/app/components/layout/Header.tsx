"use client";

import ThemeSwitch from "@/app/components/common/ThemeSwitch";
import LanguageSelector from "../common/LanguageSelector";
import { useI18n } from "@/app/lib/i18nContext";

interface HeaderProps {
    isSignedIn: boolean;
}

export default function Header({ isSignedIn }: HeaderProps) {
    const { t } = useI18n();
    return (
        <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <h1 className="text-xl font-semibold">Social Platform</h1>
            <div className="flex items-center gap-2">
                <ThemeSwitch />
                {/* Language Selector */}
                <div className="text-center">
                    <label htmlFor="lang" className="mr-2 text-md text-gray-700 dark:text-gray-500">
                        {t('common.language')}
                    </label>
                    <LanguageSelector />
                </div>
            </div>
        </header>
    );
}