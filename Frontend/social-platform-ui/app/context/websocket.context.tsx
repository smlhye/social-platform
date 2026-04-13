"use client";

import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { io, Socket } from "socket.io-client";

interface WebSocketContextType {
    socket: Socket | null;
}

const WebSocketContext = createContext<WebSocketContextType>({
    socket: null,
});

export const WebSocketProvider = ({
    children,
    userId,
}: {
    children: ReactNode;
    userId: string;
}) => {
    const socketRef = useRef<Socket | null>(null);
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        if (!userId) return;

        // 🔥 chỉ tạo 1 lần duy nhất
        if (!socketRef.current) {
            const s = io("http://localhost:5000", {
                query: { userId },
                transports: ["websocket"],
            });

            socketRef.current = s;
            setSocket(s);

            console.log("🧠 INIT SOCKET ONCE:", userId);

            // debug
            s.on("connect", () => {
                console.log("🟢 SOCKET CONNECT:", s.id);
            });

            s.on("disconnect", (reason) => {
                console.log("🔴 SOCKET DISCONNECT:", reason);
            });
        }

        // ❌ KHÔNG disconnect ở đây nữa
    }, [userId]);

    return (
        <WebSocketContext.Provider value={{ socket }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => useContext(WebSocketContext);