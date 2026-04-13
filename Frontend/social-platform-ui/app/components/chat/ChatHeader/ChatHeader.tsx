import { Box, IconButton, Stack } from "@mui/material";
import { AvatarUI } from "../../common/Avatar";
import { IoCallOutline } from "react-icons/io5";
import { IoVideocamOutline } from "react-icons/io5";
import { IoIosMore } from "react-icons/io";
import { BsLayoutSidebarReverse } from "react-icons/bs";
import { useI18n } from "@/app/lib/i18nContext";

interface ChatHeaderProps {
    id: string;
    name: string;
    avatar?: string;
    active: boolean;
    lastSeen?: string | null; // 🔥 thêm
    onToggle: () => void;
}

function formatLastSeen(lastSeen?: string | null) {
    if (!lastSeen) return "";

    const diff = Date.now() - new Date(lastSeen).getTime();

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Vừa xong";
    if (minutes < 60) return `${minutes} phút trước`;
    if (hours < 24) return `${hours} giờ trước`;
    return `${days} ngày trước`;
}

export default function ChatHeader({ id, name, avatar, active, lastSeen, onToggle }: ChatHeaderProps) {

    const { t } = useI18n();

    return (
        <Box className="w-full p-3 flex justify-between">
            <Stack direction="row" className="flex items-center gap-2">
                <AvatarUI name={avatar ? avatar : name} />
                <Stack direction="column">
                    <p className={`flex-1 min-w-0 truncate text-base font-semibold`}>
                        {name}
                    </p>
                    <p className="text-xs flex items-center gap-1">
                        {active ? (
                            <>
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                {t("chat.online")}
                            </>
                        ) : (
                            lastSeen && (
                                <>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                                    Offline • {formatLastSeen(lastSeen)}
                                </>
                            )
                        )}
                    </p>
                </Stack>
            </Stack>
            <Stack direction="row" className="gap-1">
                <IconButton>
                    <IoCallOutline className="text-foreground" />
                </IconButton>
                <IconButton>
                    <IoVideocamOutline className="text-foreground" />
                </IconButton>
                <IconButton>
                    <IoIosMore className="text-foreground" />
                </IconButton>
                <IconButton onClick={onToggle}>
                    <BsLayoutSidebarReverse className="text-foreground" />
                </IconButton>
            </Stack>
        </Box>
    )
}