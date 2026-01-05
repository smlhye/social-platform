import { Box, Typography } from "@mui/material"
import React from "react";
import { MessageBubble } from "../MessageBubble";
import { MessagePosition } from "../MessageBubble/MessageBubble";

export interface Message {
    id: string
    content: string
    senderId: string
    time: string // ISO string
}

interface ChatProps {
    messages: Message[]
    currentUserId: string
}

export const testMessages: Message[] = [
    { id: "1", content: "Chào bạn!", senderId: "user1", time: new Date("2026-01-05T08:00:00").toISOString() },
    { id: "2", content: "Chào bạn, lâu quá không gặp!", senderId: "me", time: new Date("2026-01-05T08:02:00").toISOString() },
    { id: "3", content: "Ừ, dạo này bận quá.", senderId: "user1", time: new Date("2026-01-05T08:03:00").toISOString() },
    { id: "4", content: "Bạn có rảnh hôm nay không?", senderId: "user1", time: new Date("2026-01-05T08:03:30").toISOString() },
    { id: "5", content: "Mình rảnh buổi chiều.", senderId: "me", time: new Date("2026-01-05T08:04:00").toISOString() },
    { id: "6", content: "Ok, vậy hẹn gặp nhé!", senderId: "user1", time: new Date("2026-01-05T09:30:00").toISOString() },
]

export default function Chat({ messages, currentUserId }: ChatProps) {
    const determinePosition = (messages: Message[], index: number): MessagePosition => {
        const current = messages[index]
        const prev = messages[index - 1]
        const next = messages[index + 1]

        const isPrevSame = prev && prev.senderId === current.senderId
        const isNextSame = next && next.senderId === current.senderId

        if (!isPrevSame && !isNextSame) return "single"
        if (!isPrevSame && isNextSame) return "first"
        if (isPrevSame && isNextSame) return "middle"
        if (isPrevSame && !isNextSame) return "last"

        return "single"
    }

    return (
        <Box className="flex flex-col p-2">
            {messages.map((msg, i) => {
                const prevMsg = messages[i - 1]
                const showTimeDivider =
                    !prevMsg ||
                    new Date(msg.time).getTime() - new Date(prevMsg.time).getTime() > 10 * 60 * 1000 // >10 phút

                return (
                    <Box key={msg.id} className="flex flex-col">
                        {showTimeDivider && (
                            <Typography variant="caption" className="self-center text-gray-400 text-xs">
                                {new Date(msg.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </Typography>
                        )}

                        <MessageBubble
                            content={msg.content}
                            isMe={msg.senderId === currentUserId}
                            position={determinePosition(messages, i)}
                            time={new Date(msg.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        />
                    </Box>
                )
            })}
        </Box>
    )
}
