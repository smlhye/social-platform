import { Box, Tooltip } from "@mui/material";

interface SidebarItemProps {
    icon: React.ReactNode,
    iconActive: React.ReactNode,
    active?: boolean,
    onClick?: (e: React.MouseEvent<HTMLElement>) => void,
    label?: string
}

export default function SidebarItem({ icon, iconActive, active, onClick, label }: SidebarItemProps) {
    return (
        <Box
            width="var(--sidebar-length)"
            height="var(--sidebar-length)"
            onClick={onClick}
            className={`flex flex-col justify-center items-center rounded-md p-1 gap-0.5 cursor-pointer
                ${active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}

        >
            <div className="text-2xl">
                {active ? iconActive : icon}
            </div>
            {/* <p className="text-xs">{label}</p> */}
        </Box>
    )
}