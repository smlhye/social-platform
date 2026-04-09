"use client";
import { Box, Badge } from "@mui/material";
import { sidebarItems, SidebarItemType } from "./sidebarItems";
import SidebarItem from "./SidebarItem";
import { AvatarUI } from "../../common/Avatar";
import { NestedMenuItem, subMenuItems } from "../../common/Menu/NestedMenu/submenuItems";
import { MENU_ACTIONS, NestedMenu } from "../../common/Menu/NestedMenu";
import { useI18n } from "@/app/lib/i18nContext";
import { Locale } from "@/app/lib/i18n";
import { SettingsDialog } from "../../common/Dialog/SettingsDialog";
import { usePathname, useRouter } from "next/navigation";
import { useSignOut } from "@/app/hooks/useAuth";
import { FullScreenLoading } from "../../common/Loading";
import { useCurrentUser } from "@/app/hooks/useAuth";
import { useEffect, useState } from "react";
import { useToast } from "../../common/Toast/ToastContext";
import { useNotifications } from "@/app/hooks/chat/useNotification";
import { AccountDialog } from "../../common/Dialog/AccountDialog";

export default function Sidebar() {
    const router = useRouter();
    const pathname = usePathname();
    const { setLocale } = useI18n();
    const { mutate, isPending } = useSignOut();
    const { data: me } = useCurrentUser();
    const currentUserId = me?.resData.id;

    // Toast
    const toast = useToast();

    // Realtime notifications
    const { notifications } = useNotifications(currentUserId);

    useEffect(() => {
        if (!notifications.length) return;

        const latest = notifications[0];

        switch (latest.type) {
            case "message":
                toast.info(`💬 ${latest.senderName}: ${latest.content}`);
                break;

            case "friend_request":
                toast.info(`👤 ${latest.senderName} đã gửi lời mời kết bạn`);
                break;

            case "friend_accepted":
                toast.success(`🎉 ${latest.senderName} đã chấp nhận lời mời`);
                break;

            default:
                toast.info(latest.content || "Thông báo mới");
        }
    }, [notifications.length]);

    const [activeId, setActiveId] = useState<string>("home");
    const [activeIdAction, setActiveIdAction] = useState<string | null>(null);
    const [menuStack, setMenuStack] = useState<{
        items: NestedMenuItem[];
        anchorEl: HTMLElement;
    }[]>([]);
    const [accForm, setAccForm] = useState(false);
    const [settings, setSettings] = useState(false);

    useEffect(() => {
        if (pathname === "/") setActiveId("home");
        else if (pathname.startsWith("/messages")) setActiveId("mes");
        else if (pathname.startsWith("/contact")) setActiveId("contact");
    }, [pathname]);

    const handlers: Record<string, (item: SidebarItemType, e: React.MouseEvent<HTMLElement>) => void> = {
        home: (item) => {
            setActiveId(item.id);
            router.push("/");
        },
        mes: (item) => {
            setActiveId(item.id);
            router.push("/messages");
        },
        contact: (item) => {
            setActiveId(item.id);
            router.push("/contact");
        },
        profile: (item) => {
            setActiveId(item.id);
            router.push("/profile");
        },
        setting: (item, e) => {
            setActiveIdAction(item.id);
            setMenuStack([{ items: subMenuItems, anchorEl: e.currentTarget }]);
        },
    };

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
            case MENU_ACTIONS.LOG_OUT:
                mutate(undefined, {
                    onSuccess: () => router.push("/sign-in"),
                    onError: () => console.log("Nothing"),
                });
                break;
        }
        setMenuStack([]);
        setActiveIdAction(null);
    };

    const notificationCount = notifications.length;

    return (
        <>
            {isPending && <FullScreenLoading />}
            <Box
                width="var(--sidebar-width)"
                height="100vh"
                className="flex flex-col items-center py-4 gap-3 bg-sidebar-bg"
            >
                <AvatarUI name="Hồ Đông Huy" />

                {/* Notification icon với badge */}
                <Box className="relative cursor-pointer mt-2">
                    <Badge badgeContent={notificationCount} color="error">
                        <img src="/icons/bell.svg" alt="notification" width={24} height={24} />
                    </Badge>
                </Box>

                <Box className="mt-2 flex flex-col">
                    {sidebarItems.map((item) => (
                        <SidebarItem
                            key={item.id}
                            icon={item.icon}
                            active={
                                (item.type === "nav" && activeId === item.id) ||
                                (item.type === "action" && activeIdAction === item.id)
                            }
                            label={item.label}
                            onClick={(e) => handleClickItem(item, e)}
                            isDivider={item.isDivider}
                        />
                    ))}
                </Box>

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
                                if (!items || !anchor) return prev.slice(0, index + 1);
                                return [...prev.slice(0, index + 1), { items, anchorEl: anchor }];
                            });
                        }}
                    />
                ))}

                <AccountDialog open={accForm} onClose={() => setAccForm(false)} user={null} />
                <SettingsDialog open={settings} onClose={() => setSettings(false)} />
            </Box>
        </>
    );
}