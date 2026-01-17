import Authentication from "./components/Authentication"
import Settings from "./components/Settings"
import Theme from "./components/Theme"

interface SettingsAreaProps {
    activeId: string
}

export default function SettingsArea({ activeId }: SettingsAreaProps) {
    switch (activeId) {
        case "settings":
            return <Settings />
        case "authentication":
            return <Theme />
    }
}