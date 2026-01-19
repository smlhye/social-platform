"use client"
import { Box, Radio, Typography } from "@mui/material";
import { useTheme } from "@/app/hooks/useTheme";
import { SettingsBox } from "../components/SettingsBox";

type ThemeValue = "light" | "dark" | "system";

interface ThemeOptionProps {
    label: string;
    value: ThemeValue;
    selected: boolean;
    onSelect: (v: ThemeValue) => void;
    preview: React.ReactNode;
}

function ThemeOption({
    label,
    value,
    selected,
    onSelect,
    preview,
}: ThemeOptionProps) {
    return (
        <Box
            onClick={() => onSelect(value)}
            sx={{
                cursor: "pointer",
                width: 120,
            }}
        >
            {/* Preview */}
            <Box
                sx={{
                    height: 80,
                    borderRadius: 2,
                    border: "2px solid",
                    borderColor: selected ? "#1976d2" : "transparent",
                    backgroundColor: "#f5f5f5",
                    mb: 1,
                    overflow: "hidden",
                    transition: "border-color .15s ease",
                }}
            >
                {preview}
            </Box>

            {/* Radio + Label */}
            <Box display="flex" alignItems="center" gap={1}>
                <Radio checked={selected} />
                <Typography>{label}</Typography>
            </Box>
        </Box>
    );
}

function LightPreview() {
    return (
        <Box sx={{ p: 1 }}>
            <Box sx={{ height: 14, width: 60, bgcolor: "#fff", mb: 1 }} />
            <Box sx={{ height: 12, width: 40, bgcolor: "#bbdefb" }} />
        </Box>
    );
}

function DarkPreview() {
    return (
        <Box sx={{ p: 1, bgcolor: "#121212", height: "100%" }}>
            <Box sx={{ height: 14, width: 60, bgcolor: "#333", mb: 1 }} />
            <Box sx={{ height: 12, width: 40, bgcolor: "#64b5f6" }} />
        </Box>
    );
}

function SystemPreview() {
    return (
        <Box sx={{ display: "flex", height: "100%" }}>
            <Box sx={{ flex: 1, bgcolor: "#f5f5f5" }} />
            <Box sx={{ flex: 1, bgcolor: "#121212" }} />
        </Box>
    );
}

export default function Theme() {
    const { theme, setTheme } = useTheme();

    return (
        <SettingsBox title="Cài đặt giao diện">
            <Box display="flex" gap={3}>
                <ThemeOption
                    label="Sáng"
                    value="light"
                    selected={theme === "light"}
                    onSelect={setTheme}
                    preview={<LightPreview />}
                />

                <ThemeOption
                    label="Tối"
                    value="dark"
                    selected={theme === "dark"}
                    onSelect={setTheme}
                    preview={<DarkPreview />}
                />

                <ThemeOption
                    label="Hệ thống"
                    value="system"
                    selected={theme === "system"}
                    onSelect={setTheme}
                    preview={<SystemPreview />}
                />
            </Box>
        </SettingsBox>
    );
}
