"use client";

import { FriendLabel, FriendLabelLoading } from "@/app/components/chat/FriendLabel";
import { ChatHeader } from "@/app/components/chat/ChatHeader";
import { ChatInput } from "@/app/components/chat/ChatInput";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useI18n } from "@/app/lib/i18nContext";
import Chat from "@/app/components/chat/Chat/Chat";
import "flag-icons/css/flag-icons.min.css";

export type MessagePosition = "single" | "first" | "middle" | "last"

export interface Message {
    id: string
    content: string
    senderId: string,
    time: string
}

export const testConversations: Record<string, Message[]> = {
    u1: [
        {
            id: "u1-1",
            content: "Chào Huy!",
            senderId: "u1",
            time: "2026-01-05T08:00:00.000Z",
        },
        {
            id: "u1-2",
            content: "Chào bạn, lâu quá không gặp 😄",
            senderId: "me",
            time: "2026-01-05T08:02:00.000Z",
        },
        {
            id: "u1-3",
            content: "Tối nay đi cà phê không?",
            senderId: "u1",
            time: "2026-01-05T08:03:00.000Z",
        },
    ],

    u2: [
        {
            id: "u2-1",
            content: "Mai nộp bài nha",
            senderId: "u2",
            time: "2026-01-04T20:00:00.000Z",
        },
        {
            id: "u2-2",
            content: "Ok mình nhớ rồi",
            senderId: "me",
            time: "2026-01-04T20:01:00.000Z",
        },
    ],

    u3: [
        {
            id: "u3-1",
            content: "Gửi mình file báo cáo với",
            senderId: "u3",
            time: "2026-01-03T09:00:00.000Z",
        },
    ],
}

interface User {
    id: string;
    avatar: string;
    name: string;
    lastMes: string;
    time: string;
    read: boolean;
    active: boolean;
}

export function getMessagePosition(
    messages: Message[],
    index: number
): MessagePosition {
    const current = messages[index]
    const prev = messages[index - 1]
    const next = messages[index + 1]

    const samePrev = prev && prev.senderId === current.senderId
    const sameNext = next && next.senderId === current.senderId

    if (!samePrev && !sameNext) return "single"
    if (!samePrev && sameNext) return "first"
    if (samePrev && sameNext) return "middle"
    return "last"
}

export const testUsers = [
    {
        id: "u1",
        avatar: "",
        name: "Nguyễn Văn A",
        lastMes: "Ê tối nay đi cà phê không?",
        time: "20:31",
        read: false,
        active: true,
    },
    {
        id: "u2",
        avatar: "",
        name: "Trần Thị B",
        lastMes: "Ok để mai nha",
        time: "19:12",
        read: true,
        active: false,
    },
    {
        id: "u3",
        avatar: "",
        name: "Lê Văn C",
        lastMes: "Gửi mình file với",
        time: "Hôm qua",
        read: true,
        active: false,
    },
    {
        id: "u4",
        avatar: "",
        name: "Phạm Thị D",
        lastMes: "😂😂😂",
        time: "Thứ 2",
        read: false,
        active: false,
    },
];

export default function MessagesPage() {
    const [selectedFriend, setSelectedFriend] = useState<User | null>(null);
    const { t } = useI18n();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const time = setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    useEffect(() => {
        if (!selectedFriend && testUsers.length > 0) {
            setSelectedFriend(testUsers[0]);
        }
    }, []);

    return (
        <div className="flex h-full overflow-hidden">
            {/* Friend list */}
            <aside className="hidden sm:flex flex-col w-85 bg-background border-r border-gray-200 dark:border-gray-700 p-4">
                <h2 className="text-xl font-semibold mb-2">{t("chat.chat")}</h2>
                <ul className="flex-1 flex flex-col gap-2 overflow-y-auto">
                    {loading
                        ? Array.from({ length: 4 }).map((_, i) => (
                            <FriendLabelLoading key={i} />
                        ))
                        : testUsers.map((user) => (
                            <FriendLabel
                                key={user.id}
                                avatar={user.avatar}
                                name={user.name}
                                lastMes={user.lastMes}
                                time={user.time}
                                read={user.read}
                                active={selectedFriend?.id === user.id}
                                onClick={() => setSelectedFriend(user)}
                            />
                        ))}
                </ul>
            </aside>

            {/* Chat area */}
            <main className="flex-1 flex flex-col justify-between">
                <div className="shrink-0 border-b border-gray-200 dark:border-gray-700">
                    <ChatHeader
                        id={selectedFriend?.id ?? ""}
                        name={selectedFriend?.name ?? ""}
                        avatar={selectedFriend?.avatar ?? ""}
                        active={selectedFriend?.active ?? false}
                    />
                </div>

                <div className="flex-1 p-6 overflow-y-auto flex flex-col-reverse">
                    {loading ? (
                        <div className="h-full flex items-center justify-center">
                            <CircularProgress />
                        </div>
                    ) : (
                        <div className="flex flex-col max-w-4xl mx-auto w-full">
                            <Chat
                                messages={testConversations[selectedFriend?.id ?? ""] ?? []}
                                currentUserId="me"
                            />
                        </div>
                    )}
                </div>

                <div className="shrink-0 border-t border-gray-200 dark:border-gray-700 p-2">
                    <ChatInput />
                </div>
            </main>
        </div>
    );
}
