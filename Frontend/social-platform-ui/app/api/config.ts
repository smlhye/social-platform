export const API_BASE_URL = "http://localhost:5000/api/v1.0";

export const END_POINTS = {
    auth: {
        base: "/auth",
        signIn: "/auth/sign-in",
        signOut: "/auth/sign-out",
        getMe: "/auth/me"
    },
    chat: {
        base: "/chat",
        send: "/chat/send",
        conversation: (userA: string, userB: string) => `/chat/${userA}/${userB}`
    }
}