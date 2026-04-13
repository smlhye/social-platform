import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useToast } from "../components/common/Toast/ToastContext";
import { useWebSocket } from "../context/websocket.context";

export function useNotificationSocket(userId?: string) {
    const toast = useToast();

    const { socket } = useWebSocket();

    useEffect(() => {
        if (!socket) return;

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

    }, [socket, toast])
}