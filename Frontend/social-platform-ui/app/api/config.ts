export const API_BASE_URL = "http://localhost:5000/api/v1.0";

export const END_POINTS = {
    auth: {
        base: "/auth",
        signIn: "/auth/sign-in",
        signUp: "/users",
        signOut: "/auth/sign-out",
        getMe: "/auth/me",
        forgotPassword: "/auth/forgot-password",
        resetPassword: "/auth/reset-password"
    },
    chat: {
        base: "/chat",
        send: "/chat/send",
        conversation: (userA: string, userB: string) => `/chat/${userA}/${userB}`,
        recent: "/chat/recent",
        unread: "/chat/unread"
    },
    friendship: {
        base: "/friendship",
        requester: "/friendship/requester"
    },
    user: {
        base: "/users",
        suggestion: "/users/suggestion"
    }
}