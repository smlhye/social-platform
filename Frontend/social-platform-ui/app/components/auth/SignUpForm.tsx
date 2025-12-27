"use client";

import { useI18n } from "@/app/lib/i18nContext";
import { TextInput } from "../common/Input";
import { ButtonSubmit } from "../common/Button";
import { FaEye, FaLock, FaUser } from "react-icons/fa";

export default function SignUpForm() {
    const { t } = useI18n();
    return (
        <>
            <h1 className="text-2xl font-bold text-secondary-foreground">{t('auth.signupTitle')}</h1>

            <form className="flex flex-col gap-4">
                <TextInput type="text" placeholder={t('auth.username')} iconLeft={<FaUser />} />
                <TextInput placeholder={t('auth.password')} iconLeft={<FaLock />} iconRight={<FaEye />} />
                <TextInput placeholder={t('auth.confirmPassword')} iconLeft={<FaLock />} iconRight={<FaEye />} />
                <ButtonSubmit value={t('auth.signupSubmit')} />
            </form>

            {/* Dòng tạo tài khoản */}
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                {t('auth.haveAccount')}{' '}
                <a href="/sign-in" className="text-secondary-foreground font-medium hover:underline">
                    {t('auth.loginNow')}
                </a>
            </p>
        </>
    );
}