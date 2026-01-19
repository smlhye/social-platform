import { Box, Dialog, DialogContent, IconButton } from "@mui/material";
import SettingsSidebar, { SidebarItem } from "./SettingsSideBar";
import { useState } from "react";
import SettingsArea from "./SettingsArea";
import { IoClose } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { GrShieldSecurity } from "react-icons/gr";
import { LuPaintbrush } from "react-icons/lu";
import { FaRegBell } from "react-icons/fa";

const sidebarItems: SidebarItem[] = [
    { id: "settings", label: "Cài đặt chung", icon: <IoSettingsOutline /> },
    { id: "authentication", label: "Bảo mật", icon: <GrShieldSecurity /> },
    { id: "theme", label: "Giao diện", icon: <LuPaintbrush /> },
    { id: "notification", label: "Thông báo", icon: <FaRegBell /> },
]

interface SettingsDialogProps {
    open: boolean,
    onClose: () => void
}

export default function SettingsDialog({ open, onClose }: SettingsDialogProps) {
    const [active, setActive] = useState<string>("settings");

    return (
        <Dialog open={open} onClose={onClose} maxWidth={false}
            PaperProps={{
                sx: {
                    width: "880px",
                    height: "90vh",
                    maxHeight: "90vh",
                }
            }}>
            <DialogContent sx={{ padding: 0, height: '100%' }}>
                <Box className="flex w-full h-full">
                    {/* Desktop */}
                    <Box className="flex-col gap-2 p-2 bg-sub-background text-sub-foreground">
                        <SettingsSidebar items={sidebarItems} selectedId={active || ""} onSelect={setActive} />
                    </Box>

                    {/* Content */}
                    <Box className="bg-background text-foreground flex-1 p-3">
                        <Box className="flex justify-end">
                            <IconButton onClick={onClose}>
                                <IoClose className="text-foreground" />
                            </IconButton>
                        </Box>
                        <SettingsArea activeId={active || "settings"} />
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    )
}