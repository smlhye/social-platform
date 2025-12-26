'use client';
import { useI18n } from "@/app/lib/i18nContext";
import LanguageSelector from "../common/LanguageSelector";
import { TextInput } from "../common/Input";
import { ButtonSubmit } from "../common/Button";

export default function ForgotPasswordForm() {
    const { t } = useI18n();
    return (
        <>
            <h1 className="text-2xl font-bold text-secondary-foreground">{t('auth.forgotPasswordTitle')}</h1>

            <form className="flex flex-col gap-4">
                <TextInput type="text" placeholder={t('auth.email')} />
                <ButtonSubmit value={t('auth.forgotPasswordSubmit')} />
            </form>

            {/* Dòng tạo tài khoản */}
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                {t('auth.haveAccount')}{' '}
                <a href="/sign-in" className="text-secondary-foreground font-medium hover:underline">
                    {t('auth.backToLogin')}
                </a>
            </p>
        </>
    );
}