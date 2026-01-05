import { GoHome } from "react-icons/go";
import { GoHomeFill } from "react-icons/go";
import { AiOutlineMessage } from "react-icons/ai";
import { AiFillMessage } from "react-icons/ai";
import { RiContactsBook3Line } from "react-icons/ri";
import { RiContactsBook3Fill } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";

export interface SidebarItemType {
    id: string,
    icon: React.ReactNode,
    iconActive: React.ReactNode,
    type: "nav" | "action",
    href?: string,
    onClick?: () => void,
    label: string
}

export const sidebarItems: SidebarItemType[] = [
    {
        id: "home",
        icon: <GoHome />,
        iconActive: <GoHomeFill />,
        type: "nav",
        href: "/",
        label: "Home"
    },
    {
        id: "mes",
        icon: <AiOutlineMessage />,
        iconActive: <AiFillMessage />,
        type: "nav",
        href: "/mes",
        label: "Message"
    },
    {
        id: "contact",
        icon: <RiContactsBook3Line />,
        iconActive: <RiContactsBook3Fill />,
        type: "nav",
        href: "/contact",
        label: "Contacts"
    },
    {
        id: "setting",
        icon: <IoSettingsOutline />,
        iconActive: <IoSettingsSharp />,
        type: "action",
        onClick: () => alert("Xin chào"),
        label: "Settings"
    }
]