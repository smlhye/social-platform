import { Box, CircularProgress, Typography } from "@mui/material"
import MessageBubble, { MessagePosition } from "../MessageBubble/MessageBubble"
import { AnimatePresence } from "framer-motion"
import { MessageListResponse, MessageResponse } from "@/app/schemas/message.schema"
import { useMessagePage } from "@/app/hooks/chat/useMessagePage"
import { useEffect, useLayoutEffect, useRef } from "react"
import { FriendItem } from "@/app/types/chat"

export interface Message {
    id: string
    content: string
    senderId: string
    time: string
}

interface ChatProps {
    currentUserId: string,
    selectedUser: FriendItem | null,
    lastAddId: string | null
}

function isSameGroup(a?: MessageResponse, b?: MessageResponse) {
    if (!a || !b) return false
    if (a.senderId !== b.senderId) return false

    const timeDiff = Math.abs(
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    return timeDiff <= 10 * 60 * 1000 // <= 10 phút
}

function getPosition(messages: MessageListResponse, index: number): MessagePosition {
    const current = messages[index]
    const prev = messages[index + 1]
    const next = messages[index - 1]

    const samePrev = isSameGroup(prev, current)
    const sameNext = isSameGroup(current, next)

    if (!samePrev && !sameNext) return "single"
    if (!samePrev && sameNext) return "first"
    if (samePrev && sameNext) return "middle"
    return "last"
}


export default function Chat({ currentUserId, selectedUser, lastAddId }: ChatProps) {
    const { messagesLazy, loadMore, loadingMore, hasMore } = useMessagePage();
    const containerRef = useRef<HTMLDivElement>(null);
    const loadMoreRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!loadMoreRef.current) return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && hasMore && !loadingMore) {
                    loadMore();
                }
            }, {
                root: containerRef.current,
                threshold: 0.1,
            })
        })
        observer.observe(loadMoreRef.current);
        return () => observer.disconnect();
    }, [hasMore, loadingMore, loadMore]);



    // useLayoutEffect(() => {
    //     if (!containerRef.current) return;
    //     const scrollToMessage = () => {
    //         scrollToBottom();
    //         // setIsSendMessage(false);
    //     };
    //     requestAnimationFrame(() => requestAnimationFrame(scrollToMessage));
    // }, [messagesLazy]);

    const scrollToBottom = () => {
        if (!containerRef.current) return;
        requestAnimationFrame(() => {
            containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
        });
    };

    return (
        <div className="flex flex-col h-full">
            <div ref={containerRef}
                className="flex-1 overflow-y-auto py-3 px-3 flex flex-col-reverse gap-1 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300"
            >
                {/* <AnimatePresence initial={false}> */}
                {messagesLazy.map((msg, i) => {
                    const prevMsg = messagesLazy[i + 1]
                    const showTime =
                        !prevMsg ||
                        new Date(msg.createdAt).getTime() - new Date(prevMsg.createdAt).getTime() > 10 * 60 * 1000

                    return (
                        <Box key={i} className="flex flex-col">
                            {showTime && (
                                <Typography
                                    variant="caption"
                                    className="self-center text-xs font-semibold text-muted-foreground mb-2"
                                >
                                    {new Date(msg.createdAt).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </Typography>
                            )}

                            <MessageBubble
                                content={msg.content}
                                isMe={msg.senderId === currentUserId}
                                position={getPosition(messagesLazy, i)}
                                time={new Date(msg.createdAt).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                                user={selectedUser}
                                isNew={msg.id === lastAddId}
                            />
                        </Box>
                    )
                })}

                {hasMore && (
                    <div ref={loadMoreRef} style={{ padding: "10px", textAlign: "center" }}>
                        {loadingMore ? (<div className="flex justify-center py-2 text-xs text-gray-500">
                            <CircularProgress className="w-4 h-4 animate-spin mr-1" />
                            Đang tải tin nhắn...
                        </div>) : "Còn tin nhắn"}
                    </div>
                )}
            </div>
        </div>
    )
}
