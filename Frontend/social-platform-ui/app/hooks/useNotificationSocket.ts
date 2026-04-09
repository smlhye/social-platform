import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useToast } from "../components/common/Toast/ToastContext";

export function useNotificationSocket(userId?: string) {
    const socketRef = useRef<Socket | null>(null);
    const toast = useToast();

    useEffect(() => {
        if (!userId) return;

        if (!socketRef.current) {
            socketRef.current = io("http://localhost:5000", { query: { userId } })
        }

        const socket = socketRef.current;
        socket.emit("join", `user:${userId}`);

        const handleNotification = (notification: any) => {
            console.log("OK nha");
            switch (notification.type) {
                case "friend_request":
                    toast.info(notification.content);
                    break;
                case "friend_accepted":
                    toast.info(notification.content);
                    break;
                default: break;
            }
        };
        socket.off("notification", handleNotification);
        socket.on("notification", handleNotification);

        return () => {
            // ❗ KHÔNG disconnect ở đây
            socket.off("notification", handleNotification);
        };

    }, [userId])
}