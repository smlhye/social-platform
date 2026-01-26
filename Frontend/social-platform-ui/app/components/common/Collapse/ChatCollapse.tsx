import { Box, IconButton } from "@mui/material";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { ButtonIcon } from "../Button";
import { useI18n } from "@/app/lib/i18nContext";

interface ChatCollapseProps {
    icon?: React.ReactNode,
    title: string,
    children: React.ReactNode,
    defaultOpen: boolean
}

export default function ChatCollapse({ icon, title, children, defaultOpen = false }: ChatCollapseProps) {
    const [open, setOpen] = useState(defaultOpen);
    const { t } = useI18n();

    return (
        <Box className="w-full px-2 py-1">
            <Box
                onClick={() => setOpen(!open)}
                className="flex justify-between items-center cursor-pointer py-2">
                <span className="flex items-center gap-1 font-semibold">
                    {icon}
                    {title}
                </span>
                <IoIosArrowForward
                    className={`h-5 w-5 transition-transform duration-300 ${open ? "rotate-90" : ""}`}
                />

            </Box>
            <Box
                className={`overflow-hidden transition-all duration-300 ease-in-out 
                    ${open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
            >
                <Box className="text-sm text-gray-600">
                    {children}
                    <ButtonIcon className="w-full rounded-sm justify-center !text-base mt-2 
                        bg-sub-background text-sub-foreground hover:text-sub-foreground">
                        {t("chat.viewAll")}
                    </ButtonIcon>
                </Box>
            </Box>
        </Box>
    )
}