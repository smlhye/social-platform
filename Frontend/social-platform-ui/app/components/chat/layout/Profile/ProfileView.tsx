"use client";

import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import { AvatarUI } from "@/app/components/common/Avatar";
import { TextInput } from "@/app/components/common/Input";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { UpdateUserPayload } from "@/app/schemas/user.schema";
import { GetMeResponse } from "@/app/schemas/auth.schema";

type Props = {
    tab: number;
    setTab: (tab: number) => void;
    me: GetMeResponse;
    register: UseFormRegister<UpdateUserPayload>;
    errors: FieldErrors<UpdateUserPayload>;
    onSubmit: (e?: React.BaseSyntheticEvent) => void;
};

export default function ProfileView({
    tab,
    setTab,
    me,
    register,
    errors,
    onSubmit,
}: Props) {
    return (
        <div className="w-full flex flex-col gap-6">

            {/* Cover */}
            <div className="relative w-full h-[200px] rounded-xl overflow-hidden shadow-sm">
                <Image
                    src="/aurorabackground.jpg"
                    alt="cover"
                    fill
                    className="object-cover"
                />
            </div>

            {/* Card Body */}
            <div className="relative bg-card text-card-foreground rounded-2xl shadow-float overflow-visible z-0">

                {/* Avatar + User Info */}
                <div className="absolute -top-16 left-6 flex items-center gap-6 z-10">
                    <AvatarUI
                        avatar={me.avatar}
                        name={`${me.firstName} ${me.lastName}`}
                        size={120}
                    />

                    <div className="flex flex-col justify-center">
                        <h2 className="text-2xl font-semibold tracking-tight pt-3">
                            {me.firstName} {me.lastName}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            {me.email || "Chưa có email"}
                        </p>
                    </div>
                </div>

                <div className="px-6 pt-32 pb-6 flex flex-col gap-6 relative z-0">
                    {/* Tabs */}
                    <div className="flex gap-6 border-b border-input text-sm">
                        {["Profile", "Security", "About"].map((t, i) => (
                            <button
                                key={i}
                                onClick={() => setTab(i)}
                                className={`pb-2 transition-all ${tab === i
                                        ? "border-b-2 border-primary font-medium text-card-foreground"
                                        : "text-muted-foreground hover:text-card-foreground"
                                    }`}
                            >
                                {i === 0 && <CgProfile className="inline mr-1" />}
                                {t}
                            </button>
                        ))}
                    </div>

                    {/* Content */}
                    {tab === 0 && (
                        <form onSubmit={onSubmit} className="flex flex-col gap-4">
                            {/* Name */}
                            <div className="flex flex-col md:flex-row gap-3">
                                <TextInput
                                    placeholder="First name"
                                    {...register("firstName")}
                                    error={errors.firstName?.message}
                                    className="flex-1"
                                />
                                <TextInput
                                    placeholder="Last name"
                                    {...register("lastName")}
                                    error={errors.lastName?.message}
                                    className="flex-1"
                                />
                            </div>

                            {/* DOB */}
                            <TextInput
                                type="date"
                                {...register("dob")}
                                error={errors.dob?.message}
                            />

                            {/* Phone */}
                            <TextInput
                                placeholder="Phone number"
                                {...register("phoneNumber")}
                                error={errors.phoneNumber?.message}
                            />

                            {/* Submit */}
                            <button
                                type="submit"
                                className="
                  mt-2 px-5 py-2
                  bg-primary text-primary-foreground
                  rounded-lg font-medium
                  hover:bg-primary/90
                  transition-all duration-200
                  shadow-sm
                "
                            >
                                Save Changes
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}