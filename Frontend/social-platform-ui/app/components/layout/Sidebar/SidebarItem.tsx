import { Box, Tooltip } from "@mui/material";

interface SidebarItemProps {
    icon: React.ReactNode,
    active?: boolean,
    onClick?: (e: React.MouseEvent<HTMLElement>) => void,
    label?: string,
    isDivider?: boolean
}

export default function SidebarItem({ icon, active, onClick, label, isDivider = false }: SidebarItemProps) {
    return (
        <Box className="w-full flex flex-col justify-center items-center mb-3">
            {isDivider && (
                <Box
                    className="w-[var(--sidebar-length)] h-[1.2px] mb-4 bg-muted-foreground"
                />
            )}
            <Box
                width="var(--sidebar-length)"
                height="var(--sidebar-length)"
                onClick={onClick}
                className={`flex flex-col justify-center items-center rounded-md gap-0.5 cursor-pointer
                ${active ? "bg-accent text-foreground" : "bg-transparent text-muted-foreground"}`}

            >
                <div className="text-2xl">
                    {icon}
                </div>
                {/* <p className="text-xs">{label}</p> */}
            </Box>
        </Box>
    )
}