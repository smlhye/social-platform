'use client';
import { useI18n } from "@/app/lib/i18nContext";
import { TextInput } from "../common/Input";
import { ButtonSubmit } from "../common/Button";
import { FaEnvelope } from "react-icons/fa";

export default function ForgotPasswordForm() {
    const { t } = useI18n();
    return (
        <>
            <h1 className="text-2xl font-bold text-secondary-foreground">{t('auth.forgotPasswordTitle')}</h1>

            <form className="flex flex-col gap-4">
                <TextInput type="text" placeholder={t('auth.email')} iconLeft={<FaEnvelope />} />
                <ButtonSubmit value={t('auth.forgotPasswordSubmit')} />
            </form>

            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                {t('auth.haveAccount')}{' '}
                <a href="/sign-in" className="text-secondary-foreground font-medium hover:underline">
                    {t('auth.backToLogin')}
                </a>
            </p>
        </>
    );
}