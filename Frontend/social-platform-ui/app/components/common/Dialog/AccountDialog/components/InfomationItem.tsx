import { FormInput } from "@/app/components/chat/ChatInput";
import { Box } from "@mui/material";

interface InfomationItemProps {
    title: string,
    children: React.ReactNode
}

export default function InformationItem({ title, children }: InfomationItemProps) {
    return (
        <Box className="w-full min-h-[35px] flex items-center">
            <span className="flex-1">{title}</span>
            <Box className="w-[70%] shrink-0 flex gap-2">
                {children}
            </Box>
        </Box>
    )
}