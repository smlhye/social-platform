import { MdOutlineDashboard } from "react-icons/md";
import { BiMessageSquareDetail } from "react-icons/bi";
import { LuUserRound } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { BiBarChartAlt2 } from "react-icons/bi";
import { MdPowerSettingsNew } from "react-icons/md";

export interface SidebarItemType {
    id: string,
    icon: React.ReactNode,
    type: "nav" | "action",
    href?: string,
    onClick?: () => void,
    label: string,
    isDivider?: boolean
}

export const sidebarItems: SidebarItemType[] = [
    {
        id: "home",
        icon: <MdOutlineDashboard />,
        type: "nav",
        href: "/",
        label: "Home",
        isDivider: true
    },
    {
        id: "mes",
        icon: <BiMessageSquareDetail />,
        type: "nav",
        href: "/mes",
        label: "Message"
    },
    {
        id: "contact",
        icon: <LuUserRound />,
        type: "nav",
        href: "/contact",
        label: "Contacts"
    },
    {
        id: "chart",
        icon: <BiBarChartAlt2 />,
        type: "nav",
        href: "/chart",
        label: "Chart",
        // isDivider: true
    },
    {
        id: "setting",
        icon: <IoSettingsOutline />,
        type: "action",
        onClick: () => alert("Xin chào"),
        label: "Settings",
        isDivider: true
    },
    // {
    //     id: "logout",
    //     icon: <MdPowerSettingsNew />,
    //     type: "action",
    //     onClick: () => alert("Xin chào"),
    //     label: "Logout"
    // },
]