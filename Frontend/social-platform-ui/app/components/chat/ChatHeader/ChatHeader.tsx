import { Box, IconButton, Stack } from "@mui/material";
import { AvatarUI } from "../../common/Avatar";
import { IoCallOutline } from "react-icons/io5";
import { IoVideocamOutline } from "react-icons/io5";
import { IoIosMore } from "react-icons/io";
import { BsLayoutSidebarReverse } from "react-icons/bs";

interface ChatHeaderProps {
    id: string,
    name: string,
    avatar?: string,
    active: boolean,
    onToggle: () => void
}

export default function ChatHeader({ id, name, avatar, active, onToggle }: ChatHeaderProps) {
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
            <Stack direction="row" className="gap-1">
                <IconButton>
                    <IoCallOutline />
                </IconButton>
                <IconButton>
                    <IoVideocamOutline />
                </IconButton>
                <IconButton>
                    <IoIosMore />
                </IconButton>
                <IconButton onClick={onToggle}>
                    <BsLayoutSidebarReverse />
                </IconButton>
            </Stack>
        </Box>
    )
}