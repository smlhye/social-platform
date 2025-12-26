import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background p-4">
            <div className="w-full max-w-md bg-card border border-border rounded-lg p-8 space-y-6">
                {children}
            </div>
        </div>
    )
}