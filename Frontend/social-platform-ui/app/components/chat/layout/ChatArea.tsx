import { MessageListResponse } from "@/app/schemas/message.schema";
import { FriendItem } from "@/app/types/chat";
import { ChatHeader } from "../ChatHeader";
import { CircularProgress } from "@mui/material";
import Chat from "../Chat/Chat";
import { IllustrationMes } from "../../common/Illustration";
import { ChatInput } from "../ChatInput";

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
    return (
        <div className="flex-1 flex flex-col min-w-0">

            {/* Header */}
            {selectedUser && (
                <div className="shrink-0 dark:bg-sub-background dark:border-l-2 dark:border-background shadow-bottom">
                    <ChatHeader
                        id={selectedUser?.friendId ?? ""}
                        name={selectedUser?.fullName ?? ""}
                        avatar={selectedUser?.avatar ?? ""}
                        active={false}
                        onToggle={() => setInfoBar(!infoBar)}
                    />
                </div>
            )}
        

            {/* Messages */}
            <div
                className="flex-1 p-6 h-full flex flex-col scroll-overlay min-w-0"
            >
                {isLoading ? (
                    <div className="h-full flex items-center justify-center">
                        <CircularProgress />
                    </div>
                ) :  (
                    <Chat
                        currentUserId={currentUserId}
                        lastAddId={null} // giữ nguyên nếu không highlight, hoặc truyền lastAddedId nếu muốn
                    />
                )}
                
                
                {/* <IllustrationMes
                          svg={<img src="/illustrations/undraw_chatting_5u5z.svg" />}
                          title="Hãy cùng trò chuyện với nhau"
                > */}
            </div>

            {/* Input */}
            {selectedUser?.friendId && (
                <div className="shrink-0 shadow-top p-2 bg-background dark:bg-sub-background dark:border-l-2 dark:border-background">
                    <ChatInput receiverId={selectedUser.friendId} onSend={handleSendMessage} />
                </div>
            )}

        </div>
    )
}