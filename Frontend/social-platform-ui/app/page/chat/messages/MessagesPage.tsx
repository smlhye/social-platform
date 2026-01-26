"use client";

import { FriendLabel, FriendLabelLoading } from "@/app/components/chat/FriendLabel";
import { ChatHeader } from "@/app/components/chat/ChatHeader";
import { ChatInput } from "@/app/components/chat/ChatInput";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useI18n } from "@/app/lib/i18nContext";
import Chat from "@/app/components/chat/Chat/Chat";
import "flag-icons/css/flag-icons.min.css";
import { Infobar } from "@/app/components/layout/Infobar";
import { SearchInput } from "@/app/components/common/Input";
import { CustomTab, CustomTabs } from "@/app/components/common/Tab";

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
            content: "Alo",
            senderId: "u1",
            time: "2026-01-05T08:00:00.000Z",
        },
        {
            id: "u1-3",
            content: "Chào bạn, lâu quá không gặp 😄",
            senderId: "me",
            time: "2026-01-05T08:02:00.000Z",
        },
        {
            id: "u1-4",
            content: "Tối nay đi cà phê không?",
            senderId: "u1",
            time: "2026-01-05T08:03:00.000Z",
        },
        {
            id: "u1-5",
            content: "Lâu rồi chưa đi á",
            senderId: "u1",
            time: "2026-01-05T08:03:00.000Z",
        },
        {
            id: "u1-6",
            content: "Tối nay hẻ?",
            senderId: "me",
            time: "2026-01-05T08:03:00.000Z",
        },
        {
            id: "u1-7",
            content: "Đúng rồi",
            senderId: "u1",
            time: "2026-01-05T08:03:00.000Z",
        },
        {
            id: "u1-8",
            content: "Chứ sao nữa",
            senderId: "u1",
            time: "2026-01-05T08:03:00.000Z",
        },
        {
            id: "u1-9",
            content: "OK",
            senderId: "me",
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
        {
            id: "u3-2",
            content: "Alo bạn ơi!",
            senderId: "u3",
            time: "2026-01-03T18:00:00.000Z",
        },
        {
            id: "u3-3",
            content: "Bạn có nghe mình nói không?",
            senderId: "u3",
            time: "2026-01-03T18:01:00.000Z",
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
    const [infoBar, setInfoBar] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);

    const [lastAddedId, setLastAddedId] = useState<string | null>(null)

    const [tab, setTab] = useState(0);

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


    useEffect(() => {
        if (selectedFriend) {
            setMessages(testConversations[selectedFriend.id] ?? [])
        }
    }, [selectedFriend])

    return (
        <div className="flex h-full overflow-hidden">
            {/* Friend list */}
            <aside className="hidden sm:flex flex-col w-75 bg-sub-background p-4">
                <h2 className="text-xl font-semibold mb-2">{t("chat.chat")}</h2>
                <ul className="flex-1 flex flex-col gap-3 mt-2 overflow-y-auto">
                    <SearchInput />
                    <CustomTabs value={tab} onChange={(_, v) => setTab(v)}>
                        <CustomTab label={t("chat.all")} />
                        <CustomTab label={t("chat.notSeen")} />
                    </CustomTabs>
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
            <main className="flex-1 flex min-w-0">

                <div className="flex-1 flex flex-col min-w-0">
                    <div className="shrink-0 dark:bg-sub-background dark:border-l-2 dark:border-background shadow-bottom">
                        <ChatHeader
                            id={selectedFriend?.id ?? ""}
                            name={selectedFriend?.name ?? ""}
                            avatar={selectedFriend?.avatar ?? ""}
                            active={selectedFriend?.active ?? false}
                            onToggle={() => setInfoBar(!infoBar)}
                        />
                    </div>

                    <div className="flex-1 p-6 overflow-y-auto flex flex-col-reverse scroll-overlay min-w-0">
                        {loading ? (
                            <div className="h-full flex items-center justify-center">
                                <CircularProgress />
                            </div>
                        ) : (
                            <div className="flex flex-col w-full">
                                <Chat
                                    key={selectedFriend?.id}
                                    messages={messages}
                                    currentUserId="me"
                                    lastAddId={lastAddedId}
                                />

                                <button
                                    onClick={() => {
                                        const id = crypto.randomUUID();
                                        setLastAddedId(id);
                                        setMessages(prev => [
                                            ...prev,
                                            {
                                                id,
                                                content: "TEST POP 🚀",
                                                senderId: "me",
                                                time: new Date().toISOString(),
                                            }
                                        ])
                                    }}
                                    className="mt-2 px-3 py-1 text-sm bg-primary text-white rounded"
                                >
                                    + Add test message
                                </button>

                            </div>
                        )}
                    </div>

                    <div className="shrink-0 shadow-top p-2 bg-background dark:bg-sub-background dark:border-l-2 dark:border-background">
                        <ChatInput />
                    </div>
                </div>

                <div
                    className={`
                        shrink-0 overflow-hidden
                        transition-[max-width] duration-300 ease-in-out
                        ${infoBar ? "max-w-[340px]" : "max-w-0"}
                    `}
                >
                    <div className="w-85 h-full">
                        <Infobar />
                    </div>
                </div>

            </main>
        </div>
    );
}
