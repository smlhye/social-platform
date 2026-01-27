'use client';
import { useI18n } from "@/app/lib/i18nContext";
import { ButtonSubmit } from "../common/Button";
import { FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signinSchema, SignInSchema } from "@/app/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput } from "../common/Input";
import { useSignIn } from "@/app/hooks/useAuth";

export default function SignInForm() {
    const { t } = useI18n();
    const [show, setShow] = useState<boolean>(false);
    const { mutate, isPending, error } = useSignIn();

    const { register, handleSubmit, formState: { errors, isSubmitting }, } = useForm<SignInSchema>({
        resolver: zodResolver(signinSchema),
        defaultValues: {
            rememberMe: true
        }
    });

    const onSubmit = (data: SignInSchema) => {
        mutate(data, {
            onSuccess: (res) => {
                alert(res.resMessage);
            },
            onError: (res) => {
                console.log(res.message);
            }
        })
    }

    return (
        <>
            <h1 className="text-5xl text-secondary-foreground font-bold mb-0">{t('auth.signinTitle')}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{t('auth.welcomeMessage')}</p>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <TextInput
                    type="text"
                    placeholder={t('auth.username')}
                    iconLeft={<FaUser />}
                    error={errors.username?.message && t(errors.username?.message)}
                    {...register("username")} />
                <TextInput
                    type={show ? "text" : "password"}
                    placeholder={t('auth.password')}
                    iconLeft={<FaLock />}
                    iconRight={show ? (<FaEyeSlash onClick={(e) => setShow(!show)} />) :
                        (<FaEye onClick={(e) => setShow(!show)} />)
                    }
                    error={errors.password?.message && t(errors.password?.message)}
                    {...register("password")}
                />
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