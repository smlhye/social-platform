import { Box, Paper, Stack, Popover, ClickAwayListener } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { NestedMenuItem } from "./submenuItems";
import { useState } from "react";
import { useI18n } from "@/app/lib/i18nContext";
import { MENU_ACTIONS } from "./menuAction";
import { FaCheck } from "react-icons/fa6";

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
    const { t, locale } = useI18n();

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
                    pointerEvents: 'none'
                }}
                onWheel={(e) => e.stopPropagation()}
                PaperProps={{
                    style: { pointerEvents: 'auto' },
                    className: "w-[280px] !shadow-md border border-gray-300 !rounded-xl p-2",
                }}
            >

                {items.map((item) => {
                    const label = t("chat." + item.labelKey);

                    const isLangActive =
                        item.action === MENU_ACTIONS.CHANGE_LANG &&
                        item.payload === locale;

                    return (
                        <Box
                            key={item.id}
                            className={`
                                p-2 rounded-md flex justify-between items-center cursor-pointer
                                ${isLangActive ? "bg-primary/10 text-primary font-medium" : ""}
                                ${activeId === item.id && !isLangActive ? "bg-muted" : ""}
                            `}
                            onMouseEnter={(e) => {
                                setActiveId(item.id);
                                onOpenSubMenu?.(item.children || null, e.currentTarget);
                            }}
                            onMouseLeave={() => {
                                if (!item.children) {
                                    setActiveId(null);
                                    onOpenSubMenu?.(null, null);
                                }
                            }}
                            onClick={() => {
                                if (!item.children) onItemClick(item);
                            }}
                        >
                            <Stack direction="row" gap={1} alignItems="center">
                                <Box width={20} className="flex items-center">{item.icon}</Box>
                                <span>{label}</span>
                            </Stack>
                            {item.children && <KeyboardArrowRightIcon />}
                            {isLangActive && <span className="text-primary text-sm"><FaCheck /></span>}
                        </Box>
                    );
                })}

            </Popover>
        </ClickAwayListener>
    );
}

