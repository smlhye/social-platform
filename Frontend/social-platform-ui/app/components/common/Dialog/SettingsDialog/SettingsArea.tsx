
import { Authentication } from "./sections/Authentication"
import Notification from "./sections/Notification"
import Settings from "./sections/Settings"
import Theme from "./sections/Theme"

interface SettingsAreaProps {
    activeId: string
}

export default function SettingsArea({ activeId }: SettingsAreaProps) {
    switch (activeId) {
        case "settings":
            return <Settings />
        case "authentication":
            return <Authentication />
        case "theme":
            return <Theme />
        case "notification":
            return <Notification />
    }
}