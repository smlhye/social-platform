import { Box, Typography } from "@mui/material"
import MessageBubble, { MessagePosition } from "../MessageBubble/MessageBubble"

export interface Message {
    id: string
    content: string
    senderId: string
    time: string
}

interface ChatProps {
    messages: Message[]
    currentUserId: string
}

function getPosition(messages: Message[], index: number): MessagePosition {
    const current = messages[index]
    const prev = messages[index - 1]
    const next = messages[index + 1]

    const samePrev = prev?.senderId === current.senderId
    const sameNext = next?.senderId === current.senderId

    if (!samePrev && !sameNext) return "single"
    if (!samePrev && sameNext) return "first"
    if (samePrev && sameNext) return "middle"
    return "last"
}

export default function Chat({ messages, currentUserId }: ChatProps) {
    return (
        <Box className="flex flex-col gap-1">
            {messages.map((msg, i) => {
                const prevMsg = messages[i - 1]
                const showTime =
                    !prevMsg ||
                    new Date(msg.time).getTime() - new Date(prevMsg.time).getTime() > 10 * 60 * 1000

                return (
                    <Box key={msg.id} className="flex flex-col gap-1">
                        {showTime && (
                            <Typography
                                variant="caption"
                                className="self-center text-xs text-muted-foreground"
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
                        />
                    </Box>
                )
            })}
        </Box>
    )
}
