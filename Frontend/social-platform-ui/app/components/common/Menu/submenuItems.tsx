import { FaRegUser } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineLanguage } from "react-icons/md";
import { MENU_ACTIONS } from "./menuAction";

export interface NestedMenuItem {
    id: string,
    labelKey: string,
    icon?: React.ReactNode,
    action?: string,
    payload?: string,
    children?: NestedMenuItem[]
}

export const subMenuItems: NestedMenuItem[] = [
    {
        id: "account",
        labelKey: "accountInfo",
        icon: <FaRegUser />,
        action: MENU_ACTIONS.OPEN_ACCOUNT,
    },
    {
        id: "settings",
        labelKey: "settings",
        icon: <IoSettingsOutline />,
        action: MENU_ACTIONS.SETTINGS,
    },
    {
        id: "languages",
        labelKey: "languages",
        icon: <MdOutlineLanguage />,
        children: [
            {
                id: "vnlang",
                labelKey: "vietnamese",
                action: MENU_ACTIONS.CHANGE_LANG,
                payload: "vi"
            },
            {
                id: "enlang",
                labelKey: "english",
                action: MENU_ACTIONS.CHANGE_LANG,
                payload: "en"
            },
            {
                id: "jalang",
                labelKey: "japanese",
                action: MENU_ACTIONS.CHANGE_LANG,
                payload: "ja"
            },
            {
                id: "cnlang",
                labelKey: "chinese",
                action: MENU_ACTIONS.CHANGE_LANG,
                payload: "cn"
            }
        ]
    },
    {
        id: "logout",
        labelKey: "logout",
        children: [
            {
                id: "vnlang",
                labelKey: "vietnamese",
                children: [
                    {
                        id: "vnlang",
                        labelKey: "vietnamese",
                        action: MENU_ACTIONS.CHANGE_LANG,
                    },
                    {
                        id: "enlang",
                        labelKey: "english",
                        action: MENU_ACTIONS.CHANGE_LANG,
                    },
                    {
                        id: "jalang",
                        labelKey: "japanese",
                        action: MENU_ACTIONS.CHANGE_LANG,
                    },
                    {
                        id: "cnlang",
                        labelKey: "chinese",
                        action: MENU_ACTIONS.CHANGE_LANG,
                    }
                ]
            },
            {
                id: "enlang",
                labelKey: "english",
                action: MENU_ACTIONS.CHANGE_LANG,
            }
        ]
    }
]