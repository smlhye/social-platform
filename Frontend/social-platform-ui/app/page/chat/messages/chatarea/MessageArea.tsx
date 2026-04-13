"use client";
import ChatArea from "@/app/components/chat/layout/ChatArea";
import { useMessagePage } from "@/app/hooks/chat/useMessagePage";
import { useLayoutEffect } from "react";

interface MessageAreaProps {
    userId?: string; // Nếu chưa chọn ai thì undefined
}

export default function MessageArea({ userId }: MessageAreaProps) {

    const {
        currentUserId,
        handleSendMessage,
        infoBar,
        setInfoBar,
        recentList,
        isLoading
    } = useMessagePage();

    // Tìm object user từ recentList
    const selectedUser = userId ? recentList.find((u) => u.friendId === userId) || null : null;
    
    return (
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            {!selectedUser ? (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                    Chọn một người để chat
                </div>
            ) : (
                <ChatArea
                    selectedUser={selectedUser}
                    currentUserId={currentUserId ?? ""}
                    handleSendMessage={handleSendMessage}
                    infoBar={infoBar}
                    setInfoBar={setInfoBar}
                    isLoading={isLoading}
                />
            )}
        </div>
    );
}