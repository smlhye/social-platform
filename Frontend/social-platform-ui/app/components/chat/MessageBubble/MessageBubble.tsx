import { Box } from "@mui/material"
import { AvatarUI } from "../../common/Avatar"

export type MessagePosition = "single" | "first" | "middle" | "last"

interface MessageBubbleProps {
    content: string,
    isMe: boolean,
    position?: MessagePosition,
    time: string,
    user: string,
}

export default function MessageBubble({
    content,
    isMe,
    position = "single",
    time,
    user
}: MessageBubbleProps) {

    const radiusMap: Record<MessagePosition, string> = {
        single: "",
        first: isMe ? "rounded-br-none" : "rounded-bl-none",
        middle: isMe ? "rounded-r-none" : "rounded-l-none",
        last: isMe ? "rounded-tr-none" : "rounded-tl-none"
    }

    return (
        <Box className={`${position === "middle" ? "mb-0" : "mb-1"} flex flex-col`}>
            <Box className={`flex items-end gap-2 ${isMe ? "justify-end" : "justify-start"}`}>
                {/* Avatar hoặc khoảng trống */}
                {!isMe ? (
                    (position === "single" || position === "first") ? (
                        <AvatarUI name="Hồ Đông Huy" size={40} />
                    ) : (
                        <Box style={{ width: 40 }} />
                    )
                ) : (
                    <Box style={{ width: 40 }} /> // giữ khoảng cho căn phải
                )}

                {/* Bubble */}
                <Box className={`max-w-[60%] px-3 py-2 rounded-mes
                    ${isMe ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"}
                    ${radiusMap[position]}
                `}>
                    {content}
                </Box>
            </Box>

            {/* Timestamp */}
            {(position === "single" || position === "last") && (
                <Box
                    className={`flex ${isMe ? "justify-end" : "justify-start"} mt-1`}
                    style={{  }} // trùng max-width của bubble
                >
                    {!isMe ? (<Box style={{ width: 40 }} />): ""}
                    <span className="ml-3 text-xs text-secondary-foreground">{time}</span>
                </Box>
            )}
        </Box>
    )
}