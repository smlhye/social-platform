import { Box, IconButton, Stack } from "@mui/material";
import { AvatarUI } from "../../common/Avatar";
import { IoIosCall } from "react-icons/io";
import { IoIosVideocam } from "react-icons/io";
import { IoIosMore } from "react-icons/io";

interface ChatHeaderProps {
    id: string,
    name: string,
    avatar?: string,
    active: boolean
}

export default function ChatHeader({ id, name, avatar, active }: ChatHeaderProps) {
    return (
        <Box className="w-full p-3 flex justify-between">
            <Stack direction="row" className="flex items-center gap-2">
                <AvatarUI name={avatar ? avatar : name} />
                <Stack direction="column">
                    <p className={`flex-1 min-w-0 truncate text-base font-semibold`}>
                        {name}
                    </p>
                    <p className={`flex-1 min-w-0 truncate text-xs`}>
                        Đang hoạt động
                    </p>
                </Stack>
            </Stack>
            <Stack direction="row">
                <IconButton>
                    <IoIosCall />
                </IconButton>
                <IconButton>
                    <IoIosVideocam />
                </IconButton>
                <IconButton>
                    <IoIosMore />
                </IconButton>
            </Stack>
        </Box>
    )
}