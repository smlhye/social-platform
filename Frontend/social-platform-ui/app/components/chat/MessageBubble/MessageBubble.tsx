import { Box } from "@mui/material"

type MessagePosition = "single" | "first" | "middle" | "last"

interface MessageBubbleProps {
    content: string,
    isMe: boolean,
    position?: MessagePosition
}

export default function MessageBubble({
    content,
    isMe,
    position = "single"
}: MessageBubbleProps) {

    const radiusMap: Record<MessagePosition, string> = {
        single: "",
        first: isMe ? "rounded-br-none" : "rounded-bl-none",
        middle: isMe ? "rounded-r-none" : "rounded-l-none",
        last: isMe ? "rounded-tr-none" : "rounded-tl-none"
    }

    return (
        <Box className={`max-w-[60%] px-3 py-2 mb-1 rounded-mes
            ${isMe ? "self-end bg-primary text-primary-foreground"
                : "self-start bg-secondary text-secondary-foreground"
            }
            ${radiusMap[position]}
        `}>
            {content}
        </Box>
    )
}