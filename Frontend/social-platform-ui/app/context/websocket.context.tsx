import { createContext, ReactNode, useContext, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

interface WebSocketContextType {
    socket: Socket | null;
}

const WebSocketContext = createContext<WebSocketContextType>({ socket: null });

export const WebSocketProvider = ({ children, userId }: { children: ReactNode, userId: string }) => {
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        if (!userId) return;
        const socket = io("http://localhost:5000", { query: { userId } });
        socketRef.current = socket;

        return () => {
            socket.disconnect();
        }

    }, [userId]);

    return (
        <WebSocketContext.Provider value={{ socket: socketRef.current }}>
            {children}
        </WebSocketContext.Provider>
    )
};

export const useWebSocket = () => useContext(WebSocketContext);