'use client';
import { useI18n } from "@/app/lib/i18nContext";
import { TextInput } from "../common/Input";
import { ButtonSubmit } from "../common/Button";
import { FaEnvelope } from "react-icons/fa";
import { useForgotPassword } from "@/app/hooks/useAuth";
import { useState } from "react";
import { useToast } from "../common/Toast/ToastContext";
import { useRouter } from "next/navigation";
import { FullScreenLoading } from "../common/Loading";
import Link from "next/link";

export default function ForgotPasswordForm() {
    const { t } = useI18n();

    const [email, setEmail] = useState<string>("");
    const { mutate, isPending, error } = useForgotPassword();
    const toast = useToast();
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate({ email }, {
            onSuccess: (res) => {
                console.log(res.resMessage);
                toast.success("OTP sent successfully!");
                router.prefetch(`/reset-password?email=${encodeURIComponent(email)}`);
                router.push(`/reset-password?email=${encodeURIComponent(email)}`);
            },
            onError: (res) => {
                toast.error(res.message);
            }
        })
    }

    return (
        <>
            {isPending && <FullScreenLoading />}
            <h1 className="text-2xl font-bold text-secondary-foreground">{t('auth.forgotPasswordTitle')}</h1>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <TextInput type="text" placeholder={t('auth.email')} iconLeft={<FaEnvelope />}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                <ButtonSubmit value={isPending ? "Loading" : t('auth.forgotPasswordSubmit')} type="submit" />
            </form>

            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                {t('auth.haveAccount')}{' '}
                <Link href="/sign-in" className="text-secondary-foreground font-medium hover:underline">
                    {t('auth.backToLogin')}
                </Link>
            </p>
        </>
    );
}