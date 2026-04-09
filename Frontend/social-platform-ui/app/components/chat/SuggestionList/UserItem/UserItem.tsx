"use client";
import React from "react";
import Link from "next/link";
import { AvatarUI } from "@/app/components/common/Avatar";

interface UserItemProps {
    user: any;
    isActive: boolean;
    onSelect?: (user: any) => void;
    onSend?: (userId: string) => void;
    onCancel?: (userId: string) => void;
}

// React.memo: chỉ render lại khi props thay đổi
const UserItem = React.memo(function UserItem({
    user,
    isActive,
    onSelect,
    onSend,
    onCancel
}: UserItemProps) {
    return (
        <Link
            href={`/contact/${user.id}`}
            onClick={() => onSelect?.(user)}
            className={`flex items-center gap-3 p-3 rounded-lg transition
                ${isActive ? "bg-accent text-accent-foreground shadow-md" : "bg-card hover:bg-accent/50"}`}
        >
            <AvatarUI avatar={user.avatar ?? ""} name={user.fullName} />
            <div className="flex-1">
                <p className="text-sm font-medium">{user.fullName}</p>
            </div>

            {user.isRequest ? (
                <button
                    onClick={(e) => { e.stopPropagation(); onCancel?.(user.id); }}
                    disabled
                >
                    Requested
                </button>
            ) : (
                <button
                    onClick={(e) => { e.stopPropagation(); onSend?.(user.id); }}
                >
                    Add
                </button>
            )}
        </Link>
    );
});

export default UserItem;