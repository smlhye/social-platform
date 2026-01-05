export const MENU_ACTIONS = {
    OPEN_ACCOUNT: "OPEN_ACCOUNT",
    SETTINGS: "SETTINGS",
    CHANGE_LANG: "CHANGE_LANG",
    LOG_OUT: "LOG_OUT"
} as const;

export type MenuAction = typeof MENU_ACTIONS[keyof typeof MENU_ACTIONS];