import { Box, Stack } from "@mui/material";
import { useState } from "react";

function ZaloThemeCard({
    label,
    mode,
    selected,
    onClick,
}: {
    label: string;
    mode: "light" | "dark" | "system";
    selected: boolean;
    onClick: () => void;
}) {
    const isDark = mode === "dark";

    return (
        <Box
            onClick={onClick}
            sx={{
                width: 120,
                borderRadius: 2,
                cursor: "pointer",
                border: "2px solid",
                borderColor: selected ? "#0068FF" : "divider",
                p: 1,
                transition: "all 0.2s",
                "&:hover": {
                    boxShadow: 2,
                },
            }}
        >
            {/* Fake UI */}
            <Box
                sx={{
                    height: 60,
                    borderRadius: 1.5,
                    bgcolor: isDark ? "#1e1e1e" : "#ffffff",
                    p: 0.75,
                    mb: 1,
                }}
            >
                <Box
                    sx={{
                        height: 8,
                        bgcolor: "#0068FF",
                        borderRadius: 1,
                        mb: 0.5,
                    }}
                />
                <Box
                    sx={{
                        height: 5,
                        bgcolor: isDark ? "#555" : "#ddd",
                        borderRadius: 1,
                        mb: 0.4,
                    }}
                />
                <Box
                    sx={{
                        height: 5,
                        bgcolor: isDark ? "#555" : "#ddd",
                        borderRadius: 1,
                        width: "70%",
                    }}
                />
            </Box>

            <Box className="text-center text-sm font-medium">
                {label}
            </Box>
        </Box>
    );
}

export default function Theme() {

    const [theme, setTheme] = useState<"light" | "dark" | "system">("light");
    return (

        <Stack direction="row" spacing={3}>
            <ZaloThemeCard
                label="Sáng"
                mode="light"
                selected={theme === "light"}
                onClick={() => setTheme("light")}
            />
            <ZaloThemeCard
                label="Tối"
                mode="dark"
                selected={theme === "dark"}
                onClick={() => setTheme("dark")}
            />
            <ZaloThemeCard
                label="Theo hệ thống"
                mode="system"
                selected={theme === "system"}
                onClick={() => setTheme("system")}
            />
        </Stack>

    )
}