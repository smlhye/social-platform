"use client";

import Image from "next/image";
import { MdOutlineMail } from "react-icons/md";
import { AvatarUI } from "../../common/Avatar";
import { useGetUserById } from "@/app/hooks/useUser";

interface UserDetailProps {
    userId: string;
}

export function UserDetail({ userId }: UserDetailProps) {
    const { data, isLoading } = useGetUserById(userId);
    const user = data?.resData;

    if (isLoading) {
        return (
            <div className="p-6 text-muted-foreground">
                Loading...
            </div>
        );
    }

    if (!user) {
        return (
            <div className="h-full flex items-center justify-center text-muted-foreground">
                User not found
            </div>
        );
    }

    const isFriend = user.isFriend;
    const isRequested = user.isRequest;

    return (
        <div className="h-full flex flex-col">

            {/* Cover */}
            <div className="relative w-full h-[160px]">
                <Image
                    src="/aurorabackground.jpg"
                    alt="cover"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Body */}
            <div className="flex-1 bg-card text-card-foreground rounded-t-xl shadow-sm relative">

                {/* Avatar */}
                <div className="absolute -top-12 left-6">
                    <div className="ring-4 ring-background rounded-full">
                        <AvatarUI
                            avatar={user.avatarURL ?? ""}
                            name={user.fullName}
                            size={100}
                        />
                    </div>
                </div>

                <div className="pt-16 px-6 pb-6 flex flex-col gap-4">

                    {/* Name */}
                    <div>
                        <h2 className="text-lg font-semibold">
                            {user.fullName}
                        </h2>

                        <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                            <MdOutlineMail />
                            {user.email || "No email"}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 mt-2">

                        {!isFriend && !isRequested && (
                            <button className="flex-1 px-3 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground shadow-sm hover:shadow-md hover:opacity-90 transition">
                                Add Friend
                            </button>
                        )}

                        {isRequested && (
                            <button className="flex-1 px-3 py-2 text-sm font-medium rounded-md bg-muted text-muted-foreground shadow-sm">
                                Requested
                            </button>
                        )}

                        {isFriend && (
                            <button className="flex-1 px-3 py-2 text-sm font-medium rounded-md bg-accent text-accent-foreground shadow-sm">
                                Friends
                            </button>
                        )}

                        <button className="px-3 py-2 text-sm font-medium rounded-md bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground transition">
                            Message
                        </button>
                    </div>

                    {/* Extra info */}
                    <div className="mt-4 text-sm text-muted-foreground space-y-1">
                        <p>User ID: {user.id}</p>
                        <p>Phone: {user.phoneNumber || "—"}</p>
                        <p>Gender: {user.gender || "—"}</p>
                    </div>

                </div>
            </div>
        </div>
    );
}