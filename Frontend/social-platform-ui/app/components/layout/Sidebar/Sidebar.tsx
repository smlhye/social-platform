"use client"
import { Box } from "@mui/material";
import { sidebarItems, SidebarItemType } from "./sidebarItems";
import SidebarItem from "./SidebarItem";
import { AvatarUI } from "../../common/Avatar";
import Image from "next/image";
import { useState } from "react";
import NestedMenu from "../../common/Menu/NestedMenu";
import { NestedMenuItem, subMenuItems } from "../../common/Menu/submenuItems";
import { MENU_ACTIONS } from "../../common/Menu";
import { useI18n } from "@/app/lib/i18nContext";
import { Locale } from "@/app/lib/i18n";
import { AccountDialog } from "../../common/Dialog/AccountDialog";
import { SettingsDialog } from "../../common/Dialog/SettingsDialog";

export default function Sidebar() {

    const [activeId, setActiveId] = useState<string>("home");
    const [activeIdAction, setActiveIdAction] = useState<string | null>(null);
    const [menuStack, setMenuStack] = useState<{
        items: NestedMenuItem[];
        anchorEl: HTMLElement;
    }[]>([]);

    const { setLocale } = useI18n();

    const [accForm, setAccForm] = useState(false);
    const [settings, setSettings] = useState(false);

    const handlers: Record<string, (item: SidebarItemType, e: React.MouseEvent<HTMLElement>) => void> = {
        home: (item) => {
            setActiveId(item.id);
        },
        mes: (item) => {
            setActiveId(item.id);
        },
        contact: (item) => {
            setActiveId(item.id);
        },
        setting: (item, e) => {
            setActiveIdAction(item.id);
            setMenuStack([
                {
                    items: subMenuItems,
                    anchorEl: e.currentTarget,
                },
            ]);
        },
    }

    const handleClickItem = (item: SidebarItemType, e: React.MouseEvent<HTMLElement>) => {
        handlers[item.id]?.(item, e);
    };

    const handleMenuAction = (item: NestedMenuItem) => {
        switch (item.action) {
            case MENU_ACTIONS.OPEN_ACCOUNT:
                setAccForm(true);
                break;

            case MENU_ACTIONS.SETTINGS:
                setSettings(true);
                break;

            case MENU_ACTIONS.CHANGE_LANG:
                setLocale(item.payload as Locale);
                break;
        }
        setMenuStack([]);
        setActiveIdAction(null);
    };


    return (
        <Box
            width="var(--sidebar-width)"
            height="100vh"
            className="flex flex-col items-center py-3 gap-3 border-r border-gray-200 dark:border-gray-700"
        >
            <Image
                className="mb-3 cursor-pointer"
                src="/freepngimng.png"
                alt="Avatar"
                width={40}
                height={40} />
            <AvatarUI
                name="Hồ Đông Huy"
            />
            {sidebarItems.map((item) => (
                <SidebarItem
                    key={item.id}
                    icon={item.icon}
                    iconActive={item.iconActive}
                    active={(item.type === "nav" && activeId === item.id) ||  // nav active
                        (item.type === "action" && activeIdAction === item.id)}
                    label={item.label}
                    onClick={(e) => handleClickItem(item, e)}
                />
            ))}
            {menuStack.map((menu, index) => (
                <NestedMenu
                    key={index}
                    anchorEl={menu.anchorEl}
                    open
                    items={menu.items}
                    onClose={() => {
                        setMenuStack([]);
                        setActiveIdAction(null);
                    }}
                    onItemClick={handleMenuAction}
                    onOpenSubMenu={(items, anchor) => {
                        setMenuStack((prev) => {
                            if (!items || !anchor) {
                                return prev.slice(0, index + 1);
                            }
                            return [
                                ...prev.slice(0, index + 1),
                                { items, anchorEl: anchor },
                            ];
                        });
                    }}
                />
            ))}

            <AccountDialog />
            <SettingsDialog open={settings} onClose={() => { setSettings(false) }} />
        </Box>
    )
}