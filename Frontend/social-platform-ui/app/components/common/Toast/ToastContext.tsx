"use client";
import { createContext, useContext, useState } from "react";
import { Toast } from "./toast.type";
import ToastContainer from "./CustomToast";

interface ToastContextValue {
    success: (msg: string) => void;
    error: (msg: string) => void;
    info: (msg: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const show = (toast: Omit<Toast, "id">) => {
        const id = crypto.randomUUID();
        setToasts((prev) => [...prev, { ...toast, id }]);

        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, toast.duration ?? 3000);
    };

    return (
        <ToastContext.Provider
            value={{
                success: (msg) =>
                    show({ message: msg, severity: "success" }),
                error: (msg) =>
                    show({ message: msg, severity: "error" }),
                info: (msg) =>
                    show({ message: msg, severity: "info" }),
            }}
        >
            {children}
            <ToastContainer toasts={toasts} />
        </ToastContext.Provider>
    );
}

export const useToast = () => {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error("useToast must be used inside ToastProvider");
    return ctx;
};
