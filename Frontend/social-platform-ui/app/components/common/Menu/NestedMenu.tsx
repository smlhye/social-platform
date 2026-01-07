import { Box, Paper, Stack, Popover, ClickAwayListener } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { NestedMenuItem } from "./submenuItems";
import { useState } from "react";
import { useI18n } from "@/app/lib/i18nContext";

interface NestedMenuProps {
    anchorEl: HTMLElement | null;
    open: boolean;
    items: NestedMenuItem[];
    onClose: () => void;
    onItemClick: (item: NestedMenuItem) => void;
    onOpenSubMenu?: (
        items: NestedMenuItem[] | null,
        anchor: HTMLElement | null
    ) => void;
}

export default function NestedMenu({
    anchorEl,
    open,
    items,
    onClose,
    onItemClick,
    onOpenSubMenu,
}: NestedMenuProps) {
    const [activeId, setActiveId] = useState<string | null>(null);
    const { t } = useI18n();

    return (
        <ClickAwayListener onClickAway={onClose}>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={onClose}
                disableAutoFocus
                disableEnforceFocus
                disableRestoreFocus
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                sx={{
                    pointerEvents: "none",
                }}
                PaperProps={{
                    className:
                        "w-[280px] !shadow-md border border-gray-300 !rounded-xl p-2 ml-1.5 pointer-events-auto",
                }}
            >
                {items.map((item) => {
                    const label = t("chat." + item.labelKey);
                    return (
                        <Box key={item.id}
                            className={`p-2 rounded-md flex justify-between items-center cursor-pointer ${activeId === item.id ? "bg-muted" : ""
                                }`}
                            onMouseEnter={(e) => {
                                setActiveId(item.id);
                                if (item.children) {
                                    onOpenSubMenu?.(item.children, e.currentTarget);
                                } else {
                                    onOpenSubMenu?.(null, null);
                                }
                            }}
                            onMouseLeave={() => {
                                if (!item.children) {
                                    onOpenSubMenu?.(null, null);
                                    setActiveId(null);
                                }
                            }}
                            onClick={() => {
                                if (!item.children) {
                                    onItemClick(item);
                                    // onClose();
                                }
                            }}
                        >
                            <Stack direction="row" gap={1} alignItems="center">
                                <Box width={20} className="flex items-center">{item.icon}</Box>
                                <span>{label}</span>
                            </Stack>
                            {item.children && <KeyboardArrowRightIcon />}
                        </Box>
                    )
                })}
            </Popover>
        </ClickAwayListener>
    );
}

