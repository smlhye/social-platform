import { useI18n } from "@/app/lib/i18nContext";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

interface SearchInputProps {
    value: string,
    onChange: (v: string) => void
}

export default function SearchInput({ value, onChange }: SearchInputProps) {
    const { t } = useI18n();
    return (
        <div className="relative w-full max-w-sm">
            {/* Icon */}
            <FiSearch
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
            />

            {/* Input */}
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={t("chat.search")}
                className="w-full pl-10 pr-4 py-2 rounded-full bg-background focus:outline-none"
            />
        </div>
    );
}
