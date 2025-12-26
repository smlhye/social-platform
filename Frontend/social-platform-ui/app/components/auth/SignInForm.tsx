'use client';
import { useI18n } from "@/app/lib/i18nContext";
import LanguageSelector from "../common/LanguageSelector";
import { TextInput, PasswordInput } from "../common/Input";
import { ButtonSubmit } from "../common/Button";

export default function SignInForm() {
    const { t } = useI18n();
    return (
        <>
            <h1 className="text-5xl text-secondary-foreground font-bold mb-0">{t('auth.signinTitle')}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{t('auth.welcomeMessage')}</p>

            <form className="flex flex-col gap-4">
                <TextInput placeholder={t('auth.username')} />
                <PasswordInput placeholder={t('auth.password')} />
                <ButtonSubmit value={t('auth.signinSubmit')} />
            </form>

            {/* Dòng quên mật khẩu */}
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                <a href="/forgot-password" className="text-secondary-foreground hover:underline font-bold">
                    {t('auth.forgotPassword')}
                </a>
            </p>

            {/* Dòng tạo tài khoản */}
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                {t('auth.noAccount')}{' '}
                <a href="/sign-up" className="hover:underline text-secondary-foreground font-bold">
                    {t('auth.createAccount')}
                </a>
            </p>
        </>
    );
}