import { MessageListResponse } from "@/app/schemas/message.schema";
import { FriendItem } from "@/app/types/chat";
import { ChatHeader } from "../ChatHeader";
import { CircularProgress } from "@mui/material";
import Chat from "../Chat/Chat";
import { IllustrationMes } from "../../common/Illustration";
import { ChatInput } from "../ChatInput";
import { useGetUserById } from "@/app/hooks/useUser";

interface ChatAreaProps {
    selectedUser: FriendItem | null,
    currentUserId: string,
    handleSendMessage: (content: string) => void,
    infoBar: boolean,
    setInfoBar: (value: boolean) => void,
    isLoading: boolean;
}

export default function ChatArea({
    selectedUser,
    currentUserId,
    handleSendMessage,
    infoBar,
    setInfoBar,
    isLoading
}: ChatAreaProps) {

    const userDetail = useGetUserById(selectedUser?.friendId ?? "");

    const apiUser = userDetail.data?.resData;

    return (
        <div className="flex flex-col min-w-0 h-full min-h-0">

            {/* Header */}
            {selectedUser && (
                <div className="shrink-0 dark:bg-sub-background dark:border-l-2 dark:border-background shadow-bottom">
                    <ChatHeader
                        id={apiUser?.id ?? ""}
                        name={apiUser?.fullName ?? ""}
                        avatar={apiUser?.avatarURL ?? ""}
                        active={false}   // 🔥
                        lastSeen={apiUser?.lastSeen ?? null}  // 🔥
                        onToggle={() => setInfoBar(!infoBar)}
                    />
                </div>
            )}

            {/* CHAT */}
            <div className="flex-1 flex flex-col min-h-0">
                {isLoading ? (
                    <div className="h-full flex items-center justify-center">
                        <CircularProgress />
                    </div>
                ) : (
                    <Chat
                        currentUserId={currentUserId}
                        selectedUser={selectedUser}
                        lastAddId={null}
                    />
                )}
            </div>

            {/* INPUT */}
            {selectedUser?.friendId && (
                <div className="shrink-0 shadow-top p-2 bg-background dark:bg-sub-background dark:border-l-2 dark:border-background">
                    <ChatInput receiverId={selectedUser.friendId} onSend={handleSendMessage} />
                </div>
            )}

        </div>
    )
}