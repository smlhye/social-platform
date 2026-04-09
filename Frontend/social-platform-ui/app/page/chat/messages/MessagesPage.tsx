
"use client"
import ChatArea from "@/app/components/chat/layout/ChatArea";
import FriendSidebar from "@/app/components/chat/layout/FriendSidebar";
import { useMessagePage } from "@/app/hooks/chat/useMessagePage";
import { useI18n } from "@/app/lib/i18nContext";

export default function MessagePage() {

    const { t } = useI18n();

    const {
        currentUserId,
        recentList,
        selectedUser,
        setSelectedUser,
        tab,
        setTab,
        isRecentLoading,
        messages,
        handleSendMessage,
        infoBar,
        setInfoBar,
        scrollRef,
        handleScroll,
        isLoading,
        lastAddedId
    } = useMessagePage();

    return (
        <div className="flex h-full overflow-hidden">
            <FriendSidebar
                users={recentList}
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
                loading={isRecentLoading}
                tab={tab}
                setTab={setTab}
                t={t}
            />

            <main className="flex-1 flex min-w-0">
                <ChatArea
                    selectedUser={selectedUser}
                    messages={messages}
                    currentUserId={currentUserId ?? ""}
                    handleSendMessage={handleSendMessage}
                    infoBar={infoBar}
                    setInfoBar={setInfoBar}
                    scrollRef={scrollRef}
                    onScroll={handleScroll}
                    isLoading={isLoading}
                />
            </main>

        </div>
    )
}