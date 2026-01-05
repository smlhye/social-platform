import { Box } from "@mui/material"

export type MessagePosition = "single" | "first" | "middle" | "last"

interface MessageBubbleProps {
    content: string,
    isMe: boolean,
    position?: MessagePosition,
    time: string
}

export default function MessageBubble({
    content,
    isMe,
    position = "single",
    time
}: MessageBubbleProps) {

    const radiusMap: Record<MessagePosition, string> = {
        single: "",
        first: isMe ? "rounded-br-none" : "rounded-bl-none",
        middle: isMe ? "rounded-r-none" : "rounded-l-none",
        last: isMe ? "rounded-tr-none" : "rounded-tl-none"
    }

    return (
        <Box className={`flex flex-col items-${isMe ? "end" : "start"} mb-1`}>
            {/* Bubble */}
            <Box className={`max-w-[60%] px-3 py-2 rounded-mes
                ${isMe ? "self-end bg-primary text-primary-foreground"
                    : "self-start bg-secondary text-secondary-foreground"}
                ${radiusMap[position]}
            `}>
                {content}
            </Box>

            {/* Timestamp chỉ hiển thị với single hoặc last */}
            {(position === "single" || position === "last") && (
                <span className={`mt-1 text-xs ${isMe ? "pr-1 self-end text-primary-foreground/70"
                    : "pl-1 self-start text-secondary-foreground/70"}`}>
                    {time}
                </span>
            )}
        </Box>
    )
}