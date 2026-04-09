// socketContext.tsx
"use client";

import { createContext, useContext, useEffect, useRef, ReactNode } from "react";
import { io, Socket } from "socket.io-client";

interface SocketContextType {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextType>({ socket: null });

export const SocketProvider = ({ children, userId }: { children: ReactNode; userId: string }) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!userId) return;

    const socket = io("http://localhost:5000", { query: { userId } });
    socketRef.current = socket;

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  return (
    <SocketContext.Provider value={{ socket: socketRef.current }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);