"use client";

import { useI18n } from "@/app/lib/i18nContext";
import { TextInput } from "../common/Input";
import { ButtonSubmit } from "../common/Button";
import { FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";
import { useState } from "react";

export default function SignUpForm() {
    const { t } = useI18n();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    return (
        <>
            <h1 className="text-2xl font-bold text-secondary-foreground">{t('auth.signupTitle')}</h1>

            <form className="flex flex-col gap-4">
                <TextInput type="text" placeholder={t('auth.username')} iconLeft={<FaUser />} />
                <TextInput type={showPassword ? "text" : "password"} placeholder={t('auth.password')} iconLeft={<FaLock />} iconRight={
                    showPassword ? (
                        <FaEyeSlash onClick={() => setShowPassword(false)} />
                    ) : (
                        <FaEye onClick={() => setShowPassword(true)} />
                    )
                } />
                <TextInput type={showConfirmPassword ? "text" : "password"} placeholder={t('auth.confirmPassword')} iconLeft={<FaLock />} iconRight={
                    showConfirmPassword ? (
                        <FaEyeSlash onClick={() => setShowConfirmPassword(false)} />
                    ) : (
                        <FaEye onClick={() => setShowConfirmPassword(true)} />
                    )
                } />
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