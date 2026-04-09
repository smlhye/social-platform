import { Badge, Box, Stack, Typography } from "@mui/material"
import { AvatarUI } from "../../common/Avatar";
import { formatTimeAgo } from "@/app/util/formatTimeAgo";

interface FriendLabelProps {
    avatar?: string,
    name: string,
    lastMes?: string,
    time?: string,
    read: boolean,
    unreadCount: number,
    active?: boolean,
    isOnline?: boolean,
    onClick?: () => void
}

export default function FriendLabel({ avatar, name, lastMes, time, read, unreadCount, active, isOnline, onClick }: FriendLabelProps) {

    return (
        <Box
            onClick={onClick}
            width="100%"
            padding={1.5}
            display="flex"
            flexDirection="row"
            alignItems="center"
            gap={1.5}
            className={`
                cursor-pointer rounded-md shadow-float
                ${active ? "bg-accent" : "bg-background hover:bg-muted"}
            `}>
            <Box position="relative">
                <AvatarUI
                    avatar={avatar}
                    name={name}
                />

                {isOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                )}
            </Box>
            <Stack direction="column" className="flex-1 min-w-0" spacing={1}>
                <Box width="100%" display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" gap={1.5}>
                    <p className={`flex-1 min-w-0 truncate text-sm ${!read ? "font-bold" : "font-semibold"}`}>
                        {name}
                    </p>
                    <p className={`shrink-0 whitespace-nowrap text-xs text-secondary-foreground font-semibold`}>
                        {formatTimeAgo(time ?? "")}
                    </p>
                </Box>
                <Box width="100%" display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" gap={1.5} paddingRight={1.5}>
                    <p className={`truncate text-sm pr-2 ${!read ? "text-secondary-foreground font-semibold" : "text-accent-foreground"}`}>
                        {lastMes}</p>
                    {!read && (
                        <Badge
                            badgeContent={unreadCount && unreadCount > 99 ? "99+" : unreadCount} className=""
                            sx={{
                                "& .MuiBadge-badge": {
                                    backgroundColor: "var(--color-chat-warning)",
                                    color: "#fff",
                                },
                            }}
                        />
                    )}
                </Box>
            </Stack>
        </Box>
    )
}

