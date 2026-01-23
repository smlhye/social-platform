import { Badge, Box, Stack, Typography } from "@mui/material"
import { AvatarUI } from "../../common/Avatar";

interface FriendLabelProps {
    avatar?: string,
    name: string,
    lastMes: string,
    time: string,
    read: boolean,
    active?: boolean,
    onClick: () => void
}

export default function FriendLabel({ avatar, name, lastMes, time, read, active, onClick }: FriendLabelProps) {

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
            <AvatarUI
                avatar={avatar}
                name={name}
            />
            <Stack direction="column" className="flex-1 min-w-0" spacing={1}>
                <Box width="100%" display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" gap={1.5}>
                    <p className={`flex-1 min-w-0 truncate text-sm ${!read ? "font-semibold" : "font-normal"}`}>
                        {name}
                    </p>
                    <p className={`shrink-0 whitespace-nowrap text-xs text-secondary-foreground ${!read ? "font-semibold" : "font-normal"}`}>
                        {time}
                    </p>
                </Box>
                <Box width="100%" display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" gap={1.5} paddingRight={1.5}>
                    <p className={`truncate text-sm pr-2 ${!read ? "text-secondary-foreground" : "text-accent-foreground"}`}>
                        {lastMes}</p>
                    {!read && (
                        <Badge
                            badgeContent={"99+"} className=""
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

