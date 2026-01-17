import { Box, Dialog, DialogContent } from "@mui/material";
import SettingsSidebar, { SidebarItem } from "./SettingsSideBar";
import { useState } from "react";
import SettingsArea from "./SettingsArea";

const sidebarItems: SidebarItem[] = [
    { id: "settings", label: "Cài đặt chung" },
    { id: "authentication", label: "Bảo mật" }
]

interface SettingsDialogProps {
    open: boolean,
    onClose: () => void
}

export default function SettingsDialog({ open, onClose }: SettingsDialogProps) {
    const [active, setActive] = useState<string>("settings");

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth
            PaperProps={{
                sx: {
                    height: "90vh",
                    maxHeight: "90vh",
                }
            }}>
            <DialogContent sx={{ padding: 1, height: '100%' }}>
                <Box className="flex w-full h-full">
                    {/* Desktop */}
                    <Box className="hidden md:flex md:w-50 flex-col gap-2 p-2">
                        <SettingsSidebar items={sidebarItems} selectedId={active || ""} onSelect={setActive} />
                    </Box>

                    {/* Content */}
                    <Box className="flex-1 p-2 md:w-95">
                        {/* Mobile */}
                        {active === null ? (
                            <Box className="flex flex-col gap-2 md:hidden">
                                <SettingsSidebar items={sidebarItems} selectedId={""} onSelect={setActive} />
                            </Box>
                        ) : (
                            <SettingsArea activeId={active} />
                        )}

                        {/* Desktop */}
                        <Box className="hidden md:block">
                            <SettingsArea activeId={active || "settings"} />
                        </Box>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    )
}