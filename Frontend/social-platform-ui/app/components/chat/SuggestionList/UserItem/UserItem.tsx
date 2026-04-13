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
            className={`flex items-center gap-3 p-3 rounded-xl transition
                border
                ${isActive
                    ? "bg-blue-50 border-blue-300 shadow-sm"
                    : "bg-white hover:bg-gray-50 border-gray-200"
                }`}
        >
            <AvatarUI avatar={user.avatar ?? ""} name={user.fullName} />

            <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">
                    {user.fullName}
                </p>
                <p className="text-xs text-gray-400">
                    {user.isRequest ? "Đã gửi lời mời" : "Có thể kết bạn"}
                </p>
            </div>

            {/* BUTTON AREA */}
            <div className="flex items-center gap-3">
                {user.isRequest ? (
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onCancel?.(user.id);
                        }}
                        className="
                            px-4 py-2 text-sm font-semibold
                            rounded-full
                            bg-red-50 text-red-600
                            border border-red-200
                            hover:bg-red-100 hover:border-red-300
                            active:scale-95 transition
                            min-w-[90px]
                            text-center
                        "
                    >
                        Hủy lời mời
                    </button>
                ) : (
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onSend?.(user.id);
                        }}
                        className="
                            px-4 py-2 text-sm font-semibold
                            rounded-full
                            bg-blue-500 text-white
                            shadow-sm
                            :bg-blue-600
                            active:scale-95 transition
                            min-w-[90px]
                            text-center
                        "
                    >
                        Kết bạn
                    </button>
                )}
            </div>
        </Link>
    );
});

export default UserItem;