"use client";
import FriendSidebar from "@/app/components/chat/layout/FriendSidebar";
import { useMessagePage } from "@/app/hooks/chat/useMessagePage";

export default function MessagesLayout({ children }: { children: React.ReactNode }) {
    const { recentList, tab, setTab, isRecentLoading, query, setQuery } = useMessagePage();

    return (
        <div className="flex h-full">
            <FriendSidebar
                users={recentList}
                loading={isRecentLoading}
                tab={tab}
                setTab={setTab}
                t={(key) => key} // nếu dùng i18n
                search={query}
                onSearch={setQuery}
            />

            <main className="flex-1 flex min-w-0">{children}</main>
        </div>
    );
}