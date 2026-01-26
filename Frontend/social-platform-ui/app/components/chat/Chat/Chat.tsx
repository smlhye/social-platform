import { Box, Typography } from "@mui/material"
import MessageBubble, { MessagePosition } from "../MessageBubble/MessageBubble"
import { AnimatePresence } from "framer-motion"
import { useEffect, useRef } from "react"

export interface Message {
    id: string
    content: string
    senderId: string
    time: string
}

interface ChatProps {
    messages: Message[],
    currentUserId: string,
    lastAddId: string | null
}

function isSameGroup(a?: Message, b?: Message) {
    if (!a || !b) return false
    if (a.senderId !== b.senderId) return false

    const timeDiff =
        new Date(b.time).getTime() - new Date(a.time).getTime()

    return timeDiff <= 10 * 60 * 1000 // <= 10 phút
}

function getPosition(messages: Message[], index: number): MessagePosition {
    const current = messages[index]
    const prev = messages[index - 1]
    const next = messages[index + 1]

    const samePrev = isSameGroup(prev, current)
    const sameNext = isSameGroup(current, next)

    if (!samePrev && !sameNext) return "single"
    if (!samePrev && sameNext) return "first"
    if (samePrev && sameNext) return "middle"
    return "last"
}


export default function Chat({ messages, currentUserId, lastAddId }: ChatProps) {
    return (
        <Box className="flex flex-col gap-1">
            <AnimatePresence initial={false}>
                {messages.map((msg, i) => {
                    const prevMsg = messages[i - 1]
                    const showTime =
                        !prevMsg ||
                        new Date(msg.time).getTime() - new Date(prevMsg.time).getTime() > 10 * 60 * 1000

                    return (
                        <Box key={msg.id} className="flex flex-col">
                            {showTime && (
                                <Typography
                                    variant="caption"
                                    className="self-center text-xs font-semibold text-muted-foreground mb-2"
                                >
                                    {new Date(msg.time).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </Typography>
                            )}

                            <MessageBubble
                                content={msg.content}
                                isMe={msg.senderId === currentUserId}
                                position={getPosition(messages, i)}
                                time={new Date(msg.time).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                                user=""
                                isNew={msg.id === lastAddId}
                            />
                        </Box>
                    )
                })}
            </AnimatePresence>
        </Box>
    )
}
