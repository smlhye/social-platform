"use client";
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
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        if (!currentUserId) return;

        const socket = io("http://localhost:5000", {
            query: { userId: currentUserId }
        });

        socketRef.current = socket;

        const handleNotification = (notification: Notification) => {
            setNotifications(prev => [notification, ...prev]);
        };

        socket.on("notification", handleNotification);

        return () => {
            socket.off("notification", handleNotification);
            socket.disconnect();
        };
    }, [currentUserId]);

    return { notifications };
}