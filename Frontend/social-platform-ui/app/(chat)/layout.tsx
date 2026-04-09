"use client"
import { Sidebar } from "../components/layout/Sidebar";
import { useCurrentUser } from "../hooks/useAuth";
import { WebSocketProvider } from "../context/websocket.context";
import { useNotificationSocket } from "../hooks/useNotificationSocket";

export default function ChatLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const { data: me } = useCurrentUser();
    const userId = me?.resData.id ?? "";

    useNotificationSocket(userId);

    return (
        <WebSocketProvider userId={userId}>
            <div className="flex h-full overflow-hidden">
                <Sidebar />
                <div className="flex-1 overflow-hidden">
                    {children}
                </div>
            </div>
        </WebSocketProvider>
    );
}