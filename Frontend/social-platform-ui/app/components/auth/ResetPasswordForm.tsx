'use client'
import { FaEye, FaEyeSlash, FaKey, FaLock } from "react-icons/fa";
import { TextInput } from "../common/Input";
import { useState } from "react";
import { ButtonSubmit } from "../common/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { ResetPasswordPayload, ResetPasswordSchema } from "@/app/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useResetPassword } from "@/app/hooks/useAuth";
import { useToast } from "../common/Toast/ToastContext";
import { FullScreenLoading } from "../common/Loading";

export default function ResetPasswordForm() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showNewPassword, setShowNewPassword] = useState<boolean>(false);

    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email");

    const { mutate, isPending } = useResetPassword();
    const toast = useToast();

    const { register, handleSubmit, trigger, formState: { errors } } = useForm<ResetPasswordPayload>({
        resolver: zodResolver(ResetPasswordSchema),
        mode: "onChange",
        defaultValues: {
            email: email || ""
        }
    })

    const onSubmit = (data: ResetPasswordPayload) => {
        console.log("Submitted");
        console.log(data);
        mutate(data, {
            onSuccess: (res) => {
                toast.success(res.resMessage);
                console.log("Hello" + res);
                router.prefetch("/");
                router.push("/");
            },
            onError: (err) => {
                toast.error(err.message);
                console.log("OMG" + err);
            }
        })
    }

    return (
        <>
            {isPending && <FullScreenLoading />}
            <h1 className="text-2xl font-bold text-secondary-foreground">
                {`Reset Password for ${email}`}
            </h1>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                {/* OTP */}
                <TextInput
                    type="text"
                    placeholder={"Enter your OTP!"}
                    iconLeft={<FaKey />}
                    error={errors?.otp?.message}
                    {...register("otp")}
                />

                {/* Password */}
                <TextInput
                    type={showPassword ? "text" : "password"}
                    placeholder={"Enter new password"}
                    iconLeft={<FaLock />}
                    iconRight={
                        showPassword ? (
                            <FaEyeSlash onClick={() => setShowPassword(false)} />
                        ) : (
                            <FaEye onClick={() => setShowPassword(true)} />
                        )
                    }
                    error={errors?.newPassword?.message}
                    {...register("newPassword", {
                        onChange: () => trigger("confirmPassword")
                    })}
                />

                {/* New Password */}
                <TextInput
                    type={showNewPassword ? "text" : "password"}
                    placeholder={"Confirm new password"}
                    iconLeft={<FaLock />}
                    iconRight={
                        showNewPassword ? (
                            <FaEyeSlash onClick={() => setShowNewPassword(false)} />
                        ) : (
                            <FaEye onClick={() => setShowNewPassword(true)} />
                        )
                    }
                    error={errors?.confirmPassword?.message}
                    {...register("confirmPassword")}
                />

                <ButtonSubmit value={"Reset Password"} type="submit" />
            </form>
        </>
    )
}