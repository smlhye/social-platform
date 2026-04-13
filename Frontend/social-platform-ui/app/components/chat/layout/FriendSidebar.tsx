import { FriendItem } from "@/app/types/chat";
import { CustomTab, CustomTabs } from "../../common/Tab";
import { FriendLabel, FriendLabelLoading } from "../FriendLabel";
import { RecentChatListResponse } from "@/app/schemas/message.schema";
import Link from "next/link";
import { useParams } from "next/navigation";
import { SearchInput } from "../../common/Input";
import { useEffect, useState } from "react";

interface FriendSidebarProps {
    users: RecentChatListResponse,
    loading: boolean,
    tab: number,
    setTab: (tab: number) => void,
    t: (key: string) => string,
    search: string,
    onSearch: (value: string) => void
}

export default function FriendSidebar({
    users,
    loading,
    tab,
    setTab,
    t,
    search,
    onSearch
}: FriendSidebarProps) {

    const param = useParams();
    const selectedId = param.userId;

    return (
        <aside className="hidden sm:flex flex-col w-75 bg-sub-background p-4">
            <h2 className="text-xl font-semibold mb-2">
                {t("chat.chat")}
            </h2>

            <SearchInput value={search} onChange={onSearch} />

            <CustomTabs className="mt-2" value={tab} onChange={(_, v) => setTab(v)}>
                <CustomTab label={t("chat.all")} />
                <CustomTab label={t("chat.notSeen")} />
            </CustomTabs>

            <ul className="flex-1 flex flex-col gap-3 mt-2 overflow-y-auto hide-scroll">
                {loading
                    ? Array.from({ length: 4 }).map((_, i) => (<FriendLabelLoading key={i} />)) :
                    users.map((item) => {
                        return (
                            <Link
                                prefetch={false}
                                key={item.friendId}
                                href={`/messages/${item.friendId}`}
                            >
                                <FriendLabel
                                    key={item.friendId}
                                    avatar={item.avatar}
                                    name={item.fullName}
                                    lastMes={item.lastMessage}
                                    time={item.lastMessageAt}
                                    read={(item.unreadCount ?? 0) === 0}
                                    unreadCount={item.unreadCount}
                                    active={selectedId === item.friendId}
                                    isOnline={item.isOnline}
                                />
                            </Link>
                        );
                    })}
            </ul>
        </aside>
    )
}