"use client";

interface UserInfoProps {
    isSignedIn: boolean;
    name?: string;
    avatarUrl?: string;
}

export default function UserInfo({ isSignedIn, name, avatarUrl }: UserInfoProps) {
    if (!isSignedIn) return null;
    return (
        <div className="flex items-center gap-2">
            <img
                src={avatarUrl || "https://tse4.mm.bing.net/th/id/OIP.GgClBrhklJ7_6PA4Ib7LWQHaHa?pid=Api&P=0&h=180"}
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
            />
            <span>{name || "Tran Van Banh"}</span>
        </div>
    );
}