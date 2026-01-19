import { Box, List, ListItem, ListItemButton, ListItemText } from "@mui/material"
import { BiBox } from "react-icons/bi"

export interface SidebarItem {
    id: string,
    label: string,
    icon: React.ReactNode
}

interface SettingsSidebarProps {
    items: SidebarItem[],
    selectedId: string,
    onSelect: (id: string) => void
}

export default function SettingsSidebar({ items, selectedId, onSelect }: SettingsSidebarProps) {
    return (
        <Box className="flex flex-col gap-1.5 w-[200px]">
            <span className="py-2 pl-2 text-xl font-semibold">
                Cài đặt
            </span>
            {items.map((item) => (
                <Box
                    className={`flex items-center rounded-md p-2 gap-2 cursor-pointer ${item.id === selectedId ? "bg-primary" : "bg-muted"}`}
                    key={item.id}
                    onClick={() => onSelect(item.id)}>
                    {item.icon}
                    {item.label}
                </Box>
            ))}
        </Box>
    )
}