import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

interface SettingsItemProps {
    title: string;
    description?: string;
    action: ReactNode; // Switch / Checkbox / Button / Radio
}

export function SettingsItem({
    title,
    action
}: SettingsItemProps) {
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            minHeight={43}
        >
            {/* Left */}
            <Box flex={1} minWidth={0}>
                <span className="text-sm">{title}</span>
            </Box>

            {/* Right */}
            <Box flexShrink={0}>
                {action}
            </Box>
        </Box>
    );
}
