"use client"
import React, { useState } from "react";
import { DropdownMenu, DropdownMenuItem } from "../components/common/Menu/DropdownMenu";
import { GoSun } from "react-icons/go";
import { GoMoon } from "react-icons/go";

export default function AuthLayout({ children }: { children: React.ReactNode }) {

    const [theme, setTheme] = useState<"light" | "dark" | "system">("light")

    return (
        <div className="relative min-h-screen overflow-hidden">
            <img
                src="/otisadminbg.jpeg"
                alt="background"
                className="absolute inset-0 w-full h-full object-cover -z-10"
            />

            <div className="absolute inset-0 bg-black/20 dark:bg-black/80 -z-10" />

            <div className="relative flex items-center justify-center min-h-screen p-4">
                <div className="absolute top-6 w-[70%] mx-auto text-white flex justify-between items-center">
                    <span className="font-semibold">CHAT MESSAGE</span>
                    <div className="flex justify-between items-center gap-10 w-[15%]">
                        <DropdownMenu
                            trigger={<span className="text-base font-medium">Languages</span>}
                        >
                            <DropdownMenuItem
                                icon={<GoSun />}
                                title="Vietnamese"
                                onClick={() => setTheme("light")}
                            />

                            <DropdownMenuItem
                                icon={<GoMoon />}
                                title="English"
                                onClick={() => setTheme("dark")}
                            />

                            <DropdownMenuItem
                                icon="🖥"
                                title="Japanese"
                                onClick={() => setTheme("system")}
                            />

                            <DropdownMenuItem
                                icon={<GoMoon />}
                                title="Chinese"
                                onClick={() => setTheme("dark")}
                            />
                        </DropdownMenu>
                        <DropdownMenu
                            trigger={<span className="text-base font-medium">Theme</span>}
                        >
                            <DropdownMenuItem
                                icon={<GoSun />}
                                title="Light"
                                onClick={() => setTheme("light")}
                            />

                            <DropdownMenuItem
                                icon={<GoMoon />}
                                title="Dark"
                                onClick={() => setTheme("dark")}
                            />

                            <DropdownMenuItem
                                icon="🖥"
                                title="System"
                                onClick={() => setTheme("system")}
                            />
                        </DropdownMenu>
                    </div>
                </div>
                <div className="w-full max-w-md bg-white dark:bg-zinc-900/60 backdrop-blur-xl
                        border border-white/20 dark:border-white/10 rounded-xl p-8 space-y-6 shadow-2xl">
                    {children}
                </div>
            </div>
        </div>
    )
}