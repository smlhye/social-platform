import { Box, List, ListItem, ListItemButton, ListItemText } from "@mui/material"
import { BiBox } from "react-icons/bi"

export interface SidebarItem {
    id: string,
    label: string,
}

interface SettingsSidebarProps {
    items: SidebarItem[],
    selectedId: string,
    onSelect: (id: string) => void
}

export default function SettingsSidebar({ items, selectedId, onSelect }: SettingsSidebarProps) {
    return (
        <Box className="flex flex-col gap-1.5">
            {items.map((item) => (
                <Box
                    className={`rounded-md p-2 cursor-pointer ${item.id === selectedId ? "bg-primary" : "bg-muted"}`}
                    key={item.id}
                    onClick={() => onSelect(item.id)}>
                    
                    {item.label}
                </Box>
            ))}
        </Box>
    )
}