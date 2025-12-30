import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import ChatIcon from '@mui/icons-material/Chat';
import ContactsIcon from '@mui/icons-material/Contacts';
import SettingsIcon from '@mui/icons-material/Settings';

interface SidebarItemType {
    id: string,
    icon: React.ReactNode,
    type: "nav" | "action",
    href?: string,
    onClick?: () => void,
    label: string
}

export const sidebarItems: SidebarItemType[] = [
    {
        id: "home",
        icon: <HomeFilledIcon />,
        type: "nav",
        href: "",
        label: "Home"
    },
    {
        id: "mes",
        icon: <ChatIcon />,
        type: "nav",
        href: "/mes",
        label: "Message"
    },
    {
        id: "contact",
        icon: <ContactsIcon />,
        type: "nav",
        href: "/contact",
        label: "Contacts"
    },
    {
        id: "setting",
        icon: <SettingsIcon />,
        type: "action",
        onClick: () => alert("Xin chào"),
        label: "Settings"
    }
]