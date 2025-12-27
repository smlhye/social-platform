import { Avatar, Badge, Box, Stack, Typography } from "@mui/material"

function stringToColor(string: string) {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
}

function stringToGradient(name: string) {
    const color1 = stringToColor(name);
    const color2 = stringToColor(name + "_gradient");
    return `linear-gradient(135deg, ${color1}, ${color2})`;
}


function stringAvatar(name: string) {
    return {
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        gradient: stringToGradient(name),
    };
}

interface FriendLabelProps {
    avatar?: string,
    name: string,
    lastMes: string,
    time: string,
    read: boolean
}

export default function FriendLabel({ avatar, name, lastMes, time, read }: FriendLabelProps) {

    const avatarData = !avatar ? stringAvatar(name) : null

    return (
        <Box
            width="100%"
            padding={1.5}
            display="flex"
            flexDirection="row"
            alignItems="center"
            gap={1.5}
            className="bg-inherit hover:bg-gray-100 cursor-pointer rounded-sm">
            <Avatar
                src={avatar ?? undefined}
                sx={{
                    width: 48,
                    height: 48,
                    background: avatarData?.gradient,
                }}
            >
                {!avatar && avatarData?.children}
            </Avatar>
            <Stack direction="column" className="flex-1 min-w-0" spacing={1}>
                <Box width="100%" display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" gap={1.5}>
                    <p className={`flex-1 min-w-0 truncate ${!read ? "font-semibold" : "font-normal"}`}>
                        {name}
                    </p>
                    <p className={`shrink-0 whitespace-nowrap text-xs text-gray-500 ${!read ? "font-semibold" : "font-normal"}`}>
                        {time}
                    </p>
                </Box>
                <Box width="100%" display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" gap={1.5} paddingRight={1.5}>
                    <p className={`truncate ${!read ? "text-black" : "text-gray-500 "}`}>
                        {lastMes}</p>
                    {!read && (
                        <Badge badgeContent={4} color="error" />
                    )}
                </Box>
            </Stack>
        </Box>
    )
}

