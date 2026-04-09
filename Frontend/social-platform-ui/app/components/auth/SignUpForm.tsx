"use client";

import { useI18n } from "@/app/lib/i18nContext";
import { TextInput } from "../common/Input";
import { ButtonSubmit } from "../common/Button";
import { FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signUpSchema, SignUpSchema } from "@/app/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "@mui/material";
import { useSignUp } from "@/app/hooks/useAuth";
import { useToast } from "../common/Toast/ToastContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FullScreenLoading } from "../common/Loading";

export default function SignUpForm() {
    const { t } = useI18n();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

    const { mutate, isPending } = useSignUp();
    const toast = useToast();
    const router = useRouter();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignUpSchema>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {

        }
    });

    const onSubmit = (data: SignUpSchema) => {
        console.log("Hello");
        mutate(data, {
            onSuccess: (res) => {
                toast.success("Sign up successfully!");
                router.prefetch("/");
                router.push("/");
            },
            onError: (err) => {
                toast.error(err.message);
            }
        })
    }

    return (
        <>
            {isPending && <FullScreenLoading />}
            <h1 className="text-2xl font-bold text-secondary-foreground">{t('auth.signupTitle')}</h1>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                <Stack direction="row" className="gap-4">
                    <TextInput
                        type="text"
                        placeholder="Firstname"
                        error={errors.firstName?.message}
                        {...register("firstName")} />
                    <TextInput
                        type="text"
                        placeholder="Lastname"
                        error={errors.lastName?.message}
                        {...register("lastName")} />
                </Stack>
                <TextInput
                    type="text"
                    placeholder={t('auth.username')}
                    iconLeft={<FaUser />}
                    error={errors.username?.message}
                    {...register("username")} />
                <TextInput type={showPassword ? "text" : "password"} placeholder={t('auth.password')} iconLeft={<FaLock />} iconRight={
                    showPassword ? (
                        <FaEyeSlash onClick={() => setShowPassword(false)} />
                    ) : (
                        <FaEye onClick={() => setShowPassword(true)} />
                    )
                }
                    error={errors.password?.message}
                    {...register("password")} />
                <TextInput type={showConfirmPassword ? "text" : "password"} placeholder={t('auth.confirmPassword')} iconLeft={<FaLock />} iconRight={
                    showConfirmPassword ? (
                        <FaEyeSlash onClick={() => setShowConfirmPassword(false)} />
                    ) : (
                        <FaEye onClick={() => setShowConfirmPassword(true)} />
                    )
                }
                    error={errors.confirmPassword?.message}
                    {...register("confirmPassword")} />
                <ButtonSubmit value={t('auth.signupSubmit')} />
            </form>

            {/* Dòng tạo tài khoản */}
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                {t('auth.haveAccount')}{' '}
                <Link href="/sign-in" className="text-secondary-foreground font-medium hover:underline">
                    {t('auth.loginNow')}
                </Link>
            </p>
        </>
    );
}