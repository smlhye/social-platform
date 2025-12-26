"use client";
import { useEffect, useState } from "react";

export type Theme = "light" | "dark" | "system";

export function useTheme(initial: Theme = "system") {
    const [theme, setTheme] = useState<Theme>(() => {

        if (typeof window !== "undefined") {
            return (localStorage.getItem("theme") as Theme) || initial;
        }
        return initial;
    });


    useEffect(() => {
        const root = document.documentElement;
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

        if (theme === "light") root.classList.remove("dark");
        else if (theme === "dark") root.classList.add("dark");
        else prefersDark ? root.classList.add("dark") : root.classList.remove("dark");

        localStorage.setItem("theme", theme);
    }, [theme]);

    return { theme, setTheme };
}