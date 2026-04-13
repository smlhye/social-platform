"use client";
import { useWebSocket } from "@/app/context/websocket.context";
import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";

export interface Notification {
    id: string;
    senderId?: string;
    senderName?: string;
    receiverId: string;
    type: "message" | "friend_request" | "friend_accepted";
    content?: string;
    createdAt: string;
}

export function useNotifications(currentUserId: string | undefined) {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const { socket } = useWebSocket();

    useEffect(() => {
        if (!socket) return;

        const handleNotification = (notification: Notification) => {
            setNotifications(prev => [notification, ...prev]);
        };

        socket.off("notification", handleNotification);
        socket.on("notification", handleNotification);

        return () => {
            socket.off("notification", handleNotification);
        };
    }, [socket, currentUserId]);

    return { notifications };
}