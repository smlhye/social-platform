import { Box, Tooltip } from "@mui/material";

interface SidebarItemProps {
    icon: React.ReactNode,
    active?: boolean,
    onClick?: () => void,
    label?: string
}

export default function SidebarItem({ icon, active, onClick, label }: SidebarItemProps) {
    return (
        <Box
            width="var(--sidebar-length)"
            height="var(--sidebar-length)"
            onClick={onClick}
            bgcolor={"red"}
            className="flex flex-col justify-center items-center rounded-md p-1 gap-0.5"
        >
            {icon}
            <p className="text-xs">{label}</p>
        </Box>
    )
}