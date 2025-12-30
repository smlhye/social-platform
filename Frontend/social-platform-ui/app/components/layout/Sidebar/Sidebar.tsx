import { Box } from "@mui/material";
import { sidebarItems } from "./sidebarItems";
import SidebarItem from "./SidebarItem";

export default function Sidebar() {
    return (
        <Box
            width="var(--sidebar-width)"
            height="100vh"
            className="bg-gray-200 flex flex-col items-center py-3 gap-3"
        >
            {sidebarItems.map((item) => (
                <SidebarItem
                    key={item.id}
                    icon={item.icon}
                    active={true}
                    label={item.label}
                />
            ))}
        </Box>
    )
}