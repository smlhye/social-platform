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

import { useConversation, useSendMessage } from "@/app/hooks/useMessage";
import { useCurrentUser } from "@/app/hooks/useAuth";

interface User {
    id: string;
    avatar: string;
    name: string;
    active: boolean;
}

interface Message {
    id: string;
    content: string;
    senderId: string;
    time: string;
}

export default function MessagesPage() {

    const { t } = useI18n();

    const { data: me } = useCurrentUser();

    const userA = "e49d2b45-7e22-4723-964e-2274fcef0c80";
    const userB = "736e643f-c17e-4004-b30f-9a6e8c44fc36";

    const currentUserId = me?.resData.id;

    const receiverId =
        currentUserId === userA ? userB : userA;

    const [selectedFriend, setSelectedFriend] = useState<User | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [loadingFriends, setLoadingFriends] = useState(true);
    const [infoBar, setInfoBar] = useState(false);
    const [tab, setTab] = useState(0);
    const [lastAddedId, setLastAddedId] = useState<string | null>(null);

    // giả lập friend list (sau này sẽ fetch API)
    const [friends, setFriends] = useState<User[]>([]);

    useEffect(() => {
        if (!receiverId) return;

        setFriends([
            {
                id: receiverId,
                avatar: "",
                name: "Test User",
                active: true
            }
        ]);
        console.log(currentUserId);
        console.log(receiverId);
    }, [receiverId]);

    // ======================
    // fetch conversation
    // ======================

    const { data, isLoading } = useConversation(
        currentUserId,
        receiverId
    );

    useEffect(() => {
        if (data?.resData) {

            const mapped = data.resData.map((m: any) => ({
                id: m.id,
                content: m.content,
                senderId: m.senderId,
                time: m.createdAt
            }));

            setMessages(mapped);
        }
    }, [data]);

    // ======================
    // send message
    // ======================

    const sendMessageMutation = useSendMessage();

    const handleSendMessage = (content: string) => {

        if (!receiverId) return;

        sendMessageMutation.mutate(
            {
                receiverId: receiverId,
                content
            },
            {
                onSuccess: (res) => {

                    if (!res.resData) return;

                    const newMsg = {
                        id: res.resData.id,
                        content: res.resData.content,
                        senderId: res.resData.senderId,
                        time: res.resData.createdAt
                    };

                    setLastAddedId(newMsg.id);
                    setMessages(prev => [...prev, newMsg]);
                }
            }
        );
    };

    // ======================
    // init selected friend
    // ======================

    useEffect(() => {
        if (!selectedFriend && friends.length > 0) {
            setSelectedFriend(friends[0]);
        }
    }, [friends]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoadingFriends(false);
        }, 800);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex h-full overflow-hidden">

            {/* ================= Friend list ================= */}

            <aside className="hidden sm:flex flex-col w-75 bg-sub-background p-4">

                <h2 className="text-xl font-semibold mb-2">
                    {t("chat.chat")}
                </h2>

                <ul className="flex-1 flex flex-col gap-3 mt-2 overflow-y-auto">

                    <SearchInput />

                    <CustomTabs value={tab} onChange={(_, v) => setTab(v)}>
                        <CustomTab label={t("chat.all")} />
                        <CustomTab label={t("chat.notSeen")} />
                    </CustomTabs>

                    {loadingFriends
                        ? Array.from({ length: 4 }).map((_, i) => (
                            <FriendLabelLoading key={i} />
                        ))
                        : friends.map((user) => (
                            <FriendLabel
                                key={user.id}
                                avatar={user.avatar}
                                name={user.name}
                                lastMes=""
                                time=""
                                read={true}
                                active={selectedFriend?.id === user.id}
                                onClick={() => setSelectedFriend(user)}
                            />
                        ))}
                </ul>

            </aside>


            {/* ================= Chat area ================= */}

            <main className="flex-1 flex min-w-0">

                <div className="flex-1 flex flex-col min-w-0">

                    {/* header */}

                    <div className="shrink-0 dark:bg-sub-background dark:border-l-2 dark:border-background shadow-bottom">

                        <ChatHeader
                            id={selectedFriend?.id ?? ""}
                            name={selectedFriend?.name ?? ""}
                            avatar={selectedFriend?.avatar ?? ""}
                            active={selectedFriend?.active ?? false}
                            onToggle={() => setInfoBar(!infoBar)}
                        />

                    </div>


                    {/* messages */}

                    <div className="flex-1 p-6 overflow-y-auto flex flex-col-reverse scroll-overlay min-w-0">

                        {isLoading ? (
                            <div className="h-full flex items-center justify-center">
                                <CircularProgress />
                            </div>
                        ) : (

                            <div className="flex flex-col w-full">

                                <Chat
                                    key={selectedFriend?.id}
                                    messages={messages}
                                    currentUserId={currentUserId ?? ""}
                                    lastAddId={lastAddedId}
                                />

                            </div>

                        )}

                    </div>


                    {/* input */}

                    <div className="shrink-0 shadow-top p-2 bg-background dark:bg-sub-background dark:border-l-2 dark:border-background">
                        <ChatInput
                            receiverId={receiverId}
                            onSend={handleSendMessage} />
                    </div>

                </div>


                {/* ================= Infobar ================= */}

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