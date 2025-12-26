import { locales } from "@/app/lib/i18n";
import { useI18n } from "@/app/lib/i18nContext";

export default function LanguageSelector() {
    const { t, locale, setLocale } = useI18n();

    const languageLabelsRaw = t('languages') as unknown as Record<string, string>;

    const languageLabels: Record<typeof locales[number], string> = {} as Record<typeof locales[number], string>;
    locales.forEach((l) => {
        languageLabels[l] = languageLabelsRaw?.[l] ?? l;
    });

    return (
        <select
            value={locale}
            onChange={(e) => setLocale(e.target.value as typeof locales[number])}
            className="rounded-md border border-gray-300 dark:border-gray-600 px-2 py-1 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
        >
            {locales.map((l) => (
                <option key={l} value={l}>
                    {languageLabels[l]}
                </option>
            ))}
        </select>
    );
}